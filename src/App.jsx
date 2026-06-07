/**
 * @fileoverview App component — root of the podcast discovery app.
 * Orchestrates data fetching, state management, filtering, sorting,
 * and modal presentation. All child components receive their data via props.
 * @module App
 */

import React, { useState, useEffect, useCallback } from "react";

import Header          from "./components/Header.jsx";
import PodcastGrid     from "./components/PodcastGrid.jsx";
import PodcastModal    from "./components/PodcastModal.jsx";
import LoadingSpinner  from "./components/LoadingSpinner.jsx";
import ErrorMessage    from "./components/ErrorMessage.jsx";

import { fetchPodcasts, fetchShowById } from "./utils/api.js";

/**
 * Root application component.
 *
 * Responsibilities:
 * - Fetches the podcast preview list from the API on initial mount (`useEffect`)
 * - Manages loading, error, and data states via `useState`
 * - Derives the filtered and sorted list of podcasts for rendering
 * - Handles opening a detail modal by fetching the full show object by ID
 * - Passes all data down to child components exclusively through props
 *
 * @component
 * @returns {JSX.Element} The complete application tree
 */
function App() {
  /** @type {[Object[], Function]} Full list of podcast previews from the API */
  const [podcasts, setPodcasts] = useState([]);

  /** @type {[boolean, Function]} True while the initial list fetch is in progress */
  const [loading, setLoading] = useState(true);

  /** @type {[string|null, Function]} Error message string, or null when no error has occurred */
  const [error, setError] = useState(null);

  /** @type {[Object|null, Function]} Full show detail object for the open modal, or null */
  const [selectedShow, setSelectedShow] = useState(null);

  /** @type {[boolean, Function]} True while a show detail fetch is in progress */
  const [modalLoading, setModalLoading] = useState(false);

  /** @type {[string, Function]} Currently selected genre ID filter, or "all" */
  const [filterGenre, setFilterGenre] = useState("all");

  /** @type {[string, Function]} Currently selected sort key */
  const [sortBy, setSortBy] = useState("default");

  /**
   * Fetches the podcast preview list from the API once on component mount.
   * On success, stores the data in state.
   * On failure, stores the error message and clears loading.
   */
  useEffect(() => {
    fetchPodcasts()
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /**
   * Handles a card click: fetches the full show detail and opens the modal.
   * Shows a modal-level loading state while the fetch is in progress.
   *
   * @param {Object} preview - The podcast preview object that was clicked
   */
  const handleCardClick = useCallback((preview) => {
    setModalLoading(true);
    fetchShowById(preview.id)
      .then((data) => {
        setSelectedShow(data);
        setModalLoading(false);
      })
      .catch(() => {
        setModalLoading(false);
      });
  }, []);

  /** Closes the modal and clears the selected show from state. */
  const handleModalClose = useCallback(() => {
    setSelectedShow(null);
  }, []);

  /**
   * Derives the displayed podcast list by applying the active genre filter
   * and sort order to the full podcasts array.
   *
   * @type {Object[]}
   */
  const displayedPodcasts = podcasts
    .filter((p) =>
      filterGenre === "all" ? true : p.genres?.includes(Number(filterGenre))
    )
    .sort((a, b) => {
      if (sortBy === "title-asc")  return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "newest")     return new Date(b.updated) - new Date(a.updated);
      if (sortBy === "oldest")     return new Date(a.updated) - new Date(b.updated);
      return 0;
    });

  return (
    <>
      {/* ── Sticky header with filter controls ── */}
      <Header
        filterGenre={filterGenre}
        onFilterGenreChange={setFilterGenre}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {/* ── Hero section ── */}
      <section className="hero" aria-label="App introduction">
        <p className="hero-eyebrow">Discover · Listen · Explore</p>
        <h2>
          Your next favourite<br />podcast is here.
        </h2>
        <p>
          Browse hundreds of shows across comedy, history, fiction, and more —
          updated daily.
        </p>
      </section>

      {/* ── Loading state ── */}
      {loading && <LoadingSpinner message="Loading podcasts…" />}

      {/* ── Error state ── */}
      {!loading && error && (
        <ErrorMessage
          title="Something went wrong"
          message={`${error}. Please check your connection and refresh.`}
        />
      )}

      {/* ── Empty state (filter returned no results) ── */}
      {!loading && !error && displayedPodcasts.length === 0 && (
        <ErrorMessage
          title="No podcasts found"
          message="Try selecting a different genre or resetting your filters."
        />
      )}

      {/* ── Podcast grid ── */}
      {!loading && !error && displayedPodcasts.length > 0 && (
        <>
          <p className="results-count" aria-live="polite">
            {displayedPodcasts.length} show
            {displayedPodcasts.length !== 1 ? "s" : ""}
          </p>
          <PodcastGrid podcasts={displayedPodcasts} onSelect={handleCardClick} />
        </>
      )}

      {/* ── Modal loading overlay ── */}
      {modalLoading && (
        <div className="modal" role="dialog" aria-label="Loading show details">
          <div style={{ color: "#fff" }}>
            <LoadingSpinner message="Loading show details…" />
          </div>
        </div>
      )}

      {/* ── Show detail modal ── */}
      {selectedShow && !modalLoading && (
        <PodcastModal show={selectedShow} onClose={handleModalClose} />
      )}
    </>
  );
}

export default App;
