import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

/**
 * A basic component for selecting value from options in dropdwon
 * @param {object} props Component props
 * @param {string} props.label label to be shown for dropdown
 * @param {string} props.values list of options
 * @param {function} props.onChange callback handler when we select an option
 * @param {string} props.initialValue default value to be shown as selected
 */
const Dropdown = (props) => {
  const { label, values, onChange, initialValue, placeholder } = props;
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="dropdown">
      <>
        {label && <label>{label}</label>}
        <select
          onChange={handleChange}
          value={selectedOption}
          placeholder={placeholder}
        >
          {initialValue && (
            <option key="0" value={initialValue}>
              {initialValue}
            </option>
          )}
          {values.map((val, idx) => (
            <option key={idx + 1} value={val}>
              {val}
            </option>
          ))}
        </select>
      </>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  values: PropTypes.array.isRequired,
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
  values: [],
  onChange: () => {}
};

export default Dropdown;
