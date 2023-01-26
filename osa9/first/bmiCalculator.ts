const calculateBmi = (height: number, weight: number) : String => {
  const result = (weight / (height * height)) * 10000
  switch(true) {
    case result < 18.5: return "Underweight"
    case result >= 18.5 && result <= 24.9: return "Normal (healthy weight)"
    case result > 24.9 :return "Overweight"
  }
}

console.log(calculateBmi(+process.argv[2], +process.argv[3]))