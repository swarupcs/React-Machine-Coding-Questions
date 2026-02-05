import { useMemo } from "react";
import { Grid, AutoSizer } from "react-virtualized";
import { generateProducts } from "../../data/generateData";
import "./virtualized.css";

export default function VirtualizedList() {
  const products = useMemo(() => generateProducts(10000), []);

  const COLUMN_COUNT = 3;
  const ROW_HEIGHT = 180;
  const COLUMN_WIDTH = 250;

  const rowCount = Math.ceil(products.length / COLUMN_COUNT);

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;
    const product = products[index];

    if (!product) return null;

    return (
      <div key={key} style={style} className="card">
        <h4>{product.title}</h4>
        <p>{product.description}</p>
      </div>
    );
  };

  return (
    <div>
      <h2>📌 Virtualized List Example (10,000 items)</h2>

      <div className="virtual-box">
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              cellRenderer={cellRenderer}
              columnCount={COLUMN_COUNT}
              columnWidth={COLUMN_WIDTH}
              height={height}
              rowCount={rowCount}
              rowHeight={ROW_HEIGHT}
              width={width}
              overscanRowCount={2}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
