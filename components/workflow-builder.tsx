'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, ArrowRight, ChevronRight } from 'lucide-react'

export default function WorkflowBuilder() {
  const [showBuilder, setShowBuilder] = useState(false)
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false)

  const workflows = [
    {
      id: 1,
      name: 'Contact a Representative',
      triggers: ['User Query Input'],
      actions: ['Intent Detection', 'Route to Team', 'Send Email', 'Log to CRM'],
      status: 'Active',
      lastModifiedBy: 'Dr. Sarah Johnson',
      lastModifiedOn: '2026-02-25 at 14:30',
    },
    {
      id: 2,
      name: 'Adverse Event Reporting Workflow',
      triggers: ['Form Submission'],
      actions: ['Extract Data', 'Score Lead', 'Update CRM', 'Notify Sales'],
      status: 'Active',
      lastModifiedBy: 'Dr. Michael Chen',
      lastModifiedOn: '2026-02-24 at 10:15',
    },
  ]

  if (showTemplateBuilder) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="outline" onClick={() => setShowBuilder(false)} className="mb-2">
              ← Back to Builder
            </Button>
          </div>
          <Button className="gap-2">
            Save Workflow
          </Button>
        </div>

        <div className="flex gap-4 h-[600px]">
          {/* Node Palette Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-4 overflow-y-auto">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Trigger Nodes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['User Intent Detection', 'Form Submission', 'API Webhook', 'Scheduled Task'].map((node) => (
                  <div
                    key={node}
                    className="p-2 bg-green-50 border border-green-300 rounded text-xs font-medium text-green-900 cursor-grab hover:shadow-md transition-shadow"
                    draggable
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      {node}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Logic Nodes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Decision / Condition', 'User Input', 'Bot Response'].map((node) => (
                  <div
                    key={node}
                    className="p-2 bg-purple-50 border border-purple-300 rounded text-xs font-medium text-purple-900 cursor-grab hover:shadow-md transition-shadow"
                    draggable
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      {node}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Action Nodes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Update CRM', 'Send Email', 'API Call', 'Log Event'].map((node) => (
                  <div
                    key={node}
                    className="p-2 bg-blue-50 border border-blue-300 rounded text-xs font-medium text-blue-900 cursor-grab hover:shadow-md transition-shadow"
                    draggable
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      {node}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <Card className="flex-1 bg-gradient-to-br from-slate-50 to-white border-dashed border-2 border-slate-300">
            <CardContent className="h-full p-6">
              <div className="h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] rounded-lg relative">
                {/* Sample workflow nodes as example */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="p-3 bg-green-50 border-2 border-green-400 rounded-lg shadow-md text-xs font-medium text-green-900 w-48 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      User Intent Detection
                    </div>
                    <div className="text-[10px] text-green-700 mt-1">Start Node</div>
                  </div>
                  <div className="w-0.5 h-12 bg-slate-400 mx-auto"></div>
                </div>

                <div className="absolute top-36 left-1/2 transform -translate-x-1/2">
                  <div className="p-3 bg-purple-50 border-2 border-purple-400 rounded-lg shadow-md text-xs font-medium text-purple-900 w-48">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      Decision / Condition
                    </div>
                    <div className="text-[10px] text-purple-700 mt-1">If intent = "support"</div>
                  </div>
                  <div className="flex justify-between px-24 mt-2">
                    <div className="w-0.5 h-12 bg-slate-400"></div>
                    <div className="w-0.5 h-12 bg-slate-400"></div>
                  </div>
                </div>

                <div className="absolute top-64 left-[25%] transform -translate-x-1/2">
                  <div className="p-3 bg-purple-50 border-2 border-purple-400 rounded-lg shadow-md text-xs font-medium text-purple-900 w-40">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      Bot Response
                    </div>
                    <div className="text-[10px] text-purple-700 mt-1">Show support message</div>
                  </div>
                  <div className="w-0.5 h-12 bg-slate-400 mx-auto"></div>
                </div>

                <div className="absolute top-64 left-[75%] transform -translate-x-1/2">
                  <div className="p-3 bg-purple-50 border-2 border-purple-400 rounded-lg shadow-md text-xs font-medium text-purple-900 w-40">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      User Input
                    </div>
                    <div className="text-[10px] text-purple-700 mt-1">Request details</div>
                  </div>
                  <div className="w-0.5 h-12 bg-slate-400 mx-auto"></div>
                </div>

                <div className="absolute top-96 left-[25%] transform -translate-x-1/2">
                  <div className="p-3 bg-blue-50 border-2 border-blue-400 rounded-lg shadow-md text-xs font-medium text-blue-900 w-40">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Update CRM
                    </div>
                    <div className="text-[10px] text-blue-700 mt-1">Log interaction</div>
                  </div>
                </div>

                <div className="absolute top-96 left-[75%] transform -translate-x-1/2">
                  <div className="p-3 bg-blue-50 border-2 border-blue-400 rounded-lg shadow-md text-xs font-medium text-blue-900 w-40">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Send Email
                    </div>
                    <div className="text-[10px] text-blue-700 mt-1">Notify team</div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 text-xs text-muted-foreground bg-white px-3 py-2 rounded border border-border">
                  Drag nodes from the left sidebar to add them to the canvas
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showBuilder) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="outline" onClick={() => setShowBuilder(false)} className="mb-4">
              ← Back to Workflows
            </Button>
            <h3 className="text-xl font-semibold text-foreground">No-Code Workflow Builder</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create logic-based configurations for intent-routing rules and enterprise tool integrations
            </p>
          </div>
        </div>

        {/* Canvas Area Preview */}
        <Card className="bg-gradient-to-br from-blue-50 to-white border-dashed border-2 border-blue-200 p-8">
          <div className="text-center space-y-4 py-12">
            <div className="inline-block p-3 bg-blue-100 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-foreground">Drag nodes to create workflows</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto my-0">
              Connect triggers (Intent Detection, API Call) with actions (Update CRM, Send Email, API Call)
            </p>
            <Button className="mt-4" onClick={() => setShowTemplateBuilder(true)}>Start with Template</Button>
          </div>
        </Card>

        {/* Node Sidebar Reference */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Trigger Nodes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['User Intent Detection', 'Form Submission', 'API Webhook', 'Scheduled Task'].map((node) => (
                <div key={node} className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs font-medium text-green-900 cursor-move">
                  {node}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Action Nodes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Update CRM', 'Send Email', 'API Call', 'Log Event'].map((node) => (
                <div key={node} className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-900 cursor-move">
                  {node}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Available Workflows */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Available Workflows</h4>
        <div className="space-y-3">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground">{workflow.name}</h5>
                      <span
                        className={`inline-block mt-2 px-2 py-1 text-xs rounded font-medium ${
                          workflow.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {workflow.status}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>

                  

                  {/* Metadata */}
                  <div className="border-t border-border pt-3 text-xs text-muted-foreground space-y-1">
                    <div>Last modified by: <span className="font-medium text-foreground">{workflow.lastModifiedBy}</span></div>
                    <div>Last modified on: <span className="font-medium text-foreground">{workflow.lastModifiedOn}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New Workflow Button - Coming Soon */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100/30 border-gray-200 opacity-60">
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-foreground">Create New Workflow</h5>
              <p className="text-sm text-muted-foreground mt-1">
                Build custom workflows with drag-and-drop no-code interface
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">Coming Soon</span>
              <Button disabled className="gap-2">
                <Plus className="w-4 h-4" />
                Open Builder
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
