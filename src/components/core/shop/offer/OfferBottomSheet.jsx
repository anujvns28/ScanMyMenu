import { X, ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../../service/operations/product";
import {
  createOfferHandler,
  updateOffer,
  deleteOffer
} from "../../../../service/operations/offers";

export default function OfferBottomSheet({
  isOpen,
  onClose,
  offer = null,
  setOffers,
  mode = "view",
  setLoading
}) {
  if (!isOpen) return null;

  const isCreate = mode === "create";
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { shopDetails } = useSelector((state) => state.shop);

  const [editingField, setEditingField] = useState(null);
  const [savingField, setSavingField] = useState(null);

  const [isActive, setIsActive] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    offerPrice: "",
    startDate: "",
    endDate: "",
    image: "",
    items: [],
    isActive:true
  });

  const [imagePreview, setImagePreview] = useState("");

  /* ---------------- PREFILL ---------------- */
  useEffect(() => {
    if (!offer) return;

    setFormData({
      title: offer.title || "",
      description: offer.description || "",
      offerPrice: offer.offerPrice || "",
      startDate: offer.startDate?.slice(0, 10) || "",
      endDate: offer.endDate?.slice(0, 10) || "",
      image: offer.image || "",
      items: (offer.items || []).map((item) => ({
        product: item.product?._id || item.product, // ✅ normalize
        quantity: item.quantity,
      })),
    });

    setIsActive(offer.isActive);
    setImagePreview(offer.image || "");
  }, [offer]);

  const validateCreate = () => {
  const newErrors = {};

  if (!formData.title.trim())
    newErrors.title = "Title is required";

  if(!formData.description.trim()){
    newErrors.description = "Description is required"
  }

  if (!formData.offerPrice)
    newErrors.offerPrice = "Offer price is required";

  if (!formData.startDate)
    newErrors.startDate = "Start date is required";

  if (!formData.endDate)
    newErrors.endDate = "End date is required";

  if (!formData.image)
    newErrors.image = "Offer image is required";

  if (formData.items.length === 0)
    newErrors.items = "Select at least one product";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts(token);
      if (res) setProductsList(res.products);
    };

    fetchProducts();
  }, [editingField, token]);

  /* ---------------- IMAGE ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((p) => ({ ...p, image: file }));
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) =>({...prev,image:""}))
  };

  /* ---------------- SAVE FIELD ---------------- */
  const saveField = async (field) => {
    setSavingField(field);

    const payload = {
      shopId: shopDetails._id,
      isActive:isActive,
    };

    if (field === "items") payload.items = JSON.stringify(formData.items);
    else if (field === "isActive") {
    payload.isActive = isActive;
  } 
    else payload[field] = formData[field];

    const res = isCreate
      ? await createOfferHandler(payload, token, dispatch)
      : await updateOffer({ offerId: offer._id, ...payload }, token, dispatch);

    if (res?.offer) {
      setOffers((prev) =>
        isCreate
          ? [res.offer, ...prev]
          : prev.map((o) => (o._id === res.offer._id ? res.offer : o)),
      );
      setEditingField(null);
    }

    setSavingField(null);
  };

  const handleCreateOffer = async () => {
    if (!validateCreate()) return;

    const payload = {
      shopId: shopDetails._id,
      title: formData.title,
      description: formData.description,
      offerPrice: formData.offerPrice,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive, 
      items: JSON.stringify(formData.items),
      image: formData.image,
    };
    
    onClose();
    setLoading(true)
    const res = await createOfferHandler(payload, token, dispatch);
    setLoading(false)
    if (res?.offer) {
      setOffers((prev) => [res.offer, ...prev]);
      
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete this offer permanently?")) return;
    const ok = await deleteOffer(offer._id, token,);
    if (ok) {
      setOffers((prev) => prev.filter((o) => o._id !== offer._id));
      onClose();
    }
  };

  useEffect(() => {
  if (formData.items.length > 0 && errors.items) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.items;
      return newErrors;
    });
  }
}, [formData.items]);



  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
      <div className="bg-white w-full rounded-t-[32px] p-5 max-h-[85vh] overflow-y-auto pb-28">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {isCreate ? "Create Offer" : "Offer Details"}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

      <Section
  title="Offer Image"
  onEdit={() => setEditingField("image")}
  hideEdit={isCreate}
