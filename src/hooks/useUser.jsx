import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

export function useUser() {
  const [user, setUser] = useState();
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

        const response = await axios.get(`${API_URL}/api/auth/profile`, {
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
  }, []);

  return { user, loading };
};

export function useUserProgress(userId) {
  const fetchUserProgress = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/progress/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  }
  fetchUserProgress();
} 