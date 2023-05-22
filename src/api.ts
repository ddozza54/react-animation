const API_KEY = "14dea7da566e33badd6e7eacd4c721b4";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
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

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGRlYTdkYTU2NmUzM2JhZGQ2ZTdlYWNkNGM3MjFiNCIsInN1YiI6IjY0Njg4YWRiYTUwNDZlMDEyNDY3YTQwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SHS2ccg3VvUJc0UbSNtnCxs2XEocQW0MRBRml5hNvtE",
  },
};

export function getMovies() {
  // return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
  //   (response) => response.json()
  // );
  return fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  ).then((response) => response.json());
}

export function getPopularMovies() {
  // return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
  //   (response) => response.json()
  // );
  return fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  ).then((response) => response.json());
}

export function getTopMovies() {
  // return fetch(
  //   `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  // ).then((response) => response.json());
  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  ).then((response) => response.json());
}

export function upcomingMovies() {
  // return fetch(
  //   `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  // ).then((response) => response.json());
  return fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
    options
  ).then((response) => response.json());
}

// keyword 어떻게 넣지?
export function getSearchMovies(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&include_adult=false&language=en-US&page=1`
  ).then((response) => response.json());
}
