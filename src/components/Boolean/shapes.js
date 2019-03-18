import PropTypes from 'prop-types';

export const BooleanShape = {
  falsy: PropTypes.string,
  question: PropTypes.string,
  truthy: PropTypes.string,
  withPersistingPromt: PropTypes.bool,
  onInput: PropTypes.func,
};
