import { AnimatePresence, animate, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #97f6a4, #ffc67b);
`;

const Grid = styled.div`
  display: grid;
  width: 40vw;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  margin-bottom: 20px;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Cicle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgb(154, 236, 219);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const SwtichBtn = styled(motion.button)`
  color: rgb(27, 156, 252);
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export default function App() {
  const [id, setId] = useState(null);
  const [circleClicked, setCircleClicked] = useState(false);
  const circleClick = () => setCircleClicked((prev) => !prev);
  const scaleDirection = {
    animate: (id: string) => ({
      x: id === "1" ? "-10%" : "10%",
      y: id === "1" ? "-10%" : "10%",
      scale: 1.2,
    }),
  };
  return (
    <AnimatePresence custom={id}>
      <Wapper>
        <Grid>
          {["1", "4"].map((i: any) => (
            <Box
              key={i}
              layoutId={i}
              onClick={() => setId(i)}
              transition={{ type: "tween", duration: 0.3 }}
              variants={scaleDirection}
              custom={i}
              whileHover="animate"
            />
          ))}
          <Box style={{ gridColumn: "2/-1", gridRow: "1/2" }}>
            {!circleClicked ? <Cicle layoutId="circle" /> : null}
          </Box>
          <Box style={{ gridColumn: "1/2", gridRow: "2/3" }}>
            {circleClicked ? <Cicle layoutId="circle" /> : null}
          </Box>
        </Grid>
        <SwtichBtn
          onClick={circleClick}
          whileTap={{ scale: 1.5, color: "rgb(252, 66, 123)" }}
        >
          Switch
        </SwtichBtn>
        <AnimatePresence>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              animate={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Box
                key={id}
                layoutId={id}
                style={{
                  backgroundColor: "white",
                  width: "300px",
                  height: "200px",
                }}
              />
            </Overlay>
          ) : null}
        </AnimatePresence>
      </Wapper>
    </AnimatePresence>
  );
}
