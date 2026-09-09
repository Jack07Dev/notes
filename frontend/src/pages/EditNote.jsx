import CreateNote from "./CreateNote";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchNoteById, updateNote } from "../api/apiConfig";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Get existing note
  useEffect(() => {
    const getNote = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetchNoteById(id);
        // Your backend response:
        // { success: true, data: {...} }
        const note = response.data;
        setFormData({ title: note.title || "", content: note.content || "" });
      } catch (error) {
        console.error("Error fetching note:", error);
        setError("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };

    getNote();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateNote(id, {
        title: formData.title,
        content: formData.content,
      });
      // After successful update
      navigate("/notes");
    } catch (error) {
      console.error("Error updating note:", error);
      setError("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-10 text-center text-slate-500">
        Loading note...
      </div>
    );
  }
  return (
    <CreateNote
      isEdit={true}
      formData={formData}
      onFormChange={handleChange}
      onSubmit={handleSubmit}
      loading={saving}
      error={error}
    />
  );
}

export default EditNote;
