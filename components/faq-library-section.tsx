'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Loader2, AlertCircle, Tag, Users, Globe, Calendar, FileText, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, History, User, Edit2, Trash2, Sparkles, Search, Filter, FolderOpen, Folder, X } from 'lucide-react'
import { AddFAQModal } from './add-faq-modal'
import { SuggestedFAQsModal } from './suggested-faqs-modal'

interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  audience?: string
  region?: string
  version?: string
  created_date?: string
  created_by?: string
  tags?: string[]
}

const FAQS_PER_PAGE = 5

export function FAQLibrarySection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [prefilledData, setPrefilledData] = useState<{question: string, answer: string} | null>(null)
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const suggestedFAQsCount = 7

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDrugType, setSelectedDrugType] = useState<string>('all')
  const [selectedAudience, setSelectedAudience] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchFAQsFromGoogleSheet()
  }, [])

  const fetchFAQsFromGoogleSheet = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('[v0] Fetching FAQs from Google Sheet...')
      const response = await fetch('/api/google-sheet-faqs')
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs from Google Sheet')
      }

      const data = await response.json()
      console.log('[v0] Received', data.count, 'FAQs:', data.faqs?.length || 0)
      setFaqs(data.faqs || [])
      setCurrentPage(1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error('[v0] Error fetching Google Sheet FAQs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFAQ = async (faqData: any) => {
    try {
      console.log('[v0] Adding FAQ with data:', faqData)
      
      // Call n8n webhook to save FAQ
      const n8nResponse = await fetch('https://indegene-sbx.app.n8n.cloud/webhook/approved-responses-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData),
      })

      if (!n8nResponse.ok) {
        throw new Error(`Failed to add FAQ to sheet: ${n8nResponse.status}`)
      }

      console.log('[v0] FAQ successfully added to sheet')
      setShowAddModal(false)
      
      // Refresh FAQs from Google Sheet
      await fetchFAQsFromGoogleSheet()
    } catch (err) {
      console.error('[v0] Error adding FAQ:', err)
      alert(`Error adding FAQ: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleUpdateFAQ = async (faqData: any) => {
    try {
      console.log('[v0] Updating FAQ with data:', faqData)
      
      // Call n8n webhook to update FAQ
      const n8nResponse = await fetch('https://indegene-sbx.app.n8n.cloud/webhook/approved-responses-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData),
      })

      if (!n8nResponse.ok) {
        throw new Error(`Failed to update FAQ in sheet: ${n8nResponse.status}`)
      }

      console.log('[v0] FAQ successfully updated in sheet')
      setEditingFaq(null)
      
      // Refresh FAQs from Google Sheet
      await fetchFAQsFromGoogleSheet()
    } catch (err) {
      console.error('[v0] Error updating FAQ:', err)
      alert(`Error updating FAQ: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleDeleteFAQ = (faqId: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) {
      return
    }

    try {
      console.log('[v0] Deleting FAQ with ID:', faqId)
      // Remove from local state
      setFaqs(faqs.filter((faq) => faq.id !== faqId))
      alert('FAQ deleted successfully')
    } catch (err) {
      console.error('[v0] Error deleting FAQ:', err)
      alert(`Error deleting FAQ: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  // Extract unique values for filters
  const drugTypes = useMemo(() => {
    const types = new Set(faqs.map(faq => faq.category).filter(Boolean))
    return ['all', ...Array.from(types)]
  }, [faqs])

  const audiences = useMemo(() => {
    const aud = new Set(faqs.map(faq => faq.audience).filter(Boolean))
    return ['all', ...Array.from(aud)]
  }, [faqs])

  const regions = useMemo(() => {
    const reg = new Set(faqs.map(faq => faq.region).filter(Boolean))
    return ['all', ...Array.from(reg)]
  }, [faqs])

  // Filter and sort FAQs
  const filteredFaqs = useMemo(() => {
    let filtered = [...faqs]

    // Search by question
    if (searchQuery.trim()) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by drug type
    if (selectedDrugType !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedDrugType)
    }

    // Filter by audience
    if (selectedAudience !== 'all') {
      filtered = filtered.filter(faq => faq.audience === selectedAudience)
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(faq => faq.region === selectedRegion)
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = a.created_date ? new Date(a.created_date).getTime() : 0
      const dateB = b.created_date ? new Date(b.created_date).getTime() : 0
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [faqs, searchQuery, selectedDrugType, selectedAudience, selectedRegion, sortOrder])

  // Pagination logic
  const totalPages = Math.ceil(filteredFaqs.length / FAQS_PER_PAGE)
  const startIndex = (currentPage - 1) * FAQS_PER_PAGE
  const endIndex = startIndex + FAQS_PER_PAGE
  const paginatedFaqs = filteredFaqs.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedDrugType, selectedAudience, selectedRegion, sortOrder])

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Get last FAQ ID for auto-increment
  const lastFaqId = faqs.length > 0 ? faqs[faqs.length - 1].id : undefined

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedDrugType('all')
    setSelectedAudience('all')
    setSelectedRegion('all')
    setSortOrder('newest')
  }

  const hasActiveFilters = searchQuery || selectedDrugType !== 'all' || selectedAudience !== 'all' || selectedRegion !== 'all'

  // Group filtered FAQs by drug category
  const groupedFaqs = useMemo(() => {
    const groups: Record<string, FAQ[]> = {}
    for (const faq of filteredFaqs) {
      const key = faq.category || 'Uncategorized'
      if (!groups[key]) groups[key] = []
      groups[key].push(faq)
    }
    return groups
  }, [filteredFaqs])

  const toggleSection = (category: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const toggleAnswer = (faqId: string) => {
    setExpandedAnswers(prev => {
      const next = new Set(prev)
      if (next.has(faqId)) {
        next.delete(faqId)
      } else {
        next.add(faqId)
      }
      return next
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">{""}</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive FAQ Library ({filteredFaqs.length} of {faqs.length} FAQs)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowSuggestionsModal(true)} className="gap-2 border-2 border-blue-500 bg-white text-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white hover:border-blue-600 transition-all font-medium">
            <Sparkles className="w-4 h-4" />
            {suggestedFAQsCount} suggested FAQs
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Filters & Search</h4>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs gap-1 h-auto py-1">
                  <X className="w-3 h-3" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search by Question */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Drug Type Filter */}
              <div>
                <Select value={selectedDrugType} onValueChange={setSelectedDrugType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Drug Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Drug Types</SelectItem>
                    {drugTypes.filter(t => t !== 'all').map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Audience Filter */}
              <div>
                <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Audiences</SelectItem>
                    {audiences.filter(a => a !== 'all').map((aud) => (
                      <SelectItem key={aud} value={aud}>{aud}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Region Filter */}
              <div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.filter(r => r !== 'all').map((reg) => (
                      <SelectItem key={reg} value={reg}>{reg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Sort by:</span>
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === 'newest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('newest')}
                  className="text-xs h-7"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Newest First
                </Button>
                <Button
                  variant={sortOrder === 'oldest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('oldest')}
                  className="text-xs h-7"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Oldest First
                </Button>
              </div>
            </div>

            {/* Active Filter Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                {searchQuery && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    <Search className="w-3 h-3" />
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-blue-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedDrugType !== 'all' && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    <FileText className="w-3 h-3" />
                    {selectedDrugType}
                    <button onClick={() => setSelectedDrugType('all')} className="ml-1 hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedAudience !== 'all' && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    <Users className="w-3 h-3" />
                    {selectedAudience}
                    <button onClick={() => setSelectedAudience('all')} className="ml-1 hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedRegion !== 'all' && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    <Globe className="w-3 h-3" />
                    {selectedRegion}
                    <button onClick={() => setSelectedAudience('all')} className="ml-1 hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading FAQs...</span>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </CardContent>
        </Card>
      ) : faqs.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No FAQs available</p>
          </CardContent>
        </Card>
      ) : filteredFaqs.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
            <FolderOpen className="w-12 h-12 text-muted-foreground" />
            <p className="text-muted-foreground">No FAQs match your filters</p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => {
            const isExpanded = expandedSections.has(category)
            return (
              <div key={category} className="border border-border rounded-lg overflow-hidden">
                {/* Folder Header */}
                <button
                  onClick={() => toggleSection(category)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted/80 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <FolderOpen className="w-5 h-5 text-primary" />
                    ) : (
                      <Folder className="w-5 h-5 text-primary" />
                    )}
                    <h3 className="font-semibold text-foreground">{category}</h3>
                    <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
                      {categoryFaqs.length} {categoryFaqs.length === 1 ? 'FAQ' : 'FAQs'}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {/* FAQ Items */}
                {isExpanded && (
                  <div className="divide-y divide-border">
                    {categoryFaqs.map((faq) => {
                      const isAnswerExpanded = expandedAnswers.has(faq.id)
                      return (
                        <div key={faq.id} className="p-4 hover:bg-muted/20 transition-colors">
                          <div className="space-y-3">
                            {/* Question with chevron toggle */}
                            <button
                              onClick={() => toggleAnswer(faq.id)}
                              className="w-full flex items-start justify-between gap-3 text-left"
                            >
                              <h4 className="font-semibold text-foreground leading-relaxed text-pretty flex-1">
                                {faq.question}
                              </h4>
                              {isAnswerExpanded ? (
                                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                              )}
                            </button>

                            {/* Collapsible Answer */}
                            {isAnswerExpanded && (
                              <div className="bg-background/50 rounded p-3 border border-border">
                                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                              </div>
                            )}

                            {/* Metadata */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {faq.audience && (
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                  <Users className="w-3 h-3" />
                                  {faq.audience}
                                </div>
                              )}
                              {faq.region && (
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                  <Globe className="w-3 h-3" />
                                  {faq.region}
                                </div>
                              )}
                              {faq.version && (
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                  {faq.version}
                                </div>
                              )}
                              {faq.created_date && (
                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(faq.created_date).toLocaleDateString('en-US')}
                                </div>
                              )}
                            </div>

                            {/* Creator and Audit Trail */}
                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <div className="flex items-center gap-2">
                                <User className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Created by: <span className="font-medium text-foreground">{faq.created_by || 'Admin'}</span>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                  onClick={() => setEditingFaq(faq)}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                  onClick={() => handleDeleteFAQ(faq.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs gap-1 h-auto py-1 px-2"
                                >
                                  <History className="w-3 h-3" />
                                  Audit Trail
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <AddFAQModal
        open={showAddModal || !!editingFaq}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddModal(false)
            setEditingFaq(null)
            setPrefilledData(null)
          }
        }}
        onSubmit={editingFaq ? handleUpdateFAQ : handleAddFAQ}
        lastFaqId={lastFaqId}
        editingFaq={editingFaq}
        prefilledData={prefilledData}
      />

      <SuggestedFAQsModal
        open={showSuggestionsModal}
        onOpenChange={setShowSuggestionsModal}
        onSelectSuggestion={(suggestion) => {
          // Populate the Add FAQ modal with suggested content
          setPrefilledData({
            question: suggestion.question,
            answer: suggestion.answer
          })
          setEditingFaq(null)
          setShowSuggestionsModal(false)
          setShowAddModal(true)
        }}
      />
    </div>
  )
}
