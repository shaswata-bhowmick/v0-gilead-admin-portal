'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Upload } from 'lucide-react'

interface AddDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (docData: any) => Promise<void>
}

export function AddDocumentModal({ open, onOpenChange, onSubmit }: AddDocumentModalProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState<'document' | 'link'>('link')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim() || !url.trim()) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      await onSubmit({
        name: name.trim(),
        type,
        url: url.trim(),
        category,
      })

      // Reset form
      setName('')
      setUrl('')
      setType('link')
      setCategory('general')
    } catch (error) {
      console.error('[v0] Error in AddDocumentModal:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Document/Link</DialogTitle>
          <DialogDescription>
            Add a new document or external link to the library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Product Guide, Policy Document"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setType('link')}
                className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  type === 'link'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-foreground hover:bg-secondary'
                }`}
                disabled={loading}
              >
                Link
              </button>
              <button
                onClick={() => setType('document')}
                className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  type === 'document'
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-border text-foreground hover:bg-secondary'
                }`}
                disabled={loading}
              >
                Document
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              URL/Path *
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={type === 'link' ? 'https://example.com' : '/path/to/document'}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={loading}
            >
              <option value="general">General</option>
              <option value="policy">Policy</option>
              <option value="guide">Guide</option>
              <option value="compliance">Compliance</option>
              <option value="reference">Reference</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Document'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
