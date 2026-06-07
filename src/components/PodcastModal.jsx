/**
 * @fileoverview PodcastModal component.
 * Displays the full detail view for a selected podcast show.
 * @module components/PodcastModal
 */

import React, { useEffect } from "react";
import { getGenreNames } from "../utils/genreUtils.js";
import { formatRelativeDate, formatShortDate } from "../utils/dateUtils.js";

/**
 * @typedef {Object} Season
 * @property {number}   season   - Season number
 * @property {string}   title    - Season title
 * @property {string}   image    - Season cover URL
 * @property {Object[]} episodes - Array of episode objects
 */

/**
 * @typedef {Object} ShowDetail
 * @property {string|number} id          - Unique show identifier
 * @property {string}        title       - Show title
 * @property {string}        description - Full show description
 * @property {string}        image       - Cover art URL
 * @property {number[]}      genres      - Array of genre IDs
 * @property {string}        updated     - ISO 8601 last-updated date
 * @property {Season[]}      seasons     - Array of season objects
 */

/**
 * Full-screen modal overlay that presents detailed podcast information,
 * including image, description, genres, all seasons, and episode counts.
 * Closes on backdrop click or Escape key press.
 *
 * @component
 * @param {Object}     props
 * @param {ShowDetail} props.show    - The full show detail object fetched from the API
 * @param {Function}   props.onClose - Callback to close and unmount the modal
 * @returns {JSX.Element} An accessible modal dialog
 *
 * @example
 * <PodcastModal show={selectedShow} onClose={() => setSelectedShow(null)} />
 */
function PodcastModal({ show, onClose }) {
  const genreNames = getGenreNames(show.genres);

  /**
   * Registers and cleans up the Escape key listener for keyboard dismissal.
   * Fires once after mount and removes the listener on unmount.
   */
  useEffect(() => {
    /** @param {KeyboardEvent} e */
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /**
   * Closes the modal only when the user clicks the backdrop itself,
   * not any of its children.
   *
   * @param {React.MouseEvent} e
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${show.title}`}
    >
      <div className="modal-content">
        {/* ── Close button ── */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* ── Title ── */}
        <div className="title-section">
          <h2>{show.title}</h2>
        </div>

        {/* ── Banner: image + meta ── */}
        <div className="banner">
          <img
            className="modal-img"
            src={show.image}
            alt={`${show.title} cover art`}
          />
          <div className="info-section">
            <h3>
              {show.seasons?.length} Season
              {show.seasons?.length !== 1 ? "s" : ""}
            </h3>

            {/* Genre tags */}
            <div className="tags" aria-label="Genres">
              {genreNames.map((name) => (
                <span key={name} className="tag">
                  {name}
                </span>
              ))}
            </div>

            <p>{show.description}</p>

            <p className="modal-updated-text">
              Last updated:{" "}
              <time dateTime={show.updated}>
                {formatRelativeDate(show.updated)} ({formatShortDate(show.updated)})
              </time>
            </p>
          </div>
        </div>

        {/* ── Seasons list ── */}
        <div className="season-list">
          <h4 className="season-list-heading">Seasons</h4>
          <ul aria-label="Seasons list">
            {show.seasons?.map((season) => (
              <li key={season.season} className="season-item">
                <span className="season-title">
                  Season {season.season}: {season.title}
                </span>
                <span className="episodes">
                  {season.episodes?.length ?? 0} episode
                  {(season.episodes?.length ?? 0) !== 1 ? "s" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PodcastModal;
