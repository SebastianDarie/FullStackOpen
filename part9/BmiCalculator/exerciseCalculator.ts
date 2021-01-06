interface InputVars {
  target: number;
  hours: Array<number>;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>): InputVars => {
  if (args.length < 4) throw new Error('Not enough args');

  const hours = args.slice(3).map((el) => Number(el));
  return {
    target: Number(args[2]),
    hours,
  };
};

export const calculateExercises = (
  hours: Array<number>,
  target: number
): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour !== 0).length;
  const average = hours.reduce((prev, curr) => prev + curr) / periodLength;
  const success = average > target;
  const ratio = average / target;
  const rating =
    average / target < 0.75 ? 1 : ratio >= 0.75 && ratio <= 1.25 ? 2 : 3;
  const ratingDescription = 'not too bad but could be better';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (err) {
  console.log(err);
}
