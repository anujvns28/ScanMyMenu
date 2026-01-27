import { X, Clock, ShieldCheck } from "lucide-react";
import {useCart} from "../../../../context/CartContext"

export default function OfferDetailsBottomSheet({
  isOpen,
  onClose,
  offer,
}) {
  if (!isOpen || !offer) return null;
  const {addOfferToCart} = useCart();

  const actualPrice = offer.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const saveAmount = actualPrice - offer.offerPrice;

  const daysLeft = Math.ceil(
    (new Date(offer.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const handleAddOffer = () => {
  addOfferToCart(offer);
  onClose();
};

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* BOTTOM SHEET */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl
                   max-h-[90vh] overflow-y-auto animate-slideUp"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-bold">Offer Details</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* OFFER IMAGE */}
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">
          {/* TITLE */}
          <h4 className="text-xl font-extrabold mb-1">
            {offer.title}
          </h4>

          {offer.description && (
            <p className="text-sm text-gray-600 mb-3">
              {offer.description}
            </p>
          )}

          {/* TRUST + TIME */}
          <div className="flex items-center gap-3 mb-4 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} /> Verified Offer
            </span>

            {daysLeft > 0 && (
              <span className="flex items-center gap-1 text-red-500 font-semibold">
                <Clock size={14} />
                {daysLeft} day{daysLeft > 1 ? "s" : ""} left
              </span>
            )}
          </div>

          {/* PRICE BLOCK */}
          <div className="bg-gray-100 rounded-2xl p-4 mb-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-400 line-through">
                  ₹{actualPrice}
                </p>
                <p className="text-3xl font-extrabold text-black">
                  ₹{offer.offerPrice}
                </p>
              </div>

              {saveAmount > 0 && (
                <span className="bg-green-500 text-white text-sm font-bold
                                 px-3 py-1 rounded-full">
                  Save ₹{saveAmount}
                </span>
              )}
            </div>
          </div>

          {/* INCLUDED ITEMS */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold mb-3">
              🍽 Included Items
            </h5>

            <div className="space-y-3">
              {offer.items.map((i, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white border
                             rounded-xl p-3 shadow-sm"
                >
                  {/* ITEM IMAGE */}
                  <img
                    src={i.product.image}
                    alt={i.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  {/* ITEM INFO */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {i.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{i.product.price} × {i.quantity}
                    </p>
                  </div>

                  {/* ITEM TOTAL */}
                  <p className="text-sm font-bold">
                    ₹{i.product.price * i.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* VALUE MESSAGE */}
          <div className="bg-green-50 border border-green-200
                          text-green-700 text-xs rounded-xl p-3 mb-5">
            You’re getting this combo at a special discounted price.
            Ordering items separately will cost more.
          </div>

          {/* CTA */}
          <button
            onClick={handleAddOffer}
            className="w-full bg-black text-white py-3 rounded-2xl
                       font-semibold text-sm active:scale-[0.98]"
          >
            Buy This Combo
          </button>
        </div>
      </div>
    </div>
  );
}
