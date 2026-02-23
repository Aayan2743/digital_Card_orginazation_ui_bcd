// src/components/StaffCard.jsx
import { useNavigate } from "react-router-dom";

export default function StaffCard({ employee }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={employee.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <h4 className="font-semibold text-sm">{employee.name}</h4>
          <p className="text-xs text-gray-500">{employee.role}</p>
          <p className="text-xs text-gray-400">{employee.location}</p>
        </div>

        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
          Assigned
        </span>
      </div>

      {/* ACTION ROW */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-2">
          {/* VIEW */}
          <button
            className="text-xs bg-gray-100 px-3 py-1 rounded"
            // onClick={() => navigate(`/card-preview/${employee.staff_card_id}`)}
            onClick={() =>
              navigate(
                `/${employee.organization_slug}/${employee.staff_card_id}`,
              )
            }
          >
            View
          </button>

          {/* EDIT */}
          <button
            className="text-xs bg-black text-white px-3 py-1 rounded"
            onClick={() =>
              navigate(`/edit-staff-cards/${employee.staff_card_id}`)
            }
          >
            Edit {employee.staff_card_id}
          </button>

          {/* EXPIRY */}
          <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium flex items-center">
            ⏳ Valid till {employee.exp}
          </span>
        </div>
      </div>
    </div>
  );
}
