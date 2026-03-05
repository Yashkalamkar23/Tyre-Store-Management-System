import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [recordId, setRecordId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [tyreBrand, setTyreBrand] = useState("");
  const [tyreType, setTyreType] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tyres", {
        recordId,
        invoiceNumber,
        customerMobile,
        customerName,
        vehicleType,
        tyreBrand,
        tyreType,
        unitPrice,
      });
      toast.success("Tyre created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating tyre", error);
      toast.error("Failed to create tyre.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Back Button */}
        <Link
          to={"/"}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition mb-8"
        >
          <ArrowLeftIcon className="size-5" />
          Back to TyreStore
        </Link>

        {/* Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">

          {/* Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-600 to-transparent opacity-60"></div>

          <h2 className="text-3xl font-semibold tracking-wider uppercase mb-8">
            Create New Tyre
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Input Field Reusable Style */}
            {[
              { label: "Record ID", value: recordId, setter: setRecordId, type: "text" },
              { label: "Invoice Number", value: invoiceNumber, setter: setInvoiceNumber, type: "text" },
              { label: "Customer Mobile", value: customerMobile, setter: setCustomerMobile, type: "text" },
              { label: "Customer Name", value: customerName, setter: setCustomerName, type: "text" },
              { label: "Vehicle Type", value: vehicleType, setter: setVehicleType, type: "text" },
              { label: "Tyre Brand", value: tyreBrand, setter: setTyreBrand, type: "text" },
              { label: "Tyre Type", value: tyreType, setter: setTyreType, type: "text" },
              { label: "Unit Price (₹)", value: unitPrice, setter: setUnitPrice, type: "number" },
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label className="text-sm uppercase tracking-wide text-neutral-400">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  required
                  className="bg-neutral-800 border border-neutral-700 rounded-md px-4 py-2.5 text-neutral-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-600 transition-all duration-200"
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-neutral-200 hover:border-yellow-500 hover:text-white transition-all duration-300 shadow-md"
              >
                {loading ? "Creating..." : "Create Tyre"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;