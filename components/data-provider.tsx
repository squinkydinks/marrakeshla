"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the shape of our site data
interface SiteData {
  menuData: any
  testimonials: any
  isLoading: boolean
  error: Error | null
}

// Create context with default values
const DataContext = createContext<SiteData>({
  menuData: null,
  testimonials: null,
  isLoading: true,
  error: null,
})

// Hook to use the data context
export function useSiteData() {
  return useContext(DataContext)
}

interface DataProviderProps {
  children: ReactNode
}

export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<SiteData>({
    menuData: null,
    testimonials: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch all data in parallel
        const [menuResponse, testimonialsResponse] = await Promise.all([
          fetch("/api/menu-data"),
          fetch("/api/testimonials"),
        ])

        // Check for errors
        if (!menuResponse.ok) throw new Error("Failed to fetch menu data")
        if (!testimonialsResponse.ok) throw new Error("Failed to fetch testimonials")

        // Parse the JSON responses
        const menuData = await menuResponse.json()
        const testimonials = await testimonialsResponse.json()

        // Update state with the fetched data
        setData({
          menuData,
          testimonials,
          isLoading: false,
          error: null,
        })

        // Store in sessionStorage for faster access
        sessionStorage.setItem("dar-dmana-menu-data", JSON.stringify(menuData))
        sessionStorage.setItem("dar-dmana-testimonials", JSON.stringify(testimonials))
      } catch (error) {
        console.error("Error fetching site data:", error)
        setData((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error : new Error("Unknown error occurred"),
        }))
      }
    }

    // Check if we already have the data in sessionStorage
    const cachedMenuData = sessionStorage.getItem("dar-dmana-menu-data")
    const cachedTestimonials = sessionStorage.getItem("dar-dmana-testimonials")

    if (cachedMenuData && cachedTestimonials) {
      // Use cached data
      setData({
        menuData: JSON.parse(cachedMenuData),
        testimonials: JSON.parse(cachedTestimonials),
        isLoading: false,
        error: null,
      })
      console.log("Using cached site data")
    } else {
      // Fetch fresh data
      fetchAllData()
    }
  }, [])

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
