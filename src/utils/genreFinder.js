const findGenre = (movie, genres) => {
  const { genre_ids } = movie;
  //   console.log(movie);
  //   console.log(genres);

  if (genres.length <= 0) {
    return;
  } else
    return genre_ids.map(
      idSearch => `/` + genres.find(genre => genre.id === idSearch).name,
    );
};
export default findGenre;
