"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

export function GoogleReviewsBadge() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for where you might load a Google Reviews widget
    // For now, we'll just use our static implementation
    const loadGoogleReviewsScript = () => {
      // This would be where you'd load any third-party script if needed
      console.log("Google Reviews badge loaded")
    }

    loadGoogleReviewsScript()
  }, [])

  return (
    <Card className="border-morocco-amber/20 bg-white shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 bg-morocco-prairie text-white">
          <div className="flex items-center">
            <img src="/placeholder.svg?height=40&width=40" alt="Google Reviews" className="w-8 h-8 mr-2" />
            <h3 className="font-bold">Google Reviews</h3>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-bold">5.0</span>
          </div>

          <p className="text-sm text-gray-600 mb-4">Based on 15 reviews</p>

          <Link
            href="https://g.page/r/CXNzeDJG56RRECA/review"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-morocco-prairie text-white text-center py-2 rounded hover:bg-morocco-prairie-dark transition-colors"
          >
            Write a Review
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
