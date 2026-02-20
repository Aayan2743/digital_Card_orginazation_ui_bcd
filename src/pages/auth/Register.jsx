// // src/pages/auth/Register.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { successAlert, errorAlert } from "../../utils/alert";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     password_confirmation: "",
//     role: "admin", // "admin" → employeer, "user" → employee
//   });

//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setFormError(""); // clear error on input
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");

//     // Basic client-side validation
//     if (!form.name.trim()) return setFormError("Full name is required");
//     if (!form.email.trim()) return setFormError("Email is required");
//     if (!form.phone.trim()) return setFormError("Phone number is required");
//     if (!form.password) return setFormError("Password is required");
//     if (form.password.length < 6) return setFormError("Password must be at least 6 characters");
//     if (form.password !== form.password_confirmation) return setFormError("Passwords do not match");

//     setLoading(true);

//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         phone: form.phone.trim(),
//         password: form.password,
//         password_confirmation: form.password_confirmation,
//         role: form.role === "admin" ? "employeer" : "employee",
//       };

//       const response = await api.post("/auth/admin-register", payload);

//       // Assuming success response has message or user data
//       successAlert("Registration Successful!", response.data.message || "Account created! Please login.");

//       // Redirect to login after short delay
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.data?.errors?.[0] ||
//         err.response?.data?.error ||
//         "Registration failed. Please try again.";

//       errorAlert("Registration Failed", errorMessage);
//       setFormError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
//       <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
//         {/* Logo / Brand */}
//         <div className="text-center mb-8">
//           <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-white text-indigo-600 text-3xl font-bold shadow-lg">
//             OD
//           </div>
//           <h1 className="text-3xl font-bold text-white">Create Account</h1>
//           <p className="text-white/70 text-sm mt-2">
//             Join OneDesk and manage your digital cards
//           </p>
//         </div>

//         {/* Role Toggle */}
//         <div className="flex bg-white/20 rounded-xl p-1.5 mb-8 shadow-inner">
//           <button
//             type="button"
//             onClick={() => setForm({ ...form, role: "admin" })}
//             className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
//               form.role === "admin"
//                 ? "bg-white text-indigo-600 shadow-md"
//                 : "text-white/80 hover:text-white"
//             }`}
//           >
//             Organization / Admin
//           </button>
//           <button
//             type="button"
//             onClick={() => setForm({ ...form, role: "user" })}
//             className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
//               form.role === "user"
//                 ? "bg-white text-indigo-600 shadow-md"
//                 : "text-white/80 hover:text-white"
//             }`}
//           >
//             User / Employee
//           </button>
//         </div>

//         {/* Error Message */}
//         {formError && (
//           <div className="bg-red-500/30 text-white text-sm p-3 rounded-xl mb-6 text-center">
//             {formError}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="text-white text-sm mb-2 block font-medium">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="John Doe"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full px-5 py-3.5 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-white text-sm mb-2 block font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="john@example.com"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-5 py-3.5 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-white text-sm mb-2 block font-medium">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="+91 98765 43210"
//               value={form.phone}
//               onChange={handleChange}
//               className="w-full px-5 py-3.5 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-white text-sm mb-2 block font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-5 py-3.5 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
//               required
//               minLength={6}
//             />
//           </div>

//           <div>
//             <label className="text-white text-sm mb-2 block font-medium">Confirm Password</label>
//             <input
//               type="password"
//               name="password_confirmation"
//               placeholder="••••••••"
//               value={form.password_confirmation}
//               onChange={handleChange}
//               className="w-full px-5 py-3.5 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-inner"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3.5 rounded-xl text-white font-semibold transition-all shadow-lg mt-2 ${
//               loading
//                 ? "bg-green-500 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                   <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//                 Creating Account...
//               </span>
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="mt-8 text-center text-white/80 text-sm">
//           Already have an account?{" "}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-white font-medium hover:underline"
//           >
//             Sign In
//           </button>
//           <p className="mt-4">
//             © {new Date().getFullYear()} OneDesk
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

