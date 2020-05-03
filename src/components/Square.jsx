import React from 'react';

function getValueFromBinary(binary) {
  return binary ? '🍖' : null;
}

export default React.memo(function Square({ value, isCurrent }) {
  const uiValue = isCurrent ? '🐕' : getValueFromBinary(value);
  const classname = isCurrent ? 'active' : '';

  return (
    <span className={`square ${classname}`}>
      {uiValue}
    </span>
  );
});
