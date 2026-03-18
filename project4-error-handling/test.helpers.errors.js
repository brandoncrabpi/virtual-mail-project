const { Coordinate, findHubByLocation, findClosestHub, findClosestHubToCoordinate } = require('./solution');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

function assertReturnsNull(fn, message) {
  const result = fn();
  if (result === null) {
    console.log(`✓ ${message}`);
  } else {
    console.log(`✗ ${message} - Expected null, got: ${result}`);
    process.exit(1);
  }
}

console.log('=== HELPER FUNCTIONS ERROR HANDLING ===\n');

console.log('\n--- findHubByLocation Error Handling ---\n');

assertReturnsNull(() => findHubByLocation(null), 'findHubByLocation returns null for null input');
assertReturnsNull(() => findHubByLocation(undefined), 'findHubByLocation returns null for undefined input');
assertReturnsNull(() => findHubByLocation(''), 'findHubByLocation returns null for empty string');
assertReturnsNull(() => findHubByLocation('   '), 'findHubByLocation returns null for whitespace-only string');
assertReturnsNull(() => findHubByLocation(123), 'findHubByLocation returns null for non-string input');
assertReturnsNull(() => findHubByLocation({}), 'findHubByLocation returns null for object input');

console.log('\n--- findClosestHub Error Handling ---\n');

assertReturnsNull(() => findClosestHub(18.4241, null), 'findClosestHub returns null for null latitude');
assertReturnsNull(() => findClosestHub(null, 18.4241), 'findClosestHub returns null for null longitude');
assertReturnsNull(() => findClosestHub(18.4241, undefined), 'findClosestHub returns null for undefined latitude');
assertReturnsNull(() => findClosestHub(undefined, 18.4241), 'findClosestHub returns null for undefined longitude');
assertReturnsNull(() => findClosestHub('18.4241', '-33.9249'), 'findClosestHub returns null for string coordinates');
assertReturnsNull(() => findClosestHub(NaN, 18.4241), 'findClosestHub returns null for NaN longitude');
assertReturnsNull(() => findClosestHub(18.4241, NaN), 'findClosestHub returns null for NaN latitude');
assertReturnsNull(() => findClosestHub(18.4241, 200), 'findClosestHub returns null for out-of-range latitude');
assertReturnsNull(() => findClosestHub(200, 18.4241), 'findClosestHub returns null for out-of-range longitude');

console.log('\n--- findClosestHubToCoordinate Error Handling ---\n');

assertReturnsNull(() => findClosestHubToCoordinate(null), 'findClosestHubToCoordinate returns null for null input');
assertReturnsNull(() => findClosestHubToCoordinate(undefined), 'findClosestHubToCoordinate returns null for undefined input');
assertReturnsNull(() => findClosestHubToCoordinate('not a coordinate'), 'findClosestHubToCoordinate returns null for string input');
assertReturnsNull(() => findClosestHubToCoordinate({ lat: 1, lon: 2 }), 'findClosestHubToCoordinate returns null for plain object');
assertReturnsNull(() => findClosestHubToCoordinate({ latitude: 1, longitude: 2 }), 'findClosestHubToCoordinate returns null for object without Coordinate methods');

console.log('\n=== HELPER FUNCTIONS ERROR HANDLING - ALL TESTS PASSED ===\n');