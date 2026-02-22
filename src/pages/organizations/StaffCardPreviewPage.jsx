// import { useParams } from "react-router-dom";

// import StaffCardPreview from "./StaffCardPreview";

// export default function StaffCardPreviewPage() {
//   const { id } = useParams();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <StaffCardPreview id={id} />
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
 import StaffCardPreview from "./StaffCardPreview"; // ✅ IMPORTANT

export default function StaffCardPreviewPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <StaffCardPreview id={id} />
    </div>
  );
}