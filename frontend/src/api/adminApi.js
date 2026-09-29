const API_URL = import.meta.env.VITE_APP_API_ADMIN_URL;

export const fetchAdminDashboard = async () => {
  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch dashboard stats"
      );
    }

    return data;
  } catch (error) {
    console.error("Dashboard API error:", error);
    throw error;
  }
};