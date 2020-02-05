import React from 'react';
import PropTypes from 'prop-types';

/*
 * Loader Component
 * ================
 * - conditionally renders children components based on props.loaded
 * - helps us avoid errors that arise when rendering components before they have data!
 *
 */
const Loader = props => {
  return props.loaded ? <>{props.children}</> : <div>it's loading!</div>;
};

Loader.propTypes = {
  loaded: PropTypes.bool
};

export default Loader;
