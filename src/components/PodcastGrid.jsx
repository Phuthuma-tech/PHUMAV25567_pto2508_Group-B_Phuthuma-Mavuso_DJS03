/**
 * @fileoverview PodcastGrid component.
 * Renders the responsive grid of PodcastPreviewCard tiles.
 * @module components/PodcastGrid
 */

import React from "react";
import PodcastPreviewCard from "./PodcastPreviewCard.jsx";

/**
 * Renders a CSS grid of podcast preview cards.
 * Each card is produced by mapping over the provided podcasts array
 * and rendering a {@link PodcastPreviewCard} for each item.
 *
 * @component
 * @param {Object}     props
 * @param {Object[]}   props.podcasts  - Array of podcast preview objects to display
 * @param {Function}   props.onSelect  - Callback fired when the user selects a card
 * @returns {JSX.Element} A `<main>` element containing the responsive podcast grid
 *
 * @example
 * <PodcastGrid podcasts={filteredPodcasts} onSelect={handleCardClick} />
 */
function PodcastGrid({ podcasts, onSelect }) {
  return (
    <main className="grid" aria-label="Podcast previews">
      {podcasts.map((podcast) => (
        <PodcastPreviewCard
          key={podcast.id}
          podcast={podcast}
          onClick={onSelect}
        />
      ))}
    </main>
  );
}

export default PodcastGrid;
