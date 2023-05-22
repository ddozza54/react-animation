import React, { useState } from "react";
import { useQueries, useQuery } from "react-query";
import {
  IGetMoviesResult,
  getMovies,
  getPopularMovies,
  getTopMovies,
  upcomingMovies,
} from "../api";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { makeImagePath } from "../utils";
import { useHistory, useRouteMatch } from "react-router-dom";
import Slider from "../Components/Slider";
import { relative } from "path";

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

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Sliders = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, minmax(200px, 4fr));
`;

export default function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");

  const [
    { data: nowPlayingData, isLoading: isLoadingNow },
    { data: popularMovieData, isLoading: isLoagingPopular },
    { data: topMoviesData, isLoading: isLoagingTop },
    { data: upcomingMovie, isLoading: isLoagingUpcoming },
  ] = useQueries([
    { queryKey: ["nowPlaying", 1], queryFn: getMovies },
    { queryKey: ["latest", 2], queryFn: getPopularMovies },
    { queryKey: ["topRated", 3], queryFn: getTopMovies },
    { queryKey: ["upcoming", 4], queryFn: upcomingMovies },
  ]);

  const onOverlayClick = () => history.push("/");
  const { scrollY } = useScroll();
  const setScrollY = useTransform(scrollY, (vlaue) => vlaue + 100);
  
  //params 에 있는 Id 가 data 에 있는지 확인해야함.
  //일치하는 첫번째 데이터
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowPlayingData?.results.find(
      (movie: any) => movie.id === +bigMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {isLoadingNow ? (
        <Loader>Loading...</Loader>
      ) : (
        <div style={{ position: "relative" }}>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>

          <Sliders>
            {nowPlayingData && (
              <Slider sliderTitle="Now Playing" data={nowPlayingData} />
            )}

            {popularMovieData && (
              <Slider sliderTitle="Latest movies" data={popularMovieData} />
            )}

            {topMoviesData && (
              <Slider sliderTitle="Top Rated Movies" data={topMoviesData} />
            )}
            {upcomingMovie && (
              <Slider sliderTitle="Upcoming Movies" data={upcomingMovie} />
            )}
          </Sliders>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  onClick={onOverlayClick}
                />
                <BigMovie
                  style={{ top: setScrollY }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </Wrapper>
  );
}
