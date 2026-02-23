import { NextRequest, NextResponse } from 'next/server'

// Reference to the same store as route.ts
const documentsStore: Record<string, any> = {}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    console.log('[v0] Deleting document:', id)

    if (!documentsStore[id]) {
      return NextResponse.json(
        {
          success: false,
          error: 'Document not found',
        },
        { status: 404 }
      )
    }

    delete documentsStore[id]

    console.log('[v0] Document deleted:', id)

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    })
  } catch (error) {
    console.error('[v0] Error deleting document:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete document',
      },
      { status: 500 }
    )
  }
}
