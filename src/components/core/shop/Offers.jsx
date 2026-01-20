import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import OfferBottomSheet from "../../common/OfferBottomSheet";

/* ---------------- DUMMY DATA ---------------- */

const dummyOffers = [
  {
    id: 1,
    title: "Burger Blast",
    discountText: "20% OFF",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    products: ["Paneer Burger", "Veg Burger"],
    startDate: "2026-01-18",
    endDate: "2026-01-25",
    isActive: true,
    description: "Flat 20% off on all burgers",
    discountType: "PERCENT",
    discountValue: 20,
  },
  {
    id: 2,
    title: "Coffee @ ₹99",
    discountText: "@ ₹99",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    products: ["Cold Coffee"],
    startDate: "2026-01-10",
    endDate: "2026-01-15",
    isActive: false,
    description: "Special price for coffee lovers",
    discountType: "FLAT",
    discountValue: 99,
  },
];

/* ---------------- MAIN PAGE ---------------- */

export default function MobileOffers() {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);

  // Bottom sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState("create"); // create | view | edit
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setOffers(dummyOffers);
      setLoading(false);
    }, 1200);
  }, []);

  /* ---------- OPEN SHEET HANDLERS ---------- */

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
      />
    </div>
  );
}

/* ---------------- OFFER CARD ---------------- */

function OfferCard({ offer, onView, onEdit }) {
  return (
    <div
      onClick={onView}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={offer.image}
          alt={offer.title}
          className="h-40 w-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
          {offer.discountText}
        </span>

        <span
          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full
          ${
            offer.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {offer.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-semibold text-base">{offer.title}</h3>

        <p className="text-xs text-gray-500 mt-1">
          Applies to: {offer.products.join(", ")}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {offer.startDate} → {offer.endDate}
        </p>
      </div>

      {/* ACTION BAR */}
      <div
        className="border-t px-4 py-3 flex justify-between items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <ToggleButton active={offer.isActive} />

        <div className="flex gap-4">
          <button onClick={onEdit} className="text-gray-600">
            <Pencil size={16} />
          </button>
          <button className="text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- TOGGLE BUTTON ---------------- */

function ToggleButton({ active }) {
  return (
    <button
      className={`px-4 py-1 rounded-full text-xs font-semibold
      ${active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
    >
      {active ? "ON" : "OFF"}
    </button>
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
