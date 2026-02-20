// //src/pages/settings/Settings.jsx
// import { useEffect, useState, useRef } from "react";
// import { Camera, ImageIcon } from "lucide-react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import api from "../../api/axios";
// import { successAlert, errorAlert } from "../../utils/alert";
// import { useLoader } from "../../context/LoaderContext";
// import { useAuth } from "../../context/AuthContext";

// export default function Settings() {
//   const hasFetched = useRef(false);

//   const { updateBrand, brand } = useAuth();

//   // alert(brand.brand_name);
//   /* ================= STATE ================= */
//   const [brandName, setBrandName] = useState("");
//   const [cover, setCover] = useState(null);
//   const [logo, setLogo] = useState(null);

//   const [coverFile, setCoverFile] = useState(null);
//   const [logoFile, setLogoFile] = useState(null);

//   const { showLoader, hideLoader } = useLoader();

//   const [permissions, setPermissions] = useState({
//     templateChange: true,
//     coverChange: true,
//     customCommunityLogo: false,
//   });

//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH SETTINGS ================= */

//   // useEffect(() => {
//   //   if (hasFetched.current) return;

//   //   hasFetched.current = true;
//   //   fetchSettings();
//   // }, []);

//   useEffect(() => {
//     if (!brand) return;

//     setBrandName(brand.brand_name || "");
//     setLogo(brand.logo || null);
//     setCover(brand.cover_page || null);
//   }, [brand]);

//   // const fetchSettings = async () => {
//   //   try {
//   //     showLoader();

//   //     const { data } = await api.get("/settings-orginization");

//   //     if (data?.data) {
//   //       setBrandName(data.data.brand_name || "");
//   //       setCover(data.data.cover_page || null);
//   //       setLogo(data.data.logo || null);

//   //       setPermissions({
//   //         templateChange: !!data.data.template_change,
//   //         coverChange: !!data.data.cover_change,
//   //         customCommunityLogo: !!data.data.custom_community_logo,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     errorAlert(
//   //       "Failed",
//   //       error.response?.data?.message || "Unable to load settings",
//   //     );
//   //   } finally {
//   //     hideLoader();
//   //   }
//   // };

//   /* ================= SAVE SETTINGS ================= */

//   const handleSave = async () => {
//     // logo required only if no existing logo
//     if (!logo && !logoFile) {
//       errorAlert("Validation Error", "Logo is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("brand_name", brandName);

//       // ✅ ONLY append if File exists
//       if (logoFile instanceof File) {
//         formData.append("logo", logoFile);
//       }

//       if (coverFile instanceof File) {
//         formData.append("cover_image", coverFile);
//       }

//       formData.append("template_change", permissions.templateChange ? 1 : 0);
//       formData.append("cover_change", permissions.coverChange ? 1 : 0);
//       formData.append(
//         "custom_community_logo",
//         permissions.customCommunityLogo ? 1 : 0,
//       );

//       const { data } = await api.post(
//         "/organizations/brand-settings",
//         formData,
//       );

//       setBrandName(data.data.brand_name);
//       setCover(data.data.cover_page);
//       setLogo(data.data.logo);

//       updateBrand(data.data);

//       successAlert("Success", "Brand settings updated successfully");

//       hasFetched.current = false;
//       // fetchSettings();
//     } catch (error) {
//       console.error("UPLOAD ERROR:", error);

//       errorAlert(
//         "Save Failed",
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to save settings",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePermission = (key) => {
//     setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <AdminLayout>
//       {/* ================= HEADER ================= */}
//       <div className="mb-12">
//         <h1 className="text-3xl font-bold text-slate-800">Brand Settings</h1>
//         <p className="text-slate-500 mt-1">
//           Customize brand visuals & control staff permissions
//         </p>
//       </div>

//       <div className="space-y-16">
//         {/* ================= BRAND NAME ================= */}
//         <GlassCard
//           title="Brand Identity"
//           subtitle="How your organization appears publicly"
//         >
//           <input
//             type="text"
//             value={brandName}
//             onChange={(e) => setBrandName(e.target.value)}
//             placeholder="OneDesk Technologies"
//             className="w-full max-w-md px-4 py-3 rounded-xl border
//                        border-slate-300 bg-white/80
//                        focus:ring-2 focus:ring-indigo-500
//                        focus:outline-none"
//           />
//         </GlassCard>

