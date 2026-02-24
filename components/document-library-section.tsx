'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Loader2, AlertCircle, Download, Trash2, ChevronLeft, ChevronRight, User, Calendar } from 'lucide-react'
import { AddDocumentModal } from './add-document-modal'

interface Document {
  id: string
  title: string
  url: string
  docId: string
  uploaded_by?: string
  uploaded_date?: string
}

// Hardcoded documents from the provided list
const DOCUMENTS_DATA: Document[] = [
  {
    id: '01',
    docId: '01_Cardiovexra_VICTORY_HTN_Trial.pdf',
    title: 'Cardiovexra (Veridostatin) Significantly Reduces Systolic Blood Pressure in Patients with Resistant Hypertension: Results from the VICTORY-HTN Phase III Trial',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/01_Cardiovexra_VICTORY_HTN_Trial.pdf',
    uploaded_by: 'Dr. Sarah Johnson',
    uploaded_date: '2026-02-20',
  },
  {
    id: '02',
    docId: '02_Cardiovexra_Clinical_Practice_Guide.pdf',
    title: 'Integrating Cardiovexra (Veridostatin) into Clinical Practice: Patient Selection and Treatment Algorithms for Resistant Hypertension',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/02_Cardiovexra_Clinical_Practice_Guide.pdf',
    uploaded_by: 'Dr. Sarah Johnson',
    uploaded_date: '2026-02-20',
  },
  {
    id: '03',
    docId: '03_Cardiovexra_Safety_Analysis.pdf',
    title: 'Safety Profile of Cardiovexra (Veridostatin): Integrated Analysis from Phase II and III Clinical Trials',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/03_Cardiovexra_Safety_Analysis.pdf',
    uploaded_by: 'Dr. Michael Chen',
    uploaded_date: '2026-02-21',
  },
  {
    id: '04',
    docId: '04_Cardiovexra_Real_World_Evidence.pdf',
    title: 'Real-World Outcomes with Cardiovexra (Veridostatin) in Patients with Uncontrolled Hypertension: A 12-Month Multicenter Study',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/04_Cardiovexra_Real_World_Evidence.pdf',
    uploaded_by: 'Dr. Michael Chen',
    uploaded_date: '2026-02-19',
  },
  {
    id: '05',
    docId: '05_Cardiovexra_Comparative_Effectiveness.pdf',
    title: 'Comparative Effectiveness of Cardiovexra (Veridostatin) Versus Spironolactone in Resistant Hypertension: A Propensity-Matched Analysis',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/05_Cardiovexra_Comparative_Effectiveness.pdf',
    uploaded_by: 'Dr. Sarah Johnson',
    uploaded_date: '2026-02-18',
  },
  {
    id: '06',
    docId: '06_Oncomyra_CLARITY01_Pivotal_Trial.pdf',
    title: 'Oncomyra™ (Talrenimab) Demonstrates Improved Overall Survival in FGFR2 Fusion–Positive Metastatic Cholangiocarcinoma: Results from the CLARITY-01 Phase III Trial',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/06_Oncomyra_CLARITY01_Pivotal_Trial.pdf',
    uploaded_by: 'Dr. Emily Rodriguez',
    uploaded_date: '2026-02-17',
  },
  {
    id: '07',
    docId: '07_Oncomyra_Biomarker_Study.pdf',
    title: 'Predictive Value of FGFR2 Fusion Status for Response to Oncomyra™ (Talrenimab) in Advanced Cholangiocarcinoma',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/07_Oncomyra_Biomarker_Study.pdf',
    uploaded_by: 'Dr. Emily Rodriguez',
    uploaded_date: '2026-02-16',
  },
  {
    id: '08',
    docId: '08_Oncomyra_AE_Management_Guide.pdf',
    title: 'Clinical Management of Adverse Events Associated with Oncomyra™ (Talrenimab) in Patients with Advanced Cholangiocarcinoma',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/08_Oncomyra_AE_Management_Guide.pdf',
    uploaded_by: 'Dr. James Park',
    uploaded_date: '2026-02-15',
  },
  {
    id: '09',
    docId: '09_Oncomyra_Real_World_Evidence.pdf',
    title: 'Real-World Outcomes with Oncomyra™ (Talrenimab) in Previously Treated Advanced Cholangiocarcinoma: A Multicenter Retrospective Analysis',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/09_Oncomyra_Real_World_Evidence.pdf',
    uploaded_by: 'Dr. James Park',
    uploaded_date: '2026-02-14',
  },
  {
    id: '10',
    docId: '10_Oncomyra_Combination_Therapy_Study.pdf',
    title: 'Evaluation of Oncomyra™ (Talrenimab) in Combination with Gemcitabine and Cisplatin as First-Line Therapy for FGFR2-Altered Advanced Cholangiocarcinoma',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/10_Oncomyra_Combination_Therapy_Study.pdf',
    uploaded_by: 'Dr. Lisa Anderson',
    uploaded_date: '2026-02-13',
  },
  {
    id: '11',
    docId: '11_Oncomyra_CKD_Safety_Profile.pdf',
    title: 'Safety Profile of Oncomyra™ (Talrenimab) in Patients with Advanced Cholangiocarcinoma and Chronic Kidney Disease: A Focused Analysis',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/11_Oncomyra_CKD_Safety_Profile.pdf',
    uploaded_by: 'Dr. Lisa Anderson',
    uploaded_date: '2026-02-12',
  },
  {
    id: '12',
    docId: '12_Oncomyra_Cardiovascular_Safety.pdf',
    title: 'Safety and Tolerability of Oncomyra™ (Talrenimab) in Patients with Advanced Cholangiocarcinoma and Hepatic Impairment: Impact on Dosing and Management',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/12_Oncomyra_Cardiovascular_Safety.pdf',
    uploaded_by: 'Dr. David Kumar',
    uploaded_date: '2026-02-11',
  },
  {
    id: '13',
    docId: '13_Oncomyra_Hepatic_Impairment_Safety.pdf',
    title: 'Cardiovascular Safety of Oncomyra™ (Talrenimab) in Patients with Advanced Cholangiocarcinoma and Pre-Existing Cardiovascular Disease: A Comprehensive Analysis',
    url: 'https://thelxmouzlqooccapuua.supabase.co/storage/v1/object/public/pdf_storage/13_Oncomyra_Hepatic_Impairment_Safety.pdf',
    uploaded_by: 'Dr. David Kumar',
    uploaded_date: '2026-02-10',
  },
]

