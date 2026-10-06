/**
 * The menu as shown on the website. Prices are deliberately not published online.
 * Source: the Marrakesh LA print menus (Dinner, Tea/Coffee/Mocktails, Wine & Beer).
 */
export type MenuItem = { name: string; style?: string; note?: string }
export type MenuCourse = { title: string; items: MenuItem[]; add?: string }
export type Menu = { id: string; label: string; columns: MenuCourse[][] }

export const MENUS: Menu[] = [
  {
    "id": "dinner",
    "label": "Dinner",
    "columns": [
      [
        {
          "title": "Salads",
          "items": [
            {
              "name": "Marrakesh Salad",
              "note": "Mixed greens, grilled eggplant, walnuts, figs, grilled chicken"
            },
            {
              "name": "Couscous Salad",
              "note": "Couscous, roasted vegetables, arugula, salmon bites"
            },
            {
              "name": "Roasted Eggplant",
              "note": "Roasted eggplant, peppers, tomatoes, herbs"
            },
            {
              "name": "Beet Salad",
              "note": "Beets, walnuts, dried cherries"
            },
            {
              "name": "Burrata Salad",
              "note": "Burrata, cherry tomatoes, basil, olive oil"
            },
            {
              "name": "Caesar Salad",
              "note": "Romaine, parmesan, croutons, Caesar dressing"
            },
            {
              "name": "Moroccan Mezze",
              "note": "Carrot, eggplant, tomato and cucumber, beet, hummus, goat cheese with harissa · serves two"
            }
          ],
          "add": "chicken, kefta or salmon"
        },
        {
          "title": "Small plates",
          "items": [
            {
              "name": "Chicken Bastilla",
              "note": "Braised chicken, almonds, egg, cinnamon"
            },
            {
              "name": "Shrimp Tagine",
              "note": "Shrimp, preserved lemon, garlic, herbs"
            },
            {
              "name": "Kefta Tagine",
              "note": "Beef kefta, tomato sauce, herbs, Moroccan spices"
            }
          ]
        },
        {
          "title": "Sides",
          "items": [
            {
              "name": "Fresh Bread",
              "note": "Freshly baked in house daily"
            },
            {
              "name": "Roasted Potatoes",
              "note": "Garlic, rosemary, sea salt"
            },
            {
              "name": "Mushrooms",
              "note": "Sautéed with garlic and herbs"
            },
            {
              "name": "Grilled Asparagus",
              "note": "Olive oil, lemon, sea salt"
            },
            {
              "name": "Brussels Sprouts",
              "note": "Roasted until caramelized, sea salt"
            }
          ]
        }
      ],
      [
        {
          "title": "Main dishes",
          "items": [
            {
              "name": "Royal Couscous",
              "note": "Couscous, vegetables, chicken, lamb, ground beef, merguez"
            },
            {
              "name": "Lamb Tagine with Prunes",
              "note": "Slow-cooked lamb, prunes, almonds"
            },
            {
              "name": "Tangia",
              "note": "Slow-cooked beef, preserved lemon, spices, herbs"
            },
            {
              "name": "Lemon Chicken with Olives",
              "note": "Chicken, olives, lemon sauce"
            },
            {
              "name": "Rack of Lamb",
              "note": "Mushroom sauce, market vegetables"
            },
            {
              "name": "Whole Branzino",
              "note": "Herbs and olive oil, served with vegetables"
            },
            {
              "name": "Salmon Tagine",
              "note": "Sautéed farmers market vegetables"
            }
          ]
        },
        {
          "title": "Pasta",
          "items": [
            {
              "name": "Spaghetti Bolognese",
              "note": "Slow-simmered beef ragù, tomato, parmesan"
            },
            {
              "name": "Tagliatelle Alfredo",
              "note": "Ribbon pasta, parmesan cream sauce, cracked black pepper"
            },
            {
              "name": "Fettuccine with Shrimp",
              "note": "Sautéed shrimp, garlic, cream, fresh parsley"
            },
            {
              "name": "Penne alla Vodka with Steak",
              "note": "Sliced steak, tomato vodka cream, parmesan"
            }
          ]
        },
        {
          "title": "Desserts",
          "items": [
            {
              "name": "Jawhara",
              "note": "Traditional Moroccan milk pastry"
            },
            {
              "name": "Crème Brûlée",
              "note": "Vanilla custard, caramelized sugar crust"
            },
            {
              "name": "Baklava",
              "note": "Layered phyllo, nuts, honey syrup"
            },
            {
              "name": "Almond Pie with Ice Cream",
              "note": "Warm almond tart, vanilla ice cream"
            },
            {
              "name": "Tiramisu",
              "note": "Espresso-soaked ladyfingers, mascarpone, cocoa"
            },
            {
              "name": "Chocolate Mousse",
              "note": "Dark chocolate, whipped cream"
            }
          ]
        }
      ]
    ]
  },
  {
    "id": "drinks",
    "label": "Tea, coffee & mocktails",
    "columns": [
      [
        {
          "title": "Tea",
          "items": [
            {
              "name": "Moroccan Mint Tea",
              "note": "Green tea and fresh mint, poured from a height at the table"
            }
          ]
        },
        {
          "title": "Signature mocktails",
          "items": [
            {
              "name": "Moroccan Sunset",
              "note": "Orange, pomegranate, lemon, orange blossom, honey, sparkling water"
            },
            {
              "name": "Mint Kiss",
              "note": "Moroccan mint tea, fresh cucumber, lemon, honey, sparkling water"
            },
            {
              "name": "Rose & Pomegranate Royale",
              "note": "Pomegranate, cranberry, lemon, rose water, sparkling water"
            },
            {
              "name": "Marrakesh Mojito",
              "note": "Fresh mint, lime, honey, Moroccan mint tea, sparkling water"
            },
            {
              "name": "Oriental Piña Colada",
              "note": "Pineapple, coconut cream, coconut milk, lime, orange blossom, honey"
            }
          ]
        },
        {
          "title": "Sangria",
          "items": [
            {
              "name": "Homemade Sangria",
              "note": "By the glass · red wine, fresh fruit, citrus"
            }
          ]
        }
      ],
      [
        {
          "title": "Coffee",
          "items": [
            {
              "name": "Espresso",
              "note": "A single shot"
            },
            {
              "name": "Double Espresso",
              "note": "Two shots"
            },
            {
              "name": "Cappuccino",
              "note": "Espresso, steamed milk, deep foam"
            },
            {
              "name": "Latte",
              "note": "Espresso, steamed milk, light foam"
            },
            {
              "name": "Mocha",
              "note": "Espresso, chocolate, steamed milk"
            },
            {
              "name": "Americano",
              "note": "Espresso and hot water"
            }
          ]
        },
        {
          "title": "Water",
          "items": [
            {
              "name": "Acqua Panna",
              "note": "Still · glass bottle · Tuscany, Italy"
            },
            {
              "name": "S.Pellegrino",
              "note": "Sparkling · glass bottle · Italy"
            }
          ]
        },
        {
          "title": "Soft drinks",
          "items": [
            {
              "name": "Mexican Coca-Cola"
            },
            {
              "name": "Sprite"
            },
            {
              "name": "Lemonade"
            }
          ]
        }
      ]
    ]
  },
  {
    "id": "wine",
    "label": "Wine & beer",
    "columns": [
      [
        {
          "title": "Red · by the glass",
          "items": [
            {
              "name": "La Ferme Rouge",
              "style": "Petite Ferme",
              "note": "Cabernet Sauvignon · Marselan · Zaers, Morocco"
            },
            {
              "name": "Domaine la Vauvise",
              "note": "Pinot Noir · Loire, France"
            },
            {
              "name": "Fallen Grape",
              "style": "“50/50”",
              "note": "Grenache Noir · Santa Barbara · served chilled"
            },
            {
              "name": "Domaine Millaire",
              "style": "Château Cavale",
              "note": "Cabernet · Merlot · Bordeaux, France"
            }
          ]
        },
        {
          "title": "White · Rosé · Orange · by the glass",
          "items": [
            {
              "name": "La Ferme Rouge",
              "style": "Petite Ferme Blanc",
              "note": "Sauvignon Blanc · Vermentino · Zaers, Morocco"
            },
            {
              "name": "Coquelicot Vineyards",
              "note": "Chardonnay · Santa Barbara"
            },
            {
              "name": "La Ferme Rouge",
              "style": "Le Gris",
              "note": "Rosé of Cinsault · Zaers, Morocco"
            },
            {
              "name": "Pepin",
              "style": "Skin Macerated",
              "note": "Orange wine · Alsace, France"
            }
          ]
        },
        {
          "title": "Red · by the bottle",
          "items": [
            {
              "name": "Coquelicot",
              "style": "Mon Petit Chou",
              "note": "Bordeaux blend · Santa Barbara"
            },
            {
              "name": "Emmanuel Giboulot",
              "style": "Bourgogne Rouge",
              "note": "Pinot Noir · Burgundy, France"
            },
            {
              "name": "Closerie des Moussis",
              "note": "Haut-Médoc · Bordeaux, France"
            },
            {
              "name": "Pop’s",
              "style": "Zinfandel",
              "note": "Zinfandel · Mendocino"
            },
            {
              "name": "La Ferme Rouge",
              "style": "Carignan",
              "note": "Carignan · Zaers, Morocco · kosher"
            },
            {
              "name": "La Ferme Rouge",
              "style": "Terre Rouge",
              "note": "Syrah · Tempranillo · Zaers, Morocco"
            }
          ]
        }
      ],
      [
        {
          "title": "White · by the bottle",
          "items": [
            {
              "name": "Domaine Blouzard",
              "style": "Mâcon-Péronne",
              "note": "Chardonnay · Burgundy, France"
            },
            {
              "name": "Coquelicot Vineyards",
              "note": "Sauvignon Blanc · Santa Barbara"
            },
            {
              "name": "La Ferme Rouge",
              "style": "Terre Blanche",
              "note": "Chardonnay · Sauvignon Blanc · Viognier · Zaers, Morocco"
            },
            {
              "name": "Pepin",
              "style": "Alsace Blanc",
              "note": "Riesling · Pinot Blanc · Alsace, France"
            },
            {
              "name": "La Ferme Rouge",
              "style": "Kosher White",
              "note": "Sauvignon Blanc · Zaers, Morocco · kosher"
            }
          ]
        },
        {
          "title": "Champagne · Prosecco",
          "items": [
            {
              "name": "Waris-Hubert",
              "style": "“Estence” Extra Brut 1er Cru",
              "note": "Champagne, France"
            },
            {
              "name": "Fiori d’Acacia",
              "note": "Prosecco · Italy"
            }
          ]
        },
        {
          "title": "Beer",
          "items": [
            {
              "name": "Casablanca",
              "note": "Moroccan lager"
            },
            {
              "name": "Stella Artois",
              "note": "Belgian lager"
            }
          ]
        }
      ]
    ]
  }
]
