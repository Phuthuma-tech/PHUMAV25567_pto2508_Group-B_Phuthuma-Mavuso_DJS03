/**
 * @fileoverview LoadingSpinner component.
 * Displayed while async data fetches are in progress.
 * @module components/LoadingSpinner
 */

import React from "react";

/**
 * Full-viewport centred loading indicator with an animated spinner and message.
 *
 * @component
 * @param {Object}  props
 * @param {string}  [props.message="Loading podcasts…"] - Text shown below the spinner
 * @returns {JSX.Element} A centred loading state container
 *
 * @example
 * <LoadingSpinner message="Fetching show details…" />
 */
function LoadingSpinner({ message = "Loading podcasts…" }) {
  return (
    <div className="state-center" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <h3>{message}</h3>
      <p>Hang tight — fetching the latest shows for you.</p>
    </div>
  );
}

export default LoadingSpinner;
