'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Users, Clock, Target, DollarSign, FileText, MessageCircle, AlertCircle, Sparkles, Lightbulb, ArrowUpRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

// Chart data
const SESSIONS_DATA = [
  { date: 'Oct 25', sessions: 45, users: 28, messages: 120 },
  { date: 'Oct 26', sessions: 52, users: 32, messages: 140 },
  { date: 'Oct 27', sessions: 48, users: 30, messages: 135 },
  { date: 'Oct 28', sessions: 61, users: 38, messages: 165 },
  { date: 'Oct 29', sessions: 55, users: 34, messages: 150 },
  { date: 'Oct 30', sessions: 67, users: 40, messages: 175 },
  { date: 'Oct 31', sessions: 58, users: 36, messages: 155 },
]

const ENGAGEMENT_DATA = [
  { engagement: 'High Engagement', lastWeek: 42, thisWeek: 48 },
  { engagement: 'Medium Engagement', lastWeek: 35, thisWeek: 32 },
  { engagement: 'Low Engagement', lastWeek: 23, thisWeek: 20 },
]

const INTENT_DATA = [
  { name: 'Drug Efficacy & Dosage', value: 23, fill: '#3b82f6' },
  { name: 'Side Effects & Safety', value: 21, fill: '#10b981' },
  { name: 'Adverse Event Reporting', value: 13, fill: '#ef4444' },
  { name: 'Contact Representative', value: 9, fill: '#f59e0b' },
  { name: 'Website Navigation', value: 7, fill: '#8b5cf6' },
  { name: 'Others', value: 27, fill: '#6b7280' },
]

const FEEDBACK_DATA = [
  { name: 'Positive', value: 60, fill: '#14b8a6' },
  { name: 'Neutral', value: 25, fill: '#64748b' },
  { name: 'Negative', value: 15, fill: '#f97316' },
]

const RECENT_FEEDBACK = [
  { id: 1, text: 'Excellent response time', sentiment: 'positive', date: '2026-02-27' },
  { id: 2, text: 'Could improve clarity', sentiment: 'neutral', date: '2026-02-27' },
  { id: 3, text: 'Task too long (Neutral)', sentiment: 'neutral', date: '2026-02-26' },
  { id: 4, text: 'Confusing (Negative)', sentiment: 'negative', date: '2026-02-26' },
]

// FAQ Library Volume by Audience
const FAQ_BY_AUDIENCE = [
  { audience: 'Healthcare Providers', count: 156, percentage: 45 },
  { audience: 'Patients', count: 98, percentage: 28 },
  { audience: 'Caregivers', count: 62, percentage: 18 },
  { audience: 'Researchers', count: 31, percentage: 9 },
]

// FAQ Library Volume by Product
const FAQ_BY_PRODUCT = [
  { name: 'Cardiovexra', value: 145, fill: '#3b82f6' },
  { name: 'Oncomyra', value: 128, fill: '#10b981' },
  { name: 'General', value: 74, fill: '#f59e0b' },
]

// FAQ Library Volume by Region
const FAQ_BY_REGION = [
  { region: 'North America', count: 142, fill: '#8b5cf6' },
  { region: 'Europe', count: 98, fill: '#ec4899' },
  { region: 'Asia Pacific', count: 67, fill: '#14b8a6' },
  { region: 'Latin America', count: 40, fill: '#f97316' },
]

// Content Volume Over Time
const CONTENT_VOLUME = [
  { month: 'Aug', documents: 45, faqs: 82, total: 127 },
  { month: 'Sep', documents: 52, faqs: 95, total: 147 },
  { month: 'Oct', documents: 61, faqs: 108, total: 169 },
  { month: 'Nov', documents: 68, faqs: 124, total: 192 },
  { month: 'Dec', documents: 75, faqs: 138, total: 213 },
  { month: 'Jan', documents: 84, faqs: 156, total: 240 },
  { month: 'Feb', documents: 91, faqs: 172, total: 263 },
]

