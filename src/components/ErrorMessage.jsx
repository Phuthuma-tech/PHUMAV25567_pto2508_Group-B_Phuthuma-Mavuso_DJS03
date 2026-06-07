/**
 * @fileoverview ErrorMessage component.
 * Renders a user-friendly error or empty-state panel.
 * @module components/ErrorMessage
 */

import React from "react";

/**
 * Displays a prominent error or empty-state message to inform the user
 * when the API request has failed or returned no results.
 *
 * @component
 * @param {Object}  props
 * @param {string}  props.title   - Bold heading for the state panel (e.g. "Something went wrong")
 * @param {string}  props.message - Supporting detail text shown below the heading
 * @returns {JSX.Element} A centred state-panel element
 *
 * @example
 * <ErrorMessage title="Something went wrong" message="Could not reach the API. Please try again." />
 * <ErrorMessage title="No results found"     message="Try selecting a different genre." />
 */
function ErrorMessage({ title, message }) {
  return (
    <div className="state-center" role="alert">
      <div className="state-icon" aria-hidden="true">⚠</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
