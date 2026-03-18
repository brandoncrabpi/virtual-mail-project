const { Coordinate, MailHub, MailRoute, mailHubs, findHubByLocation, findClosestHub, findClosestHubToCoordinate } = require('./solution');

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

function assertReturnsNull(fn, message) {
  const result = fn();
  if (result === null) {
    console.log(`✓ ${message}`);
  } else {
    console.log(`✗ ${message} - Expected null, got: ${result}`);
    process.exit(1);
  }
}

console.log('=== TESTING COORDINATE CLASS ===\n');

const coord1 = new Coordinate(-33.9249, 18.4241);
assert(coord1.toString() === '-33.9249, 18.4241', 'Coordinate toString returns correct format');

const coord2 = new Coordinate(-29.7231, 31.0637);
const distance = coord1.distanceToInKm(coord2);
assert(distance > 1400 && distance < 1500, `Distance Cape Town to Umhlanga is ~1468km, got: ${distance.toFixed(2)}km`);

console.log('\n--- Coordinate Error Handling ---\n');

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

const coordSelf = new Coordinate(-33.9249, 18.4241);
const distSelf = coordSelf.distanceToInKm(coordSelf);
assert(distSelf === 0, 'Distance to self is 0');

const distNull = coord1.distanceToInKm(null);
assert(distNull === null, 'distanceToInKm returns null for null input');

const distUndefined = coord1.distanceToInKm(undefined);
assert(distUndefined === null, 'distanceToInKm returns null for undefined input');

const distNonCoord = coord1.distanceToInKm({ lat: 1, lon: 2 });
assert(distNonCoord === null, 'distanceToInKm returns null for non-Coordinate input');

console.log('\n=== TESTING MAILHUB CLASS ===\n');

const capeTownHub = new MailHub(mailHubs[0]);
assert(capeTownHub.location === 'Cape Town Central', 'MailHub has correct location');
assert(capeTownHub.operatingHours === '06:00am - 17:00pm', 'MailHub has correct operating hours');
assert(capeTownHub.processingTimeHrs === 12, 'MailHub has correct processing time');
assert(capeTownHub.getCoordinates().toString() === '-33.9249, 18.4241', 'MailHub getCoordinates returns Coordinate');

assert(capeTownHub.isOpenAt(10) === true, 'Hub is open at 10:00');
assert(capeTownHub.isOpenAt(18) === false, 'Hub is closed at 18:00');
assert(capeTownHub.isOpenAt(5) === false, 'Hub is closed at 05:00');

console.log('\n--- MailHub Error Handling ---\n');

assertThrows(() => new MailHub({}), 'MailHub constructor throws for missing fields');
assert(capeTownHub instanceof MailHub, 'MailHub can be constructed with longitude/latitude instead of coordinate');
assertThrows(() => new MailHub({ location: 'Test', operatingHours: '06:00am - 17:00pm', processingTimeHrs: -5, longitude: 18.4241, latitude: -33.9249 }), 'MailHub constructor throws for negative processing time');
assertThrows(() => new MailHub({ location: 'Test', operatingHours: '06:00am - 17:00pm', processingTimeHrs: 'bad', longitude: 18.4241, latitude: -33.9249 }), 'MailHub constructor throws for non-numeric processing time');
assertThrows(() => new MailHub({ location: 'Test', operatingHours: '06:00am - 17:00pm', processingTimeHrs: 12, longitude: 18.4241, latitude: -33.9249, coordinate: 'invalid' }), 'MailHub constructor throws for invalid coordinate');

assert(capeTownHub.isOpenAt(24) === false, 'isOpenAt returns false for hour 24');
assert(capeTownHub.isOpenAt(-1) === false, 'isOpenAt returns false for hour -1');
assert(capeTownHub.isOpenAt(6.5) === false, 'isOpenAt returns false for fractional hour');
assert(capeTownHub.isOpenAt('10') === false, 'isOpenAt returns false for string hour');
assert(capeTownHub.isOpenAt(null) === false, 'isOpenAt returns false for null hour');
assert(capeTownHub.isOpenAt(undefined) === false, 'isOpenAt returns false for undefined hour');
assert(capeTownHub.isOpenAt(NaN) === false, 'isOpenAt returns false for NaN hour');

