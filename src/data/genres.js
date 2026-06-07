/**
 * @fileoverview Static genre data for the podcast discovery app.
 * Full podcast show data is fetched dynamically from the API.
 * @module data/genres
 */

/**
 * @typedef {Object} Genre
 * @property {number} id          - Unique genre identifier
 * @property {string} title       - Human-readable genre name
 * @property {string} description - Long description of the genre category
 * @property {string[]} shows     - Array of show IDs belonging to this genre
 */

/** @type {Genre[]} */
export const genres = [
  {
    id: 1,
    title: "Personal Growth",
    description:
      "Looking to improve yourself and reach your full potential? Look no further than our collection of personal growth podcasts! Our curated selection features a wide range of experts and thought leaders sharing their insights and strategies on everything from goal setting and productivity to mindfulness and self-care.",
    shows: ["10716", "10276", "6756", "10660"],
  },
  {
    id: 2,
    title: "Investigative Journalism",
    description:
      "Looking for a collection of podcasts that will keep you on the edge of your seat? Look no further than our selection of investigative journalism podcasts! These shows feature in-depth reporting and analysis of some of the most important and intriguing stories of our time.",
    shows: [
      "10716", "5675", "10539", "9177", "8860", "5012", "9054", "7654",
      "8256", "8291", "5718", "5276", "5964", "6465", "5320", "6451",
      "5692", "6430",
    ],
  },
  {
    id: 3,
    title: "History",
    description:
      "Experience the past like never before with our collection of history podcasts! Whether you're a history buff or just looking to learn something new, our selection of shows offers something for everyone. From ancient civilizations to modern times, our podcasts cover a wide range of historical topics.",
    shows: [
      "5279", "9177", "6807", "8514", "5629", "8364", "5964", "9041",
      "5702", "5320", "6717", "5968", "8760",
    ],
  },
  {
    id: 4,
    title: "Comedy",
    description:
      "Get ready to laugh with our collection of comedy podcasts! Whether you're in need of a pick-me-up or just looking for something to make you chuckle, our selection of shows has you covered. From stand-up comedy to improv, our podcasts feature a wide range of comedic styles and formats.",
    shows: ["6807"],
  },
  {
    id: 5,
    title: "Entertainment",
    description:
      "Entertainment lovers, get ready for a treat! Our collection of entertainment podcasts will keep you entertained, informed and up-to-date with all the latest trends, news and happenings in the entertainment world. From film and TV to music and celebrity interviews, our selection of shows covers it all.",
    shows: ["6807", "6631", "8256", "6756", "5702", "9620", "10758"],
  },
  {
    id: 6,
    title: "Business",
    description:
      "For those who want to keep their finger on the pulse of the entertainment industry, our collection of entertainment business podcasts is the perfect choice. These shows provide in-depth analysis and expert insight into the business side of the entertainment world.",
    shows: ["8364", "6717", "8760"],
  },
  {
    id: 7,
    title: "Fiction",
    description:
      "Get ready to be transported to new worlds and lose yourself in captivating stories with our collection of fiction-focused entertainment podcasts. These shows offer a wide range of fiction genres, from science fiction to fantasy, horror and more.",
    shows: ["6631", "9664", "8188", "9702", "9695", "9994", "9263", "9666"],
  },
  {
    id: 8,
    title: "News",
    description:
      "Stay informed and on top of the latest events with our collection of current news podcasts. These shows provide in-depth coverage and analysis of the most important stories happening around the world, from politics and world events to science and technology.",
    shows: ["8291", "5718"],
  },
  {
    id: 9,
    title: "Kids and Family",
    description:
      "Bring some fun and learning to your family's ears with our collection of kids and family podcasts. These shows offer a wide range of entertaining and educational content for children of all ages, from interactive storytelling to science experiments, music, comedy, and more.",
    shows: [
      "8188", "9687", "9702", "9665", "10182", "9994", "9705", "10934",
      "9694", "9693", "9704", "9739", "9691",
    ],
  },
];
