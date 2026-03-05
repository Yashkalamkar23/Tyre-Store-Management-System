import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800">

        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="w-[3px] h-10 bg-gradient-to-b from-yellow-500 to-amber-700 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-[0.25em] text-neutral-200 uppercase">
                <span className="text-neutral-400 font-light">TYRE</span>
                <span className="text-white">STORE</span>
              </h1>
            </div>

            {/* New Tyre Button */}
            <Link
              to="/create"
              className="group relative px-7 py-2.5 rounded-md bg-neutral-900 text-neutral-200 font-medium tracking-wide flex items-center gap-3 border border-neutral-700 hover:border-yellow-500 transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-500/10 to-amber-600/10"></span>

              <PlusIcon className="size-5 transition-transform duration-300 group-hover:rotate-90" />
              <span className="relative z-10">New Tyre</span>
            </Link>

          </div>
        </div>

        {/* Bottom Gold Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-40"></div>
      </header>


      {/* ================= PREMIUM BANNER ================= */}
      <section className="relative h-[420px] w-full overflow-hidden bg-neutral-950">

        {/* Image from public folder */}
        <img
          src="/tyre-banner.jpg"
          alt="Premium Tyre Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Banner Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-2xl">

            <h2 className="text-4xl md:text-5xl font-semibold tracking-wide text-white leading-tight">
              Premium Tyre{" "}
              <span className="text-yellow-500">
                Inventory
              </span>{" "}
              Management
            </h2>

            <p className="mt-6 text-neutral-300 text-lg">
              Manage brands, track invoices, monitor vehicle fitments,
              and organize your tyre business with a premium dashboard.
            </p>

            <div className="mt-8">
              <Link
                to="/create"
                className="px-8 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-neutral-200 hover:border-yellow-500 hover:text-white transition-all duration-300 shadow-md"
              >
                Add New Tyre
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-40"></div>

      </section>
    </>
  );
};

export default Navbar;