>
  <div className="relative h-40 border rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
    {imagePreview ? (
      <img
        src={imagePreview}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex flex-col items-center text-gray-400 text-xs">
        <ImagePlus size={24} />
        <span>No Image</span>
      </div>
    )}

    {/* CREATE MODE BUTTON */}
    {isCreate && (
      <button
        type="button"
        onClick={() => fileRef.current.click()}
        className="absolute bottom-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-full"
      >
        Select Image
      </button>
    )}

    {/* EDIT MODE BUTTON */}
    {!isCreate && editingField === "image" && (
      <button
        type="button"
        onClick={() => fileRef.current.click()}
        className="absolute bottom-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-full"
      >
        Change Image
      </button>
    )}
  </div>

  <input
    ref={fileRef}
    type="file"
    hidden
    accept="image/*"
    onChange={handleImageChange}
  />

  {/* EDIT MODE ACTIONS */}
  {!isCreate && editingField === "image" && (
    <Actions
      loading={savingField === "image"}
      onSave={() => saveField("image")}
      onCancel={() => {
        setEditingField(null);
        setFormData((prev) => ({ ...prev, image: offer.image }));
        setImagePreview(offer.image);
      }}
    />
  )}

  {/* CREATE MODE ERROR */}
  {isCreate && errors?.image && (
    <p className="text-xs text-red-500 mt-2">
      {errors.image}
    </p>
  )}
</Section>



        {/* TITLE */}
        <Editable
          title="Title"
          value={formData.title}
          editing={editingField === "title"}
          onEdit={() => setEditingField("title")}
          onChange={(v) => {
            setFormData({ ...formData, title: v })
            setErrors((prev) => ({...prev,title:""}))
          }}
          onSave={() => saveField("title")}
          loading={savingField === "title"}
          onCancel={() => {
            setFormData((prev) => ({ ...prev, title: offer.title }));
            setEditingField(null);
          }}
          error={errors.title}
          isCreate={isCreate}
        />

        {/* DESCRIPTION */}
        <Editable
          title="Description"
          textarea
          value={formData.description}
          editing={editingField === "description"}
          onEdit={() => setEditingField("description")}
          onChange={(v) => {
            setFormData({ ...formData, description: v })
            setErrors((prev) => ({...prev,description:""}))
          }}
          onSave={() => saveField("description")}
          loading={savingField === "description"}
          onCancel={() => {
            setFormData((prev) => ({
              ...prev,
              description: offer.description,
            }));
            setEditingField(null);
          }}
          error={errors.description}
          isCreate={isCreate}
        />

       <Section
  title="Products"
  onEdit={() => setEditingField("products")}
  hideEdit={isCreate}
