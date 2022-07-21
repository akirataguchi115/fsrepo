interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (args: Array<number>, target: number): ExerciseResult => {
  const deduction = ((args.reduce((a, b) => a + b, 0) / args.length) - target)
  const rating = () => {
    if (deduction >= 0) return 3;
    else if (deduction >= -1) return 2;
    else return 1;
  }
  const description = () => {
    switch (rating()) {
      case 3: return 'Winner!'
      case 2: return 'not too bad but could be better'
      default: return "Big gains coming next period!"
    }
  }

  return {
    periodLength: args.length,
    trainingDays: args.filter(a => a !== 0).length,
    success: target < args.reduce((a,b) => a + b, 0) / args.length,
    rating: rating(),
    ratingDescription: description(),
    target: target,
    average: args.reduce((a, b) => a + b, 0) / args.length
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))