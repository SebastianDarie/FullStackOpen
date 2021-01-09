interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: 'Fundamentals';
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: 'Context API';
  description: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

export interface SinglePart {
  part: CoursePart;
}

export interface Parts {
  courseParts: CoursePart[];
}
