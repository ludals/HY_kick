import React from 'react';
import {
    Container,
    List,
    Item,
    Name,
    Content,
    PresidentText
} from './TeamNavStyle';

const TeamPlayers = ({ players }) => {
  return (
    <Container>
      <List>
        {players.map(player => (
          <Item key={player.id}>
            <div>
              <Name>{player.playerName}</Name>
              {player.isPresident && <PresidentText>회장</PresidentText>}
            </div>
            <Content>{player.position}</Content>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default TeamPlayers;
