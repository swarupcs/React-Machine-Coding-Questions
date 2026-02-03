import { useEffect, useMemo, useState } from "react";
import { asyncTask } from "../utils/asyncTask";
import { chunkArray } from "../utils/chunk";

const TOTAL_APIS = 20;
const BATCH_SIZE = 5;
const FIRST_DELAY = 5000;

const BatchExecutor = () => {
  const [batchIndex, setBatchIndex] = useState(0);

  // Create API promises once
  const apiTasks = useMemo(() => {
    return Array.from({ length: TOTAL_APIS }, (_, i) =>
      asyncTask(i + 1)
    );
  }, []);

  // Chunk APIs into batches of 5
  const batches = useMemo(() => {
    return chunkArray(apiTasks, BATCH_SIZE);
  }, [apiTasks]);

  // Execute a batch in parallel
  const executeBatch = async (batch, index) => {
    try {
      const result = await Promise.all(batch);
      console.log(`Batch ${index}:`, result);
    } catch (err) {
      console.error("Batch failed", err);
    } finally {
      setBatchIndex((prev) =>
        prev < batches.length - 1 ? prev + 1 : 0
      );
    }
  };

  useEffect(() => {
    let timer;

    if (batchIndex === 0) {
      // First batch runs after 5 seconds
      timer = setTimeout(() => {
        executeBatch(batches[batchIndex], batchIndex);
      }, FIRST_DELAY);
    } else {
      executeBatch(batches[batchIndex], batchIndex);
    }

    return () => clearTimeout(timer);
  }, [batchIndex, batches]);

  return null;
};

export default BatchExecutor;
