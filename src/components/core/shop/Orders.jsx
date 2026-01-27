import React, { useEffect, useState } from "react";
import { statusConfig } from "../../../utils/data";
import { getShopOrders, updateOrderStatus } from "../../../service/operations/payment";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../../utils/convertTime";

/* ------------------ CONSTANT ------------------ */
const THIRTY_MIN = 30 * 60 * 1000;
const filters = ["all", "new", "preparing", "ready", "completed"];
    

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const { shopDetails } = useSelector((state) => state.shop);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /* ------------------ FETCH ORDERS ------------------ */
  useEffect(() => {
    const fetchShopOrders = async () => {
      setLoading(true);

      const result = await getShopOrders(shopDetails?._id, token, dispatch);

      if (result) {
        const mappedOrders = result.orders.map((o) => ({
          _id: o._id,
          orderId: o.orderNumber,
          customerName: o.user?.name || "Customer",
          orderType: o.orderType,
          tableNo: o.tableNo,
          phone: o.phone,
          notes: o.instructions,
          items: o.items.map((i) => ({
            type: i.type,
            name: i.name,
            qty: i.qty,
            items: i.items || [],
          })),

          totalAmount: o.total,

          // ✅ FIXED STATUS MAPPING
          status:
            o.status === "PLACED"
              ? "new"
              : o.status === "PREPARING"
                ? "preparing"
                : o.status === "READY"
                  ? "ready"
                  : "completed",

          createdAt: o.createdAt,
          completedAt:
            o.status === "SERVED" ? new Date(o.updatedAt).getTime() : null,
          isNew: o.status === "PLACED",
        }));

        setOrders(mappedOrders);
      }

      setLoading(false);
    };

    if (shopDetails?._id) fetchShopOrders();
  }, [shopDetails, token, dispatch]);

  /* ------------------ AUTO HIDE LOGIC ------------------ */
  const now = Date.now();

  const visibleOrders = orders.filter((o) => {
    if (activeFilter === "completed") return o.status === "completed";
    if (o.status !== "completed") return true;
    return now - o.completedAt < THIRTY_MIN;
  });

  const filteredOrders =
    activeFilter === "all"
      ? visibleOrders
      : visibleOrders.filter((o) => o.status === activeFilter);

  const updateOrderStatusHandler = async (orderId, status) => {
    const result = await updateOrderStatus(
      { orderId, status },
      token,
      dispatch,
    );
  };

  return (
    <div className="pb-20 px-4 pt-4 bg-gray-50 min-h-screen space-y-4">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-bold">Orders</h2>
        <p className="text-sm text-gray-500">
          Manage incoming and active orders
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition
              ${
                activeFilter === f
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 border"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LOADING SKELETON */}
      {loading && (
        <>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 space-y-3 animate-pulse"
            >
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded-xl" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </>
      )}

      {/* ORDER LIST */}
      {!loading && filteredOrders.length > 0
        ? filteredOrders.map((order) => {
            const statusUI = statusConfig[order.status];
            const totalQty = order.items.reduce((sum, i) => sum + i.qty, 0);

            return (
              <div
                key={order._id}
                className={`relative bg-white rounded-2xl shadow-sm p-4 space-y-3 ${statusUI.card}`}
              >
                {order.isNew && (
                  <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">
                      Order #{order.orderId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {timeAgo(order.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusUI.badge}`}
                  >
                    {statusUI.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium">
                  <span className="px-3 py-1 rounded-full bg-gray-100">
                    {order.orderType === "DINE_IN"
                      ? `🍽️ Dine In • Table ${order.tableNo}`
                      : `🥡 Takeaway • ${order.phone}`}
                  </span>
                </div>

                <p className="text-sm font-medium">👤 {order.customerName}</p>

                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    Items ({totalQty})
                  </p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-700 mb-1.5">
                      {/* MAIN LINE */}
                      <div className="flex justify-between font-medium">
                        <span>
                          {item.type === "offer" ? "🔥 " : ""}
                          {item.name}
                        </span>
                        <span>× {item.qty}</span>
                      </div>

                      {/* OFFER BREAKDOWN */}
                      {item.type === "offer" && item.items?.length > 0 && (
                        <div className="ml-3 mt-0.5 space-y-0.5 text-gray-500">
                          {item.items.map((sub, sidx) => (
                            <p key={sidx}>
                              • {sub.name} × {sub.qty}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-xs font-semibold text-yellow-700 mb-0.5">
                      📝 Cooking Notes
                    </p>
                    <p className="text-xs text-yellow-700">{order.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  {/* LEFT: TOTAL + STATUS TEXT */}
                  <div>
                    <p className="text-[11px] text-gray-500">Total Amount</p>
                    <p className="font-bold text-base">₹{order.totalAmount}</p>

                    {/* STATUS TEXT (VERY IMPORTANT) */}
                    <p className="mt-1 text-xs font-medium">
                      {order.status === "new" && (
                        <span className="text-blue-600">
                          🔵 Waiting for acceptance
                        </span>
                      )}

                      {order.status === "preparing" && (
                        <span className="text-yellow-600">🟡 Preparing</span>
                      )}

                      {order.status === "completed" && (
                        <span className="text-green-600">🟢 Completed</span>
                      )}
                    </p>
                  </div>

                  {/* RIGHT: ACTION BUTTONS */}
                  <div className="flex gap-2">
                    {/* NEW → PREPARING */}
                    {order.status === "new" && (
                      <button
                        onClick={() =>
                          updateOrderStatusHandler(order._id, "PREPARING")
                        }
                        className="bg-blue-600 text-white text-xs px-5 py-2 rounded-full font-semibold shadow active:scale-95 transition"
                      >
                        Accept
                      </button>
                    )}

                    {/* PREPARING → READY */}
                    {order.status === "preparing" && (
                      <button
                        onClick={() =>
                          updateOrderStatusHandler(order._id, "READY")
                        }
                        className="bg-green-600 text-white text-xs px-5 py-2 rounded-full font-semibold shadow active:scale-95 transition"
                      >
                        Ready
                      </button>
                    )}

                    {/* READY → SERVED ✅ */}
                    {order.status === "ready" && (
                      <button
                        onClick={() =>
                          updateOrderStatusHandler(order._id, "SERVED")
                        }
                        className="bg-purple-600 text-white text-xs px-5 py-2 rounded-full font-semibold shadow active:scale-95 transition"
                      >
                        Served
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : !loading && (
            <div className="flex flex-col items-center justify-center mt-20 text-center">
              <div className="text-4xl mb-3">🧾</div>
              <p className="font-semibold text-sm">No orders found</p>
              <p className="text-xs text-gray-500 mt-1">
                Orders will appear here when customers place them
              </p>
            </div>
          )}
    </div>
  );
};

export default Orders;