// Intent Analytics
const INTENT_ANALYTICS = [
  { intent: 'Dosage Information', frequency: 245, resolved: 231, containment: 94.3 },
  { intent: 'Side Effects', frequency: 198, resolved: 184, containment: 92.9 },
  { intent: 'Drug Interactions', frequency: 156, resolved: 142, containment: 91.0 },
  { intent: 'Patient Eligibility', frequency: 134, resolved: 119, containment: 88.8 },
  { intent: 'Clinical Trial Data', frequency: 112, resolved: 98, containment: 87.5 },
]

// Unanswered Intent
const UNANSWERED_INTENT = [
  { intent: 'Long-term Safety Data', count: 23, lastAsked: '2026-02-28' },
  { intent: 'Pediatric Dosing', count: 18, lastAsked: '2026-02-27' },
  { intent: 'Pregnancy Category Updates', count: 15, lastAsked: '2026-02-27' },
  { intent: 'Generic Availability', count: 12, lastAsked: '2026-02-26' },
  { intent: 'Insurance Coverage', count: 9, lastAsked: '2026-02-25' },
]

// Personalization Metrics
const PERSONALIZATION_DATA = [
  { category: 'Response Relevance', score: 92 },
  { category: 'Context Awareness', score: 88 },
  { category: 'User Preference', score: 85 },
  { category: 'Adaptive Learning', score: 79 },
  { category: 'Proactive Suggestions', score: 82 },
]

// Containment & Goal Completion
const CONTAINMENT_RATE_TREND = [
  { week: 'Week 1', containment: 84, gcr: 76 },
  { week: 'Week 2', containment: 86, gcr: 78 },
  { week: 'Week 3', containment: 88, gcr: 81 },
  { week: 'Week 4', containment: 90, gcr: 83 },
]

// Token Consumption & Cost
const TOKEN_COST_DATA = [
  { date: 'Feb 21', tokens: 125000, cost: 3.75, resolutions: 145 },
  { date: 'Feb 22', tokens: 138000, cost: 4.14, resolutions: 162 },
  { date: 'Feb 23', tokens: 142000, cost: 4.26, resolutions: 158 },
  { date: 'Feb 24', tokens: 155000, cost: 4.65, resolutions: 178 },
  { date: 'Feb 25', tokens: 148000, cost: 4.44, resolutions: 171 },
  { date: 'Feb 26', tokens: 163000, cost: 4.89, resolutions: 189 },
  { date: 'Feb 27', tokens: 159000, cost: 4.77, resolutions: 184 },
]

// AI Insights
const AI_INSIGHTS = [
  {
    id: 1,
    insight: 'HCPs from Wave 3 email campaign had 3x deeper engagement on PFS data',
    impact: 'high' as const,
    metric: '+215% avg session depth',
    icon: TrendingUp,
  },
  {
    id: 2,
    insight: 'Cardiovexra safety queries see 94% containment vs 87% for Oncomyra',
    impact: 'high' as const,
    metric: '7% improvement opportunity',
    icon: Target,
  },
  {
    id: 3,
    insight: 'Adverse event intent shows 23 unanswered queries - priority content gap',
    impact: 'critical' as const,
    metric: '23 queries need content',
    icon: AlertCircle,
  },
  {
    id: 4,
    insight: 'Europe HCPs engage 2.4x longer with personalized dosing recommendations',
    impact: 'medium' as const,
    metric: '+140% engagement time',
    icon: Users,
  },
  {
    id: 5,
    insight: 'Token cost per resolution dropped 12% after optimizing context retrieval',
    impact: 'medium' as const,
    metric: '-$0.004 per resolution',
    icon: DollarSign,
  },
  {
    id: 6,
    insight: 'Weekend interactions have 31% higher escalation rate - staffing opportunity',
    impact: 'medium' as const,
    metric: '31% escalation increase',
    icon: Clock,
  },
]

