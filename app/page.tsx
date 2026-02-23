'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import FAQManagement from '@/components/faq-management'
import WorkflowBuilder from '@/components/workflow-builder'
import AINavigator from '@/components/ai-navigator'
import AINavigatorPersona from '@/components/ai-navigator-persona'
import UserManagement from '@/components/user-management'
import PlatformIntegrations from '@/components/platform-integrations'
import AuditLogs from '@/components/audit-logs'
import PromptLibrary from '@/components/prompt-library'
import ConversationLog from '@/components/conversation-log'
import Reporting from '@/components/reporting'
import Footer from '@/components/footer'

export default function AdminPortal() {
  const [userRole, setUserRole] = useState<'business' | 'admin'>('business')
  const [activeSection, setActiveSection] = useState('faq')

  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return <FAQManagement />
      case 'workflow':
        return <WorkflowBuilder />
      case 'navigator':
        return <AINavigator />
      case 'persona':
        return <AINavigatorPersona />
      case 'users':
        return <UserManagement />
      case 'integrations':
        return <PlatformIntegrations />
      case 'audit':
        return <AuditLogs />
      case 'prompts':
        return <PromptLibrary />
      case 'conversations':
        return <ConversationLog />
      case 'reporting':
        return <Reporting />
      default:
        return <FAQManagement />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        userRole={userRole}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentSection={activeSection} />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
