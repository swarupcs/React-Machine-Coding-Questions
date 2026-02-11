import { Search, X } from "lucide-react";
import { useSelectContext } from "./SelectContext";

/**
 * Search box inside dropdown
 */
export default function SelectSearch() {
  const { searchQuery, setSearchQuery, searchInputRef } =
    useSelectContext();

  return (
    <div className="p-2 border-b">
      <div className="relative">
        <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />

        <input
          ref={searchInputRef}
          value={searchQuery}
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-8 py-2 border rounded-md"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-2"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
