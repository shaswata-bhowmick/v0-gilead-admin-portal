'use client'

import { AlertCircle } from 'lucide-react'

interface HeaderProps {
  currentSection: string
}

export default function Header({ currentSection }: HeaderProps) {
  const sectionTitles: Record<string, string> = {
    faq: 'FAQ & Content',
    workflow: 'Workflows',
    navigator: 'AI Navigator Configuration',
    users: 'User & Role Management',
    integrations: 'Platform Integrations',
    audit: 'Global Audit Logs',
    prompts: 'Centralized Prompt Library',
    conversations: 'Conversation Log',
    reporting: 'Reporting',
  }

  return (
    <header className="bg-white border-b border-border p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground">
          {sectionTitles[currentSection as keyof typeof sectionTitles] || 'Dashboard'}
        </h2>
      </div>
    </header>
  )
}
