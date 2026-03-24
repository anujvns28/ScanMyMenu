import { Suspense } from "react";
import { useState } from "react";
import { lazy } from "react";
const ExpandableOrderTracker = lazy(() => import("./FloatingOrderTracker"));
const OrderRatingFlow = lazy(() => import("./OrderRatingFlow"));

export default function OrderOverlay() {
  // Dummy order
  const [order] = useState({
    orderNumber: "SM-2391",
    status: "SERVED",
    total: 544,
    items: [
      { name: "Butter Chicken", qty: 2, price: 199 },
      { name: "Garlic Naan", qty: 4, price: 40 },
    ],
  });

  const [showRating, setShowRating] = useState(false);

  return (
    <>
      <Suspense fallback={null}>
        {!showRating && (
        <ExpandableOrderTracker
          order={order}
          onRateClick={() => setShowRating(true)}
        />
      )}
      </Suspense>

      <Suspense fallback={null}>
        {showRating && <OrderRatingFlow onClose={() => setShowRating(false)} />}
      </Suspense>
    </>
  );
}
