const API_URL = import.meta.env.VITE_APP_API_URL;

export const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
}

export const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      return id;
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
}

export const createNote = async (noteData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
}

export const fetchNoteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const updateNote = async (id, noteData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
}
