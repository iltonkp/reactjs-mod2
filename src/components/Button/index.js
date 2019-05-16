import React from 'react';
import PropTypes from 'prop-types';

import { BTN } from './style';

const Button = ({
  color, title, data, action,
}) => (
  <BTN color={color} onClick={() => action(data.id)}>
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
  data: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,

  action: PropTypes.func.isRequired,
};

export default Button;
