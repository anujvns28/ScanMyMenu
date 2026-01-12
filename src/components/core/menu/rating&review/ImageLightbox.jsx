import React from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageLightbox = ({
  images = [],
  startIndex = 0,
  onClose,
}) => {
  const [index, setIndex] = React.useState(startIndex);

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const next = () => {
    if (index < images.length - 1) setIndex(index + 1);
  };

  return (
    <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white"
      >
        <X size={32} />
      </button>

      {/* Left */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute left-3 text-white bg-black/40 p-2 rounded-full"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        className="max-w-full max-h-full object-contain"
      />

      {/* Right */}
      {index < images.length - 1 && (
        <button
          onClick={next}
          className="absolute right-3 text-white bg-black/40 p-2 rounded-full"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

export default ImageLightbox;
