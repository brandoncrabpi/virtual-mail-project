const { Coordinate, MailHub, MailRoute, findHubByLocation, findClosestHub, findClosestHubToCoordinate, mailHubs } = require('./solution');

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

console.log('=== HELPER FUNCTIONS - BUSINESS LOGIC ===\n');

const durbanHub = findHubByLocation('Durban Central');
assert(durbanHub !== null, 'findHubByLocation returns hub for valid location');
assert(durbanHub.location === 'Durban Central', 'Found correct hub');

const unknownHub = findHubByLocation('Unknown Location');
assert(unknownHub === null, 'findHubByLocation returns null for unknown location');

const closestByCoords = findClosestHub(-33.9249, 18.4241);
assert(closestByCoords !== null, 'findClosestHub returns a hub');
assert(closestByCoords.location === 'Cape Town Central', `Closest to Cape Town coords is Cape Town Central, got: ${closestByCoords.location}`);

const closestByCoord = findClosestHubToCoordinate(new Coordinate(-33.9249, 18.4241));
assert(closestByCoord !== null, 'findClosestHubToCoordinate returns a hub');
assert(closestByCoord.location === 'Cape Town Central', `Closest to Cape Town coords is Cape Town Central, got: ${closestByCoord.location}`);

const closestToJHB = findClosestHub(-26.2041, 28.0473);
assert(closestToJHB.location === 'Johannesburg Central', `Closest to JHB coords is Johannesburg Central, got: ${closestToJHB.location}`);

console.log('\n=== HELPER FUNCTIONS - ALL TESTS PASSED ===\n');