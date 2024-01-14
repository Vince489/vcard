
const PendingValidation = [
  3, 3, 3, 7, 3, 3, 4, 3, 3, 3
]
const Chain = []

class Validator {
  constructor(name) {
    this.name = name;
  }
  // Validate that input === 3, then push input to Chain then delete input from PendingValidation
  validate(input) {
    if (input === 3) {
      Chain.push(input);
      PendingValidation.splice(PendingValidation.indexOf(input), 1);
      return true;
    }
  }
}

const V123 = new Validator('123');
const V456 = new Validator('456');

console.log(V123.validate(3)); // true
// console.log(V456.validate(3)); // true
// console.log(V123.validate(4)); // undefined

console.log(PendingValidation); // [7, 4]
console.log('chain', Chain); // [3, 3, 3]
console.log('pending', PendingValidation)
