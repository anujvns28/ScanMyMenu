import { useState } from "react";
import { Plus, Clock, CheckCircle } from "lucide-react";

/* ================= DUMMY DATA ================= */

const DUMMY_TICKETS = [
  {
    id: 1,
    title: "Category not available",
    description: "I am unable to find Beverage category",
    status: "open",
    createdAt: "2 days ago",
  },
  {
    id: 2,
    title: "Tag missing",
    description: "Need 'Spicy' tag for food items",
    status: "resolved",
    createdAt: "5 days ago",
  },
];

const categories = [
  "Category Issue",
  "Tag Issue",
  "Menu / Product",
  "Payment",
  "Technical",
  "Other",
];

/* ================= COMPONENT ================= */

export default function SupportTickets() {
  const [tickets, setTickets] = useState(DUMMY_TICKETS);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const newTicket = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      status: "open",
      createdAt: "Just now",
    };

    setTickets([newTicket, ...tickets]);
    setShowForm(false);
    setForm({ title: "", category: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-5">
      {/* ================= HEADER ================= */}
      <div className="max-w-md mx-auto mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Support & Help
          </h1>
          <p className="text-sm text-gray-500">Raise a ticket for any issue</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white p-2.5 rounded-xl shadow"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* ================= TICKETS ================= */}
      <div className="max-w-md mx-auto space-y-4">
        {tickets.map((ticket) => {
          const isOpen = ticket.status === "open";

          return (
            <div
              key={ticket.id}
              className={`rounded-2xl p-4 border shadow-sm ${
                isOpen
                  ? "bg-orange-50 border-orange-200"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {ticket.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {ticket.description}
                  </p>
                </div>

                {isOpen ? (
                  <Clock className="text-orange-500" size={20} />
                ) : (
                  <CheckCircle className="text-green-600" size={20} />
                )}
              </div>

              <div className="flex justify-between items-center mt-4 text-xs">
                <span className="text-gray-500">{ticket.createdAt}</span>

                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    isOpen
                      ? "bg-orange-200 text-orange-700"
                      : "bg-green-200 text-green-700"
                  }`}
                >
                  {isOpen ? "Pending" : "Resolved"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= BOTTOM SHEET ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end ">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />

          {/* Sheet */}
          <div className="relative bg-white w-full rounded-t-3xl animate-slideUp">
            {/* Drag */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Raise a Ticket
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <form
              onSubmit={submitHandler}
              className="px-5 pt-4 pb-28 space-y-4"
            >
              <input
                type="text"
                placeholder="Issue title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <textarea
                rows={4}
                placeholder="Describe your issue"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />

              <button
                onClick={submitHandler}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-medium shadow-lg"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
