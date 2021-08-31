const atoresEatrizes = ["Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"];

db.movies.aggregate([

  {
    $match: {
      $and: [
        { countries: { $all: ["USA"] } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $exists: true } },
      ],
    },
  },
  {
    $addFields: {
      atoresEatrizesBuscados: { $setIntersection: [atoresEatrizes, "$cast"] },
    },
  },
  {
    $addFields: {
      num_favs: { $size: "$atoresEatrizesBuscados" },
    },
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  {
    $project: {
      _id: false,
      title: true,
    },
  },
]);