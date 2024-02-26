import { useState } from "react";
import styled from "styled-components";
import { BACKGROUND_COLOR, BORDER_RADIUS_30 } from "../../constants/styleconstant";
import { DAYS } from "../../constants/constant"

const UpcomingCard = (props) => {
  const [cardTouched, SetCardTouched] = useState(null);
  const [cardNum, setCardNum] = useState(null);
  const [prevCard, setPrevCard] = useState(null);
  const matches = [props.matches[0], props.matches[1], props.matches[2], props.matches[3], props.matches[4], props.matches[5]];

  const selectCard = (event, index) => {
    event.stopPropagation();
    if (!cardTouched)
      return;
    if (index === cardNum) {
      setCardNum(null);
    }
    else {
      setCardNum(index);
    }
    setPrevCard(cardNum);
  };

  const clickCard = () => {
    if (cardTouched) {
      SetCardTouched(false);
      setCardNum(null);
      setPrevCard(null);
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
          matches?.map((match, index) => {
            return (
              <Card
                $index={index}
                $touched={cardTouched}
                $cardNum={cardNum}
                $prevCard={prevCard}
                onClick={(evevt) => selectCard(evevt, index)}
                key={`${match.id}${match.home}`}
              >
                <MatchPreview
                  $index={index}
                  $cardNum={cardNum}
                >
                  <MatchInfo>
                    <ImageWrapper>
                      <TeamLogo src="/image/gaebal.jpg" alt="" />
                    </ImageWrapper>
                    <ImageWrapper>
                      <TeamLogo src="/image/gaebal.jpg" alt="" />
                    </ImageWrapper>
                    <MatchName>
                      <TeamName>{match.home}</TeamName>
                      {
                        index > 3 ? (
                          <MatchState>
                            예정
                          </MatchState>
                        ) : (
                          <MatchState>
                            <Score>3</Score>
                            -
                            <Score>2</Score>
                          </MatchState>
                        )
                      }
                      <TeamName>{match.away}</TeamName>
                    </MatchName>
                    <Time>
                      {new Date(match.date).getMonth() + 1}.{new Date(match.date).getDate()} ({DAYS[new Date(match.date).getDay()]})
                      {` ${match.time}`}:00
                    </Time>
                  </MatchInfo>
                  {(cardTouched) && <CloseButton src="/image/right_arrow.png" alt="" $index={index} $cardNum={cardNum} />}
                </MatchPreview>
              </Card>
            );
          })
        }
      </CardWrapper>
    </>
  );
};

export default UpcomingCard;

const Score = styled.div`
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const MatchState = styled.div`
  height: 1.5rem;
  font-weight: 700;
  gap: 0.3rem;
`;

const MatchName = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3rem 1fr;
  >:nth-child(n){
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TeamName = styled.div`
  height: 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
`;

const Time = styled.div`
  font-weight: 700;
  text-align: center;
`;

const MatchInfo = styled.div`
  width: 80%;
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 1.5rem 1rem;
  row-gap: 0.5rem;
  >:nth-child(n):not(:nth-child(3)){
    display: flex;
    justify-content: center;
    align-items: center;
  }
  >:nth-child(1){
    grid-area: 1/1/3/2;
  }
  >:nth-child(2){
    grid-area: 1/3/3/4;
  }
  >:nth-child(3){
    grid-area: 1/2/2/3;
  }
  >:nth-child(4){
    grid-area: 2/2/3/3;
  }
`;

const TeamLogo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const MatchPreview = styled.div`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${props => props.$index === props.$cardNum && '2px solid lightgray'};
`;

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

const CloseButton = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  transform: ${props => props.$cardNum === props.$index ? `rotate(90deg)` : `rotate(-90deg)`};
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 9rem;
  position: absolute;
  bottom: 0;
  animation: 
    ${props => props.$touched === null ? 'none' : (props.$touched ? 'CardIn' : 'CardOut')}
    500ms
    both;
  @keyframes CardIn {
    0%{
      height: 9rem;
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
      height: 9rem;
    }
  }
`;

const Card = styled.div`
  --index: ${props => props.$index};
  width: 100%;
  height: 50vh;
  position: absolute;
  top: ${props => (props.$touched ? `calc(${props.$index} * 4rem)` : `calc(${props.$index} * 1rem)`)};
  border-radius: ${BORDER_RADIUS_30};
  background-color: ${BACKGROUND_COLOR};
  z-index:${props => props.$index};
  box-shadow: 0 -0.5rem 1rem rgba(0, 0, 0, 0.4);
  animation: ${props => (props.$index === props.$cardNum ?
    'CardSelect'
    :
    (props.$index === props.$prevCard ?
      'CardRemove'
      :
      'none'
    )
  )} 
    300ms 
    ease-in 
    both,

    ${props => props.$touched === null ? 'none' : (props.$touched ? 'WideGap' : 'NarrowGap')}
    500ms
    both
    ;

  @keyframes NarrowGap {
    0%{
      top: calc(var(--index) * 4rem);
    }
    100%{
      top: calc(var(--index) * 1rem);
    }
  }

  @keyframes  WideGap {
    0%{
      top: calc(var(--index) * 1rem);
    }
    100%{
      top: calc(var(--index) * 4rem);
    }
  }

  @keyframes CardSelect {
    0%{
      transform: translate(0, 0);
    }
    100%{
      transform: translate(0, -20rem);
    }
  }

  @keyframes CardRemove {
    0%{
      transform: translate(0, -20rem);
    }
    100%{
      transform: translate(0, 0);
    }
  }
`;