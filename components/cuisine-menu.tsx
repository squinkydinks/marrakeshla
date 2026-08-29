"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Menu data
const menuData = {
  moroccan: {
    title: "Moroccan Cuisine",
    description: "Authentic flavors from the heart of Morocco",
    dishes: [
      {
        title: "Lamb Tagine",
        description: "Slow-cooked lamb with prunes, apricots, and almonds in aromatic spices",
      },
      {
        title: "Chicken Pastilla",
        description: "Crispy phyllo pastry filled with spiced chicken, almonds, and cinnamon sugar",
      },
      {
        title: "Vegetable Couscous",
        description: "Fluffy couscous topped with seven vegetables, chickpeas, and caramelized onions",
      },
      {
        title: "Zaalouk",
        description: "Smoky eggplant and tomato dip with garlic, cumin, and olive oil",
      },
      {
        title: "Harira Soup",
        description: "Traditional Moroccan soup with lentils, chickpeas, tomatoes, and fragrant herbs",
      },
      {
        title: "Seafood Chermoula",
        description: "Fresh fish marinated in chermoula sauce with cilantro, parsley, and preserved lemon",
      },
      {
        title: "Kefta Tagine",
        description: "Spiced meatballs in a rich tomato sauce with eggs and Moroccan spices",
      },
      {
        title: "Rfissa",
        description: "Shredded msemen bread with lentils, chicken, and fenugreek-infused broth",
      },
      {
        title: "Moroccan Carrot Salad",
        description: "Spiced carrots with cumin, paprika, and fresh herbs in a citrus dressing",
      },
      {
        title: "Taktouka",
        description: "Roasted bell pepper and tomato salad with garlic and olive oil",
      },
      {
        title: "Makouda",
        description: "Crispy potato fritters seasoned with cumin, turmeric, and fresh herbs",
      },
      {
        title: "Moroccan Mint Tea",
        description: "Traditional sweet mint tea with fresh mint leaves and pine nuts",
      },
    ],
  },
  italian: {
    title: "Italian Cuisine",
    description: "Classic Italian dishes with a Mediterranean twist",
    dishes: [
      {
        title: "Osso Buco",
        description: "Braised veal shanks with gremolata, served with saffron risotto",
      },
      {
        title: "Pappardelle al Ragù",
        description: "Handmade wide ribbon pasta with slow-cooked beef and pork ragù",
      },
      {
        title: "Branzino al Forno",
        description: "Whole roasted sea bass with herbs, lemon, and extra virgin olive oil",
      },
      {
        title: "Risotto ai Funghi",
        description: "Creamy arborio rice with wild mushrooms, white wine, and aged parmesan",
      },
      {
        title: "Melanzane alla Parmigiana",
        description: "Layers of eggplant, tomato sauce, mozzarella, and basil",
      },
      {
        title: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
      },
      {
        title: "Saltimbocca alla Romana",
        description: "Veal cutlets with prosciutto and sage in a white wine sauce",
      },
      {
        title: "Cacio e Pepe",
        description: "Spaghetti with pecorino romano cheese and freshly cracked black pepper",
      },
      {
        title: "Bistecca alla Fiorentina",
        description: "Grilled T-bone steak with rosemary, garlic, and Tuscan olive oil",
      },
      {
        title: "Fritto Misto",
        description: "Lightly fried seafood medley with lemon and herbs",
      },
      {
        title: "Burrata con Prosciutto",
        description: "Creamy burrata cheese with thinly sliced prosciutto and aged balsamic",
      },
      {
        title: "Panna Cotta",
        description: "Silky vanilla cream dessert with seasonal fruit compote",
      },
    ],
  },
  french: {
    title: "French Cuisine",
    description: "Refined French classics with elegant presentation",
    dishes: [
      {
        title: "Coq au Vin",
        description: "Chicken braised with wine, lardons, mushrooms, and pearl onions",
      },
      {
        title: "Bouillabaisse",
        description: "Provençal seafood stew with saffron, fennel, and rouille",
      },
      {
        title: "Filet au Poivre",
        description: "Pepper-crusted beef tenderloin with cognac cream sauce",
      },
      {
        title: "Ratatouille",
        description: "Provençal vegetable stew with eggplant, zucchini, bell peppers, and tomatoes",
      },
      {
        title: "Soupe à l'Oignon",
        description: "French onion soup topped with crusty bread and melted Gruyère cheese",
      },
      {
        title: "Tarte Tatin",
        description: "Caramelized upside-down apple tart with flaky pastry and crème fraîche",
      },
      {
        title: "Cassoulet",
        description: "Slow-cooked bean stew with duck confit, sausage, and pork",
      },
      {
        title: "Boeuf Bourguignon",
        description: "Beef stew braised in red wine with carrots, mushrooms, and pearl onions",
      },
      {
        title: "Quiche Lorraine",
        description: "Savory tart with bacon, Gruyère cheese, and creamy custard",
      },
      {
        title: "Croque Monsieur",
        description: "Grilled ham and cheese sandwich with béchamel sauce",
      },
      {
        title: "Salade Niçoise",
        description: "Classic salad with tuna, green beans, potatoes, olives, and eggs",
      },
      {
        title: "Crème Brûlée",
        description: "Vanilla custard with a caramelized sugar crust",
      },
    ],
  },
  spanish: {
    title: "Spanish Cuisine",
    description: "Vibrant Spanish flavors with a modern presentation",
    dishes: [
      {
        title: "Paella Valenciana",
        description: "Traditional rice dish with chicken, rabbit, and seasonal vegetables",
      },
      {
        title: "Gambas al Ajillo",
        description: "Sizzling garlic shrimp with chili and olive oil",
      },
      {
        title: "Tortilla Española",
        description: "Spanish potato and onion omelette with olive oil",
      },
      {
        title: "Pulpo a la Gallega",
        description: "Galician-style octopus with paprika, olive oil, and sea salt",
      },
      {
        title: "Patatas Bravas",
        description: "Crispy potatoes with spicy tomato sauce and garlic aioli",
      },
      {
        title: "Churros con Chocolate",
        description: "Fried dough pastries with thick hot chocolate for dipping",
      },
      {
        title: "Gazpacho",
        description: "Chilled tomato soup with cucumber, bell pepper, and olive oil",
      },
      {
        title: "Albondigas",
        description: "Spanish meatballs in a rich tomato and saffron sauce",
      },
      {
        title: "Pimientos de Padrón",
        description: "Blistered Padrón peppers with sea salt and olive oil",
      },
      {
        title: "Croquetas de Jamón",
        description: "Creamy ham croquettes with a crispy breadcrumb coating",
      },
      {
        title: "Bacalao al Pil Pil",
        description: "Salt cod in a garlic and olive oil emulsion",
      },
      {
        title: "Crema Catalana",
        description: "Citrus-infused custard with a caramelized sugar top",
      },
    ],
  },
}

