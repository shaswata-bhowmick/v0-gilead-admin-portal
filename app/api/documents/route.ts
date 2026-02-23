import { NextRequest, NextResponse } from 'next/server'

// In-memory store for documents (in production, use a database)
const documentsStore: Record<string, any> = {}

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] Fetching all documents')
    
    const documents = Object.values(documentsStore)
    
    return NextResponse.json({
      success: true,
      documents,
    })
  } catch (error) {
    console.error('[v0] Error fetching documents:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch documents',
        documents: [],
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Adding new document')
    
    const body = await request.json()
    const { name, type, url, category } = body

    if (!name || !type || !url) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, type, url',
        },
        { status: 400 }
      )
    }

    const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const document = {
      id: docId,
      name,
      type,
      url,
      category: category || 'general',
      createdAt: new Date().toISOString(),
    }

    documentsStore[docId] = document

    console.log('[v0] Document added:', docId)

    return NextResponse.json({
      success: true,
      document,
    })
  } catch (error) {
    console.error('[v0] Error adding document:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add document',
      },
      { status: 500 }
    )
  }
}
