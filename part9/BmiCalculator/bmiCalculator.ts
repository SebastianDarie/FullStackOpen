interface BMIValues {
  height: number;
  weight: number;
}

const parseValues = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough args');
  if (args.length > 4) throw new Error('Too many args');

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / Math.pow(height / 100, 2);
  switch (true) {
    case BMI <= 15:
      return 'Very severely underweight';
    case BMI >= 15 && BMI <= 16:
      return 'Severely underweight';
    case BMI >= 16 && BMI <= 18.5:
      return 'Underweight';
    case BMI >= 18.5 && BMI <= 25:
      return 'Normal (healthy weight)';
    case BMI >= 25 && BMI <= 30:
      return 'Overweight';
    case BMI >= 30 && BMI <= 35:
      return 'Obese Class I (Moderately obese)';
    case BMI >= 35 && BMI <= 40:
      return 'Obese Class II (Severely obese)';
    case BMI >= 40:
      return 'Obese Class III (Very severely obese)';
    default:
      return 'error';
  }
};

try {
  const { height, weight } = parseValues(process.argv);
  console.log(calculateBmi(height, weight));
} catch (err) {
  console.log(err);
}
