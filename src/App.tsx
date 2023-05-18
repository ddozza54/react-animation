import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

const showingVa = {
  initial: {
    opacity: 0,
    scale: 0,
    x: 500,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 1 },
  },
  leaving: {
    opacity: 0,
    x: -500,
    transition: { duration: 1 },
  },
};
export default function App() {
  const [visible, setVisible] = useState(1);
  const nextPlease = () => {
    setVisible((prev) => (prev === 8 ? 8 : prev + 1));
  };
  const prevPlease = () => {
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) =>
          i === visible ? (
            <Box
              variants={showingVa}
              initial="initial"
              animate="visible"
              exit="leaving"
              key={i}
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
      <button onClick={prevPlease}>Prev</button>
      <button onClick={nextPlease}>Next</button>
    </Wrapper>
  );
}
