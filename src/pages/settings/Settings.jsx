// src/pages/settings/Settings.jsx
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { successAlert, errorAlert } from "../../utils/alert";
import { useAuth } from "../../context/AuthContext";
// import api from "../../api/axios";

export default function Settings() {
  const { brand, updateBrand } = useAuth();

  const [brandName, setBrandName] = useState("");
  const [cover, setCover] = useState(null);
  const [logo, setLogo] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [permissions, setPermissions] = useState({
    templateChange: true,
    coverChange: true,
    customCommunityLogo: false,
  });

  // useEffect(() => {
  //   if (!brand) return;

  //   setBrandName(brand.brand_name || "");
  //   setLogo(brand.logo || null);
  //   setCover(brand.cover_page || null);

  //   setPermissions({
  //     templateChange: brand.template_change ?? true,
  //     coverChange: brand.cover_change ?? true,
  //     customCommunityLogo: brand.custom_community_logo ?? false,
  //   });
  // }, [brand]);

  useEffect(() => {
    if (!brand) return;

    setBrandName(brand.brand_name || "");
    setLogo(brand.logo_url || null);
    setCover(brand.cover_url || null);

    setPermissions({
      templateChange: brand.template_change,
      coverChange: brand.cover_change,
      customCommunityLogo: brand.custom_community_logo,
    });
  }, [brand]);

  const handleSavesss = async () => {
    if (!brandName.trim()) {
      errorAlert("Validation Error", "Brand name is required");
      return;
    }

    if (!logo && !logoFile) {
      errorAlert("Validation Error", "Logo is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("brand_name", brandName);

      formData.append("template_change", permissions.templateChange ? 1 : 0);

      formData.append("cover_change", permissions.coverChange ? 1 : 0);

      formData.append(
        "custom_community_logo",
        permissions.customCommunityLogo ? 1 : 0,
      );

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (coverFile) {
        formData.append("cover_page", coverFile);
      }

      const res = await api.post(
        "/orginazation-dashboard/brand/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      successAlert("Success", res.data.message);
    } catch (err) {
      errorAlert(
        "Error",
        err.response?.data?.message || "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!brandName.trim()) {
      errorAlert("Validation Error", "Brand name is required");
      return;
    }

    if (!logo && !logoFile) {
      errorAlert("Validation Error", "Logo is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("brand_name", brandName);

      formData.append("template_change", permissions.templateChange ? 1 : 0);

      formData.append("cover_change", permissions.coverChange ? 1 : 0);

      formData.append(
        "custom_community_logo",
        permissions.customCommunityLogo ? 1 : 0,
      );

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (coverFile) {
        formData.append("cover_page", coverFile);
      }

      const res = await updateBrand(formData); // 🔥 USE CONTEXT

      successAlert("Success", res.message);
    } catch (err) {
      errorAlert("Error", err?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const togglePermission = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto py-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900">Brand Settings</h1>
          <p className="text-slate-500 mt-2">
            Manage your organization identity and employee permissions.
          </p>
        </div>

        {/* Brand Name */}
        <section className="mb-14">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Organization Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </section>

        {/* Cover */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Cover Image
          </h2>

          <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 border group">
            {cover ? (
              <img
                src={cover}
                alt="cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400">
                No cover uploaded
              </div>
            )}

            <label className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition cursor-pointer">
              <span className="opacity-0 group-hover:opacity-100 bg-white px-6 py-2 rounded-xl shadow text-sm font-medium transition">
                Change Cover
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setCover(URL.createObjectURL(file));
                  setCoverFile(file);
                }}
              />
            </label>
          </div>
        </section>

        {/* Logo */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Organization Logo
          </h2>

          <div className="relative w-44 h-44 rounded-2xl border bg-white shadow-md flex items-center justify-center overflow-hidden group">
            {logo ? (
              <img
                src={logo}
                alt="logo"
                className="w-full h-full object-contain p-5"
              />
            ) : (
              <span className="text-slate-400">No Logo</span>
            )}

            <label className="absolute bottom-5 right-5 cursor-pointer">
              <div className="bg-indigo-600 text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition">
                <Camera size={18} />
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setLogo(URL.createObjectURL(file));
                  setLogoFile(file);
                }}
              />
            </label>
          </div>
        </section>

        {/* Permissions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-slate-900 mb-8">
            Staff Permissions
          </h2>

          <div className="space-y-6">
            <PermissionRow
              title="Allow template changes"
              description="Employees can switch between card templates."
              enabled={permissions.templateChange}
              onToggle={() => togglePermission("templateChange")}
            />

            <PermissionRow
              title="Allow cover image changes"
              description="Employees can upload their own cover images."
              enabled={permissions.coverChange}
              onToggle={() => togglePermission("coverChange")}
            />

            <PermissionRow
              title="Custom community logos"
              description="Enable organization-specific branding."
              enabled={permissions.customCommunityLogo}
              onToggle={() => togglePermission("customCommunityLogo")}
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end pt-8 border-t">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-semibold shadow-md transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

/* Permission Row */
function PermissionRow({ title, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-slate-200">
      <div>
        <h4 className="font-medium text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>

      <button
        onClick={onToggle}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
          enabled ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform bg-white rounded-full transition ${
            enabled ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