//         {/* ================= COVER IMAGE ================= */}
//         <GlassCard
//           title="Cover Image"
//           subtitle="Large banner shown on all digital cards"
//         >
//           <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-200">
//             {cover ? (
//               <img
//                 src={cover}
//                 loading="lazy"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="h-full flex flex-col items-center justify-center text-slate-500">
//                 <ImageIcon size={36} className="mb-2 opacity-50" />
//                 No cover image uploaded
//               </div>
//             )}

//             <label className="absolute bottom-4 right-4 cursor-pointer">
//               <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl shadow">
//                 <Camera size={16} />
//                 Change Cover
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) return;

//                   setCover(URL.createObjectURL(file));
//                   setCoverFile(file);
//                 }}
//               />
//             </label>
//           </div>
//         </GlassCard>

//         {/* ================= LOGO ================= */}
//         <GlassCard
//           title="Organization Logo"
//           subtitle="Shown on employee cards and profiles"
//         >
//           <div className="relative w-32 h-32 rounded-full bg-white shadow border overflow-hidden">
//             {logo ? (
//               <img
//                 src={logo}
//                 loading="lazy"
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <span className="flex items-center justify-center h-full text-xs text-slate-400">
//                 No Logo
//               </span>
//             )}

//             <label className="absolute bottom-0 right-0 cursor-pointer">
//               <div className="bg-indigo-600 text-white p-2 rounded-full shadow">
//                 <Camera size={14} />
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];

//                   if (!file) return;

//                   // optional: validate on frontend
//                   if (!file.type.startsWith("image/")) {
//                     errorAlert("Invalid file", "Please select an image file");
//                     return;
//                   }

//                   setLogo(URL.createObjectURL(file)); // preview
//                   setLogoFile(file); // actual upload file
//                 }}
//               />
//             </label>
//           </div>
//         </GlassCard>

//         {/* ================= SAVE ================= */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="px-10 py-3 rounded-xl bg-indigo-600 text-white font-semibold
//                        hover:bg-indigo-700 disabled:opacity-60 transition"
//           >
//             {loading ? "Saving..." : "Save Settings"}
//           </button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// /* ================= UI HELPERS ================= */

// function GlassCard({ title, subtitle, children }) {
//   return (
//     <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8">
//       <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
//       <p className="text-sm text-slate-500 mb-6">{subtitle}</p>
//       {children}
//     </div>
//   );
// }



