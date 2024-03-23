// components/InfoBanner.tsx
const BannerInfo = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-4">
      <div
        className="bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 border border-teal-100 text-teal-800 px-4 py-3 rounded-lg relative text-center "
        role="alert"
      >
        <strong className="font-bold">Need help or have questions?</strong>
        <span className="block sm:inline"> Visit our Help Center.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          {/* Optional icon or close button */}
        </span>
      </div>
    </div>
  );
};

export default BannerInfo;
