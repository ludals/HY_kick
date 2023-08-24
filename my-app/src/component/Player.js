import React from 'react';
import { useDrag } from 'react-dnd';

const Player = ({ player }) => {
  const [, ref] = useDrag({
    type: 'PLAYER',
    item: { player },
  });

  return (
    <div ref={ref} className="player">
      {player.name}
    </div>
  );
};

export default Player;
