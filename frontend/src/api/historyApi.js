const API_URL = import.meta.env.VITE_APP_API_HISTORY_URL;

export const fetchHistory = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch history");
    }

    return data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};