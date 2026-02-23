'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Plus, Trash2, Folder, FileText, ChevronDown, ChevronRight } from 'lucide-react'

export default function AINavigator() {
  const [contentLibrary, setContentLibrary] = useState([
    {
      id: 1,
      name: 'Product Knowledge',
      type: 'folder',
      children: [
        { id: 11, name: 'Features & Capabilities', type: 'folder', children: [] },
        { id: 12, name: 'Pricing Information', type: 'faq', status: 'Active' },
      ],
    },
    {
      id: 2,
      name: 'Support & Troubleshooting',
      type: 'folder',
      children: [
        { id: 21, name: 'Common Issues', type: 'faq', status: 'Active' },
        { id: 22, name: 'Setup Guide', type: 'faq', status: 'Active' },
      ],
    },
  ])

  const [expandedFolders, setExpandedFolders] = useState<number[]>([1, 2])
  const [analytics, setAnalytics] = useState({
    engagement: true,
    search: true,
    contentMetrics: true,
    conversions: true,
  })

  const [availableWorkflows] = useState([
    {
      id: 1,
      name: 'Customer Support Intent Routing',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Lead Qualification',
      status: 'Draft',
    },
  ])

  const [attachedWorkflows, setAttachedWorkflows] = useState<number[]>([1])

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]
    )
  }

  const renderContentTree = (items: any[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: `${level * 16}px` }}>
        {item.type === 'folder' ? (
          <div>
            <div
              className="flex items-center gap-2 p-2 hover:bg-secondary rounded cursor-pointer transition-colors"
              onClick={() => toggleFolder(item.id)}
            >
              {expandedFolders.includes(item.id) ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-foreground">{item.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {item.children?.length || 0} items
              </span>
            </div>
            {expandedFolders.includes(item.id) && item.children && (
              <div className="space-y-1">
                {renderContentTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 hover:bg-secondary rounded group">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-500" />
              <span className="text-sm text-foreground">{item.name}</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">{item.status}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3 text-destructive" />
            </Button>
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Agent Identity Section */}
      <Card className="border-primary/30 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg">Agent Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Digital Human Avatar</label>
            <div className="mt-2 border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto text-blue-400 mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop avatar image</p>
              <p className="text-xs text-muted-foreground mt-1">(PNG, JPG, max 5MB)</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Agent Name</label>
            <input
              type="text"
              placeholder="e.g., Indegene Assistant"
              defaultValue="Indegene Assistant"
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Agent Description</label>
            <textarea
              placeholder="Describe the agent's purpose and personality"
              defaultValue="Your trusted AI assistant for enterprise solutions"
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Knowledge Context Section with Hierarchical Content Library */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Knowledge Context - Content Library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-foreground">Organized Content Hierarchy</label>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                Add Folder
              </Button>
            </div>
            <div className="border border-border rounded-lg p-4 bg-secondary/20 space-y-1 max-h-96 overflow-y-auto">
              {renderContentTree(contentLibrary)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              💡 All content must be organized within folders. Create hierarchical structures to manage FAQs and documents.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Quick Add to Library</label>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-transparent h-20 gap-2 flex-col">
                <Plus className="w-5 h-5" />
                <span className="text-xs">New Folder</span>
              </Button>
              <Button variant="outline" className="bg-transparent h-20 gap-2 flex-col">
                <FileText className="w-5 h-5" />
                <span className="text-xs">New FAQ</span>
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Document Embeddings</label>
            <div className="mt-2 p-4 bg-secondary rounded-lg border border-border">
              <div className="text-sm">
                <p className="font-medium text-foreground">Supported Formats</p>
                <p className="text-muted-foreground mt-1">PDF, DOCX, TXT, XLSX, JSON</p>
              </div>
            </div>
            <Button variant="outline" className="mt-3 w-full gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Upload Documents to Folder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Attachment Section */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg">Attached Workflows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Connect one or more workflows to automate agent actions and routing logic
            </p>
            <div className="space-y-2">
              {availableWorkflows.map((workflow) => {
                const isAttached = attachedWorkflows.includes(workflow.id)
                return (
                  <div
                    key={workflow.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isAttached
                        ? 'bg-green-50 border-green-300'
                        : 'bg-secondary border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isAttached}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAttachedWorkflows([...attachedWorkflows, workflow.id])
                          } else {
                            setAttachedWorkflows(attachedWorkflows.filter((id) => id !== workflow.id))
                          }
                        }}
                        className="w-4 h-4 accent-green-600 cursor-pointer"
                      />
                      <div>
                        <p className="font-medium text-foreground">{workflow.name}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-xs rounded font-medium ${
                            workflow.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {workflow.status}
                        </span>
                      </div>
                    </div>
                    {isAttached && (
                      <span className="text-xs text-green-700 font-medium">✓ Attached</span>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              💡 You can attach multiple workflows. They will run based on their configured triggers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analytics & Engagement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analytics & Engagement Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { key: 'engagement', label: 'User Engagement Metrics', desc: 'Track user interactions and satisfaction' },
              { key: 'search', label: 'Search & Discovery', desc: 'Monitor content search patterns' },
              { key: 'contentMetrics', label: 'Content Metrics', desc: 'Track content performance and usage' },
              { key: 'conversions', label: 'Conversion Tracking', desc: 'Monitor business outcomes' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                <input
                  type="checkbox"
                  checked={analytics[key as keyof typeof analytics]}
                  onChange={(e) =>
                    setAnalytics({
                      ...analytics,
                      [key]: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 accent-primary cursor-pointer"
                />
                <div className="flex-1">
                  <label className="font-medium text-foreground cursor-pointer block">{label}</label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full">Save Analytics Configuration</Button>
        </CardContent>
      </Card>
    </div>
  )
}
