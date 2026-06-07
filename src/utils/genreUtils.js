/**
 * @fileoverview Genre lookup utilities for the podcast discovery app.
 * Resolves numeric genre IDs to their human-readable title strings.
 * @module utils/genreUtils
 */

import { genres } from "../data/genres.js";

/**
 * Resolves an array of genre IDs to their corresponding title strings.
 * Silently drops any ID that does not match a known genre.
 *
 * @param {number[]} ids - Array of numeric genre IDs (e.g. [1, 3, 7])
 * @returns {string[]} Array of matching genre title strings (e.g. ["Personal Growth", "History", "Fiction"])
 *
 * @example
 * getGenreNames([1, 9]); // → ["Personal Growth", "Kids and Family"]
 * getGenreNames([]);     // → []
 * getGenreNames([99]);   // → []  (unknown ID silently dropped)
 */
export function getGenreNames(ids = []) {
  return ids
    .map((id) => genres.find((g) => g.id === id)?.title)
    .filter(Boolean);
}
