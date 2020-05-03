import React from 'react';

import Square from './Square';

export default React.memo(function Row({ list, position }) {
  return (
    <div className="row">
      {list.map((value, index) => (
        <Square
          key={index}
          value={value}
          isCurrent={position && position[0] === index}
        />
      ))}
    </div>
  )
})
