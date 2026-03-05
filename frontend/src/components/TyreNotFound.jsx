import { CarIcon, PackageSearchIcon } from "lucide-react";
import { Link } from "react-router";

const TyreNotFound = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center px-6">
      
      <div className="relative flex flex-col items-center justify-center py-16 px-10 space-y-6 max-w-md w-full text-center bg-neutral-900 border border-neutral-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Accent Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-400 to-transparent"></div>

        {/* Icon */}
        <div className="bg-neutral-800 rounded-full p-7 border border-neutral-700 shadow-lg hover:scale-105 transition-transform duration-300">
          <CarIcon className="size-12 text-yellow-500" />
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold tracking-wide">
          No Tyres Available
        </h3>

        {/* Description */}
        <p className="text-neutral-400 leading-relaxed">
          Your tyre inventory is empty. Start by adding your first tyre to the store and manage your collection easily.
        </p>

        {/* Button */}
        <Link
          to="/create"
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-lg hover:scale-105 hover:shadow-yellow-500/30 hover:shadow-lg transition-all duration-300"
        >
          <PackageSearchIcon className="size-5" />
          Add First Tyre
        </Link>

      </div>

    </div>
  );
};

export default TyreNotFound;