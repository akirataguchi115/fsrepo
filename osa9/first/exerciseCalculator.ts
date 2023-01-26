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

let args: number[] = []
if(!process.argv[2]) {
  console.log('No target defined')
} else {
  process.argv.forEach((val, index) => {
    if (index != 0 && index != 1 && index != 2) {
      args.push(Number(val))
    }
  })
  console.log(calculateExercises(args, Number(process.argv[2])))
}
