import { X, Utensils, Phone, Edit3 } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../../../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import {
  createRazorpayOrder,
  openRazorpayCheckout,
  verifyRazorpayPayment,
} from "../../../../service/operations/payment";


export default function OrderDetailsBottomSheet({
  onClose,
  onEditCart,
}) {
  const { cart, totalPrice, totalItems, setCart } = useCart();

  const gst = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + gst;

  const [orderType, setOrderType] = useState("DINE_IN");
  const [tableNo, setTableNo] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const { shopDetails } = useSelector((state) => state.shop);

  const isValid =
    (orderType === "DINE_IN" && tableNo.trim()) ||
    (orderType === "TAKEAWAY" && phone.length >= 10);

  const handlePay = async () => {
    if (!isValid) return;

    const formattedCart = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      qty: item.qty,
      image: item.image,
    }));

    const orderPayload = {
      amount: grandTotal * 100,
      cartItems: formattedCart,
      shopId: shopDetails._id,
      orderType,
      tableNo,
      phone,
      instructions,
    };

    const orderData = await createRazorpayOrder(orderPayload, token, dispatch);

    if (!orderData?.razorpayOrderId) {
      alert("Unable to start payment");
      return;
    }

    openRazorpayCheckout(
      {
        id: orderData.razorpayOrderId,
        amount: orderData.amount * 100,
      },
      user,
      async (payment) => {
        const verifyData = await verifyRazorpayPayment(
          {
            razorpay_order_id: payment.razorpay_order_id,
            razorpay_payment_id: payment.razorpay_payment_id,
            razorpay_signature: payment.razorpay_signature,

            cartItems: formattedCart,
            shopId: shopDetails._id,
            orderType,
            tableNo,
            phone,
            instructions,
            amount: orderData.amount,
          },
          token,
          dispatch
        );

        if (verifyData?.success) {
          setCart([]);
          onClose();
        } else {
          alert("Payment failed ❌");
        }
      }
    );
  };


  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[92vh] flex flex-col animate-slideUp">

        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-3 border-b">
          <h2 className="text-lg font-bold">Order Details</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

          {/* Order Type */}
          <div>
            <p className="text-sm font-semibold mb-2">Order Type</p>

            {/* Dine In */}
            <div
              onClick={() => setOrderType("DINE_IN")}
              className={`border rounded-2xl p-4 flex gap-3 cursor-pointer mb-3 ${
                orderType === "DINE_IN"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <Utensils />
              <div className="flex-1">
                <p className="font-semibold">Dine In</p>
                <p className="text-xs text-gray-500">
                  We’ll serve this order at your table
                </p>


                {orderType === "DINE_IN" && (
                  <input
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    placeholder="Enter table number"
                    className="mt-2 w-full border rounded-xl px-3 py-2 text-sm"
                  />
                )}
              </div>
            </div>

            {/* Takeaway */}
            <div
              onClick={() => setOrderType("TAKEAWAY")}
              className={`border rounded-2xl p-4 flex gap-3 cursor-pointer ${
                orderType === "TAKEAWAY"
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <Phone />
              <div className="flex-1">
                <p className="font-semibold">Takeaway</p>
                <p className="text-xs text-gray-500">
                  We will notify you when order is ready
                </p>

                {orderType === "TAKEAWAY" && (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter mobile number"
                    className="mt-2 w-full border rounded-xl px-3 py-2 text-sm"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold">Your Order</p>
              <button
                onClick={onEditCart}
                className="text-sm text-blue-600 flex items-center gap-1"
              >
                <Edit3 size={14} />
                Edit
              </button>
            </div>

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm mb-2"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          {/* Cooking Instructions */}
          <div>
            <p className="text-sm font-semibold mb-2">
              Cooking Instructions
            </p>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Less spicy, no onion, extra gravy..."
              className="w-full border rounded-xl p-3 text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Bill */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>GST & Charges</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t bg-white">
          <button
            onClick={handlePay}
            disabled={!isValid}
            className={`w-full py-4 rounded-xl text-sm font-semibold text-white ${
              isValid ? "bg-black" : "bg-gray-300"
            }`}
          >
            Place Order & Pay ₹{grandTotal}
          </button>

          <p className="text-[11px] text-gray-500 text-center mt-2">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
}
