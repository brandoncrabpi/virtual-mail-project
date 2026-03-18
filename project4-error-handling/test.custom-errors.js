const { Coordinate, MailHub } = require('./solution');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

function assertThrows(fn, message) {
  try {
    fn();
    console.log(`✗ ${message} - Expected function to throw`);
    process.exit(1);
  } catch (e) {
    console.log(`✓ ${message} - Threw: ${e.message}`);
  }
}

console.log('=== CUSTOM ERROR CATCHING ===\n');

function catchAndIdentify(fn) {
  try {
    fn();
  } catch (e) {
    return e;
  }
  return null;
}

const typeError = catchAndIdentify(() => new Coordinate('bad', 18.4241));
assert(typeError instanceof TypeError, 'Non-numeric value throws TypeError');

const rangeError = catchAndIdentify(() => new Coordinate(200, 18.4241));
assert(rangeError instanceof RangeError, 'Out-of-range value throws RangeError');

const negativeTimeError = catchAndIdentify(() => new MailHub({
  location: 'Test',
  operatingHours: '06:00am - 17:00pm',
  processingTimeHrs: -5,
  longitude: 18.4241,
  latitude: -33.9249
}));
assert(negativeTimeError instanceof RangeError, 'Negative processing time throws RangeError');

const nonNumericTimeError = catchAndIdentify(() => new MailHub({
  location: 'Test',
  operatingHours: '06:00am - 17:00pm',
  processingTimeHrs: 'bad',
  longitude: 18.4241,
  latitude: -33.9249
}));
assert(nonNumericTimeError instanceof TypeError, 'Non-numeric processing time throws TypeError');

let caughtErrors = { TypeError: 0, RangeError: 0, Error: 0 };
const errors = [
  () => new Coordinate('bad', 18.4241),
  () => new Coordinate(200, 18.4241),
  () => new Coordinate(18.4241, 'bad'),
  () => new Coordinate(18.4241, 100),
  () => new MailHub({ location: 'Test', operatingHours: '06:00am - 17:00pm', processingTimeHrs: -1, longitude: 18.4241, latitude: -33.9249 }),
  () => new MailHub({ location: 'Test', operatingHours: '06:00am - 17:00pm', processingTimeHrs: 'bad', longitude: 18.4241, latitude: -33.9249 }),
];

for (const fn of errors) {
  const error = catchAndIdentify(fn);
  if (error instanceof TypeError) caughtErrors.TypeError++;
  else if (error instanceof RangeError) caughtErrors.RangeError++;
  else caughtErrors.Error++;
}

assert(caughtErrors.TypeError === 3, `Caught 3 TypeErrors, got ${caughtErrors.TypeError}`);
assert(caughtErrors.RangeError === 3, `Caught 3 RangeErrors, got ${caughtErrors.RangeError}`);
assert(caughtErrors.Error === 0, `Caught 0 generic Errors, got ${caughtErrors.Error}`);

console.log('\n=== CUSTOM ERROR CATCHING - ALL TESTS PASSED ===\n');