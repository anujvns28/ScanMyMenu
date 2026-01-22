import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import OfferBottomSheet from "./offer/OfferBottomSheet";
import { getAllOffers } from "../../../service/operations/offers";
import { useDispatch, useSelector } from "react-redux";

export default function Offers() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  // Bottom sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState("create"); // create | view | edit
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const openCreateSheet = () => {
    setSelectedOffer(null);
    setSheetMode("create");
    setSheetOpen(true);
  };

  const openViewSheet = (offer) => {
    setSelectedOffer(offer);
    setSheetMode("view");
    setSheetOpen(true);
  };

  const openEditSheet = (offer) => {
    setSelectedOffer(offer);
    setSheetMode("edit");
    setSheetOpen(true);
  };

  useEffect(() => {
    const fetchAllOffers = async () => {
      setLoading(true);
      const result = await getAllOffers(token, dispatch);
      setLoading(false);
      if (result) {
        setOffers(result.offers);
      }
    };

    fetchAllOffers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-3 pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-semibold">Offers & Discounts</h1>
          <p className="text-xs text-gray-500">
            Manage your offers & boost sales
          </p>
        </div>

        <button
          onClick={openCreateSheet}
          className="bg-black text-white p-2 rounded-full"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* STATUS STRIP */}
      <div className="flex gap-2 mb-4">
        <StatusPill
          label="Active"
          count={offers.filter((o) => o.isActive).length}
          color="green"
        />
        <StatusPill
          label="Inactive"
          count={offers.filter((o) => !o.isActive).length}
          color="gray"
        />
      </div>

      {/* OFFER LIST */}
      <div className="space-y-4">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <OfferSkeleton key={i} />
            ))}
          </>
        ) : offers.length === 0 ? (
          <EmptyState onCreate={openCreateSheet} />
        ) : (
          offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onView={() => openViewSheet(offer)}
              onEdit={() => openEditSheet(offer)}
            />
          ))
        )}
      </div>

      {/* BOTTOM SHEET */}
      <OfferBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        mode={sheetMode}
        offer={selectedOffer}
        setOffers={setOffers}
        setLoading={setLoading}
      />
    </div>
  );
}

function OfferCard({ offer, onView }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const getDaysLeft = (endDate) => {
    if (!endDate) return null;

    const today = new Date();
    const end = new Date(endDate);

    const diffTime = end.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);

    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const items = offer.items || [];

  const originalPrice = items.reduce(
    (total, item) => total + (item.product?.price || 0) * (item.quantity || 1),
    0,
  );

  const savedAmount = originalPrice - (offer.offerPrice || 0);
  const daysLeft = getDaysLeft(offer.endDate);

  return (
    <div
      onClick={onView}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative h-48">
        <img
          src={offer.image}
          alt={offer.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        {/* STATUS */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full
            ${
              offer.isActive
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
        >
          {offer.isActive ? "Active" : "Inactive"}
        </span>

        {/* TITLE + PRICE */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-semibold text-lg">{offer.title}</h3>

          <div className="flex items-end gap-2 mt-1">
            <span className="text-2xl font-bold">₹{offer.offerPrice}</span>

            {originalPrice > offer.offerPrice && (
              <span className="text-sm text-gray-300 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* BADGES */}
          <div className="flex gap-2 mt-1 flex-wrap">
            {/* SAVE */}
            {savedAmount > 0 && (
              <span className="text-[11px] bg-green-500/90 px-2 py-0.5 rounded-full">
                Save ₹{savedAmount}
              </span>
            )}

            {/* EXPIRY */}
            {daysLeft !== null && (
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full
                  ${
                    daysLeft <= 1
                      ? "bg-red-500/90"
                      : daysLeft <= 3
                        ? "bg-orange-500/90"
                        : "bg-black/70"
                  }`}
              >
                {daysLeft > 0
                  ? `Expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`
                  : "Expired"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500 line-clamp-2">
          {items.length > 0
            ? items
                .map(
                  (item) =>
                    `${item.product?.name || "Item"} × ${item.quantity || 1}`,
                )
                .join(", ")
            : "No products"}
        </p>

        <p className="text-[11px] text-gray-400">
          {formatDate(offer.startDate)} →{" "}
          {offer.endDate ? formatDate(offer.endDate) : "No expiry"}
        </p>
      </div>
    </div>
  );
}




/* ---------------- STATUS PILL ---------------- */

function StatusPill({ label, count, color }) {
  const map = {
    green: "bg-green-100 text-green-700",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className={`px-4 py-2 rounded-full text-xs font-medium ${map[color]}`}>
      {label} ({count})
    </div>
  );
}

/* ---------------- SKELETON ---------------- */

function OfferSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-3 w-56 bg-gray-200 rounded" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
      </div>
      <div className="border-t px-4 py-3 flex justify-between">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="flex gap-3">
          <div className="h-6 w-6 bg-gray-200 rounded" />
          <div className="h-6 w-6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- EMPTY STATE ---------------- */

function EmptyState({ onCreate }) {
  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
      <p className="text-lg font-semibold">No offers yet</p>
      <p className="text-sm text-gray-500 mt-1">
        Create your first offer to boost sales
      </p>

      <button
        onClick={onCreate}
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm"
      >
        + Create Offer
      </button>
    </div>
  );
}
