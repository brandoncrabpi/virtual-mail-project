const { MailHub, MailRoute, findHubByLocation, mailHubs } = require('./solution');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

console.log('=== MAILROUTE CLASS - BUSINESS LOGIC ===\n');

const capeTownHub = new MailHub(mailHubs[0]);
const durbanHub = findHubByLocation('Durban Central');
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

console.log('\n=== MAILROUTE CLASS - ALL TESTS PASSED ===\n');