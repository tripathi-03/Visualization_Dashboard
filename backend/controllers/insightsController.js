import Insight from "../models/Insight.js";

const buildMatch = (query) => {
  const match = {};
  const stringFields = [
    "sector",
    "topic",
    "region",
    "pestle",
    "source",
    "country",
    "city",
    "swot"
  ];
  const numberFields = ["end_year", "start_year"];

  stringFields.forEach((field) => {
    if (query[field]) {
      match[field] = query[field];
    }
  });

  numberFields.forEach((field) => {
    if (query[field]) {
      const parsed = Number(query[field]);
      if (!Number.isNaN(parsed)) {
        match[field] = parsed;
      }
    }
  });

  return match;
};

export const getInsights = async (req, res) => {
  try {
    const match = buildMatch(req.query);
    const limit = Math.min(Number(req.query.limit) || 50, 200);

    const items = await Insight.find(match)
      .sort({ published: -1 })
      .limit(limit)
      .lean();

    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
};