>
  {/* ================= VIEW MODE (EDIT MODE ONLY) ================= */}
  {!isCreate && editingField !== "products" && (
    <div className="flex gap-2 flex-wrap">
      {formData.items.length === 0 && (
        <p className="text-sm text-gray-500">No products selected</p>
      )}

      {formData.items.map((item, i) => {
        const product = productsList.find(
          (p) => p._id === item.product
        );

        return (
          <span
            key={i}
            className="px-3 py-1 text-xs rounded-full bg-gray-100"
          >
            {product?.name || "Product"} × {item.quantity}
          </span>
        );
      })}
    </div>
  )}

  {/* ================= CREATE MODE OR EDIT MODE ================= */}
  {(isCreate || editingField === "products") && (
    <>
      {/* ---------- SELECTED PRODUCTS ---------- */}
      <div className="flex gap-2 flex-wrap mb-3">
        {formData.items.map((item, i) => {
          const product = productsList.find(
            (p) => p._id === item.product
          );

          return (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs"
            >
              <span>{product?.name || "Product"}</span>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    items: formData.items.map((it) =>
                      it.product === item.product
                        ? {
                            ...it,
                            quantity: Math.max(1, it.quantity - 1),
                          }
                        : it
                    ),
                  })
                }
                className="px-2 bg-white/20 rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    items: formData.items.map((it) =>
                      it.product === item.product
                        ? { ...it, quantity: it.quantity + 1 }
                        : it
                    ),
                  })
                }
                className="px-2 bg-white/20 rounded"
              >
                +
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    items: formData.items.filter(
                      (it) => it.product !== item.product
                    ),
                  })
                }
                className="ml-1 px-2 bg-red-500 rounded"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* ---------- SEARCH PRODUCT ---------- */}
      <input
        value={productSearch}
        onChange={(e) => setProductSearch(e.target.value)}
        placeholder="Search product..."
        className="w-full mb-3 px-3 py-2 border rounded-lg text-sm"
      />

      {/* ---------- ADD PRODUCTS ---------- */}
      <div className="flex gap-2 flex-wrap">
        {productsList
          .filter(
            (p) =>
              p.name.toLowerCase().includes(productSearch.toLowerCase()) &&
              !formData.items.some(
                (item) => item.product === p._id
              )
          )
          .map((p) => (
            <button
              type="button"
              key={p._id}
              onClick={() =>
                setFormData({
                  ...formData,
                  items: [
                    ...formData.items,
                    { product: p._id, quantity: 1 },
                  ],
                })
              }
              className="px-3 py-1.5 text-xs rounded-full border"
            >
              {p.name}
            </button>
          ))}
      </div>

      {/* ---------- EDIT MODE ACTIONS ONLY ---------- */}
      {!isCreate && editingField === "products" && (
        <Actions
          loading={savingField === "items"}
          onSave={() => saveField("items")}
          onCancel={() => {
            setEditingField(null);
            setFormData((prev) => ({
              ...prev,
              items: (offer.items || []).map((item) => ({
                product: item.product?._id || item.product,
                quantity: item.quantity,
              })),
            }));
          }}
        />
      )}

      {/* ---------- CREATE MODE ERROR ---------- */}
      {isCreate && errors?.items && (
        <p className="text-xs text-red-500 mt-2">
          {errors.items}
        </p>
      )}
    </>
  )}
        </Section>


        {/* PRICE */}
        <Editable
          title="Offer Price"
          type="number"
          value={formData.offerPrice}
          editing={editingField === "offerPrice"}
          onEdit={() => setEditingField("offerPrice")}
          onChange={(v) => {
            setFormData({ ...formData, offerPrice: v })
            setErrors((prev) => ({...prev,offerPrice:""}))
          }}
          onSave={() => saveField("offerPrice")}
          loading={savingField === "offerPrice"}
          onCancel={() => {
            setFormData((prev) => ({ ...prev, offerPrice: offer.offerPrice }));
            setEditingField(null);
          }}
          error={errors.offerPrice}
          isCreate={isCreate}
        />

        <Editable
          title="Start Date"
          type="date"
          value={formData.startDate}
          editing={editingField === "startDate"}
          onEdit={() => setEditingField("startDate")}
          onChange={(v) => {
            setFormData({ ...formData, startDate: v })
            setErrors(() => ({...errors,startDate:""}))
          }}
          onSave={() => saveField("startDate")}
          loading={savingField === "startDate"}
          onCancel={() => {
            setFormData((prev) => ({
              ...prev,
              startDate: offer.startDate.slice(0, 10),
            }));
            setEditingField(null);
          }}
          error={errors.startDate}
          isCreate={isCreate}
        />

        <Editable
          title="End Date"
          type="date"
          value={formData.endDate}
          editing={editingField === "endDate"}
          onEdit={() => setEditingField("endDate")}
          onChange={(v) => {
            setFormData({ ...formData, endDate: v })
            setErrors(()=>({...errors,endDate:""}))
          }}
          onSave={() => saveField("endDate")}
          loading={savingField === "endDate"}
          onCancel={() => {
            setFormData((prev) => ({
              ...prev,
              endDate: offer.endDate.slice(0, 10),
            }));
            setEditingField(null);
          }}
          error={errors.endDate}
          isCreate={isCreate}
        />

        {/* STATUS */}
        <Section
  title="Offer Status"
  onEdit={() => setEditingField("status")}
  hideEdit={isCreate}
