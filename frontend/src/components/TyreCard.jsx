import { Link, useLocation } from "react-router";
import {
  Edit2,
  Trash2,
  Car,
  Phone,
  IndianRupee,
  CalendarDays,
  Tag
} from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const TyreCard = ({ tyre, setTyres }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/tyre/${tyre._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/tyres/${tyre._id}`);
      setTyres((prev) => prev.filter((t) => t._id !== tyre._id));
      toast.success("Tyre deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tyre");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Link
        to={`/tyre/${tyre._id}`}
        className={`relative block rounded-2xl p-6 transition-all duration-500
        bg-gradient-to-b from-neutral-900 to-neutral-950
        border overflow-hidden group
        ${
          isActive
            ? "border-yellow-500 shadow-[0_0_35px_rgba(234,179,8,0.35)]"
            : "border-neutral-800"
        }
        hover:border-yellow-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)]`}
      >

        {/* Golden Glow Background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-yellow-500/10 blur-3xl rounded-full group-hover:scale-125 transition-all duration-700"></div>

        {/* Top Golden Accent */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-600 to-transparent"></div>

        {/* Header */}
        <div className="flex justify-between items-start">

          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider">
              Record ID
            </p>

            <p className="text-sm font-medium text-neutral-300 truncate">
              {tyre.recordId}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-neutral-700 px-3 py-1 rounded-full text-xs text-neutral-300">
            <Tag className="size-3 text-yellow-500" />
            {tyre.invoiceNumber}
          </div>

        </div>

        {/* Brand */}
        <div className="mt-6">

          <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-yellow-400 transition-colors">
            {tyre.tyreBrand}
          </h3>

          <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">
            {tyre.tyreType}
          </p>

        </div>

        {/* Divider */}
        <div className="mt-5 h-[1px] bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent"></div>

        {/* Info Grid */}
        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-200 transition">
            <Car className="size-4 text-yellow-500" />
            {tyre.vehicleType}
          </div>

          <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-200 transition">
            <Phone className="size-4 text-yellow-500" />
            {tyre.customerMobile}
          </div>

          <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-200 transition">
            <IndianRupee className="size-4 text-yellow-500" />
            ₹{tyre.unitPrice}
          </div>

          <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-200 transition">
            <CalendarDays className="size-4 text-yellow-500" />
            {formatData(new Date(tyre.createdAt))}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-center border-t border-neutral-800 pt-4">

          <span className="text-xs text-neutral-500">
            Premium Tyre
          </span>

          <div className="flex gap-5">

            <Edit2 className="size-4 text-neutral-400 hover:text-yellow-400 hover:scale-110 transition-all duration-200 cursor-pointer"/>

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className="text-neutral-400 hover:text-red-500 hover:scale-110 transition-all duration-200"
            >
              <Trash2 className="size-4"/>
            </button>

          </div>

        </div>

      </Link>

      {/* DELETE MODAL */}
      {showModal && (
        <dialog className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 w-[90%] max-w-md shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 to-transparent"></div>

            <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
              <Trash2 className="size-5"/> Delete Tyre
            </h3>

            <p className="mt-4 text-neutral-400 text-sm">
              Are you sure you want to delete{" "}
              <span className="text-white font-medium">
                {tyre.tyreBrand}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-4">

              <button
                className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-md hover:border-neutral-500 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4"/> Delete
              </button>

            </div>

          </div>

        </dialog>
      )}
    </>
  );
};

export default TyreCard;