import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ResultViewer from "../result/ResultViewer";

import {
  UpcomingWrapper,
  UpcomingHeader,
  UpcomingView,
  UpcomingBody,
  UpcomingFooter,
  Pagination,
  PaginationDot
} from "./UpcomingStyle";

const Upcoming = (props) => {
  const prevMatch = [props.matches[0], props.matches[1]];
  const upcomingMatch1 = [props.matches[2], props.matches[3]];
  const upcomingMatch2 = [props.matches[4], props.matches[5]];
  const ref = useRef(null);
  const fontSize = window.getComputedStyle(document.documentElement).fontSize.slice(0, -2);
  const matchWrapperSize = 27 * fontSize;
  const [swiped, setSwiped] = useState(false);
  const [positionx, setPositionx] = useState(0);
  const [imgCount, setImgCount] = useState(1);

  const swipe = (div) => {
    if (div) {
      if (imgCount !== 3) {
        const move = (-matchWrapperSize * imgCount)
        div.style.transform = `translateX(calc(${move}px))`;
        setImgCount(imgCount + 1);
      }
      else {
        div.style.transform = `translateX(calc(${matchWrapperSize * 0}px))`;
        setImgCount(1);
      }
    }
  };

  useEffect(() => {
    const div = ref.current;
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      swipe(div)
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [imgCount]);

  const matchComponent = (matches) => {
    return (
      <div style={{ display: "flex", gap: "1rem", flexDirection: "column", margin: "0 1rem" }}>
        {matches.map((match) => {
          return (
            <ResultViewer
              key={match.id}
              width={'22rem'}
              match={match}
            />
          );
        })}
      </div>
    );
  };

  const prev = matchComponent(prevMatch);
  const upcoming1 = matchComponent(upcomingMatch1);
  const upcoming2 = matchComponent(upcomingMatch2);
  const matchComponents = [prev, upcoming1, upcoming2];

  const onTouchEnd = (e) => {
    const swipe = positionx - e.changedTouches[0].pageX;
    const div = ref.current;
    if (swipe > 30) {
      if (imgCount !== 3) {
        const move = (-matchWrapperSize * imgCount)
        div.style.transform = `translateX(calc(${move}px))`;
        setImgCount(imgCount + 1);
      }
      else {
        div.style.transform = `translateX(calc(${matchWrapperSize * 0}px))`;
        setImgCount(1);
      }
      setSwiped(true);
    }
    else if (swipe < -30) {
      if (imgCount !== 1) {
        const move = (-matchWrapperSize * (imgCount - 2))
        div.style.transform = `translateX(calc(${move}px))`;
        setImgCount(imgCount - 1);
      }
      else {
        div.style.transform = `translateX(calc(${-matchWrapperSize * 2}px))`;
        setImgCount(3);
      }
      setSwiped(true);
    }
  };


  return (
    <UpcomingWrapper>
      <UpcomingHeader>
        경기 일정/결과
      </UpcomingHeader>
      <UpcomingView onTouchStart={(e) => setPositionx(e.changedTouches[0].pageX)} onTouchEnd={onTouchEnd}>
        <div ref={ref} className="upcoming_container">
          {
            matchComponents.map((match, index) =>
              <UpcomingBody key={match + index}>
                {match}
              </UpcomingBody>
            )
          }
        </div>
      </UpcomingView>
      <Pagination>
        {
          matchComponents.map((_, idx) =>
            <PaginationDot key={idx} $index={idx} $imgcount={imgCount} />
          )
        }
      </Pagination>
      <UpcomingFooter className="UpcomingFooter">
        <Link to="/schedule" className="link">
          <span>전체 일정 보기</span>
        </Link>
      </UpcomingFooter>
    </UpcomingWrapper>
  );
}

export default Upcoming;