// src/pages/settings/Settings.jsx
import { useEffect, useState } from "react";
import { Camera, ImageIcon } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { successAlert, errorAlert } from "../../utils/alert";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { updateBrand, brand } = useAuth();

  /* ================= STATE ================= */
  const [brandName, setBrandName] = useState("");
  const [cover, setCover] = useState(null);
  const [logo, setLogo] = useState(null);

  const [coverFile, setCoverFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const [permissions, setPermissions] = useState({
    templateChange: true,
    coverChange: true,
    customCommunityLogo: false,
  });

  const [saving, setSaving] = useState(false);

  /* ================= LOAD FROM CONTEXT ================= */
  useEffect(() => {
    if (!brand) return;

    setBrandName(brand.brand_name || "OneDesk");
    setLogo(brand.logo || null);
    setCover(brand.cover_page || null);

    // Optional: mock permissions if not coming from context
    setPermissions({
      templateChange: brand.template_change ?? true,
      coverChange: brand.cover_change ?? true,
      customCommunityLogo: brand.custom_community_logo ?? false,
    });
  }, [brand]);

  /* ================= SAVE HANDLER (MOCK) ================= */
  const handleSave = () => {
    // Basic validation
    if (!brandName.trim()) {
      errorAlert("Validation Error", "Brand name is required");
      return;
    }

    if (!logo && !logoFile) {
      errorAlert("Validation Error", "Logo is required");
      return;
    }

    setSaving(true);

    // Simulate "save" delay (optional — remove if you want instant)
    setTimeout(() => {
      // Prepare new brand object
      const updatedBrand = {
        ...brand,
        brand_name: brandName.trim(),
        logo: logoFile ? URL.createObjectURL(logoFile) : logo,
        cover_page: coverFile ? URL.createObjectURL(coverFile) : cover,
        template_change: permissions.templateChange,
        cover_change: permissions.coverChange,
        custom_community_logo: permissions.customCommunityLogo,
      };

      // Update context (which is already mocked/static)
      updateBrand(updatedBrand);

      // Log what would be sent to backend
      console.group("=== Mock Brand Settings Saved ===");
      console.log("Brand Name:", brandName);
      console.log("Logo file:", logoFile ? logoFile.name : "unchanged");
      console.log("Cover file:", coverFile ? coverFile.name : "unchanged");
      console.log("Permissions:", permissions);
      console.groupEnd();

      successAlert("Success", "Brand settings updated successfully (mock mode)");

      // Clear file inputs after save (UI only)
      setLogoFile(null);
      setCoverFile(null);

      setSaving(false);
    }, 800); // fake network delay — remove if unwanted
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AdminLayout>
      {/* ================= HEADER ================= */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-800">Brand Settings</h1>
        <p className="text-slate-500 mt-1">
          Customize brand visuals & control staff permissions
        </p>
      </div>

      <div className="space-y-16">
        {/* ================= BRAND NAME ================= */}
        <GlassCard
          title="Brand Identity"
          subtitle="How your organization appears publicly"
        >
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="OneDesk Technologies"
            className="w-full max-w-md px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </GlassCard>

        {/* ================= COVER IMAGE ================= */}
        <GlassCard
          title="Cover Image"
          subtitle="Large banner shown on all digital cards"
        >
          <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-200 shadow-inner">
            {cover ? (
              <img
                src={cover}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <ImageIcon size={40} className="mb-3 opacity-60" />
                <p>No cover image uploaded</p>
              </div>
            )}

            <label className="absolute bottom-4 right-4 cursor-pointer">
              <div className="flex items-center gap-2 bg-white/95 px-5 py-2.5 rounded-xl shadow-lg hover:bg-white transition">
                <Camera size={18} className="text-indigo-600" />
                <span className="font-medium text-slate-700">Change Cover</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (!file.type.startsWith("image/")) {
                    errorAlert("Invalid File", "Please select an image");
                    return;
                  }
                  setCover(URL.createObjectURL(file));
                  setCoverFile(file);
                }}
              />
            </label>
          </div>
        </GlassCard>

        {/* ================= LOGO ================= */}
        <GlassCard
          title="Organization Logo"
          subtitle="Shown on employee cards and profiles"
        >
          <div className="relative w-40 h-40 rounded-2xl bg-white shadow-lg border border-slate-200 overflow-hidden mx-auto">
            {logo ? (
              <img
                src={logo}
                alt="Logo preview"
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">
                No Logo
              </div>
            )}

            <label className="absolute -bottom-3 -right-3 cursor-pointer">
              <div className="bg-indigo-600 text-white p-3 rounded-full shadow-xl hover:bg-indigo-700 transition">
                <Camera size={18} />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (!file.type.startsWith("image/")) {
                    errorAlert("Invalid File", "Please select an image");
                    return;
                  }
                  setLogo(URL.createObjectURL(file));
                  setLogoFile(file);
                }}
              />
            </label>
          </div>
        </GlassCard>

        {/* ================= PERMISSIONS ================= */}
        <GlassCard
          title="Staff Permissions"
          subtitle="Control what employees can modify"
        >
          <div className="space-y-5">
            <PermissionToggle
              title="Allow template changes"
              description="Staff can select different card templates"
              enabled={permissions.templateChange}
              onToggle={() => togglePermission("templateChange")}
            />
            <PermissionToggle
              title="Allow cover image changes"
              description="Staff can upload their own cover images"
              enabled={permissions.coverChange}
              onToggle={() => togglePermission("coverChange")}
            />
            <PermissionToggle
              title="Custom community logos"
              description="Allow use of organization-specific community icons"
              enabled={permissions.customCommunityLogo}
              onToggle={() => togglePermission("customCommunityLogo")}
            />
          </div>
        </GlassCard>

        {/* ================= SAVE BUTTON ================= */}
        <div className="flex justify-end pt-6 border-t border-slate-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-12 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-lg shadow-lg transition transform hover:scale-[1.02] active:scale-100"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= UI HELPERS ================= */

function GlassCard({ title, subtitle, children }) {
  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-100/80 p-8 hover:shadow-2xl transition-shadow">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 mb-8">{subtitle}</p>
      {children}
    </div>
  );
}

function PermissionToggle({ title, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0">
      <div>
        <h4 className="font-medium text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-0.5">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}