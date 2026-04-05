import greekSalad from "../assets/greek salad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemonDessert from "../assets/lemon dessert.jpg";
import restaurantFood from "../assets/restauranfood.jpg";

export const MENU_ITEMS = [
  {
    id: 1,
    name: "Greek Salad",
    category: "Starters",
    price: 12.99,
    description:
      "Crispy lettuce, peppers, olives and Chicago style feta cheese with garlic and rosemary croutons.",
    image: greekSalad,
    isSpecial: true,
  },
  {
    id: 2,
    name: "Bruschetta",
    category: "Starters",
    price: 5.99,
    description:
      "Grilled bread smeared with garlic and seasoned with salt, olive oil, and fresh tomatoes.",
    image: bruchetta,
    isSpecial: true,
  },
  {
    id: 3,
    name: "Hummus Platter",
    category: "Starters",
    price: 8.5,
    description:
      "Creamy homemade hummus served with warm pita bread, sliced cucumber, and Kalamata olives.",
    image: restaurantFood,
    isSpecial: false,
  },
  {
    id: 4,
    name: "Grilled Fish",
    category: "Mains",
    price: 20.0,
    description:
      "Fresh Mediterranean sea bass, grilled to perfection with lemon butter and seasonal vegetables.",
    image: restaurantFood,
    isSpecial: false,
  },
  {
    id: 5,
    name: "Lamb Kebab",
    category: "Mains",
    price: 18.5,
    description:
      "Tender marinated lamb skewers grilled over charcoal, served with rice and tzatziki sauce.",
    image: restaurantFood,
    isSpecial: false,
  },
  {
    id: 6,
    name: "Moussaka",
    category: "Mains",
    price: 16.0,
    description:
      "Classic baked dish with layers of eggplant, spiced minced meat, and creamy béchamel sauce.",
    image: restaurantFood,
    isSpecial: false,
  },
  {
    id: 7,
    name: "Lemon Dessert",
    category: "Desserts",
    price: 5.0,
    description:
      "Grandma's authentic lemon cake recipe, made with locally sourced ingredients.",
    image: lemonDessert,
    isSpecial: true,
  },
  {
    id: 8,
    name: "Baklava",
    category: "Desserts",
    price: 6.5,
    description:
      "Layers of crispy filo pastry filled with chopped walnuts and sweetened with honey syrup.",
    image: lemonDessert,
    isSpecial: false,
  },
];

export const CATEGORIES = ["All", "Starters", "Mains", "Desserts"];
