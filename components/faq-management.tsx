'use client'

import { FAQLibrarySection } from './faq-library-section'
import { DocumentLibrarySection } from './document-library-section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQManagement() {
  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["faq-library", "documents"]}>
        <AccordionItem value="faq-library" className="border border-border rounded-lg px-4">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
            FAQ Library
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-0">
            <FAQLibrarySection />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="documents" className="border border-border rounded-lg px-4 mt-4">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
            Documents & Links
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-0">
            <DocumentLibrarySection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
