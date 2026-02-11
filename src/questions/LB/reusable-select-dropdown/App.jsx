import { useState } from "react";
import Select from "./components/Select";
import { countries, largeDataset } from "./data/options";

export default function App() {
  const [single, setSingle] = useState("");
  const [multi, setMulti] = useState([]);
  const [large, setLarge] = useState([]);

  return (
    <div className="p-10 space-y-8 max-w-xl mx-auto">
      {/* Single Select */}
      <div>
        <h2 className="font-bold mb-2">Single Select</h2>

        <Select value={single} onChange={setSingle}>
          <Select.Trigger />
          <Select.Dropdown>
            <Select.Search />
            <Select.List options={countries} />
          </Select.Dropdown>
        </Select>

        <p className="mt-2">Selected: {single}</p>
      </div>

      {/* Multi Select */}
      <div>
        <h2 className="font-bold mb-2">Multi Select</h2>

        <Select value={multi} onChange={setMulti} multiple>
          <Select.Trigger />
          <Select.Dropdown>
            <Select.Search />
            <Select.List options={countries} />
          </Select.Dropdown>
        </Select>

        <p className="mt-2">Selected: {multi.join(", ")}</p>
      </div>

      {/* Virtualized Select */}
      <div>
        <h2 className="font-bold mb-2">Virtualized Select (10,000)</h2>

        <Select
          value={large}
          onChange={setLarge}
          multiple
          virtualized
          itemHeight={40}
        >
          <Select.Trigger />
          <Select.Dropdown>
            <Select.Search />
            <Select.List options={largeDataset} />
          </Select.Dropdown>
        </Select>
      </div>
    </div>
  );
}
