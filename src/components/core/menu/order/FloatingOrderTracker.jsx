import { useEffect, useState } from "react";
import { ChevronUp, X, Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../../../redux/slices/order";

export default function ExpandableOrderTracker({ onRateClick }) {
  const [expanded, setExpanded] = useState(false);
  const [order, setOrder] = useState({});
  const { activeOrder } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  // 🔥 Dummy Order Data
  // const order = {
  //   orderNumber: "SM-2391",
  //   status: "SERVED",
  //   total: 544,
  //   items: [
  //     {
  //       name: "Butter Chicken",
  //       qty: 2,
  //       price: 199,
  //     },
  //     {
  //       name: "Garlic Naan",
  //       qty: 4,
  //       price: 40,
  //     },
  //   ],
  // };

  useEffect(() => {
    setOrder(activeOrder);
  }, [activeOrder]);

  /* 🟢 MINI FLOATING BAR */
  if (!expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        className="fixed bottom-3 left-3 right-3 bg-black text-white rounded-2xl px-4 py-3 shadow-xl z-50 flex justify-between items-center cursor-pointer"
      >
        <div>
          <p className="text-sm font-semibold">Order #{order.orderNumber}</p>
          <p className="text-xs text-gray-300">
            {order.status === "PLACED" && "Order placed"}
            {order.status === "PREPARING" && "Preparing your food 👨‍🍳"}
            {order.status === "READY" && "Food is ready 🍽️"}
            {order.status === "SERVED" &&
              "Enjoy your meal 😋 • Rate your order"}
          </p>
        </div>

        <ChevronUp />
      </div>
    );
  }

  /* 🟢 EXPANDED PREMIUM BOTTOM SHEET */
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] animate-slideUp">
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-3 border-b">
          <p className="font-bold text-lg">Order #{order.orderNumber}</p>
          <button onClick={() => setExpanded(false)}>
            <X />
          </button>
        </div>

        {/* Status Tracker */}
        <div className="px-4 py-5">
          {/* Big Status Card */}
          <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-4 shadow-xl mb-4">
            <p className="text-xs text-gray-300">Current Status</p>
            <div className="text-lg font-bold mt-1">
              {order.status === "PLACED" && "Order Placed"}
              {order.status === "PREPARING" && "Chef is cooking your food 👨‍🍳"}
              {order.status === "READY" && "Food is ready to serve 🍽️"}
              {order.status === "SERVED" && (
                <div className="space-y-1">
                  <p className="text-lg font-bold">Enjoy your meal 😋</p>
                  <p className="text-sm text-gray-300 leading-tight">
                    Tell us how it was — your feedback helps the chef ❤️
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-black to-gray-700 transition-all duration-700"
              style={{
                width:
                  order.status === "PLACED"
                    ? "25%"
                    : order.status === "PREPARING"
                    ? "50%"
                    : order.status === "READY"
                    ? "75%"
                    : "100%",
              }}
            />

            {/* Glow */}
            <div
              className="absolute top-0 left-0 h-full bg-white/30 blur-md"
              style={{
                width:
                  order.status === "PLACED"
                    ? "25%"
                    : order.status === "PREPARING"
                    ? "50%"
                    : order.status === "READY"
                    ? "75%"
                    : "100%",
              }}
            />
          </div>

          {/* Step labels */}
          <div className="flex justify-between mt-5">
            {[
              { key: "PLACED", label: "Placed", icon: "🧾" },
              { key: "PREPARING", label: "Preparing", icon: "👨‍🍳" },
              { key: "READY", label: "Ready", icon: "🔔" },
              { key: "SERVED", label: "Served", icon: "🍽️" },
            ].map((step, index) => {
              const steps = ["PLACED", "PREPARING", "READY", "SERVED"];
              const currentIndex = steps.indexOf(order.status);
              const stepIndex = index;

              const completed = stepIndex < currentIndex;
              const active = stepIndex === currentIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center flex-1"
                >
                  {/* Icon circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all
            ${
              completed
                ? "bg-green-500 text-white"
                : active
                ? "bg-black text-white animate-pulse"
                : "bg-gray-200 text-gray-400"
            }`}
                  >
                    {completed ? "✓" : step.icon}
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-2 text-[11px] font-semibold
            ${completed || active ? "text-black" : "text-gray-400"}`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Items */}
        <div className="px-4 py-4 space-y-3 border-t">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold pt-2">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Download Bill */}
        <div className="p-4 border-t">
          {order.status === "SERVED" && (
            <button
              onClick={onRateClick}
              className="w-full mb-2 mt-4 bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-2xl text-sm font-semibold shadow-lg animate-pulse"
            >
              ⭐ Rate & Review Your Order
            </button>
          )}
          <button
            onClick={() => dispatch(updateOrderStatus("SERVED"))}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl"
          >
            <Download size={16} />
            Download Bill
          </button>
        </div>
      </div>
    </div>
  );
}
