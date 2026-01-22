import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import filtersRouter from "./routes/filters.js";
import summaryRouter from "./routes/summary.js";
import insightsRouter from "./routes/insights.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "blackcoffer-backend" });
});

app.use("/api/filters", filtersRouter);
app.use("/api/summary", summaryRouter);
app.use("/api/insights", insightsRouter);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
