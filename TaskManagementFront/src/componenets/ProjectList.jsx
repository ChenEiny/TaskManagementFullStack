import React, { useEffect, useState } from "react";
import { fetchAllProjects } from "../api/api";
import ProjectCard from "./ProjectCard";
import Pagination from "./Pagination";

const PROJECTS_PER_PAGE = 3;

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch/reload projects
  const refreshProjects = () => {
    setLoading(true);
    fetchAllProjects()
      .then(res => setProjects(res.data))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert("You must log in to view projects.");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  // Handler to remove a project after delete
  const handleProjectDeleted = (deletedId) => {
    setProjects(projects => projects.filter(p => p.id !== deletedId));
  };

  // Handler to refresh after update (optional, could reload projects)
  const handleProjectUpdated = () => {
    refreshProjects();
  };

  // --- Pagination logic ---
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const start = currentPage * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const projectsToShow = projects.slice(start, end);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Projects</h2>
      {/* Grid layout for columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projectsToShow.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onProjectDeleted={handleProjectDeleted}
            onProjectUpdated={handleProjectUpdated}
          />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
