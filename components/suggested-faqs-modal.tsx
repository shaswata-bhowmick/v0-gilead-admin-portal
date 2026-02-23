'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, AlertCircle, Copy } from 'lucide-react'

interface SuggestedFAQ {
  id: string
  question: string
  answer: string
  reason: string
  timesAsked: number
  webpageReferences: string[]
}

interface SuggestedFAQsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectSuggestion: (suggestion: SuggestedFAQ) => void
}

// Suggested FAQs data based on actual user queries and website content
const MOCK_SUGGESTED_FAQS: SuggestedFAQ[] = [
  {
    id: 'sugg-1',
    question: 'What should be done if a patient misses a dose of Cardiovexra?',
    answer: 'If a dose is missed, the patient should take it as soon as remembered on the same day. If it is close to the time of the next scheduled dose, the missed dose should be skipped and regular dosing resumed. Patients should not take a double dose to compensate for a missed dose.',
    reason: 'You have this information in your website in 2 pages (Dosage Instructions, Patient Guide)',
    timesAsked: 28,
    webpageReferences: ['Dosage Instructions', 'Patient Guide'],
  },
  {
    id: 'sugg-2',
    question: 'What laboratory parameters should be monitored during long-term Cardiovexra therapy?',
    answer: 'Long-term monitoring should include periodic assessment of renal function, serum electrolytes (particularly potassium), and blood pressure control. In patients at higher risk for hepatic dysfunction or fluid retention, additional clinical evaluation may be warranted based on physician judgment.',
    reason: 'You have this information in your website in 3 pages (Clinical Monitoring, Laboratory Guidelines, Medical Professional Resources)',
    timesAsked: 19,
    webpageReferences: ['Clinical Monitoring', 'Laboratory Guidelines', 'Medical Professional Resources'],
  },
  {
    id: 'sugg-3',
    question: 'What are the contraindications for Cardiovexra use?',
    answer: 'Cardiovexra is contraindicated in patients with severe renal impairment, hepatic disease, or known hypersensitivity to the active ingredient. Additionally, it should be avoided in pregnant patients and those with acute coronary syndrome without medical supervision.',
    reason: 'You have this information in your website in 4 pages (Safety Information, Contraindications, Medical Warnings, Product Safety)',
    timesAsked: 22,
    webpageReferences: ['Safety Information', 'Contraindications', 'Medical Warnings', 'Product Safety'],
  },
  {
    id: 'sugg-4',
    question: 'How long does it take for Cardiovexra to show therapeutic effects?',
    answer: 'Most patients begin to experience symptom relief within 2-4 weeks of starting treatment. However, full therapeutic effects may take up to 8-12 weeks. Individual response times vary based on the severity of the condition and individual patient factors.',
    reason: 'You have this information in your website in 2 pages (Treatment Timeline, Clinical Outcomes)',
    timesAsked: 31,
    webpageReferences: ['Treatment Timeline', 'Clinical Outcomes'],
  },
  {
    id: 'sugg-5',
    question: 'Can Cardiovexra be taken with other medications?',
    answer: 'Cardiovexra may interact with certain medications, particularly ACE inhibitors, NSAIDs, and potassium-sparing diuretics. Always inform your healthcare provider about all medications, supplements, and herbal products you are taking. Do not start or stop any medication without consulting your healthcare provider.',
    reason: 'You have this information in your website in 3 pages (Drug Interactions, Safety Guidelines, Medical Professional Guide)',
    timesAsked: 35,
    webpageReferences: ['Drug Interactions', 'Safety Guidelines', 'Medical Professional Guide'],
  },
  {
    id: 'sugg-6',
    question: 'What precautions should be taken to manage ocular side effects during Oncomyra therapy?',
    answer: 'Patients should undergo baseline ophthalmologic evaluation prior to initiating therapy. Regular follow-up eye examinations are recommended, especially during the first six months of treatment. Use of lubricating eye drops may help reduce symptoms such as dry eye, and patients should promptly report blurred vision, visual disturbances, or eye discomfort.',
    reason: 'You have this information in your website in 3 pages (Ocular Safety Guidelines, Side Effects Management, Patient Safety Instructions)',
    timesAsked: 16,
    webpageReferences: ['Ocular Safety Guidelines', 'Side Effects Management', 'Patient Safety Instructions'],
  },
  {
    id: 'sugg-7',
    question: 'How should treatment be adjusted if a patient experiences Grade 3 or higher adverse events with Oncomyra?',
    answer: 'For Grade 3 or higher toxicities, treatment interruption is recommended until the adverse event resolves to Grade 1 or baseline. Upon resolution, therapy may be resumed at a reduced dose according to established dose modification guidelines. Permanent discontinuation should be considered if severe toxicity recurs or does not resolve adequately.',
    reason: 'You have this information in your website in 4 pages (Toxicity Management, Dose Modification Guidelines, Clinical Management, Safety Protocols)',
    timesAsked: 12,
    webpageReferences: ['Toxicity Management', 'Dose Modification Guidelines', 'Clinical Management', 'Safety Protocols'],
  },
]