const DOCS_PER_PAGE = 5

export function DocumentLibrarySection() {
  const [documents, setDocuments] = useState<Document[]>(DOCUMENTS_DATA)
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const handleAddDocument = async (docData: any) => {
    try {
      const newDoc: Document = {
        id: `${documents.length + 1}`,
        docId: docData.name,
        title: docData.title || docData.name,
        url: docData.url,
      }

      setDocuments([...documents, newDoc])
      setShowAddModal(false)
    } catch (err) {
      console.error('[v0] Error adding document:', err)
      alert(`Error adding document: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleDeleteDocument = (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return
    }

    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.target = '_blank'
    link.click()
  }

  // Pagination logic
  const totalPages = Math.ceil(documents.length / DOCS_PER_PAGE)
  const startIndex = (currentPage - 1) * DOCS_PER_PAGE
  const endIndex = startIndex + DOCS_PER_PAGE
  const paginatedDocuments = documents.slice(startIndex, endIndex)

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">{""}</h3>
          <p className="text-sm text-muted-foreground">Uploaded resources for the system ({documents.length} documents)</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Document/Link
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">No documents or links added yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3">
            {paginatedDocuments.map((doc) => (
              <Card key={doc.id} className="border-border hover:shadow-md transition-shadow overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base leading-relaxed text-pretty">{doc.title}</CardTitle>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(doc.url, doc.docId)}
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                        title="Download document"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        title="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      Doc_ID: {doc.docId}
                    </span>
                  </div>
                  
                  {/* Upload Info */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Uploaded by: <span className="font-medium text-foreground">{doc.uploaded_by || 'Unknown'}</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{doc.uploaded_date ? new Date(doc.uploaded_date).toLocaleDateString('en-US') : 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <AddDocumentModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddDocument}
      />
    </div>
  )
}
