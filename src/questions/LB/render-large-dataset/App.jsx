import PaginationList from "./components/PaginationList/PaginationList";
import InfiniteScrollList from "./components/InfiniteScrollList/InfiniteScrollList";
import VirtualizedList from "./components/VirtualizedList/VirtualizedList";

export default function App() {
  return (
    <div>
      <h1>🚀 Large Dataset Rendering in React</h1>

      {/* Uncomment one at a time */}

      {/* <PaginationList /> */}
      {/* <InfiniteScrollList /> */}
      <VirtualizedList />
    </div>
  );
}
