import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/login");
            return;
          }
  
          const response = await axios.get("http://20.255.59.99:45/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    });
  
    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser  = () => {
    return useContext(UserContext);
};