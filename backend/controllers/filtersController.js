import Insight from "../models/Insight.js";

const DISTINCT_FIELDS = [
  "end_year",
  "topic",
  "sector",
  "region",
  "pestle",
  "source",
  "swot",
  "country",
  "city"
];

export const getFilters = async (_req, res) => {
  try {
    const results = {};

    for (const field of DISTINCT_FIELDS) {
      const values = await Insight.distinct(field, {
        [field]: { $ne: null }
      });
      results[field] = values
        .filter((value) => value !== "" && value !== null)
        .sort((a, b) => {
          if (typeof a === "number" && typeof b === "number") {
            return a - b;
          }
          return String(a).localeCompare(String(b));
        });
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load filters" });
  }
};
