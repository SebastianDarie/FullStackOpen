import React from 'react';

interface TotalProps {
  courseParts: Array<{ name: string; exerciseCount: number }>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((prev, curr) => prev + curr.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;
