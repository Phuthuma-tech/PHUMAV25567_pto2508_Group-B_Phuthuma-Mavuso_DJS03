/**
 * @fileoverview Date formatting utilities for the podcast discovery app.
 * Provides human-readable relative date strings without external dependencies.
 * @module utils/dateUtils
 */

/**
 * Converts an ISO 8601 date string into a human-readable relative time string.
 *
 * @param {string} isoString - A valid ISO 8601 date string (e.g. "2024-03-15T10:00:00Z")
 * @returns {string} A relative time string such as "Today", "3 days ago", "2 months ago", or "1 year ago"
 *
 * @example
 * formatRelativeDate("2024-01-01T00:00:00Z"); // → "5 months ago"
 * formatRelativeDate(new Date().toISOString()); // → "Today"
 */
export function formatRelativeDate(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
}

/**
 * Formats an ISO 8601 date string into a short localised date string.
 *
 * @param {string} isoString - A valid ISO 8601 date string
 * @returns {string} A localised date string, e.g. "15 Mar 2024"
 *
 * @example
 * formatShortDate("2024-03-15T10:00:00Z"); // → "15 Mar 2024"
 */
export function formatShortDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
