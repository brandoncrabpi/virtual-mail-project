const { Coordinate } = require('./solution');

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

console.log('=== COORDINATE ERROR HANDLING ===\n');

assertThrows(() => new Coordinate('invalid', 18.4241), 'Constructor throws for non-numeric longitude');
assertThrows(() => new Coordinate(18.4241, 'invalid'), 'Constructor throws for non-numeric latitude');
assertThrows(() => new Coordinate(200, 18.4241), 'Constructor throws for longitude > 180');
assertThrows(() => new Coordinate(-200, 18.4241), 'Constructor throws for longitude < -180');
assertThrows(() => new Coordinate(18.4241, 100), 'Constructor throws for latitude > 90');
assertThrows(() => new Coordinate(18.4241, -100), 'Constructor throws for latitude < -90');
assertThrows(() => new Coordinate(NaN, 18.4241), 'Constructor throws for NaN longitude');
assertThrows(() => new Coordinate(18.4241, NaN), 'Constructor throws for NaN latitude');
assertThrows(() => new Coordinate(null, 18.4241), 'Constructor throws for null longitude');
assertThrows(() => new Coordinate(18.4241, null), 'Constructor throws for null latitude');
assertThrows(() => new Coordinate(undefined, 18.4241), 'Constructor throws for undefined longitude');
assertThrows(() => new Coordinate(18.4241, undefined), 'Constructor throws for undefined latitude');

const coord1 = new Coordinate(-33.9249, 18.4241);
const distNull = coord1.distanceToInKm(null);
assert(distNull === null, 'distanceToInKm returns null for null input');

const distUndefined = coord1.distanceToInKm(undefined);
assert(distUndefined === null, 'distanceToInKm returns null for undefined input');

const distNonCoord = coord1.distanceToInKm({ latitude: 1, longitude: 2 });
assert(distNonCoord === null, 'distanceToInKm returns null for non-Coordinate input');

console.log('\n=== COORDINATE ERROR HANDLING - ALL TESTS PASSED ===\n');