const API_KEY = "14dea7da566e33badd6e7eacd4c721b4";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchMovies(keyword: string) {
  console.log("keyword", keyword);

  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=en-US&page=1`
  ).then((response) => response.json());
}
