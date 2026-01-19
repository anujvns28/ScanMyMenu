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
  { id: "nonveg", label: "🔴 Non-Veg", type: "tag", value: "Non-Veg" },
  { id: "spicy", label: "🔥 Spicy", type: "tag", value: "Spicy" },
  {
    id: "bestseller",
    label: "⭐ Bestseller",
    type: "field",
    field: "orderCount",
    min: 50,
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
    field: "finalPrice",
    max: 200,
  },
];

export const colorClasses = {
  red: "bg-red-100 text-red-700 border border-red-300",
  green: "bg-green-100 text-green-700 border border-green-300",
  yellow: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  blue: "bg-blue-100 text-blue-700 border border-blue-300",
  purple: "bg-purple-100 text-purple-700 border border-purple-300",
  orange: "bg-orange-100 text-orange-700 border border-orange-300",
  pink: "bg-pink-100 text-pink-700 border border-pink-300",
  teal: "bg-teal-100 text-teal-700 border border-teal-300",
  lime: "bg-lime-100 text-lime-700 border border-lime-300",
};

export const statusConfig = {
  new: {
    label: "New",
    badge: "bg-blue-100 text-blue-700",
    card: "border-l-4 border-blue-500",
  },
  preparing: {
    label: "Preparing",
    badge: "bg-yellow-100 text-yellow-700",
    card: "border-l-4 border-yellow-500",
  },
  ready: {
    label: "Ready",
    badge: "bg-purple-100 text-purple-700",
    card: "border-l-4 border-purple-500",
  },
  completed: {
    label: "Completed",
    badge: "bg-green-100 text-green-700",
    card: "border-l-4 border-green-500 opacity-80",
  },
};


