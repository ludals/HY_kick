import React from 'react';
import {
    Container,
    List,
    Item,
    Name,
    Content,
} from './TeamNavStyle';

const TeamScorers = ({ scorers }) => {
  return (
    <Container>
      <List>
        {scorers && scorers.map(scorer => (
        <Item key={scorer.id}>
          <Name>{scorer.playerName}</Name>
          <Content>{scorer.goals} 득점</Content>
        </Item>
      ))}
      </List>
    </Container>
  );
};

export default TeamScorers;