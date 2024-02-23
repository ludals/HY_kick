import React from 'react';
import ResultViewer from '../result/ResultViewer';
import {
    Container,
    MatchContainer,
    MatchWrapper,
} from './TeamNavStyle';

const Upcoming2Matches = ({ matches }) => {
    return (
      <Container><MatchWrapper>
      <MatchContainer>
        {matches.slice(0, 2).map((match, index) => (
          <ResultViewer key={index} match={match} />
        ))}
      </MatchContainer>
    </MatchWrapper></Container>
    
  );
};

const Recent2Matches = ({ matches }) => {
    return (
      <Container><MatchWrapper>
      <MatchContainer>
        {matches.slice(0, 2).map((match, index) => (
          <ResultViewer key={index} match={match} />
        ))}
      </MatchContainer>
    </MatchWrapper></Container>
    
  );
};

export { Upcoming2Matches, Recent2Matches };