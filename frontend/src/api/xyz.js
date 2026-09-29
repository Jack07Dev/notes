const API_URL = import.meta.env.VITE_APP_API_AUTH_URL;

export const login = async (userData) => {
    try{
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(userData)

        });
        const data = await response.json();
        if(!response.ok) throw new Error(data.message || "Login failed");
        return data;
    }catch(error){
        console.error("Login error :", error);
        throw error;
    }
}