>
  {/* ================= VIEW MODE (EDIT MODE ONLY) ================= */}
  {!isCreate && editingField !== "status" && (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">
        {isActive ? "Offer is Active" : "Offer is Inactive"}
      </p>

      <span
        className={`px-3 py-1 text-xs rounded-full font-semibold
          ${isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  )}

  {/* ================= CREATE MODE ================= */}
  {isCreate && (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-600">
        Make this offer active?
      </p>

      <button
        type="button"
        onClick={() => setIsActive(!isActive)}
        className={`px-4 py-1.5 rounded-full text-xs font-semibold
          ${isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
      >
        {isActive ? "Active" : "Inactive"}
      </button>
    </div>
  )}

  {/* ================= EDIT MODE ================= */}
  {!isCreate && editingField === "status" && (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Toggle offer status
        </p>

        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold
            ${isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {isActive ? "Active" : "Inactive"}
        </button>
      </div>

      <Actions
        loading={savingField === "status"}
        onSave={() => saveField("isActive")}
        onCancel={() => {
          setIsActive(offer.isActive); // 🔙 revert
          setEditingField(null);
        }}
      />
    </>
  )}
</Section>


        {/* DELETE */}
        {!isCreate && (
          <button
            onClick={handleDelete}
            className="w-full mt-6 py-3 border border-red-500 text-red-600 rounded-xl flex justify-center gap-2"
          >
            <Trash2 size={16} />
            Delete Offer
          </button>
        )}

        {isCreate && (
          <button
            onClick={handleCreateOffer}
            className="w-full mt-6  right-4 bg-black text-white py-3 rounded-xl font-semibold"
          >
            Create Offer
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function Section({ title, onEdit, children, hideEdit }) {
  return (
    <div className="mb-5 border rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">{title}</p>
        {!hideEdit && onEdit && (
          <button onClick={onEdit} className="text-xs text-blue-600 flex gap-1">
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Actions({ onSave, onCancel, loading }) {
  return (
    <div className="flex gap-3 mt-3">
      <button
        onClick={onSave}
        disabled={loading}
        className="px-4 py-1.5 bg-black text-white rounded-lg text-sm"
      >
        {loading ? "Saving..." : "Save"}
      </button>
      <button
        onClick={onCancel}
        disabled={loading}
        className="px-4 py-1.5 border rounded-lg text-sm"
      >
        Cancel
      </button>
    </div>
  );
}

function Editable({
  title,
  value,
  editing,
  onEdit,
  onChange,
  onSave,
  loading,
  textarea,
  type = "text",
  onCancel,
  error,
  isCreate,
}) {
  const showInput = isCreate || editing;

  return (
    <Section title={title} onEdit={onEdit} hideEdit={isCreate}>
      {showInput ? (
        <>
          {textarea ? (
            <textarea
              rows={3}
              value={value}
              placeholder={title}
              onChange={(e) => onChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          ) : (
            <input
              type={type}
              value={value}
              placeholder={title}
              onChange={(e) => onChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          )}

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

          {!isCreate && (
            <Actions loading={loading} onSave={onSave} onCancel={onCancel} />
          )}
        </>
      ) : (
        <p className="text-gray-700">{value || "-"}</p>
      )}
    </Section>
  );
}
