import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Color } from 'ink';
import Marker from './Marker';

const Item = ({ active, selected, label }) => {
  return (
    <Box alignItems="center">
      <Color blue={active}>
        <Box marginRight={2}>
          <Marker selected={selected} active={active} />
        </Box>
        <Text bold={active}>{label}</Text>
      </Color>
    </Box>
  );
};

Item.propTypes = {
  selected: PropTypes.bool,
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

Item.defaultProps = {
  selected: false,
  active: false,
};

export default Item;
