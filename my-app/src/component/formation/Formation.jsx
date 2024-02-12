import React, { useState } from 'react';
import {
  FormationCard, FormationName, Spacer, FormationContainer,
  getFormationData, getPositionStyle, FormationMap, FormationModal
} from "./FormationStyle";

const Formation = ({ formation, players, isResult }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const handlePlayerClick = (playerName) => {
    setSelectedPlayer(playerName);
    setShowModal(true);
  };

  return (
    <FormationCard>
      <FormationName>
        {/* 전 경기 포메이션: */}
        {formation}
      </FormationName>
      <Spacer />
      <FormationContainer>
        <FormationMap
          formationData={getFormationData(formation)}
          players={players}
          getPositionStyle={getPositionStyle}
          formation={formation}
          isResult={isResult}
          handlePlayerClick={handlePlayerClick}
        />
      </FormationContainer>
      <FormationModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />
    </FormationCard>
  );
};

export default Formation;
