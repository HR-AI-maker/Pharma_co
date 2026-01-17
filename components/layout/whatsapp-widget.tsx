'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = '441234567890' // Replace with actual WhatsApp number
  const message = encodeURIComponent('Hello! I have a question about your products.')

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-dropdown border border-border overflow-hidden mb-4 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-green-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Pharma.co Support</h4>
                  <p className="text-xs text-white/80">Usually replies within minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="bg-muted rounded-lg p-3 mb-4">
              <p className="text-sm text-foreground">
                Hi there! How can we help you today? Click the button below to start a WhatsApp chat with our support team.
              </p>
            </div>
            <a
              href={`https://wa.me/${phoneNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Start Chat
            </a>
          </div>

          {/* Footer */}
          <div className="bg-muted px-4 py-2 text-center">
            <p className="text-xs text-muted-foreground">
              Powered by WhatsApp
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300',
          isOpen
            ? 'bg-gray-600 hover:bg-gray-700'
            : 'bg-green-500 hover:bg-green-600 hover:scale-110'
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  )
}