export function SuggestedFAQsModal({
  open,
  onOpenChange,
  onSelectSuggestion,
}: SuggestedFAQsModalProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestedFAQ | null>(null)
  const [generatedResponse, setGeneratedResponse] = useState<string>('')

  const handleGenerateResponse = (suggestion: SuggestedFAQ) => {
    // Use the pre-written answer from the suggestion
    setGeneratedResponse(suggestion.answer)
  }

  const handleCopyToFAQ = (suggestion: SuggestedFAQ) => {
    // Copy to FAQ - this would typically pass data to the Add FAQ modal
    onSelectSuggestion(suggestion)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Suggested FAQs
          </DialogTitle>
          <DialogDescription>
            AI-recommended FAQs based on your website content and user queries
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {selectedSuggestion ? (
            // Detail view for selected suggestion
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedSuggestion(null)
                  setGeneratedResponse('')
                }}
                className="mb-2"
              >
                ← Back to Suggestions
              </Button>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">{selectedSuggestion.question}</h3>

                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {selectedSuggestion.reason}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Times asked:</span>
                      <span className="font-semibold text-foreground">
                        {selectedSuggestion.timesAsked}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Generated Response Section */}
              {!generatedResponse && (
                <Button
                  onClick={() => handleGenerateResponse(selectedSuggestion)}
                  className="w-full gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate AI Response
                </Button>
              )}

              {generatedResponse && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <p className="text-xs text-yellow-700 font-medium">
                          Disclaimer: This AI-generated response requires proper approval through your established review process before being published.
                        </p>
                      </div>

                      <div className="bg-white rounded border border-green-200 p-3">
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {generatedResponse}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => {
                            // Copy to clipboard
                            navigator.clipboard.writeText(generatedResponse)
                            alert('Response copied to clipboard')
                          }}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </Button>
                        <Button
                          onClick={() => handleCopyToFAQ(selectedSuggestion)}
                          size="sm"
                          className="gap-2"
                        >
                          <Sparkles className="w-3 h-3" />
                          Use in FAQ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            // List view of suggestions
            <div className="space-y-3">
              {MOCK_SUGGESTED_FAQS.map((suggestion) => (
                <Card
                  key={suggestion.id}
                  className="border-yellow-100 bg-yellow-50/50 hover:bg-yellow-100/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedSuggestion(suggestion)}
                >
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <h4 className="font-semibold text-foreground flex-1">{suggestion.question}</h4>
                      </div>

                      <p className="text-sm text-muted-foreground ml-6">{suggestion.reason}</p>

                      <div className="flex items-center justify-between ml-6 pt-2">
                        <span className="text-xs text-muted-foreground">
                          Asked <span className="font-semibold">{suggestion.timesAsked}</span> times
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:text-primary/80 h-auto py-1 px-2 text-xs"
                        >
                          View Details →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
