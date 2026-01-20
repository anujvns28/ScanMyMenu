import { X, ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const productsList = [
  { id: "p1", name: "Paneer Burger" },
  { id: "p2", name: "Veg Burger" },
  { id: "p3", name: "Cold Coffee" },
  { id: "p4", name: "French Fries" },
  { id: "p5", name: "Pizza" },
  { id: "p6", name: "Mojito" },
];


export default function OfferBottomSheet({
  isOpen,
  onClose,
  offer = null,
  mode = "view", // "create" | "view"
}) {
  const fileRef = useRef(null);
  const isCreate = mode === "create";

  const [editingField, setEditingField] = useState(null);
  const [isActive, setIsActive] = useState(offer?.isActive ?? true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    offerPrice: "",
    startDate: "",
    endDate: "",
    image: "",
    items: [],
  });

  const [imagePreview, setImagePreview] = useState("");
  const [productSearch, setProductSearch] = useState("");

  /* ---------- PREFILL ---------- */
  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || "",
        description: offer.description || "",
        offerPrice: offer.offerPrice || "",
        startDate: offer.startDate?.slice(0, 10) || "",
        endDate: offer.endDate?.slice(0, 10) || "",
        image: offer.image || "",
        items: offer.items || [],
      });
      setIsActive(offer.isActive);
      setImagePreview(offer.image || "");
    }
  }, [offer]);

  if (!isOpen) return null;

  /* ---------- HANDLERS ---------- */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const saveField = async (field) => {
    // PATCH API CALL HERE
    // await api.patch(`/offers/${offer._id}`, { [field]: formData[field] })
    setEditingField(null);
  };

  const toggleActive = async () => {
    // PATCH /offers/:id/toggle
    setIsActive((prev) => !prev);
  };

  const deleteOffer = async () => {
    if (!window.confirm("Delete this offer permanently?")) return;
    // DELETE /offers/:id
    onClose();
  };

  const createOffer = async () => {
    // POST /offers (send full formData)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
      <div className="bg-white w-full rounded-t-[32px] p-5 max-h-[85vh]
                      overflow-y-auto pb-24 shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isCreate ? "Create Offer" : "Offer Details"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* IMAGE */}
        <Section
          title="Offer Image"
          editable={!isCreate}
          editing={editingField === "image"}
          onEdit={() => setEditingField("image")}
          onCancel={() => setEditingField(null)}
          onSave={() => saveField("image")}
        >
          <div
            onClick={() =>
              (isCreate || editingField === "image") && fileRef.current.click()
            }
            className={`h-40 rounded-2xl border border-dashed
                        flex items-center justify-center overflow-hidden
                        ${(isCreate || editingField === "image") && "cursor-pointer"}`}
          >
            {imagePreview ? (
              <img src={imagePreview} className="h-full w-full object-cover" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                <ImagePlus size={28} />
                <p className="text-xs mt-1">Upload image</p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Section>

        {/* TITLE */}
        <Section
          title="Offer Title"
          editable={!isCreate}
          editing={editingField === "title"}
          onEdit={() => setEditingField("title")}
          onCancel={() => setEditingField(null)}
          onSave={() => saveField("title")}
        >
          {isCreate || editingField === "title" ? (
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          ) : (
            <p>{formData.title || "—"}</p>
          )}
        </Section>

        {/* DESCRIPTION */}
        <Section
          title="Description"
          editable={!isCreate}
          editing={editingField === "description"}
          onEdit={() => setEditingField("description")}
          onCancel={() => setEditingField(null)}
          onSave={() => saveField("description")}
        >
          {isCreate || editingField === "description" ? (
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          ) : (
            <p>{formData.description || "—"}</p>
          )}
        </Section>

        {/* PRODUCTS */}
<Section
  title="Applicable Products"
  editable={!isCreate}
  editing={editingField === "products"}
  onEdit={() => setEditingField("products")}
  onCancel={() => setEditingField(null)}
  onSave={() => saveField("items")}
>
  {/* CREATE MODE OR EDIT MODE */}
  {(isCreate || editingField === "products") ? (
    <>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={productSearch}
        onChange={(e) => setProductSearch(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded-lg text-sm"
      />

      {/* PRODUCT LIST */}
      <div className="flex gap-2 flex-wrap">
        {productsList
          .filter((p) =>
            p.name.toLowerCase().includes(productSearch.toLowerCase())
          )
          .map((product) => {
            const selected = formData.items.find(
              (i) => i.product === product.id
            );

            return (
              <button
                key={product.id}
                onClick={() => {
                  if (selected) {
                    setFormData({
                      ...formData,
                      items: formData.items.filter(
                        (i) => i.product !== product.id
                      ),
                    });
                  } else {
                    setFormData({
                      ...formData,
                      items: [
                        ...formData.items,
                        { product: product.id, quantity: 1 },
                      ],
                    });
                  }
                }}
                className={`px-4 py-1.5 text-xs rounded-full border transition
                  ${
                    selected
                      ? "bg-black text-white border-black shadow"
                      : "bg-white text-gray-600 hover:border-black"
                  }`}
              >
                {product.name}
              </button>
            );
          })}
      </div>
    </>
  ) : (
    /* VIEW MODE */
    <div className="flex gap-2 flex-wrap">
      {formData.items.length ? (
        formData.items.map((item) => {
          const product = productsList.find(
            (p) => p.id === item.product
          );

          return (
            <span
              key={item.product}
              className="px-3 py-1 text-xs bg-black/5 rounded-full"
            >
              {product?.name || "Product"}
            </span>
          );
        })
      ) : (
        <span className="text-sm text-gray-400">
          No products selected
        </span>
      )}
    </div>
  )}
</Section>


        {/* PRICE */}
        <Section
          title="Offer Price"
          editable={!isCreate}
          editing={editingField === "offerPrice"}
          onEdit={() => setEditingField("offerPrice")}
          onCancel={() => setEditingField(null)}
          onSave={() => saveField("offerPrice")}
        >
          {isCreate || editingField === "offerPrice" ? (
            <input
              type="number"
              value={formData.offerPrice}
              onChange={(e) =>
                setFormData({ ...formData, offerPrice: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          ) : (
            <p>₹ {formData.offerPrice}</p>
          )}
        </Section>



        {/* VALIDITY */}
        <Section
          title="Validity"
          editable={!isCreate}
          editing={editingField === "dates"}
          onEdit={() => setEditingField("dates")}
          onCancel={() => setEditingField(null)}
          onSave={() => saveField("dates")}
        >
          {isCreate || editingField === "dates" ? (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          ) : (
            <p>
              {formData.startDate || "—"} → {formData.endDate || "—"}
            </p>
          )}
        </Section>

        {/* FOOTER */}
        <div className="mt-8 space-y-3">
          {isCreate ? (
            <button
              onClick={createOffer}
              className="w-full py-3 bg-black text-white rounded-xl"
            >
              Create Offer
            </button>
          ) : (
            <>
              <button
                onClick={toggleActive}
                className={`w-full py-3 rounded-xl text-white
                  ${isActive ? "bg-orange-500" : "bg-green-600"}`}
              >
                {isActive ? "Deactivate Offer" : "Activate Offer"}
              </button>

              <button
                onClick={deleteOffer}
                className="w-full py-3 rounded-xl bg-red-500 text-white"
              >
                Delete Offer
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gray-100"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SECTION ---------------- */

function Section({
  title,
  children,
  editable,
  editing,
  onEdit,
  onCancel,
  onSave,
}) {
  return (
    <div
      className={`mb-5 rounded-2xl border p-4 transition-all
        ${editing ? "border-black shadow-lg bg-white" : "bg-gray-50"}`}
    >
      <div className="flex justify-between mb-3">
        <p className="text-sm font-medium">{title}</p>

        {editable &&
          (!editing ? (
            <button onClick={onEdit} className="text-xs text-gray-500">
              ✏️ Edit
            </button>
          ) : (
            <div className="flex gap-3 text-xs">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onSave} className="font-medium">
                Save
              </button>
            </div>
          ))}
      </div>

      {children}
    </div>
  );
}
