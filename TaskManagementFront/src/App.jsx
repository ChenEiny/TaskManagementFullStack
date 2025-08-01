import AppRoutes from "./routes/AppRoute.jsx";

export default function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <AppRoutes />
    </div>
  );
}
