import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ summary, loading }) => {
  if (loading) {
    return <div className="charts">Loading charts...</div>;
  }

  if (!summary) {
    return <div className="charts">No data available.</div>;
  }

  const years = summary.byYear.map((item) => item.year);

  const lineData = {
    labels: years,
    datasets: [
      {
        label: "Avg Intensity",
        data: summary.byYear.map((item) => item.avgIntensity),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        tension: 0.3
      },
      {
        label: "Avg Likelihood",
        data: summary.byYear.map((item) => item.avgLikelihood),
        borderColor: "#0ea5e9",
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        tension: 0.3
      },
      {
        label: "Avg Relevance",
        data: summary.byYear.map((item) => item.avgRelevance),
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        tension: 0.3
      }
    ]
  };

  const topicData = {
    labels: summary.byTopic.map((item) => item.topic),
    datasets: [
      {
        label: "Insights by Topic",
        data: summary.byTopic.map((item) => item.count),
        backgroundColor: "rgba(34, 197, 94, 0.7)"
      }
    ]
  };

  const regionData = {
    labels: summary.byRegion.map((item) => item.region),
    datasets: [
      {
        label: "Insights by Region",
        data: summary.byRegion.map((item) => item.count),
        backgroundColor: "rgba(59, 130, 246, 0.7)"
      }
    ]
  };

  const countryData = {
    labels: summary.byCountry.map((item) => item.country),
    datasets: [
      {
        label: "Insights by Country",
        data: summary.byCountry.map((item) => item.count),
        backgroundColor: "rgba(168, 85, 247, 0.7)"
      }
    ]
  };

  return (
    <section className="charts">
      <div className="chart">
        <h3>Intensity, Likelihood & Relevance by Year</h3>
        <Line data={lineData} />
      </div>
      <div className="chart">
        <h3>Top Topics</h3>
        <Bar data={topicData} />
      </div>
      <div className="chart">
        <h3>Top Regions</h3>
        <Bar data={regionData} />
      </div>
      <div className="chart">
        <h3>Top Countries</h3>
        <Bar data={countryData} />
      </div>
    </section>
  );
};

Charts.propTypes = {
  summary: PropTypes.object,
  loading: PropTypes.bool
};

Charts.defaultProps = {
  summary: null,
  loading: false
};

export default Charts;
