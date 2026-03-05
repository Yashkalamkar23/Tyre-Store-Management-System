import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const TyreDetailPage = () => {
  const [tyre, setTyre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTyre = async () => {
      try {
        const res = await api.get(`/tyres/${id}`);
        setTyre(res.data);
      } catch (error) {
        console.error("Error fetching tyre", error);
        toast.error("Failed to fetch the tyre");
      } finally {
        setLoading(false);
      }
    };

    fetchTyre();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tyre?")) return;

    try {
      await api.delete(`/tyres/${id}`);
      toast.success("Tyre deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting tyre", error);
      toast.error("Failed to delete tyre");
    }
  };

  const handleSave = async () => {
    if (!tyre.customerName?.trim() || !tyre.vehicleType?.trim()) {
      toast.error("Customer Name and Vehicle Type are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/tyres/${id}`, tyre);
      toast.success("Tyre updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating tyre", error);
      toast.error("Failed to update tyre");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-200">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition"
          >
            <ArrowLeftIcon className="size-5" />
            Back to TyreStore
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-red-700 text-red-400 hover:bg-red-900/30 hover:border-red-500 rounded-md transition"
          >
            <Trash2Icon className="size-5" />
            Delete Tyre
          </button>
        </div>

        {/* CARD */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">

          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-600 to-transparent opacity-60"></div>

          <h2 className="text-3xl font-semibold tracking-wider uppercase mb-8 text-center">
            Tyre Details
          </h2>

          {/* GRID FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              { label: "Record ID", key: "recordId", type: "text" },
              { label: "Invoice Number", key: "invoiceNumber", type: "text" },
              { label: "Customer Name", key: "customerName", type: "text" },
              { label: "Customer Mobile", key: "customerMobile", type: "number" },
              { label: "Vehicle Type", key: "vehicleType", type: "text" },
              { label: "Tyre Brand", key: "tyreBrand", type: "text" },
              { label: "Tyre Type", key: "tyreType", type: "text" },
              { label: "Unit Price (₹)", key: "unitPrice", type: "number" },
            ].map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wide text-neutral-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={tyre[field.key]}
                  onChange={(e) =>
                    setTyre({ ...tyre, [field.key]: e.target.value })
                  }
                  className="bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2.5 text-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-600 transition-all duration-200"
                />
              </div>
            ))}

          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-end pt-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-8 py-3 rounded-md shadow-md transition-all duration-300
                ${saving
                  ? "bg-neutral-700 cursor-not-allowed"
                  : "bg-neutral-800 border border-neutral-700 hover:border-yellow-500 hover:text-white"
                }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TyreDetailPage;