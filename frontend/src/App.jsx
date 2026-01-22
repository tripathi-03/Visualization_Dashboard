import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Filters from "./components/Filters.jsx";
import MetricCards from "./components/MetricCards.jsx";
import Charts from "./components/Charts.jsx";

const defaultFilters = {
  end_year: "",
  topic: "",
  sector: "",
  region: "",
  pestle: "",
  source: "",
  swot: "",
  country: "",
  city: ""
};

const App = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [filterOptions, setFilterOptions] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = useMemo(() => {
    const params = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params[key] = value;
      }
    });
    return params;
  }, [filters]);

  const fetchFilters = useCallback(async () => {
    const { data } = await axios.get("/api/filters");
    setFilterOptions(data);
  }, []);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get("/api/summary", { params: queryParams });
    setSummary(data);
    setLoading(false);
  }, [queryParams]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const handleFilterChange = (next) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Insights Dashboard</h1>
        <Filters
          values={filters}
          options={filterOptions}
          onChange={handleFilterChange}
          onReset={handleReset}
        />
      </aside>
      <main className="content">
        <MetricCards summary={summary} loading={loading} />
        <Charts summary={summary} loading={loading} />
      </main>
    </div>
  );
};

export default App;
