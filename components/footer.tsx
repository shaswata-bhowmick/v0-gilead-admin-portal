'use client'

import { useState } from 'react'
import { Star, ChevronUp, ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <footer className="bg-white border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            © Indegene 2026 | Confidential & Proprietary
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="gap-1"
          >
            <ChevronUp className="w-4 h-4" />
            Expand
          </Button>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-end mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="gap-1"
          >
            <ChevronDown className="w-4 h-4" />
            Collapse
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Product</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Features</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Support</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Status</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Company</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Legal</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-primary">Terms</a></li>
              <li><a href="#" className="hover:text-primary">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Active Reviewer Rating (RLHF) */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 mb-3">
          <CardContent className="pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-xs">Help us improve</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Rate this experience to help optimize our AI assistant
                </p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className="w-5 h-5 text-muted-foreground hover:text-yellow-500 cursor-pointer" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="border-t border-border pt-3 text-center text-xs text-muted-foreground">
          <p>© Indegene 2026 | Confidential & Proprietary</p>
          <p className="mt-1">Enterprise-grade AI Platform Admin Portal</p>
        </div>
      </div>
    </footer>
  )
}
