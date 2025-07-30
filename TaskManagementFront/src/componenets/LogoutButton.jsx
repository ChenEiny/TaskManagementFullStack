import apiClient from "../api/api";

export default function LogoutButton() {
  const handleLogout = async () => {
    await apiClient.post("/logout");
    // You can redirect to login or home page after logout:
    window.location.href = "/";
  };

  return (
    <button
      className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
