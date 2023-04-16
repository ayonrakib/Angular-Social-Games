import Math, { sum } from './src/app/controller/sum';

const math = new Math();

console.log('sum is: ', math.sum(1, 3));
console.log('sum is: ', sum(1, 3));