type CuisineType = "moroccan" | "italian" | "french" | "spanish"

const CUISINES: CuisineType[] = ["moroccan", "italian", "french", "spanish"]

const tabId = (cuisine: CuisineType) => `cuisine-tab-${cuisine}`
const panelId = (cuisine: CuisineType) => `cuisine-panel-${cuisine}`

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-morocco-amber focus-visible:ring-offset-2 focus-visible:ring-offset-morocco-charcoal"

export function CuisineMenu() {
  const [activeCuisine, setActiveCuisine] = useState<CuisineType>("moroccan")
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const prefersReducedMotion = useReducedMotion()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const cuisines = CUISINES
  const currentIndex = cuisines.indexOf(activeCuisine)

  // Selecting through this keeps DOM focus on the tab the user landed on, which
  // is what makes arrow-key navigation of the tablist behave.
  const selectTab = (cuisine: CuisineType, moveFocus = false) => {
    setActiveCuisine(cuisine)
    if (moveFocus) tabRefs.current[cuisine]?.focus()
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % cuisines.length
    setActiveCuisine(cuisines[nextIndex])
  }

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + cuisines.length) % cuisines.length
    setActiveCuisine(cuisines[prevIndex])
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = cuisines.length - 1
    let nextIndex: number | null = null

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % cuisines.length
        break
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + cuisines.length) % cuisines.length
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = lastIndex
        break
      default:
        return
    }

    event.preventDefault()
    selectTab(cuisines[nextIndex], true)
  }

  // Honour the OS "reduce motion" setting: cross-fade in place instead of sliding.
  const panelMotion = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.01 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 },
      }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Menu Navigation */}
      <div className="flex justify-center mb-10 items-center">
        <div className="flex items-center space-x-4">
          {/* Only show arrows on desktop */}
          {isDesktop && (
            <button
              type="button"
              onClick={goToPrev}
              className={cn("bg-morocco-charcoal/80 rounded-full p-2.5 shadow-md hover:bg-morocco-charcoal z-10", FOCUS_RING)}
              aria-label="Show the previous cuisine menu"
            >
              <ChevronLeft className="h-5 w-5 text-morocco-amber" aria-hidden="true" />
            </button>
          )}

          <div
            role="tablist"
            aria-label="Cuisine menus"
            onKeyDown={handleTabKeyDown}
            className="flex space-x-4 md:space-x-8 overflow-x-auto"
          >
            {cuisines.map((cuisine) => {
              const isSelected = activeCuisine === cuisine
              return (
                <button
                  key={cuisine}
                  type="button"
                  id={tabId(cuisine)}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId(cuisine)}
                  // Roving tabindex: one Tab stop for the whole group, then arrow keys.
                  tabIndex={isSelected ? 0 : -1}
                  ref={(node) => {
                    tabRefs.current[cuisine] = node
                  }}
                  onClick={() => selectTab(cuisine)}
                  className={cn(
                    "px-4 py-2 text-lg md:text-xl font-display transition-all duration-300 border-b-2",
                    isSelected
                      ? "text-morocco-amber border-morocco-amber font-bold"
                      : "text-morocco-givry border-transparent hover:text-morocco-amber/80 hover:border-morocco-amber/40",
                    FOCUS_RING,
                  )}
                >
                  {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                </button>
              )
            })}
          </div>

          {/* Only show arrows on desktop */}
          {isDesktop && (
            <button
              type="button"
              onClick={goToNext}
              className={cn("bg-morocco-charcoal/80 rounded-full p-2.5 shadow-md hover:bg-morocco-charcoal z-10", FOCUS_RING)}
              aria-label="Show the next cuisine menu"
            >
              <ChevronRight className="h-5 w-5 text-morocco-amber" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Menu Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCuisine}
          id={panelId(activeCuisine)}
          role="tabpanel"
          aria-labelledby={tabId(activeCuisine)}
          {...panelMotion}
          className="bg-morocco-charcoal/80 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 border border-morocco-amber/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-morocco-amber mb-2">
              {menuData[activeCuisine].title}
            </h3>
            <p className="text-lg text-morocco-givry italic">{menuData[activeCuisine].description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {menuData[activeCuisine].dishes.map((dish, index) => (
              <div
                key={index}
                className="border-b border-morocco-amber/20 pb-3 last:border-b-0 md:last-of-type:border-b md:nth-last-of-type(-n+2):border-b-0 lg:nth-last-of-type(-n+3):border-b-0"
              >
                <h4 className="text-xl font-display font-bold text-morocco-salmon mb-1">{dish.title}</h4>
                <p className="text-sm text-morocco-givry/90">{dish.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
