export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  if (totalPages <= 1) return null; // Hide pagination if only one page

  return (
    <div className="flex justify-center mt-4 gap-2">
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded border ${
            num === currentPage ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {num + 1}
        </button>
      ))}
    </div>
  );
}
