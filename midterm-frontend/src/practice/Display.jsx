import React from 'react';
import { useSelector } from 'react-redux';

const Display = () => {
  const hit = useSelector((state) => state.hit.value);

  return <div>Current Hit: {hit}</div>;
};

export default Display;