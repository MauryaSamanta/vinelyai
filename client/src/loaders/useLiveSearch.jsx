import { useState, useEffect } from "react";
import { Box, Button, Typography, Collapse, Paper } from "@mui/material";

// Hook for live search updates
export const useLiveSearch = (query) => {
  const [updates, setUpdates] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const eventSource = new EventSource("http://localhost:3000/connections/search");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "thinking" || data.type === "keywords" || data.type === "match") {
        setTimeout(() => {
          setUpdates((prev) => [...prev, data.message]); // Show one by one
        }, prev.length * 500); // Delay each update
      }

      if (data.type === "done") {
        setResults(data.data);
        eventSource.close();
      }
    };

    return () => {
      eventSource.close();
    };
  }, [query]);

  return { updates, results };
};