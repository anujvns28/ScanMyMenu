import { useState } from "react";
import ExpandableOrderTracker from "./FloatingOrderTracker";
import OrderRatingFlow from "./OrderRatingFlow";



export default function OrderOverlay() {
  // 🔥 Dummy order
  const [order] = useState({
    orderNumber: "SM-2391",
    status: "SERVED", // try: PREPARING / READY / SERVED
    total: 544,
    items: [
      { name: "Butter Chicken", qty: 2, price: 199 },
      { name: "Garlic Naan", qty: 4, price: 40 },
    ],
  });

  const [showRating, setShowRating] = useState(false);

  return (
    <>
      {!showRating && (
        <ExpandableOrderTracker
          order={order}
          onRateClick={() => setShowRating(true)}
        />
      )}

      {showRating && (
        <OrderRatingFlow onClose={() => setShowRating(false)} />
      )}
    </>
  );
}
