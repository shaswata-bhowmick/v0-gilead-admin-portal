import { NextRequest, NextResponse } from 'next/server'

// Mock FAQ store for fallback when Pinecone is not configured
const mockFAQStore: Record<string, any> = {}

// Try to initialize Pinecone, but gracefully fall back to mock
let pinecone: any = null
let index: any = null

async function initializePinecone() {
  if (!process.env.PINECONE_API_KEY) {
    console.log('[v0] Pinecone credentials not configured, using mock storage')
    return null
  }

  // Validate API key format
  if (!process.env.PINECONE_API_KEY.startsWith('pcsk_')) {
    console.log('[v0] Invalid Pinecone API key format, using mock storage')
    return null
  }

  // Validate index name - CRITICAL
  const indexName = process.env.PINECONE_INDEX_NAME
  if (!indexName) {
    console.error('[v0] CRITICAL: PINECONE_INDEX_NAME environment variable is not set!')
    throw new Error('Missing PINECONE_INDEX_NAME environment variable')
  }

  if (typeof indexName !== 'string' || indexName.trim() === '') {
    console.error('[v0] CRITICAL: PINECONE_INDEX_NAME is invalid:', indexName)
    throw new Error('PINECONE_INDEX_NAME must be a non-empty string')
  }

  try {
    if (!pinecone) {
      console.log('[v0] Initializing Pinecone SDK with index:', indexName)
      const { Pinecone } = await import('@pinecone-database/pinecone')
      pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
      })
    }

    if (!index && pinecone) {
      console.log('[v0] Getting Pinecone index reference:', indexName)
      try {
        index = pinecone.index(indexName)
        console.log('[v0] Pinecone index reference obtained successfully')
      } catch (indexError) {
        console.error('[v0] Failed to get index reference:', indexError instanceof Error ? indexError.message : indexError)
        index = null
        return null
      }
    }

    return { pinecone, index }
  } catch (error) {
    console.error('[v0] Error initializing Pinecone:', error instanceof Error ? error.message : error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] FAQ POST request received')
    const body = await request.json()
    const { question, response, metadata, followUp } = body

    if (!question || !response) {
      return NextResponse.json(
        { success: false, error: 'Question and response are required' },
        { status: 400 }
      )
    }

    const faqId = `faq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const faqRecord = {
      id: faqId,
      question,
      response,
      followUp: followUp || [],
      metadata: {
        category: metadata?.category || 'general',
        subcategory: metadata?.subcategory || '',
        audience: metadata?.audience || 'HCP',
        region: metadata?.region || 'global',
        status: metadata?.status || 'review',
        version: metadata?.version || 1,
        createdAt: new Date().toISOString(),
      },
    }

    const services = await initializePinecone()

    if (services && services.index) {
      try {
        const namespace = faqRecord.metadata.category || 'general'
        console.log('[v0] Upserting FAQ to Pinecone with ID:', faqId, 'namespace:', namespace)
        
        // Upsert all fields as root-level properties
        const upsertPayload = {
          records: [
            {
              _id: faqId,
              text: `question: ${faqRecord.question} answer: ${faqRecord.response}`,
              question: faqRecord.question,
              answer: faqRecord.response,
              category: faqRecord.metadata.category,
              subcategory: faqRecord.metadata.subcategory,
              audience: faqRecord.metadata.audience,
              region: faqRecord.metadata.region,
              status: faqRecord.metadata.status,
              version: faqRecord.metadata.version,
              createdAt: faqRecord.metadata.createdAt,
            },
          ],
        }

        console.log('[v0] Upsert Payload:', JSON.stringify(upsertPayload, null, 2))
        await services.index.namespace(namespace).upsertRecords(upsertPayload)
        console.log('[v0] FAQ successfully upserted to Pinecone')
      } catch (pineconeError) {
        console.error('[v0] Pinecone Error:', pineconeError instanceof Error ? pineconeError.message : pineconeError)
      }
    }

    return NextResponse.json({
      success: true,
      data: faqRecord,
      mode: services ? 'pinecone' : 'mock',
    })
  } catch (error) {
    console.error('[v0] Error in FAQ POST:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    console.log('[v0] FAQ GET request received')

    const services = await initializePinecone()
    let faqs: any[] = []

    if (services && services.index) {
      try {
        console.log('[v0] Retrieving FAQs from Pinecone from all namespaces')
        // Query all FAQs from all namespaces by iterating through known namespaces
        // or use a broader approach to get FAQs
        const allNamespaces = ['general', 'platform_overview', 'integration', 'settings', 'troubleshooting', 'billing']
        const allFAQs: any[] = []

        for (const ns of allNamespaces) {
          try {
            console.log('[v0] Querying namespace:', ns)
            const nsIndex = services.index.namespace(ns)
            
            // Query with a dummy embedding query to list records
            const queryResults = await nsIndex.query({
              vector: new Array(1024).fill(0), // dummy vector for query - must match index dimension of 1024
              topK: 100,
              includeMetadata: true,
            })

            if (queryResults.matches && queryResults.matches.length > 0) {
              console.log('[v0] Retrieved', queryResults.matches.length, 'FAQs from namespace:', ns)
              const namespaceFAQs = queryResults.matches.map((match: any) => {
                console.log('[v0] DEBUG - Match metadata keys:', Object.keys(match.metadata || {}))
                console.log('[v0] DEBUG - Question field:', match.metadata?.Question || match.metadata?.question)
                console.log('[v0] DEBUG - Answer field:', match.metadata?.Answer || match.metadata?.answer)
                return {
                  id: match.id,
                  question: match.metadata?.Question || match.metadata?.question || '',
                  response: match.metadata?.Answer || match.metadata?.answer || '',
                  followUp: [],
                  namespace: ns,
                  metadata: {
                    category: match.metadata?.category || 'general',
                    subcategory: match.metadata?.subcategory || '',
                    audience: match.metadata?.audience || 'HCP',
                    region: match.metadata?.region || 'global',
                    status: match.metadata?.status || 'review',
                    version: match.metadata?.version || 1,
                    createdAt: match.metadata?.createdAt || new Date().toISOString(),
                  },
                }
              })
              allFAQs.push(...namespaceFAQs)
            }
          } catch (nsError) {
            // Silently skip namespaces that error
            console.log('[v0] Namespace', ns, 'query error, skipping')
          }
        }

        faqs = allFAQs
        console.log('[v0] Retrieved', faqs.length, 'total FAQs from Pinecone')
      } catch (pineconeError) {
        console.error('[v0] Pinecone retrieval error, falling back to mock storage:', pineconeError)
        faqs = Object.values(mockFAQStore)
      }
    } else {
      console.log('[v0] Using mock storage for FAQ retrieval')
      faqs = Object.values(mockFAQStore)
    }

    return NextResponse.json({
      success: true,
      data: faqs,
    })
  } catch (error) {
    console.error('[v0] Error in FAQ GET:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('[v0] FAQ PUT request received')
    const body = await request.json()
    const { id, question, response, metadata, followUp } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID is required' },
        { status: 400 }
      )
    }

    const newVersion = (metadata?.version || 1) + 1

    const faqRecord = {
      id,
      question,
      response,
      followUp: followUp || [],
      metadata: {
        category: metadata?.category || 'general',
        subcategory: metadata?.subcategory || '',
        audience: metadata?.audience || 'HCP',
        region: metadata?.region || 'global',
        status: metadata?.status || 'review',
        version: newVersion,
        updatedAt: new Date().toISOString(),
      },
    }

    const services = await initializePinecone()

    if (services && services.index) {
      try {
        const namespace = faqRecord.metadata.category || 'general'
        console.log('[v0] Updating FAQ with ID:', id, 'to version:', newVersion, 'namespace:', namespace)
        
        const updatePayload = {
          records: [
            {
              _id: id,
              text: faqRecord.question + " " + faqRecord.response,
              metadata: {
                audience: faqRecord.metadata.audience || 'HCP',
                category: faqRecord.metadata.category || 'general',
                subcategory: faqRecord.metadata.subcategory || '',
                region: faqRecord.metadata.region || 'global',
                status: faqRecord.metadata.status || 'review',
                version: `v${faqRecord.metadata.version}`,
                updatedAt: faqRecord.metadata.updatedAt,
              },
            },
          ],
        }
        
        await services.index.namespace(namespace).upsertRecords(updatePayload)

        console.log('[v0] FAQ successfully updated in Pinecone')
      } catch (pineconeError) {
        console.error('[v0] Pinecone error during update:', pineconeError instanceof Error ? pineconeError.message : pineconeError)
        console.log('[v0] Falling back to mock storage')
        mockFAQStore[id] = faqRecord
      }
    } else {
      console.log('[v0] Using mock storage for FAQ update')
      mockFAQStore[id] = faqRecord
    }

    return NextResponse.json({
      success: true,
      data: faqRecord,
      mode: services ? 'pinecone' : 'mock',
    })
  } catch (error) {
    console.error('[v0] Error in FAQ PUT:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('[v0] FAQ DELETE request received')
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'FAQ ID is required' },
        { status: 400 }
      )
    }

    const services = await initializePinecone()

    if (services && services.index) {
      try {
        console.log('[v0] Deleting FAQ with ID:', id)
        // Try deleting from all known namespaces
        const allNamespaces = ['general', 'platform_overview', 'integration', 'settings', 'troubleshooting', 'billing']
        
        for (const ns of allNamespaces) {
          try {
            await services.index.namespace(ns).deleteOne(id)
            console.log('[v0] FAQ deleted from namespace:', ns)
          } catch (nsError) {
            // Record might not exist in this namespace, continue to next
            console.log('[v0] FAQ not found in namespace:', ns)
          }
        }
        
        console.log('[v0] FAQ successfully deleted from Pinecone')
      } catch (pineconeError) {
        console.error('[v0] Pinecone error during delete:', pineconeError instanceof Error ? pineconeError.message : pineconeError)
        if (mockFAQStore[id]) {
          delete mockFAQStore[id]
        }
      }
    } else {
      console.log('[v0] Using mock storage for FAQ deletion')
      if (mockFAQStore[id]) {
        delete mockFAQStore[id]
      }
    }

    return NextResponse.json({
      success: true,
      data: { id },
      mode: services ? 'pinecone' : 'mock',
    })
  } catch (error) {
    console.error('[v0] Error in FAQ DELETE:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
