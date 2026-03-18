const { Coordinate, MailHub, MailRoute, mailHubs, findHubByLocation } = require('./models');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

console.log('=== TESTING COORDINATE CLASS ===\n');

const coord1 = new Coordinate(-33.9249, 18.4241);
assert(coord1.toString() === '-33.9249, 18.4241', 'Coordinate toString returns correct format');

const coord2 = new Coordinate(-29.7231, 31.0637);
const distance = coord1.distanceTo(coord2);
assert(distance > 1400 && distance < 1500, `Distance Cape Town to Umhlanga is ~1468km, got: ${distance.toFixed(2)}km`);

console.log('\n=== TESTING MAILHUB CLASS ===\n');

const capeTownHub = new MailHub(mailHubs[0]);
assert(capeTownHub.location === 'Cape Town Central', 'MailHub has correct location');
assert(capeTownHub.operatingHours === '06:00am - 17:00pm', 'MailHub has correct operating hours');
assert(capeTownHub.processingTimeHrs === 12, 'MailHub has correct processing time');
assert(capeTownHub.getCoordinates().toString() === '-33.9249, 18.4241', 'MailHub getCoordinates returns Coordinate');

assert(capeTownHub.isOpenAt(10) === true, 'Hub is open at 10:00');
assert(capeTownHub.isOpenAt(18) === false, 'Hub is closed at 18:00');
assert(capeTownHub.isOpenAt(5) === false, 'Hub is closed at 05:00');

console.log('\n=== TESTING FINDHUBBYLOCATION FUNCTION ===\n');

const durbanHub = findHubByLocation('Durban Central');
assert(durbanHub !== null, 'findHubByLocation returns hub for valid location');
assert(durbanHub.location === 'Durban Central', 'Found correct hub');

const unknownHub = findHubByLocation('Unknown Location');
assert(unknownHub === null, 'findHubByLocation returns null for unknown location');

console.log('\n=== TESTING MAILROUTE CLASS ===\n');

const gqeberha = findHubByLocation('Gqeberha Central');
const eastLondon = findHubByLocation('East London Central');
const umhlanga = findHubByLocation('Umhlanga');

const route = new MailRoute(capeTownHub, umhlanga, [
  capeTownHub,
  gqeberha,
  eastLondon,
  durbanHub,
  umhlanga
]);

assert(route.fromHub.location === 'Cape Town Central', 'Route has correct fromHub');
assert(route.toHub.location === 'Umhlanga', 'Route has correct toHub');
assert(route.getTotalHops() === 5, `Route has 5 hops, got: ${route.getTotalHops()}`);

const expectedLocations = [
  'Cape Town Central',
  'Gqeberha Central',
  'East London Central',
  'Durban Central',
  'Umhlanga'
];
const actualLocations = route.getRouteLocations();
assert(
  JSON.stringify(actualLocations) === JSON.stringify(expectedLocations),
  'Route locations are correct'
);

const totalProcessingTime = route.getTotalProcessingTime();
assert(totalProcessingTime === 61, `Total processing time is 61 hours, got: ${totalProcessingTime}`);

console.log('\n=== ALL TESTS PASSED ===\n');
