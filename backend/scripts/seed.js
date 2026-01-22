import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import connectDB from "../config/db.js";
import Insight from "../models/Insight.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH =
  process.env.DATA_PATH || path.resolve(__dirname, "..", "data", "jsondata.json");

const normalizeNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const normalizeString = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  return String(value);
};

const transformRecord = (record) => ({
  end_year: normalizeNumber(record.end_year),
  intensity: normalizeNumber(record.intensity),
  sector: normalizeString(record.sector),
  topic: normalizeString(record.topic),
  insight: normalizeString(record.insight),
  url: normalizeString(record.url),
  region: normalizeString(record.region),
  start_year: normalizeNumber(record.start_year),
  impact: normalizeNumber(record.impact),
  added: normalizeString(record.added),
  published: normalizeString(record.published),
  country: normalizeString(record.country),
  city: normalizeString(record.city),
  relevance: normalizeNumber(record.relevance),
  pestle: normalizeString(record.pestle),
  source: normalizeString(record.source),
  title: normalizeString(record.title),
  likelihood: normalizeNumber(record.likelihood),
  swot: normalizeString(record.swot)
});

const seed = async () => {
  await connectDB();

  const raw = await fs.readFile(DATA_PATH, "utf-8");
  const data = JSON.parse(raw);
  const cleaned = data.map(transformRecord);

  await Insight.deleteMany({});
  await Insight.insertMany(cleaned);

  console.log(`Seeded ${cleaned.length} records`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
