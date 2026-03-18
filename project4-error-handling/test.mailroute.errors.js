const { MailHub, MailRoute, findHubByLocation, mailHubs } = require('./solution');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

console.log('=== MAILROUTE ERROR HANDLING ===\n');

const capeTownHub = new MailHub(mailHubs[0]);
const umhlanga = findHubByLocation('Umhlanga');

const emptyRoute = new MailRoute(capeTownHub, umhlanga, []);
assert(emptyRoute.getTotalHops() === 0, 'Empty route has 0 hops');
assert(emptyRoute.getTotalProcessingTime() === 0, 'Empty route has 0 processing time');
assert(emptyRoute.getRouteLocations().length === 0, 'Empty route has 0 locations');

const routeWithNulls = new MailRoute(null, null, [null, null]);
assert(routeWithNulls.getTotalHops() === 2, 'Route with nulls returns count of items');
assert(routeWithNulls.getTotalProcessingTime() === 0, 'Route with nulls returns 0 processing time');

const invalidHub = new MailHub({
  location: 'Invalid',
  operatingHours: '06:00am - 17:00pm',
  processingTimeHrs: 12,
  longitude: 18.4241,
  latitude: -33.9249
});
const routeWithInvalid = new MailRoute(invalidHub, invalidHub, [invalidHub]);
assert(routeWithInvalid.getTotalHops() === 1, 'Route with single invalid hub has 1 hop');
assert(routeWithInvalid.getTotalProcessingTime() === 12, 'Route with invalid hub returns processing time');

const routeWithMissingHubs = new MailRoute(capeTownHub, umhlanga, null);
assert(routeWithMissingHubs.getTotalHops() === 0, 'Route with null route array has 0 hops');
assert(routeWithMissingHubs.getTotalProcessingTime() === 0, 'Route with null route array has 0 processing time');

const routeWithUndefinedHubs = new MailRoute(capeTownHub, umhlanga, undefined);
assert(routeWithUndefinedHubs.getTotalHops() === 0, 'Route with undefined route array has 0 hops');

console.log('\n=== MAILROUTE ERROR HANDLING - ALL TESTS PASSED ===\n');