const hubWithBadHours = new MailHub({
  location: 'Test Hub',
  operatingHours: 'invalid',
  processingTimeHrs: 12,
  longitude: 18.4241,
  latitude: -33.9249
});
assert(hubWithBadHours.isOpenAt(10) === false, 'isOpenAt returns false for malformed operating hours');

console.log('\n=== TESTING FINDHUBBYLOCATION FUNCTION ===\n');

const durbanHub = findHubByLocation('Durban Central');
assert(durbanHub !== null, 'findHubByLocation returns hub for valid location');
assert(durbanHub.location === 'Durban Central', 'Found correct hub');

const unknownHub = findHubByLocation('Unknown Location');
assert(unknownHub === null, 'findHubByLocation returns null for unknown location');

console.log('\n--- findHubByLocation Error Handling ---\n');

assertReturnsNull(() => findHubByLocation(null), 'findHubByLocation returns null for null input');
assertReturnsNull(() => findHubByLocation(undefined), 'findHubByLocation returns null for undefined input');
assertReturnsNull(() => findHubByLocation(''), 'findHubByLocation returns null for empty string');
assertReturnsNull(() => findHubByLocation('   '), 'findHubByLocation returns null for whitespace-only string');
assertReturnsNull(() => findHubByLocation(123), 'findHubByLocation returns null for non-string input');
assertReturnsNull(() => findHubByLocation({}), 'findHubByLocation returns null for object input');

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

console.log('\n--- MailRoute Error Handling ---\n');

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

console.log('\n=== TESTING FINDCLOSESTHUB FUNCTIONS ===\n');

const closestByCoords = findClosestHub(-33.9249, 18.4241);
assert(closestByCoords !== null, 'findClosestHub returns a hub');
assert(closestByCoords.location === 'Cape Town Central', `Closest to Cape Town coords is Cape Town Central, got: ${closestByCoords.location}`);

const closestByCoord = findClosestHubToCoordinate(new Coordinate(-33.9249, 18.4241));
assert(closestByCoord !== null, 'findClosestHubToCoordinate returns a hub');
assert(closestByCoord.location === 'Cape Town Central', `Closest to Cape Town coords is Cape Town Central, got: ${closestByCoord.location}`);

const closestToJHB = findClosestHub(-26.2041, 28.0473);
assert(closestToJHB.location === 'Johannesburg Central', `Closest to JHB coords is Johannesburg Central, got: ${closestToJHB.location}`);

console.log('\n--- findClosestHub Error Handling ---\n');

assertReturnsNull(() => findClosestHub(18.4241, null), 'findClosestHub returns null for null latitude');
assertReturnsNull(() => findClosestHub(null, 18.4241), 'findClosestHub returns null for null longitude');
assertReturnsNull(() => findClosestHub(18.4241, undefined), 'findClosestHub returns null for undefined latitude');
assertReturnsNull(() => findClosestHub(undefined, 18.4241), 'findClosestHub returns null for undefined longitude');
assertReturnsNull(() => findClosestHub('18.4241', '-33.9249'), 'findClosestHub returns null for string coordinates');
assertReturnsNull(() => findClosestHub(18.4241, NaN), 'findClosestHub returns null for NaN longitude');
assertReturnsNull(() => findClosestHub(NaN, -33.9249), 'findClosestHub returns null for NaN latitude');
assertReturnsNull(() => findClosestHub(200, 18.4241), 'findClosestHub returns null for out-of-range latitude');
assertReturnsNull(() => findClosestHub(18.4241, 200), 'findClosestHub returns null for out-of-range longitude');

console.log('\n--- findClosestHubToCoordinate Error Handling ---\n');

assertReturnsNull(() => findClosestHubToCoordinate(null), 'findClosestHubToCoordinate returns null for null input');
assertReturnsNull(() => findClosestHubToCoordinate(undefined), 'findClosestHubToCoordinate returns null for undefined input');
assertReturnsNull(() => findClosestHubToCoordinate('not a coordinate'), 'findClosestHubToCoordinate returns null for string input');
assertReturnsNull(() => findClosestHubToCoordinate({ lat: 1, lon: 2 }), 'findClosestHubToCoordinate returns null for plain object');
assertReturnsNull(() => findClosestHubToCoordinate({ latitude: 1, longitude: 2 }), 'findClosestHubToCoordinate returns null for object without Coordinate methods');

console.log('\n=== TESTING CUSTOM ERROR CATCHING ===\n');

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

console.log('\n=== ALL TESTS PASSED ===\n');