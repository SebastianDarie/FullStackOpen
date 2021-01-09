import React from 'react';
import { Parts, SinglePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Content: React.FC<Parts> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

const Part: React.FC<SinglePart> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>Exercise count {part.exerciseCount}</li>
            <li>Description {part.description}</li>
          </ul>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>Exercise count {part.exerciseCount}</li>
            <li>Group Project Count {part.groupProjectCount}</li>
          </ul>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>Exercise count {part.exerciseCount}</li>
            <li>Description {part.description}</li>
            <li>Submission link {part.exerciseSubmissionLink}</li>
          </ul>
        </div>
      );
    case 'Context API':
      return (
        <div>
          <b>{part.name}</b>
          <ul>
            <li>Exercise count {part.exerciseCount}</li>
            <li>Description {part.description}</li>
          </ul>
        </div>
      );
    default:
      return assertNever(part);
  }
};
