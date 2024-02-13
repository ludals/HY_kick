import React, { useState, useRef, useEffect } from 'react';
import Formation from '../formation/Formation';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailedViewer from './DetailedViewer';
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR
} from "../../constants/styleconstant";


const ResultSlide = ({ Team1, Team2 }) => {
  const { matchID } = useParams();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [startX, setStartX] = useState(0);
  const slideContainerRef = useRef(null);

  useEffect(() => {
    const slideContainer = slideContainerRef.current;

    const handleTouchStart = (e) => {
      setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      const x = e.touches[0].clientX;
      const deltaX = startX - x;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    slideContainer.addEventListener('touchstart', handleTouchStart);
    slideContainer.addEventListener('touchmove', handleTouchMove);

    return () => {
      slideContainer.removeEventListener('touchstart', handleTouchStart);
      slideContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, [startX]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1);
  };

  return (
    <SlideWrapper>
      <SlideContainer ref={slideContainerRef} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        <Slide>
            <Formation formation="4-2-3-1"
              players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']}
              isResult={true} />
        </Slide>
        <Slide>
            <DetailedViewer />
        </Slide>
        <Slide>
          <Formation formation="4-4-2"
              players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']}
            isResult={true} />
        </Slide>
      </SlideContainer>
    </SlideWrapper>
  );
};

export default ResultSlide;

const SlideWrapper = styled.div`
  width: 85%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  width: 28rem;//SlideWrapper의 width: 85%와 맞춘것
  transition: transform 0.5s ease;
`;

const Slide = styled.div`
  height: fit-content;
  margin-right: 1rem;
  margin-left: 1rem;
  // width: 25rem;
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
`;