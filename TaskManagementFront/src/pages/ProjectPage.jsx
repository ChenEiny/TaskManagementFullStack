import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllProjects } from "../api/api";
import ProjectList from "../componenets/ProjectList.jsx";
import Pagination from "../componenets/Pagination.jsx";
import LogoutButton from "../componenets/LogOutButton.jsx";


export default function ProjectPage() {
  const { page } = useParams();
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllProjects(page)
      .then((res) => {
        setProjects(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(console.error);
  }, [page]);

  return (
    <>
          <LogoutButton />
      <ProjectList projects={projects} />
      <Pagination currentPage={parseInt(page)} totalPages={totalPages} />
    </>
  );
}
