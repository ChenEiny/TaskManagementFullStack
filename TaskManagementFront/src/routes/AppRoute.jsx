import { Routes, Route } from "react-router-dom";
import NavPage from "../pages/NavPage";
import ProjectPage from "../pages/ProjectPage";
import Login from '../pages/Login.jsx';
import CognitoCallback from "../pages/CognitoCallback.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cognito-callback" element={<CognitoCallback />} />
      <Route path="/projects/:page" element={<ProjectPage />} />
      <Route path="/Home" element={<NavPage />} />

    </Routes>
  );
}
