'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AddFAQModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (faqData: any) => Promise<void>
  lastFaqId?: string
  editingFaq?: any
  prefilledData?: {question: string, answer: string} | null
}

const DEFAULT_DRUG_CATEGORIES = ['Cardiovascular', 'Renal', 'Gastrointestinal']
const AUDIENCE_OPTIONS = ['HCP', 'Caregiver', 'Patient']
const REGION_OPTIONS = ['US', 'Outside US']

export function AddFAQModal({ open, onOpenChange, onSubmit, lastFaqId, editingFaq, prefilledData }: AddFAQModalProps) {
  const isEditMode = !!editingFaq
  const [newId, setNewId] = useState('')
  const [question, setQuestion] = useState('')
  const [approvedResponse, setApprovedResponse] = useState('')
  const [drugCategory, setDrugCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [showCustomCategory, setShowCustomCategory] = useState(false)
  const [audience, setAudience] = useState('HCP')
  const [region, setRegion] = useState('US')
  const [drugCategories, setDrugCategories] = useState<string[]>(DEFAULT_DRUG_CATEGORIES)
  const [loading, setLoading] = useState(false)

  // Generate auto-ID when modal opens or load existing data in edit mode
  useEffect(() => {
    if (open) {
      if (isEditMode && editingFaq) {
        // Load existing data for editing
        setNewId(editingFaq.id || '')
        setQuestion(editingFaq.question || '')
        setApprovedResponse(editingFaq.answer || '')
        setDrugCategory(editingFaq.category || '')
        setAudience(editingFaq.audience || 'HCP')
        setRegion(editingFaq.region || 'US')
      } else if (prefilledData) {
        // Load prefilled data from suggested FAQ
        const nextId = generateNextId(lastFaqId)
        setNewId(nextId)
        setQuestion(prefilledData.question)
        setApprovedResponse(prefilledData.answer)
        setDrugCategory('')
        setCustomCategory('')
        setShowCustomCategory(false)
        setAudience('HCP')
        setRegion('US')
      } else {
        // New FAQ mode - empty form
        const nextId = generateNextId(lastFaqId)
        setNewId(nextId)
        setQuestion('')
        setApprovedResponse('')
        setDrugCategory('')
        setCustomCategory('')
        setShowCustomCategory(false)
        setAudience('HCP')
        setRegion('US')
      }
    }
  }, [open, lastFaqId, editingFaq, isEditMode, prefilledData])

  const generateNextId = (lastId?: string): string => {
    if (!lastId) return 'FAQ-1'
    
    // Extract number from ID (e.g., "FAQ-50" -> 50)
    const match = lastId.match(/\d+/)
    if (match) {
      const nextNum = parseInt(match[0]) + 1
      return `FAQ-${nextNum}`
    }
    return 'FAQ-1'
  }

  const handleAddCategory = () => {
    if (customCategory.trim() && !drugCategories.includes(customCategory.trim())) {
      const newCategories = [...drugCategories, customCategory.trim()]
      setDrugCategories(newCategories)
      setDrugCategory(customCategory.trim())
      setCustomCategory('')
      setShowCustomCategory(false)
    }
  }

  const handleSubmit = async () => {
    if (!question.trim() || !approvedResponse.trim() || !drugCategory) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const today = new Date('2026-02-27')
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })

      await onSubmit({
        id: isEditMode ? editingFaq.id : newId,
        question: question.trim(),
        approved_response: approvedResponse.trim(),
        drug_category: drugCategory,
        audience,
        region,
        version: isEditMode ? editingFaq.version : 'v1',
        created_date: isEditMode ? editingFaq.created_date : formattedDate,
      })

      // Reset form
      setQuestion('')
      setApprovedResponse('')
      setDrugCategory('')
      setCustomCategory('')
      setShowCustomCategory(false)
      setAudience('HCP')
      setRegion('US')
    } catch (error) {
      console.error('[v0] Error in AddFAQModal:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? 'Update the FAQ details below' : 'Create a new FAQ to be added to the library'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Auto ID */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              FAQ ID
            </label>
            <input
              type="text"
              value={newId}
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground text-sm opacity-60"
            />
            <p className="text-xs text-muted-foreground mt-1">Auto-assigned ID (read-only)</p>
          </div>

          {/* Question */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Question *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the FAQ question"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={loading}
            />
          </div>

          {/* Approved Response */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Approved Response *
            </label>
            <textarea
              value={approvedResponse}
              onChange={(e) => setApprovedResponse(e.target.value)}
              placeholder="Enter the approved response"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              rows={4}
              disabled={loading}
            />
          </div>

          {/* Drug Category */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Drug Category *
            </label>
            <div className="flex gap-2">
              <Select value={drugCategory} onValueChange={setDrugCategory} disabled={loading}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select drug category" />
                </SelectTrigger>
                <SelectContent>
                  {drugCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCustomCategory(!showCustomCategory)}
                disabled={loading}
                className="gap-1"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {showCustomCategory && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter new category"
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  disabled={loading}
                />
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={loading || !customCategory.trim()}
                  className="px-3"
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          {/* Audience */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Audience *
            </label>
            <Select value={audience} onValueChange={setAudience} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                {AUDIENCE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Region */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Region *
            </label>
            <Select value={region} onValueChange={setRegion} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {REGION_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Version */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Version
            </label>
            <input
              type="text"
              value="v1"
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground text-sm opacity-60"
            />
            <p className="text-xs text-muted-foreground mt-1">Always v1 (read-only)</p>
          </div>

          {/* Created Date */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Created Date
            </label>
            <input
              type="text"
              value="02/27/2026"
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground text-sm opacity-60"
            />
            <p className="text-xs text-muted-foreground mt-1">Current date (read-only)</p>
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
            {isEditMode
              ? loading ? 'Updating...' : 'Update FAQ'
              : loading ? 'Adding...' : 'Add FAQ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
