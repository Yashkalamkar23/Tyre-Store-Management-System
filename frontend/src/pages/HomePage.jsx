import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TyreNotFound from "../components/TyreNotFound";
import TyreCard from "../components/TyreCard";
import api from "../lib/axios";

const HomePage = () => {
  const [tyres, setTyres] = useState([]);
  const [filteredTyres, setFilteredTyres] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [vehicleType, setVehicleType] = useState("All");
  const [tyreType, setTyreType] = useState("All");
  const [brand, setBrand] = useState("All");

  useEffect(() => {
    const fetchTyres = async () => {
      try {
        const res = await api.get("/tyres");
        setTyres(res.data);
        setFilteredTyres(res.data);
      } catch (error) {
        toast.error("Failed to load tyres");
      } finally {
        setLoading(false);
      }
    };
    fetchTyres();
  }, []);

  /* ---------- FILTER LOGIC ---------- */

  useEffect(() => {
    let data = tyres;

    // Search filter
    if (search) {
      data = data.filter(
        (t) =>
          t.name?.toLowerCase().includes(search.toLowerCase()) ||
          t.tyreBrand?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Vehicle type filter
    if (vehicleType !== "All") {
      data = data.filter((t) => t.vehicleType === vehicleType);
    }

    // Tyre type filter
    if (tyreType !== "All") {
      data = data.filter((t) => t.tyreType === tyreType);
    }

    // Brand filter
    if (brand !== "All") {
      data = data.filter((t) => t.tyreBrand === brand);
    }

    setFilteredTyres(data);
  }, [search, vehicleType, tyreType, brand, tyres]);

  /* ---------- BRAND COUNT ---------- */

  const brandCount = tyres.reduce((acc, tyre) => {
    const brand = tyre.tyreBrand || "Unknown";
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});

  const brands = Object.keys(brandCount);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-500/20 blur-[140px] rounded-full animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-orange-500/20 blur-[140px] rounded-full animate-pulse"></div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 relative">

        {/* HERO */}
        <div className="mb-14 text-center space-y-6">

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Premium Tyres
          </h1>

          <p className="text-neutral-400 max-w-xl mx-auto">
            Discover high-performance tyres designed for safety,
            durability, and ultimate road performance.
          </p>

        </div>

        {/* INVENTORY SUMMARY */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* Total Tyres */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl hover:scale-[1.02] transition">

            <p className="text-neutral-400 text-sm uppercase tracking-wider">
              Total Tyres in Store
            </p>

            <h2 className="text-5xl font-bold text-yellow-400 mt-3">
              {tyres.length}
            </h2>

          </div>

          {/* Brand Breakdown */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl">

            <p className="text-neutral-400 text-sm uppercase tracking-wider mb-4">
              Tyres by Brand
            </p>

            <div className="space-y-2">

              {Object.entries(brandCount).map(([brand, count]) => (

                <div
                  key={brand}
                  className="flex justify-between items-center px-3 py-2 rounded-md bg-black/40 border border-neutral-800 hover:border-yellow-500 transition"
                >
                  <span className="text-neutral-300">{brand}</span>
                  <span className="text-yellow-400 font-semibold">{count}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* FILTER BAR */}
        <div className="mb-12 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search tyre by name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black border border-neutral-700 focus:border-yellow-500 outline-none"
            />

            {/* VEHICLE TYPE */}
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black border border-neutral-700 focus:border-yellow-500"
            >
              <option value="All">All Vehicles</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
              <option value="Bus">Bus</option>
            </select>

            {/* TYRE TYPE */}
            <select
              value={tyreType}
              onChange={(e) => setTyreType(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black border border-neutral-700 focus:border-yellow-500"
            >
              <option value="All">All Tyre Types</option>
              <option value="Tubeless">Tubeless</option>
              <option value="Tube">Tube</option>
              <option value="Radial">Radial</option>
            </select>

            {/* BRAND FILTER */}
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black border border-neutral-700 focus:border-yellow-500"
            >
              <option value="All">All Brands</option>

              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-4 border-neutral-700 border-t-yellow-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredTyres.length === 0 && <TyreNotFound />}

        {/* TYRE GRID */}
        {!loading && filteredTyres.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredTyres.map((t, index) => (

              <div
                key={t._id}
                className="opacity-0 translate-y-10 animate-[fadeUp_0.6s_ease_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TyreCard tyre={t} setTyres={setTyres} />
              </div>

            ))}

          </div>

        )}

      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity:0;
              transform:translateY(40px);
            }
            to {
              opacity:1;
              transform:translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
};

export default HomePage;
