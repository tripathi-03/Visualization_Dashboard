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

export const getSummary = async (req, res) => {
  try {
    const match = buildMatch(req.query);

    const pipeline = [
      { $match: match },
      {
        $addFields: {
          year: {
            $ifNull: ["$end_year", "$start_year"]
          }
        }
      },
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                avgIntensity: { $avg: "$intensity" },
                avgLikelihood: { $avg: "$likelihood" },
                avgRelevance: { $avg: "$relevance" }
              }
            }
          ],
          byYear: [
            { $match: { year: { $ne: null } } },
            {
              $group: {
                _id: "$year",
                avgIntensity: { $avg: "$intensity" },
                avgLikelihood: { $avg: "$likelihood" },
                avgRelevance: { $avg: "$relevance" }
              }
            },
            { $sort: { _id: 1 } }
          ],
          byTopic: [
            { $match: { topic: { $ne: null } } },
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          byRegion: [
            { $match: { region: { $ne: null } } },
            { $group: { _id: "$region", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          byCountry: [
            { $match: { country: { $ne: null } } },
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          byPestle: [
            { $match: { pestle: { $ne: null } } },
            { $group: { _id: "$pestle", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 6 }
          ]
        }
      }
    ];

    const [result] = await Insight.aggregate(pipeline);
    const totals = result.totals[0] || {
      count: 0,
      avgIntensity: 0,
      avgLikelihood: 0,
      avgRelevance: 0
    };

    res.json({
      totals,
      byYear: result.byYear.map((item) => ({
        year: item._id,
        avgIntensity: item.avgIntensity,
        avgLikelihood: item.avgLikelihood,
        avgRelevance: item.avgRelevance
      })),
      byTopic: result.byTopic.map((item) => ({ topic: item._id, count: item.count })),
      byRegion: result.byRegion.map((item) => ({ region: item._id, count: item.count })),
      byCountry: result.byCountry.map((item) => ({ country: item._id, count: item.count })),
      byPestle: result.byPestle.map((item) => ({ pestle: item._id, count: item.count }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to build summary" });
  }
};
