'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Copy, Code } from 'lucide-react'

export default function PromptLibrary() {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      name: 'Customer Support Response',
      version: '1.2',
      category: 'Support',
      usage: 1245,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Lead Qualification',
      version: '1.0',
      category: 'Sales',
      usage: 892,
      status: 'Active',
    },
    {
      id: 3,
      name: 'FAQ Generation',
      version: '0.9',
      category: 'Content',
      usage: 456,
      status: 'Draft',
    },
  ])

  const [showAddPrompt, setShowAddPrompt] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Centralized Prompt Library</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Version-controlled repository for system prompts and few-shot examples to optimize agent behavior
          </p>
        </div>
        <Button onClick={() => setShowAddPrompt(!showAddPrompt)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Prompt
        </Button>
      </div>

      {showAddPrompt && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Create New Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Prompt Name</label>
                <input
                  type="text"
                  placeholder="e.g., Customer Support Response"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <select className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Support</option>
                  <option>Sales</option>
                  <option>Content</option>
                  <option>Technical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Prompt Template</label>
              <textarea
                placeholder="Enter your prompt template here..."
                className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports variables: {'{{user_name}}, {{context}}, {{question}}'}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Few-Shot Examples (Optional)</label>
              <textarea
                placeholder="Add examples to improve prompt performance"
                className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="bg-primary">Create & Publish</Button>
              <Button variant="outline">Save as Draft</Button>
              <Button variant="outline" onClick={() => setShowAddPrompt(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prompts Grid */}
      <div className="grid gap-4">
        {prompts.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-foreground text-lg">{prompt.name}</h5>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                      v{prompt.version}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        prompt.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {prompt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Category</p>
                      <p className="text-foreground mt-1">{prompt.category}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Usage</p>
                      <p className="text-foreground mt-1">{prompt.usage.toLocaleString()} times</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">Last Modified</p>
                      <p className="text-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Code className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-destructive bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Version History */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Version History</p>
                <div className="flex gap-2 text-xs">
                  {['1.2', '1.1', '1.0'].map((v) => (
                    <button
                      key={v}
                      className={`px-3 py-1 rounded border ${
                        v === prompt.version
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      v{v}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Library Stats */}
      <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Library Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Prompts', value: '47', color: 'text-blue-600' },
              { label: 'Active Versions', value: '52', color: 'text-green-600' },
              { label: 'Total Invocations', value: '28.4K', color: 'text-purple-600' },
              { label: 'Avg Performance', value: '94.2%', color: 'text-orange-600' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
