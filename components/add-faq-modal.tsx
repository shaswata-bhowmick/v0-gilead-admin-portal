'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, X, Check, Loader2 } from 'lucide-react'
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
  const [approvalStage, setApprovalStage] = useState(0)
  const [showApprovalFlow, setShowApprovalFlow] = useState(false)

  // Generate auto-ID when modal opens or load existing data in edit mode
  useEffect(() => {
    if (open) {
      // Reset approval flow
      setShowApprovalFlow(false)
      setApprovalStage(0)
      
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
      setShowApprovalFlow(true)
      setApprovalStage(1)

      // Animate through approval stages (5 seconds each)
      const stages = [1, 2, 3, 4]
      for (const stage of stages) {
        setApprovalStage(stage)
        await new Promise(resolve => setTimeout(resolve, 5000))
      }

      // Only call API after all 4 stages complete
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
        status: 'Approved',
      })

      // Reset form
      setQuestion('')
      setApprovedResponse('')
      setDrugCategory('')
      setCustomCategory('')
      setShowCustomCategory(false)
      setAudience('HCP')
      setRegion('US')
      setShowApprovalFlow(false)
      setApprovalStage(0)
    } catch (error) {
      console.error('[v0] Error in AddFAQModal:', error)
      setShowApprovalFlow(false)
      setApprovalStage(0)
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

        {/* Approval Flow Animation */}
        {showApprovalFlow && (
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold text-sm mb-3">Approval Process</h4>
            <div className="space-y-3">
              {[
                { id: 1, label: 'In Review', color: 'blue' },
                { id: 2, label: 'Feedback Incorporation', color: 'yellow' },
                { id: 3, label: 'In Approval', color: 'orange' },
                { id: 4, label: 'Approved for Use', color: 'green' },
              ].map((stage) => (
                <div
                  key={stage.id}
                  className={`flex items-center gap-3 p-3 rounded-md transition-all ${
                    approvalStage === stage.id
                      ? 'bg-primary/10 border-2 border-primary'
                      : approvalStage > stage.id
                      ? 'bg-green-50 border-2 border-green-500'
                      : 'bg-background border border-border opacity-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      approvalStage === stage.id
                        ? 'bg-primary text-primary-foreground'
                        : approvalStage > stage.id
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {approvalStage === stage.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : approvalStage > stage.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{stage.id}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${approvalStage >= stage.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {stage.label}
                  </span>
                  {approvalStage === stage.id && stage.id === 4 && (
                    <Check className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

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
              : loading ? 'Processing...' : 'Submit for Approval'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
