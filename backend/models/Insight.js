import mongoose from "mongoose";

const InsightSchema = new mongoose.Schema(
  {
    end_year: Number,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: Number,
    added: String,
    published: String,
    country: String,
    city: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
    swot: String
  },
  { timestamps: false }
);

export default mongoose.model("Insight", InsightSchema);
