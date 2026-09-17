import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CreateNotePage from "./pages/CreateNotePage";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Notes */}
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/create" element={<CreateNotePage />} />
          <Route path="/notes/:id/edit" element={<EditNote />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
