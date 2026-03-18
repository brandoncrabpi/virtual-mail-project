const { MailHub, mailHubs } = require('./solution');

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

console.log('=== MAILHUB ERROR HANDLING ===\n');

const capeTownHub = new MailHub(mailHubs[0]);

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

console.log('\n=== MAILHUB ERROR HANDLING - ALL TESTS PASSED ===\n');