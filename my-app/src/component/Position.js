import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const Position = ({ index }) => {
  const [player, setPlayer] = useState(null);

  const [, ref] = useDrop({
    accept: 'PLAYER',
    drop: (item) => {
      setPlayer(item.player);
    },
  });

  return (
    <div ref={ref} className="position">
      {player ? player.name : `Position ${index}`}
    </div>
  );
};

export default Position;
