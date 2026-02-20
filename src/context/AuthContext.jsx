// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const mockUser = {
//   id: 1,
//   name: "Admin User",
//   email: "admin@onedesk.com",
//   role: "employeer",
//   organization: { name: "OneDesk Technologies" },
// };

// const mockBrand = {
//   brand_name: "OneDesk",
//   logo: "https://via.placeholder.com/80?text=OneDesk",
//   cover_page: "https://picsum.photos/1400/400",
// };

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [brand, setBrand] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading from localStorage or just mock login
//     const stored = localStorage.getItem("mock_auth");
//     if (stored) {
//       setUser(mockUser);
//       setBrand(mockBrand);
//     }
//     setLoading(false);
//   }, []);

//   const login = ({ role = "admin" }) => {
//     localStorage.setItem("mock_auth", "true");
//     setUser(mockUser);
//     setBrand(mockBrand);

//     if (role === "admin") {
//       navigate("/", { replace: true });
//     } else {
//       navigate("/user/my-card", { replace: true });
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("mock_auth");
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
     LOAD USER ON PAGE REFRESH
  ───────────────────────────────────────────── */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/profile") // make sure you have this API
      .then((res) => {
        const userData = res.data.user;

        setUser(userData);

        // optional brand
        setBrand(userData.organization || null);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ─────────────────────────────────────────────
     LOGIN (Called From Login.jsx)
  ───────────────────────────────────────────── */

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

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
    localStorage.removeItem("user");

    setUser(null);
    setBrand(null);

    navigate("/login", { replace: true });
  };

  const updateBrand = (newBrand) => {
    setBrand((prev) => ({ ...prev, ...newBrand }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        brand,
        login,
        logout,
        updateBrand,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
