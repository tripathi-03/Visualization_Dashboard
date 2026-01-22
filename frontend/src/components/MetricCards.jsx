import PropTypes from "prop-types";

const formatNumber = (value) => {
  if (value === null || value === undefined) {
    return "-";
  }
  return Number(value).toFixed(1);
};

const MetricCards = ({ summary, loading }) => {
  const totals = summary?.totals;

  return (
    <section className="cards">
      <div className="card">
        <p>Total Insights</p>
        <h2>{loading ? "..." : totals?.count ?? 0}</h2>
      </div>
      <div className="card">
        <p>Avg Intensity</p>
        <h2>{loading ? "..." : formatNumber(totals?.avgIntensity)}</h2>
      </div>
      <div className="card">
        <p>Avg Likelihood</p>
        <h2>{loading ? "..." : formatNumber(totals?.avgLikelihood)}</h2>
      </div>
      <div className="card">
        <p>Avg Relevance</p>
        <h2>{loading ? "..." : formatNumber(totals?.avgRelevance)}</h2>
      </div>
    </section>
  );
};

MetricCards.propTypes = {
  summary: PropTypes.object,
  loading: PropTypes.bool
};

MetricCards.defaultProps = {
  summary: null,
  loading: false
};

export default MetricCards;
