import { NextRequest, NextResponse } from 'next/server'

const CREATOR_NAMES = ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. James Park']

function getRandomCreator(): string {
  return CREATOR_NAMES[Math.floor(Math.random() * CREATOR_NAMES.length)]
}

export async function GET(request: NextRequest) {
  try {
    console.log('[v0] Fetching FAQs from Google Sheet via n8n...')
    
    const n8nUrl = 'https://indegene-sbx.app.n8n.cloud/webhook/approved-responses-get'
    
    const response = await fetch(n8nUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`n8n API returned ${response.status}`)
    }

    const rawData = await response.json()
    console.log('[v0] Raw n8n response structure:', Object.keys(rawData))
    
    // Handle different response formats from n8n
    let faqsList: any[] = []
    
    if (Array.isArray(rawData)) {
      faqsList = rawData
    } else if (Array.isArray(rawData.data)) {
      faqsList = rawData.data
    } else if (Array.isArray(rawData.faqs)) {
      faqsList = rawData.faqs
    } else if (typeof rawData === 'object' && rawData !== null) {
      // If it's a single FAQ object, wrap it
      faqsList = [rawData]
    }
    
    // Transform n8n response to our FAQ format
    const faqs = faqsList.map((item: any) => ({
      id: item.id || `faq-${Math.random().toString(36).substr(2, 9)}`,
      question: item.question || item.Q || item.title || '',
      answer: item.approved_response || item.answer || item.A || item.response || item.description || '',
      category: item.drug_category || item.category || item.cat || 'General',
      audience: item.audience || '',
      region: item.region || '',
      version: item.version || '',
      created_date: item.created_date || '',
      created_by: item.created_by || getRandomCreator(),
    }))

    console.log('[v0] Successfully fetched', faqs.length, 'FAQs from n8n')
    
    return NextResponse.json({
      success: true,
      faqs,
      count: faqs.length,
      source: 'google-sheet-n8n',
    })
  } catch (error) {
    console.error('[v0] Error fetching from Google Sheet:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch FAQs from Google Sheet',
        faqs: [],
        count: 0,
      },
      { status: 500 }
    )
  }
}
