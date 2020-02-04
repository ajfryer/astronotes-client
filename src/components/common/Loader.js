import React from 'react';

/*
 * Loader Component
 * ================
 * - conditionally renders children components based on props.loaded
 * - helps us avoid errors that arise when rendering components before they have data!
 *
 */
export default function Loader(props) {
  return props.loaded ? <>{props.children}</> : <div>it's loading!</div>;
}
