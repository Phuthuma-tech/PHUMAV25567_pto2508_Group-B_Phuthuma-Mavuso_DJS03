/**
 * @fileoverview Header component.
 * Sticky top navigation bar with branding and filter/sort controls.
 * @module components/Header
 */

import React from "react";
import { genres } from "../data/genres.js";

/**
 * Sticky application header that renders the app logo and the
 * genre filter and sort-order dropdowns.
 *
 * @component
 * @param {Object}   props
 * @param {string}   props.filterGenre           - Currently selected genre ID, or "all"
 * @param {Function} props.onFilterGenreChange   - Callback when the genre dropdown changes
 * @param {string}   props.sortBy                - Currently selected sort key
 * @param {Function} props.onSortByChange        - Callback when the sort dropdown changes
 * @returns {JSX.Element} The sticky site header element
 *
 * @example
 * <Header
 *   filterGenre={filterGenre}
 *   onFilterGenreChange={setFilterGenre}
 *   sortBy={sortBy}
 *   onSortByChange={setSortBy}
 * />
 */
function Header({ filterGenre, onFilterGenreChange, sortBy, onSortByChange }) {
  return (
    <header className="app-header">
      <h1>
        Pod<span>Cast</span>
      </h1>

      <div className="filters" role="group" aria-label="Filter and sort controls">
        <label htmlFor="genre-filter">Genre</label>
        <select
          id="genre-filter"
          value={filterGenre}
          onChange={(e) => onFilterGenreChange(e.target.value)}
          aria-label="Filter by genre"
        >
          <option value="all">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>

        <label htmlFor="sort-select">Sort</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          aria-label="Sort podcasts"
        >
          <option value="default">Default</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
