// //src/pages/auth/forgot-password.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// // import api from "../../services/api";

// export default function ForgotPassword() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSendOtp = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await api.post("/orginazation-forgot-password", { email });
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await api.post("/verify-otp", { email, otp });
//       setStep(3);
//     } catch (err) {
//       setError("Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       await api.post("/reset-password", {
//         email,
//         otp,
//         password,
//         password_confirmation: confirmPassword,
//       });

//       navigate("/login");
//     } catch (err) {
//       setError("Password reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
//       <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
//         <h1 className="text-3xl font-bold text-white text-center mb-6">
//           Forgot Password
//         </h1>

//         {error && (
//           <div className="bg-red-500/20 text-white text-sm p-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {/* STEP 1: EMAIL */}
//         {step === 1 && (
//           <>
//             <label className="text-white text-sm mb-1 block">
//               Registered Email
//             </label>
//             <input
//               type="email"
//               placeholder="admin@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500"
//             />

//             <button
//               onClick={handleSendOtp}
//               disabled={loading}
//               className="w-full mt-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {/* STEP 2: OTP */}
//         {step === 2 && (
//           <>
//             <label className="text-white text-sm mb-1 block">Enter OTP</label>
//             <input
//               type="text"
//               placeholder="6-digit OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-widest"
//             />

//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading}
//               className="w-full mt-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </>
//         )}

//         {/* STEP 3: RESET PASSWORD */}
//         {step === 3 && (
//           <>
//             <label className="text-white text-sm mb-1 block">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500"
//             />

//             <label className="text-white text-sm mt-3 mb-1 block">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg bg-white/90 outline-none focus:ring-2 focus:ring-indigo-500"
//             />

//             <button
//               onClick={handleResetPassword}
//               disabled={loading}
//               className="w-full mt-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </>
//         )}

//         <p
//           className="text-center text-white/80 text-sm mt-6 cursor-pointer hover:underline"
//           onClick={() => navigate("/login")}
//         >
//           Back to Login
//         </p>
//       </div>
//     </div>
//   );
// }
// src/pages/auth/forgot-password.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../../utils/alert";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock OTP for demo (in real app this would come from backend)
  const MOCK_OTP = "123456";

  const handleSendOtp = () => {
    if (!email.trim()) {
      setError("Please enter your registered email");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      successAlert("OTP Sent!", `A verification code has been sent to ${email} (mock mode)`);
      setStep(2);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);

      if (otp === MOCK_OTP) {
        successAlert("Verified!", "OTP is correct. You can now reset your password.");
        setStep(3);
      } else {
        errorAlert("Invalid OTP", "The code you entered is incorrect. Use 123456 for testing.");
      }
    }, 1000);
  };

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate password reset delay
    setTimeout(() => {
      setLoading(false);
      successAlert("Password Reset!", "Your password has been updated successfully.");
      
      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Forgot Password
        </h1>

        {error && (
          <div className="bg-red-500/30 text-white text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <label className="text-white text-sm mb-2 block font-medium">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <button
              onClick={handleSendOtp}
              disabled={loading || !email.trim()}
              className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition shadow-md"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <label className="text-white text-sm mb-2 block font-medium">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-indigo-400 text-center tracking-[0.5em] text-xl font-mono transition"
            />
            <p className="text-white/70 text-xs mt-2 text-center">
              (Mock OTP: <strong>123456</strong>)
            </p>

            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition shadow-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <label className="text-white text-sm mb-2 block font-medium">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
            />

            <label className="text-white text-sm mb-2 block font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading || !password || !confirmPassword}
              className="w-full mt-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition shadow-md"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <p
          className="text-center text-white/80 text-sm mt-8 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          ← Back to Login
        </p>
      </div>
    </div>
  );
}