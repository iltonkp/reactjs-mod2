import React from 'react';
import PropTypes from 'prop-types';

import { BTN } from './style';

const Button = ({ color, title, remove }) => (
  <BTN color={color} onClick={remove}>
    {' '}
    <strong>{title}</strong>
  </BTN>
);

Button.defaultProps = {
  color: '#666',
};

Button.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Button;
