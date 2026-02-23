// src/pages/StaffCards.jsx
import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import CardTabs from "../components/CardTabs";
import StaffCard from "../components/StaffCard";
import CardPlaceholder from "../components/CardPlaceholder";
import api from "../api/axios";
import { useParams } from "react-router-dom";

export default function StaffCards() {
  const [activeTab, setActiveTab] = useState("assigned");
  const [assignedStaff, setAssignedStaff] = useState([]);
  const [remainingSlots, setRemainingSlots] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */

  const { orgSlug } = useParams();
  useEffect(() => {
    fetchStaffCards();
  }, []);

  const fetchStaffCards = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orginazation-dashboard/staff-cardss");

      setAssignedStaff(res.data.data.assigned || []);
      setRemainingSlots(res.data.data.remaining_slots || 0);
    } catch (error) {
      console.error("Failed to load staff cards");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER ================= */

  return (
    <AdminLayout>
      <div className="p-6">
        <CardTabs
          active={activeTab}
          setActive={setActiveTab}
          counts={{
            assigned: assignedStaff.length,
            unassigned: remainingSlots,
          }}
        />

        {loading ? (
          <div className="mt-6 text-center text-gray-500">
            Loading staff cards...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
            {activeTab === "assigned" &&
              assignedStaff.map((emp) => (
                <StaffCard
                  key={emp.id}
                  employee={{
                    id: emp.id,
                    name: emp.name,
                    staff_card_id: emp.staff_card_id,
                    role: emp.designation,
                    location: emp.location,
                    exp: emp.expires_at,
                    avatar: emp.profile_image_url,
                    organization_slug: emp.organization_slug,
                  }}
                />
              ))}

            {activeTab === "unassigned" &&
              Array.from({ length: remainingSlots }).map((_, i) => (
                <CardPlaceholder key={i} />
              ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
