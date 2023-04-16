export function sum(number1: number, number2: number): number {
  return number1 + number2;
}

console.log('sum is: ', sum(1, 2));

class Math {
  constructor() {}

  sum(number1: number, number2: number): number {
    return number1 + number2;
  }
}

export default Math;