export default function Reporting() {
  const avgCostPerResolution = (TOKEN_COST_DATA.reduce((sum, d) => sum + d.cost, 0) / TOKEN_COST_DATA.reduce((sum, d) => sum + d.resolutions, 0)).toFixed(3)
  const totalContainment = CONTAINMENT_RATE_TREND[CONTAINMENT_RATE_TREND.length - 1].containment
  const totalGCR = CONTAINMENT_RATE_TREND[CONTAINMENT_RATE_TREND.length - 1].gcr

  return (
    <div className="space-y-6">
      <style jsx>{`
        @keyframes flowingBlob {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animated-blob-bg {
          background: linear-gradient(
            -45deg,
            #000000,
            #1e1b4b,
            #1e3a8a,
            #4c1d95,
            #000814,
            #0f172a
          );
          background-size: 400% 400%;
          animation: flowingBlob 8s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }
        .animated-blob-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.3) 0%,
            rgba(139, 92, 246, 0.2) 25%,
            transparent 50%
          );
          animation: flowingBlob 10s ease-in-out infinite reverse;
        }
        .animated-blob-bg::after {
          content: '';
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(139, 92, 246, 0.3) 0%,
            rgba(59, 130, 246, 0.2) 25%,
            transparent 50%
          );
          animation: flowingBlob 12s ease-in-out infinite;
        }
      `}</style>

      {/* AI Insights Section */}
      <div className="relative">
        {/* Small tab icon on top left */}
        <div className="absolute -top-3 left-4 z-20 flex items-center gap-1.5 bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-t-md shadow-md">
          <Sparkles className="w-3 h-3" />
          AI Insights
        </div>
        <Card className="border-violet-500/30 animated-blob-bg shadow-2xl">
          <CardHeader className="relative z-10 pt-8">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <CardTitle className="text-xl text-white">AI-Powered Insights</CardTitle>
            </div>
            <CardDescription className="text-blue-200">High-impact trends and opportunities identified by AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AI_INSIGHTS.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-2 backdrop-blur-sm ${
                      item.impact === 'critical'
                        ? 'border-red-300 bg-red-50/95'
                        : item.impact === 'high'
                        ? 'border-blue-300 bg-blue-50/95'
                        : 'border-gray-200 bg-white/95'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          item.impact === 'critical'
                            ? 'bg-red-100'
                            : item.impact === 'high'
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            item.impact === 'critical'
                              ? 'text-red-600'
                              : item.impact === 'high'
                              ? 'text-blue-600'
                              : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-2 leading-snug">
                          {item.insight}
                        </p>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3 text-primary" />
                          <span className="text-xs font-semibold text-primary">{item.metric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                <p className="text-3xl font-bold text-foreground">455</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +12%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Session Time</p>
                <p className="text-3xl font-bold text-foreground">6m 44s</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  -3%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                <p className="text-3xl font-bold text-foreground">1,247</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +15%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Containment Rate</p>
                <p className="text-3xl font-bold text-foreground">{totalContainment}%</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +4%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Goal Completion Rate</p>
                <p className="text-3xl font-bold text-foreground">{totalGCR}%</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +5%
                </div>
              </div>
              <Target className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Cost / Resolution</p>
                <p className="text-3xl font-bold text-foreground">${avgCostPerResolution}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingDown className="w-4 h-4" />
                  -7%
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Unanswered Intents</p>
                <p className="text-3xl font-bold text-foreground">{UNANSWERED_INTENT.reduce((sum, i) => sum + i.count, 0)}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  Action needed
                </div>
              </div>
              <MessageCircle className="w-8 h-8 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Trends */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Daily Activity Trends</CardTitle>
          <CardDescription>Sessions, Messages, and Users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={SESSIONS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
              <Legend />
              <Line type="monotone" dataKey="sessions" stroke="#3b82f6" name="Sessions" strokeWidth={2} />
              <Line type="monotone" dataKey="messages" stroke="#f59e0b" name="Messages" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#10b981" name="Users" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feedback & Sentiment - Full width */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Feedback & Sentiment</CardTitle>
          <CardDescription>Overall sentiment distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={FEEDBACK_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {FEEDBACK_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabbed Analytics Sections */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">FAQ & Content Analytics</TabsTrigger>
          <TabsTrigger value="intent">Intent Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cost">Cost & Tokens</TabsTrigger>
        </TabsList>

        {/* FAQ & Content Analytics Tab */}
        <TabsContent value="content" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">FAQ Volume by Audience</CardTitle>
                <CardDescription>Distribution across audience segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={FAQ_BY_AUDIENCE} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="audience" type="category" stroke="#6b7280" width={150} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">FAQ Volume by Product</CardTitle>
                <CardDescription>Distribution by product line</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={FAQ_BY_PRODUCT}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {FAQ_BY_PRODUCT.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">FAQ Volume by Region</CardTitle>
              <CardDescription>Geographic distribution of FAQ library</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={FAQ_BY_REGION}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="region" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Content Volume Growth</CardTitle>
              <CardDescription>Documents and FAQs added over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={CONTENT_VOLUME}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                  <Legend />
                  <Area type="monotone" dataKey="documents" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Documents" />
                  <Area type="monotone" dataKey="faqs" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="FAQs" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
                    <p className="text-3xl font-bold text-foreground">91</p>
                    <p className="text-xs text-muted-foreground mt-2">+7 this month</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total FAQs</p>
                    <p className="text-3xl font-bold text-foreground">172</p>
                    <p className="text-xs text-muted-foreground mt-2">+14 this month</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Content Items</p>
                    <p className="text-3xl font-bold text-foreground">263</p>
                    <p className="text-xs text-muted-foreground mt-2">+21 this month</p>
                  </div>
                  <Sparkles className="w-8 h-8 text-purple-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Intent Analysis Tab */}
        <TabsContent value="intent" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Top Intent Categories</CardTitle>
                <CardDescription>Most frequent user intents and containment rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {INTENT_ANALYTICS.map((item) => (
                    <div key={item.intent} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.intent}</span>
                        <span className="text-sm text-muted-foreground">{item.frequency} queries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${item.containment}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-primary">{item.containment}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.resolved} resolved | {item.frequency - item.resolved} escalated
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Unanswered Intent</CardTitle>
                <CardDescription>Intents requiring new content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {UNANSWERED_INTENT.map((item) => (
                    <div key={item.intent} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.intent}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Asked {item.count} times | Last: {item.lastAsked}
                        </p>
                      </div>
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Intent Distribution</CardTitle>
              <CardDescription>Distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={INTENT_DATA}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {INTENT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Containment & Goal Completion Trend</CardTitle>
                <CardDescription>Weekly performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={CONTAINMENT_RATE_TREND}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                    <Legend />
                    <Line type="monotone" dataKey="containment" stroke="#10b981" strokeWidth={2} name="Containment Rate %" />
                    <Line type="monotone" dataKey="gcr" stroke="#3b82f6" strokeWidth={2} name="GCR %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Personalization Score</CardTitle>
                <CardDescription>AI personalization effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={PERSONALIZATION_DATA}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Engagement Depth</CardTitle>
              <CardDescription>Last Week vs This Week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ENGAGEMENT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="engagement" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                  <Legend />
                  <Bar dataKey="lastWeek" fill="#3b82f6" name="Last Week" />
                  <Bar dataKey="thisWeek" fill="#1e40af" name="This Week" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost & Tokens Tab */}
        <TabsContent value="cost" className="space-y-6 mt-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Token Consumption & Cost Trend</CardTitle>
              <CardDescription>Daily token usage and associated costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={TOKEN_COST_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="tokens" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Tokens Used" />
                  <Area yAxisId="right" type="monotone" dataKey="cost" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Cost ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Tokens (7 days)</p>
                    <p className="text-3xl font-bold text-foreground">1.03M</p>
                    <p className="text-xs text-muted-foreground mt-2">Avg 147k/day</p>
                  </div>
                  <Sparkles className="w-8 h-8 text-blue-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Cost (7 days)</p>
                    <p className="text-3xl font-bold text-foreground">$30.90</p>
                    <p className="text-xs text-muted-foreground mt-2">Avg $4.41/day</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500 opacity-20" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cost per Resolution</p>
                    <p className="text-3xl font-bold text-foreground">${avgCostPerResolution}</p>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      7% improvement
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500 opacity-20" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Resolution Efficiency</CardTitle>
              <CardDescription>Resolutions completed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={TOKEN_COST_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                  <Legend />
                  <Line type="monotone" dataKey="resolutions" stroke="#8b5cf6" strokeWidth={2} name="Resolutions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
