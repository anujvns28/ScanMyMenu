const LoaderComponent = () => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
        <div className="w-12 h-12  custom-loader"></div>
         <p className="text-sm font-medium text-gray-700">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default LoaderComponent;
