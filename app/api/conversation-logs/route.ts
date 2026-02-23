import { NextRequest, NextResponse } from 'next/server'

interface ConversationMessage {
  id: string
  sender: 'user' | 'agent'
  message: string
  timestamp: string
}

interface ConversationLog {
  id: string
  date: string
  time: string
  messages: number
  duration: string
  url: string
  conversationFlow: ConversationMessage[]
}

// Store conversations in memory (in production, use a database)
const conversationLogs: ConversationLog[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (
      !body.id ||
      !body.date ||
      !body.time ||
      !body.messages ||
      !body.duration ||
      !body.url ||
      !Array.isArray(body.conversationFlow)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields. Required: id, date, time, messages, duration, url, conversationFlow',
        },
        { status: 400 }
      )
    }

    const newLog: ConversationLog = {
      id: body.id,
      date: body.date,
      time: body.time,
      messages: body.messages,
      duration: body.duration,
      url: body.url,
      conversationFlow: body.conversationFlow,
    }

    conversationLogs.push(newLog)

    console.log('[v0] Conversation log received:', {
      id: newLog.id,
      date: newLog.date,
      time: newLog.time,
      messageCount: newLog.messages,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Conversation log received successfully',
        data: newLog,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error processing conversation log:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process conversation log',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        count: conversationLogs.length,
        logs: conversationLogs,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error retrieving conversation logs:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve conversation logs',
      },
      { status: 500 }
    )
  }
}
