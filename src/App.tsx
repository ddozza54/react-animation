import React from "react";
import styled from "styled-components";
import { motion, spring } from "framer-motion";
import { start } from "repl";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { scale: 1.5, rotateZ: 180 },
  click: { scale: 1, borderRadius: "100px" },
  drag: {
    backgroundColor: "rgb(129, 236, 236)",
    transition: { duration: 5 },
  },
};

export default function App() {
  return (
    <Wrapper>
      <Box
        variants={boxVariants}
        drag
        whileHover="hover"
        whileTap="click"
        whileDrag="drag"
      />
    </Wrapper>
  );
}
