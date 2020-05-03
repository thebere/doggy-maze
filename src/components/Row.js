import React from 'react';

import Square from './Square';

export default React.memo(function Row({ cellCount, list, position }) {
  return (
    <div className="row">
      {list.map((value, i) => (
        <Square
          key={i}
          value={value}
          isCurrent={position && position[0] === i}
        />
      ))}
    </div>
  )
})
