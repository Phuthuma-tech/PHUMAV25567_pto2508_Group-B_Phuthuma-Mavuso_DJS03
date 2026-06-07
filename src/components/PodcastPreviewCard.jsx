/**
 * @fileoverview PodcastPreviewCard component.
 * Renders a single podcast tile inside the landing page grid.
 * @module components/PodcastPreviewCard
 */

import React from "react";
import { getGenreNames } from "../utils/genreUtils.js";
import { formatRelativeDate } from "../utils/dateUtils.js";

/**
 * @typedef {Object} PodcastPreview
 * @property {string|number} id      - Unique show identifier
 * @property {string}        title   - Show title
 * @property {string}        image   - URL of the show's cover art
 * @property {number}        seasons - Total number of seasons available
 * @property {number[]}      genres  - Array of numeric genre IDs
 * @property {string}        updated - ISO 8601 date string of the last update
 */

/**
 * A reusable card component that displays a podcast preview with cover art,
 * title, season count, genre tags, and a relative last-updated date.
 *
 * @component
 * @param {Object}         props
 * @param {PodcastPreview} props.podcast  - The podcast preview data object passed from the API
 * @param {Function}       props.onClick  - Callback fired when the card is activated (click or Enter key)
 * @returns {JSX.Element} An interactive podcast preview card
 *
 * @example
 * <PodcastPreviewCard podcast={podcastData} onClick={(p) => openModal(p)} />
 */
function PodcastPreviewCard({ podcast, onClick }) {
  const genreNames = getGenreNames(podcast.genres);
  const relativeDate = formatRelativeDate(podcast.updated);

  /** Handles keyboard activation so the card is accessible without a mouse. */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(podcast);
    }
  };

  return (
    <article
      className="podcast-card"
      onClick={() => onClick(podcast)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${podcast.title}`}
    >
      {/* ── Cover art ── */}
      <div className="card-img-wrap">
        <img
          src={podcast.image}
          alt={`${podcast.title} cover art`}
          loading="lazy"
          decoding="async"
        />
        <div className="card-overlay" aria-hidden="true" />
      </div>

      {/* ── Card body ── */}
      <div className="card-body">
        <h2 className="card-title">{podcast.title}</h2>

        <div className="card-meta">
          <span className="seasons-badge">
            {podcast.seasons} Season{podcast.seasons !== 1 ? "s" : ""}
          </span>
          <time
            className="card-date"
            dateTime={podcast.updated}
            title={new Date(podcast.updated).toLocaleDateString()}
          >
            {relativeDate}
          </time>
        </div>

        {/* ── Genre tags ── */}
        {genreNames.length > 0 && (
          <div className="tags" aria-label="Genres">
            {genreNames.slice(0, 3).map((name) => (
              <span key={name} className="tag-dark">
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default PodcastPreviewCard;
