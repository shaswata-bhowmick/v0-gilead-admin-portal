import FAQManagement from '@/components/faq-management'

export const metadata = {
  title: 'FAQ Management',
  description: 'Manage and organize frequently asked questions by category',
}

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <FAQManagement />
      </div>
    </main>
  )
}
