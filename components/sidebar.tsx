'use client';

import { LaughIcon, FileText, Zap, Settings, Users, Boxes, LogIn, Library, MessageSquare, BarChart3, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  userRole: 'business' | 'admin'
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ userRole, activeSection, onSectionChange }: SidebarProps) {
  const businessMenuItems = [
    { id: 'faq', label: 'FAQ & Content', icon: FileText },
    { id: 'workflow', label: 'Workflows', icon: Zap },
    { id: 'conversations', label: 'Conversation Log', icon: MessageSquare },
    { id: 'reporting', label: 'Reporting', icon: BarChart3 },
    { id: 'persona', label: 'AI Navigator Persona', icon: Bot },
  ]

  const adminMenuItems = [
    ...businessMenuItems,
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'integrations', label: 'Platform Integrations', icon: Boxes },
    { id: 'audit', label: 'Audit Logs', icon: LogIn },
    { id: 'prompts', label: 'Prompt Library', icon: Library },
  ]

  const menuItems = userRole === 'admin' ? adminMenuItems : businessMenuItems

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          
          <span className="text-lg font-thin">Web AI Resource Navigator   </span>
        </h1>
        <p className="mt-1 text-base ml-0 text-sidebar-ring">Admin Panel </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
              activeSection === id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-accent">
        <p>© Indegene 2026</p>
        <p>Confidential & Proprietary</p>
      </div>
    </div>
  )
}
