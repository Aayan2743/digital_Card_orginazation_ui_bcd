// // export const useAuth = () => useContext(AuthContext);

// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [brand, setBrand] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ─────────────────────────────────────────────
//      LOAD USER ON PAGE REFRESH
//   ───────────────────────────────────────────── */

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     api
//       .get("/orginazation-dashboard/profile") // must match backend
//       .then((res) => {
//         const userData = res.data.user;

//         setUser(userData); // ✅ IMPORTANT
//         setBrand(userData.organization || null);
//       })
//       .catch(() => {
//         localStorage.removeItem("token");
//         setUser(null);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   /* ─────────────────────────────────────────────
//      LOGIN (Called From Login.jsx)
//   ───────────────────────────────────────────── */

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));

//     setUser(userData);

//     if (userData.role === "employeer") {
//       navigate("/", { replace: true });
//     } else {
//       navigate("/user/my-card", { replace: true });
//     }
//   };

//   /* ─────────────────────────────────────────────
//      LOGOUT
//   ───────────────────────────────────────────── */

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser(null);
//     setBrand(null);

//     navigate("/login", { replace: true });
//   };

//   const updateBrand = (newBrand) => {
//     setBrand((prev) => ({ ...prev, ...newBrand }));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         brand,
//         login,
//         logout,
//         updateBrand,
//         loading,
//         isAuthenticated: !!user,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ─────────────────────────────────────────────
     LOAD USER + BRAND ON REFRESH
  ───────────────────────────────────────────── */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const init = async () => {
      try {
        // 1️⃣ Get profile
        const profileRes = await api.get("/orginazation-dashboard/profile");

        const userData = profileRes.data.user;
        setUser(userData);

        // 2️⃣ Get brand separately
        try {
          const brandRes = await api.get("/orginazation-dashboard/brand");
          setBrand(brandRes.data.data);
        } catch {
          setBrand(null);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
        setBrand(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  /* ─────────────────────────────────────────────
     LOGIN
  ───────────────────────────────────────────── */
  const login = (userData, token) => {
    localStorage.setItem("token", token);

    setUser(userData);

    if (userData.role === "employeer") {
      navigate("/", { replace: true });
    } else {
      navigate("/user/my-card", { replace: true });
    }
  };

  /* ─────────────────────────────────────────────
     LOGOUT
  ───────────────────────────────────────────── */
  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setBrand(null);

    navigate("/login", { replace: true });
  };

  /* ─────────────────────────────────────────────
     UPDATE BRAND (API CONNECTED)
  ───────────────────────────────────────────── */
  const updateBrand = async (formData) => {
    try {
      const res = await api.post(
        "/orginazation-dashboard/brand/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setBrand(res.data.data);

      return res.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  /* ─────────────────────────────────────────────
     REFRESH BRAND MANUALLY
  ───────────────────────────────────────────── */
  const refreshBrand = async () => {
    try {
      const res = await api.get("/orginazation-dashboard/brand");
      setBrand(res.data.data);
    } catch {
      setBrand(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        brand,
        login,
        logout,
        updateBrand,
        refreshBrand,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
