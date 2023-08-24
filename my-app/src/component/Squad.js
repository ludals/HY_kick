import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Player from './Player';
import Position from './Position';
import './Squad.css';
import squadImg from "../asset/squad.jpg"

function Squad() {
  const [formation, setFormation] = useState('4-4-2');
  
  const fieldStyle = {
    backgroundImage: `url(${squadImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    // Add more players as needed
  ];
  const formations = {
    '4-4-2': ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
    '4-3-3': ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'RM', 'LW', 'ST', 'RW'],
    '3-5-2': ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'CM', 'RM', 'ST', 'ST'],
  };
  const positions = formations[formation];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Squad">
        <h1>스쿼드 메이커</h1>
        <select value={formation} onChange={e => setFormation(e.target.value)}>
          <option value="4-4-2">4-4-2</option>
          <option value="4-3-3">4-3-3</option>
          <option value="3-5-2">3-5-2</option>
          {/* Add more formations as needed */}
        </select>
      
        <div className={`field formation-${formation}`}style={fieldStyle}>
  {positions.map((position, index) => (
    <Position key={index} index={index} label={position} />
  ))}
 
</div>
        <div className="bench">
          {players.map(player => (
            <Player key={player.id} player={player} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default Squad;
