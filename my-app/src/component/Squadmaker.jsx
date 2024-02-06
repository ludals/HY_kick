import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFormationData, getPositionStyle } from './Formation.jsx';

const SquadMaker = ({ formation, players }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedFormation, setFormation] = useState(formation);

  useEffect(() => {
    setFormation(formation);
  }, [formation]);

  const handlePlayerSelection = (playerName, index) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = playerName;
    setSelectedPlayers(updatedPlayers);
  };

  const handleSave = () => {
    // TODO: Save selectedPlayers to the database
    console.log('Selected Players:', selectedPlayers);
    // Add logic to save 'selectedPlayers' in the database
  };

  const formationData = getFormationData(selectedFormation);

  return (
    <SquadContainer>
      <h1>스쿼드 메이커</h1>
      <FormationSelection value={selectedFormation} onChange={(e) => setFormation(e.target.value)}>
        <option value="포메이션">포메이션</option>
        <option value="4-4-2">4-4-2</option>
        <option value="4-3-3">4-3-3</option>
        <option value="3-5-2">3-5-2</option>
        <option value="3-4-3">3-4-3</option>
        <option value="5-3-2">5-3-2</option>
        <option value="5-4-1">5-4-1</option>
        <option value="3-3-4">3-3-4</option>
        <option value="3-6-1">3-6-1</option>
        <option value="4-2-3-1">4-2-3-1</option>
        <option value="4-1-4-1">4-1-4-1</option>
        <option value="4-3-1-2">4-3-1-2</option>
        <option value="3-4-1-2">3-4-1-2</option>
        <option value="3-4-2-1">3-4-2-1</option>
        <option value="3-1-4-2">3-1-4-2</option>
        {/* Add more formations as needed */}
      </FormationSelection>

      <FormationContainer className={`field formation-${selectedFormation}`}>
        {formationData.map((position, index) => {
          const style = getPositionStyle(selectedFormation, index);
          return (
            <PositionContainer key={index}>
              <PlayerSelect
                style={{ top: `${style.top}`, left: `${style.left}` }}
                onChange={(e) => handlePlayerSelection(e.target.value, index)}
                value={selectedPlayers[index] || ''}
              >
                <option value="">이름</option>
                {players.map((player, playerIndex) => (
                  <option key={playerIndex} value={player}>
                    {player}
                  </option>
                ))}
              </PlayerSelect>
            </PositionContainer>
          );
        })}
      </FormationContainer>

      <SaveButton onClick={handleSave}>Save</SaveButton>
    </SquadContainer>
  );
};

export default SquadMaker;

const SquadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormationSelection = styled.select`
  margin-bottom: 20px;
  font-size: 16px;
  padding: 8px;
`;

const FormationContainer = styled.div`
  position: relative;
  background-image: url(${"/image/field.jpg"});
  width: 360px;
  height: 306px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
`;

const PlayerSelect = styled.select`
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background: white;
  color: black;
  outline: none;
  width: 60px;
  height: 20px;
`;

const PositionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;