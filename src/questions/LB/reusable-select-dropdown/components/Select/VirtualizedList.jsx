import { useState, useMemo } from "react";
import { useSelectContext } from "./SelectContext";

/**
 * VirtualizedList renders only visible options
 * to support huge datasets (10k+ items)
 */
export default function VirtualizedList({ options, renderOption }) {
  const { itemHeight } = useSelectContext();

  const containerHeight = 250;
  const buffer = 5;

  const [scrollTop, setScrollTop] = useState(0);

  /**
   * Compute visible window range
   */
  const range = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.ceil(containerHeight / itemHeight);

    return {
      start: Math.max(0, start - buffer),
      end: Math.min(options.length, end + buffer),
    };
  }, [scrollTop, options.length, itemHeight]);

  const visibleOptions = options.slice(range.start, range.end);

  return (
    <div
      style={{ height: containerHeight }}
      className="overflow-y-auto"
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      {/* Fake total height */}
      <div style={{ height: options.length * itemHeight, position: "relative" }}>
        {/* Offset visible items */}
        <div style={{ transform: `translateY(${range.start * itemHeight}px)` }}>
          {visibleOptions.map((opt, idx) =>
            renderOption(opt, range.start + idx)
          )}
        </div>
      </div>
    </div>
  );
}
