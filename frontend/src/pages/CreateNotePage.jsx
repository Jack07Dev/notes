import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateNote from "./CreateNote";
import { createNote } from "../api/apiConfig";

function CreateNotePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Create note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createNote({
        title: formData.title,
        content: formData.content,
      });
      /// Go to notes after successful creation
      navigate("/notes");
    } catch (error) {
      console.error("Error creating note:", error);
      setError("Failed to create note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateNote
      isEdit={false}
      formData={formData}
      onFormChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}

export default CreateNotePage;