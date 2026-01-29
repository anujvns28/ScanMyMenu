import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActiveTag } from "../../../../service/operations/tag";
import LoaderComponent from "../../../common/LoaderComponent";
import { pickTags, removeShopCategory, removeTags, toggleShopCategory } from "../../../../service/operations/category";
import ConfirmationModal from "../../../common/ConfirmationModal";

const ViewCategory = ({ openCategory, setOpenCategory,setShopCategories }) => {
  const { shopDetails } = useSelector((state) => state.shop);
  const { token, userLoading } = useSelector((state) => state.auth);
  const [showAddTagSheet, setShowAddTagSheet] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectTags, setSelectTags] = useState([]);
  const [cnfModal,setCnfModal] = useState(null);

  const dispatch = useDispatch();
  const colorClasses = {
    red: "bg-red-200 text-red-700",
    green: "bg-green-200 text-green-700",
    yellow: "bg-yellow-200 text-yellow-700",
    blue: "bg-blue-200 text-blue-700",
    purple: "bg-purple-200 text-purple-700",
  };


  const fetchAllTagHendler = async () => {
    const result = await fetchAllActiveTag(token, dispatch);
    if (result) {
      // tiltring category tags in all active tags
      const categoryTags = result?.tags.filter((tag) => tag.type == "category");
      const currentTagIds = openCategory?.tags.map((tag) => tag._id);
      const notSelectedTag = categoryTags.filter(
        (tag) => !currentTagIds.includes(tag._id)
      );
      setTags(notSelectedTag);
    }
  };

  const toggleSelectedTags = (tagId) => {
    setSelectTags((prev) => {
      if (selectTags.includes(tagId)) {
        return prev.filter((temp) => temp != tagId);
      } else return [...prev, tagId];
    });
  };

  const handlePickTags = async() =>{
    const data = {tags:selectTags,shopCategoryId:openCategory._id};
    const result = await pickTags(data,dispatch,token);
    if(result){
        setOpenCategory(result?.data)

        setShopCategories((prev) => {
           return prev.map((temp)=> temp._id == openCategory._id ? result?.data : temp)
        })
    }
    setSelectTags([]);
    setShowAddTagSheet(false)
  }

  const handleRemoveTag = async(tagId) => {
    const data = {shopCatId:openCategory._id,tagId};
    const result = await removeTags(data,dispatch,token);
    if(result){
        setOpenCategory(result?.data);
        setShopCategories((prev) => (
            prev.map((cat)=>(cat._id==openCategory._id ? result.data : cat))
        ))
        setCnfModal(null)
    }

  }

  const handleRemoveShopCategory = async(catId) =>{
    const data = {shopId:shopDetails._id,shopCategoryId:catId};
    const result =  await removeShopCategory(data,token,dispatch);

    if(result){
        setShopCategories(prev => (prev.filter(temp =>temp._id != openCategory._id)));
    }
    setOpenCategory(null)
  }

  const handleToggleShopCategory = async(cat) =>{
    const data = {shopId:shopDetails._id,shopCategoryId:cat,isEnabled:!cat.isEnabled};
    const result = await toggleShopCategory(data,token,dispatch);
    if(result){
        setOpenCategory(result.data);
        setShopCategories(prev => prev.map(temp => temp._id==openCategory._id ? result.data :temp))
    }
    setCnfModal(null)
  }


  useEffect(() => {
    if (showAddTagSheet) fetchAllTagHendler();
  }, [showAddTagSheet]);

  return (
    <div className="fixed inset-0 mb-14 z-50 flex items-end bg-black/40">
      <div className="bg-white w-full rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto">
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* Category image */}
        <img
          src={openCategory.image || openCategory.category?.image}
          alt={openCategory.name}
          className="w-full h-48 object-cover rounded-xl"
        />

        {/* Name & description */}
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            {openCategory.name || openCategory.category?.name}
          </h3>
          <p className="text-sm text-gray-600">
            {openCategory.description || openCategory.category?.description}
          </p>
        </div>

        {/* ===== TAGS ===== */}
        {shopDetails && (
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">Category Tags</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {openCategory?.tags.map((tag, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCnfModal({
                      text: `Aru you sure want to remove ${tag.name} tag`,
                      btn1: "Cancel",
                      btn2: "Remove",
                      handler1: () => setCnfModal(null),
                      handler2: () => handleRemoveTag(tag._id),
                    });
                  }}
                  className={`flex ${
                    colorClasses[tag.color]
                  } items-center gap-2  border px-3 py-1.5 rounded-lg text-xs`}
                >
                  {tag.name}
                  <span className="text-red-500 cursor-pointer">✕</span>
                </div>
              ))}

              <button
                onClick={() => setShowAddTagSheet(true)}
                className="text-xs text-blue-600 font-medium border px-3 py-1.5 rounded-md"
              >
                + Add Tag
              </button>
            </div>
          </div>
        )}

        {/* ===== ACTIONS ===== */}
        {shopDetails && (
          <div className="mt-6 pt-2 space-y-3 border-t">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setCnfModal({
                    text: `Disable ${openCategory?.category?.name}?
This category will be hidden from customers, but you can enable it again anytime.`,
                    btn1: "Cancel",
                    btn2: openCategory?.isEnabled ? "Disable" : "Enable",
                    handler1: () => setCnfModal(null),
                    handler2: () => handleToggleShopCategory(openCategory),
                  })
                }
                className={`py-2.5 rounded-xl text-sm font-medium
                  ${
                    openCategory?.isEnabled
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }
                `}
              >
                {openCategory?.isEnabled ? "Disable" : "Enable"}
              </button>

              <button
                onClick={() =>
                  setCnfModal({
                    text: `Are you sure you want to remove ${openCategory?.category?.name}?
This category and all its products will be permanently deleted and cannot be recovered.
`,
                    btn1: "Cancel",
                    btn2: "Remove",
                    handler1: () => setCnfModal(null),
                    handler2: () => handleRemoveShopCategory(openCategory._id),
                  })
                }
                className="py-2.5 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200"
              >
                Remove
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold">
              ➕ Add Product
            </button>
          </div>
        )}

        {/* Close */}
        <div className="mt-2">
          <button
            onClick={() => setOpenCategory(null)}
            className="w-full text-sm text-gray-500"
          >
            Close
          </button>
        </div>
      </div>

      {showAddTagSheet && (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/50 mb-14">
          <div className="bg-white w-full rounded-t-2xl p-5 space-y-5 max-h-[85vh] overflow-y-auto">
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"></div>

            {/* Title */}
            <div className="text-center">
              <h3 className="text-lg font-bold">Add Tag</h3>
              <p className="text-sm text-gray-500">
                Add or select labels for this category
              </p>
            </div>

            {/* Search / Create */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search or create a tag..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm pl-10 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>

            {/* Suggested tags */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">
                Suggested
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <div
                    className={`${
                      selectTags.includes(tag._id) &&
                      "border border-blue-700 p-0.5 rounded-full"
                    }`}
                  >
                    <button
                      key={i}
                      onClick={() => toggleSelectedTags(tag._id)}
                      className={`${
                        colorClasses[tag.color]
                      }  px-3 py-1.5 rounded-full border text-xs  transition`}
                    >
                      {tag?.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="border-t pt-4 space-y-2 ">
              <button
                disabled={selectTags.length === 0}
                onClick={handlePickTags}
                className={`w-full py-3 rounded-xl font-semibold
              ${
                selectTags.length > 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
              >
                Add {selectTags.length || ""} Tags
              </button>

              <button
                className="w-full text-sm text-gray-500"
                onClick={() => {
                  setShowAddTagSheet(false);
                  setSelectTags([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {userLoading && <LoaderComponent />}
      {cnfModal && <ConfirmationModal modalData={cnfModal} />}
    </div>
  );
};

export default ViewCategory;
