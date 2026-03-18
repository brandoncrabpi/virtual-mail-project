const { Coordinate } = require('./solution');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

console.log('=== COORDINATE CLASS - BUSINESS LOGIC ===\n');

const coord1 = new Coordinate(-33.9249, 18.4241);
assert(coord1.toString() === '-33.9249, 18.4241', 'Coordinate toString returns correct format');

const coord2 = new Coordinate(-29.7231, 31.0637);
const distance = coord1.distanceToInKm(coord2);
assert(distance > 0, `Distance between coordinates is positive, got: ${distance}`);

const coordSelf = new Coordinate(-33.9249, 18.4241);
const distSelf = coordSelf.distanceToInKm(coordSelf);
assert(distSelf === 0, 'Distance to self is 0');

console.log('\n=== COORDINATE CLASS - ALL TESTS PASSED ===\n');