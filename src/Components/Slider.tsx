import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMoviesResult } from "../api";

const SliderBox = styled(motion.div)`
  height: 300px;
  position: relative;
`;

const SliderTitle = styled.h3`
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  border-radius: 3px;
  height: 200px;
  color: black;
  font-size: 66px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const BoxTitle = styled(motion.div)`
  padding: 10px 0;
  background-color: ${(props) => props.theme.black.lighter};
  font-size: 20px;
  display: flex;
  justify-content: center;
  color: ${(prop) => prop.theme.white.darker};
  top: 100px;
`;

const SliderBtn = styled(motion.button)`
  width: 50px;
  height: 50px;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 5;
`;

const Svg = styled.svg`
  width: 18px;
  path {
    fill: ${(props) => props.theme.black.lighter};
  }
`;

const BoxVariants = {
  normal: {
    scale: 1,
    type: "tween",
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duaration: 0.3,
      type: "tween",
    },
  },
};

const rowVariants = {
  hidden: (isNextBtn: boolean) => ({
    x: isNextBtn ? window.outerWidth + 5 : -(window.outerWidth + 5),
  }),
  visible: { x: 0 },
  exit: (isNextBtn: boolean) => ({
    x: isNextBtn ? -(window.outerWidth + 5) : window.outerWidth + 5,
  }),
};

interface Islider {
  sliderTitle: string;
  data: IGetMoviesResult;
}

const offset = 6;

export default function Slider({ sliderTitle, data }: Islider) {
  const history = useHistory();
  const [isNextBtn, setIsNextBtn] = useState(true);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  const incraseIndex = () => {
    if (data) {
      setIsNextBtn(true);
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreseIndex = () => {
    if (data) {
      setIsNextBtn(false);
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <>
      <SliderBox>
        <SliderTitle>{sliderTitle}</SliderTitle>
        <SliderBtn
          onClick={decreseIndex}
          style={{ top: 100, left: 3 }}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </Svg>
        </SliderBtn>
        <SliderBtn
          onClick={incraseIndex}
          style={{ top: 100, right: 3 }}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </Svg>
        </SliderBtn>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: "1", delay: 0.3 }}
            custom={isNextBtn}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + ""}
                  variants={BoxVariants}
                  initial="normal"
                  key={movie.id}
                  whileHover="hover"
                  onClick={() => onBoxClicked(movie.id)}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <BoxTitle>
                    <span>{movie.title}</span>
                  </BoxTitle>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </SliderBox>
      
    </>
  );
}
