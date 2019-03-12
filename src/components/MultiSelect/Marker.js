import PropTypes from 'prop-types';
import figures from 'figures';

const Marker = ({ active, selected }) => {
  return selected ? figures.radioOn : figures.radioOff;
};

Marker.propTypes = {
  active: PropTypes.bool,
  selected: PropTypes.bool,
};

export default Marker;
