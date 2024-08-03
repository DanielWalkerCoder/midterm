import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increaseByThree, setHit } from '../global/slices/hitSlice';

const Controls = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    dispatch(increaseByThree());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const value = Number(inputValue);
    if (!isNaN(value)) {
      dispatch(setHit(value));
    }
    setInputValue('');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Increase by 3</button>
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Set Hit</button>
      </form>
    </div>
  );
};

export default Controls;
