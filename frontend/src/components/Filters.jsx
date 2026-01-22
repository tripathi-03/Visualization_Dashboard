import PropTypes from "prop-types";

const renderSelect = (label, name, values, options, onChange) => (
  <label className="filter">
    <span>{label}</span>
    <select
      value={values[name]}
      onChange={(event) => onChange({ [name]: event.target.value })}
    >
      <option value="">All</option>
      {(options[name] || []).map((option) => (
        <option key={String(option)} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

const Filters = ({ values, options, onChange, onReset }) => (
  <div className="filters">
    {renderSelect("End Year", "end_year", values, options, onChange)}
    {renderSelect("Topic", "topic", values, options, onChange)}
    {renderSelect("Sector", "sector", values, options, onChange)}
    {renderSelect("Region", "region", values, options, onChange)}
    {renderSelect("PEST", "pestle", values, options, onChange)}
    {renderSelect("Source", "source", values, options, onChange)}
    {renderSelect("SWOT", "swot", values, options, onChange)}
    {renderSelect("Country", "country", values, options, onChange)}
    {renderSelect("City", "city", values, options, onChange)}
    <button type="button" className="reset" onClick={onReset}>
      Clear filters
    </button>
  </div>
);

Filters.propTypes = {
  values: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Filters;
