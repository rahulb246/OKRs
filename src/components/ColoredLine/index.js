import PropTypes from "prop-types";

/**
 * A basic component for showing a colored horizontal line
 * @param {string} props.color color of the line
 */
const ColoredLine = ({ color }) => (
  <div
    style={{
      color: color,
      backgroundColor: color,
      height: 2
    }}
  />
);

ColoredLine.propTypes = {
  color: PropTypes.string
};

ColoredLine.defaultProps = {
  color: "black"
};

export default ColoredLine;
