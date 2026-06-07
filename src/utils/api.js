/**
 * @fileoverview API service layer for the podcast discovery app.
 * Centralises all network requests to the podcast API.
 * @module utils/api
 */

/** Base URL for the podcast REST API. */
const BASE_URL = "https://podcast-api.netlify.app";

/**
 * Fetches the full list of podcast preview objects from the API.
 * Each preview contains id, title, description, seasons, image, genres, and updated fields.
 *
 * @async
 * @returns {Promise<Object[]>} Resolves with an array of podcast preview objects
 * @throws {Error} Rejects with a descriptive error if the request fails or returns a non-OK status
 *
 * @example
 * const previews = await fetchPodcasts();
 * console.log(previews[0].title); // → "Something Was Wrong"
 */
export async function fetchPodcasts() {
  const response = await fetch(`${BASE_URL}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch podcasts — HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Fetches the full detail object for a single podcast show by its ID.
 * The detail object includes the seasons array, each with an episodes array.
 *
 * @async
 * @param {string|number} id - The unique identifier of the podcast show
 * @returns {Promise<Object>} Resolves with the full show detail object
 * @throws {Error} Rejects with a descriptive error if the request fails or returns a non-OK status
 *
 * @example
 * const show = await fetchShowById("10716");
 * console.log(show.seasons.length); // → 3
 */
export async function fetchShowById(id) {
  const response = await fetch(`${BASE_URL}/id/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch show ${id} — HTTP ${response.status}`);
  }
  return response.json();
}
