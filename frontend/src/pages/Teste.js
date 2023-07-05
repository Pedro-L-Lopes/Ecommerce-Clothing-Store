import React, { useState } from 'react';

const SelectWithHover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseOver = () => {
    setIsOpen(true);
  };

  const handleMouseOut = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Hover para abrir o select
      </div>

      {isOpen && (
        <select>
          <option value="option1">Opção 1</option>
          <option value="option2">Opção 2</option>
          <option value="option3">Opção 3</option>
        </select>
      )}
    </div>
  );
};

export default SelectWithHover;
