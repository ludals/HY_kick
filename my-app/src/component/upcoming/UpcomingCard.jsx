import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_COLOR, BORDER_RADIUS_30 } from "../../constants/styleconstant";

const UpcomingCard = (props) => {
  const [cardTouched, SetCardTouched] = useState(null);
  const [cardNum, setCardNum] = useState(null);
  const matches = [props.matches[0], props.matches[1], props.matches[2], props.matches[3], props.matches[4], props.matches[5]];

  const selectCard = (event, index) => {
    event.stopPropagation();
    if (!cardTouched)
      return;
    index !== cardNum ? setCardNum(index) : setCardNum(null);
  };

  const clickCard = () => {
    if (cardTouched) {
      SetCardTouched(false);
      setCardNum(null);
    }
    else {
      SetCardTouched(true);
    }
  };

  return (
    <>
      <CardWrapper $touched={cardTouched}>
        <OpenSection onClick={() => { clickCard() }}>
          <ArrowImg src="/image/right_arrow.png" alt="" $touched={cardTouched} />
          {
            cardTouched ? (
              <div>경기 정보 접기</div>
            ) : (
              <div>경기 정보 펼치기</div>
            )
          }
        </OpenSection>
        {
          matches.map((match, index) => {
            return (
              <Card
                $index={index}
                $touched={cardTouched}
                $cardNum={cardNum}
                onClick={(evevt) => selectCard(evevt, index)}
                key={`${match.id}${match.home}`}
              >

              </Card>
            );
          })
        }
      </CardWrapper>
    </>
  );
};

export default UpcomingCard;

const OpenSection = styled.div`
  width: auto;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translate(-50%);
  >div{
    font-weight: 700;
  }
`;

const ArrowImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  transform: ${props => props.$touched ? `rotate(90deg)` : `rotate(-90deg)`};
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 6rem;
  position: absolute;
  bottom: 0;
  animation: 
    ${props => props.$touched === null ? 'none' : (props.$touched ? 'CardIn' : 'CardOut')}
    100ms
    both;
  @keyframes CardIn {
    0%{
      height: 6rem;
    }
    100%{
      height: 24rem;
    }
  }
  @keyframes CardOut {
    0%{
      height: 24rem;
    }
    100%{
      height: 6rem;
    }
  }
`;

const Card = styled.div`
  width: 100%;
  height: 50vh;
  border-radius: ${BORDER_RADIUS_30};
  position: absolute;
  top: ${props => (props.$touched ? `calc(${props.$index} * 4rem)` : `calc(${props.$index} * 1rem)`)};
  background-color: ${BACKGROUND_COLOR};
  z-index:${props => props.$index};
  box-shadow: 0 -0.5rem 1rem rgba(0, 0, 0, 0.4);
  animation: 
      ${props => props.$cardNum === null ? 'none' : (props.$index === props.$cardNum ? 'CardSelect' : 'none')} 
      300ms 
      ease-in 
      both;
  @keyframes CardSelect {
    0%{
      transform: translate(0, 0);
    }
    100%{
      transform: translate(0, -20rem);
    }
  }
`;