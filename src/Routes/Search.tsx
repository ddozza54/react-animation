import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { IGetMoviesResult, getSearchMovies } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
  height: 300vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Result = styled.div`
  width: 100%;
  margin-top: 60px;
  padding: 10px 20px;
`;
const SearchMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 10px;
  margin: 15px 0;
`;

const Title = styled.h2`
  font-size: 25px;
`;

const Movie = styled(motion.div)<{ poster: string }>`
  min-height: 350px;
  background-image: url(${(props) => props.poster});
  background-size: cover;
  cursor: pointer;
`;

const MovieTitle = styled.h3`
  font-size: 20px;
`;

export default function Search() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "search"],
    () => getSearchMovies(search as string)
  );
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Result>
          <Title>"{search}"로 검색한 결과입니다.</Title>
          <SearchMovies>
            {data?.results
              .filter((movie) => movie.poster_path !== null)
              .map((movie) => (
                <Movie
                  key={movie.id}
                  poster={makeImagePath(movie.poster_path, "w300")}
                >
                  <MovieTitle>{movie.title}</MovieTitle>
                </Movie>
              ))}
          </SearchMovies>
        </Result>
      )}
    </Wrapper>
  );
}
