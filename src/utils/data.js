export const smartTabs = [
  {
    _id: "for-you",
    name: "For You",
    subtitle: "Recommended",
    icon: "✨",
    bg: "from-purple-500 to-pink-500",
  },
  {
    _id: "top-rated",
    name: "Top Rated",
    subtitle: "Customer favorites",
    icon: "⭐",
    bg: "from-yellow-400 to-orange-500",
  },
];

export const smartFilters = [
  { id: "veg", label: "🟢 Veg", type: "tag", value: "Veg" },
  { id: "spicy", label: "🔥 Spicy", type: "tag", value: "Spicy" },
  {
    id: "bestseller",
    label: "⭐ Bestseller",
    type: "field",
    field: "isBestseller",
  },
  {
    id: "quick",
    label: "⏱ Under 15 min",
    type: "field",
    field: "preparationTime",
    max: 15,
  },
  {
    id: "cheap",
    label: "₹ Under 200",
    type: "field",
    field: "price",
    max: 200,
  },
];
