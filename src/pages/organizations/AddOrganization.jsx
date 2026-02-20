// //src/pages/organizations/AddOrganization.jsx
// import { useState } from "react";
// import { X } from "lucide-react";

// export default function AddOrganization({ onClose, onSave }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const saveOrg = () => {
//     if (!name || !email) {
//       alert("Name and Email are required");
//       return;
//     }

//     onSave({
//       id: Date.now(),
//       name,
//       email,
//       phone,
//       cards: 0,
//       status: "Active",
//     });
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//         onClick={onClose}
//       />

//       {/* Drawer */}
//       <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Add Organization
//             </h3>
//             <p className="text-sm text-gray-500">
//               Create a new organization profile
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-9 h-9 rounded-full flex items-center justify-center
//                        hover:bg-gray-100 transition"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* Form */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Organization Name
//             </label>
//             <input
//               className="w-full rounded-xl border border-gray-300 px-4 py-2.5
//                          focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="e.g. Career Mentorz"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               className="w-full rounded-xl border border-gray-300 px-4 py-2.5
//                          focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="org@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <input
//               className="w-full rounded-xl border border-gray-300 px-4 py-2.5
//                          focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               placeholder="+91 98765 43210"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 rounded-xl border border-gray-300 py-2.5
//                        text-gray-700 font-medium hover:bg-gray-50 transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={saveOrg}
//             className="flex-1 rounded-xl bg-indigo-600 py-2.5
//                        text-white font-semibold hover:bg-indigo-700
//                        transition shadow"
//           >
//             Save Organization
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// src/pages/organizations/AddOrganization.jsx
import { useState } from "react";
import { X } from "lucide-react";
import api from "../../api/axios"; // your axios instance
import { successAlert, errorAlert } from "../../utils/alert";

export default function AddOrganization({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // for backend field-specific errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    setFieldErrors((prev) => ({ ...prev, [name]: "" })); // clear field error
  };

  const handleSubmit = async () => {
    // Basic client-side validation
    if (!form.name.trim()) return setFormError("Organization name is required");
    if (!form.email.trim()) return setFormError("Email address is required");

    setLoading(true);
    setFormError("");
    setFieldErrors({});

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null, // optional
      };

      const response = await api.post(
        "/orginazation-dashboard/add-organization",
        payload
      );

      // Assuming success response structure (adjust if different)
      const newOrg = {
        id: response.data?.data?.id || Date.now(), // fallback to local ID
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        cards: 0,
        status: "Active",
        ...response.data?.data, // merge any extra fields from backend
      };

      successAlert("Success!", "Organization added successfully");

      // Pass new org back to parent (for list update)
      onSave(newOrg);

      // Close drawer
      onClose();
    } catch (err) {
      const errorData = err.response?.data;

      let message = "Failed to add organization. Please try again.";

      // Handle Laravel-style validation errors
      if (errorData?.errors) {
        const newFieldErrors = {};
        Object.keys(errorData.errors).forEach((key) => {
          newFieldErrors[key] = errorData.errors[key][0]; // first error message
        });
        setFieldErrors(newFieldErrors);

        // Show first error as main message
        message = Object.values(newFieldErrors)[0] || message;
      } else if (errorData?.message) {
        message = errorData.message;
      }

      errorAlert("Error", message);
      setFormError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Add New Organization
            </h3>
            <p className="text-sm text-gray-500">
              Create a new organization profile
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* General error */}
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="e.g. Career Mentorz"
              value={form.name}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                fieldErrors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="org@example.com"
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                fieldErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              className={`w-full rounded-xl border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                fieldErrors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 py-2.5 text-gray-700 font-medium hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-1 rounded-xl py-2.5 text-white font-semibold transition shadow ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Saving..." : "Save Organization"}
          </button>
        </div>
      </div>
    </>
  );
}