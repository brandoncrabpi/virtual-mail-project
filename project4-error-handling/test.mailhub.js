const { MailHub, mailHubs } = require('./solution');

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

console.log('=== MAILHUB CLASS - BUSINESS LOGIC ===\n');

const capeTownHub = new MailHub(mailHubs[0]);
assert(capeTownHub.location === 'Cape Town Central', 'MailHub has correct location');
assert(capeTownHub.operatingHours === '06:00am - 17:00pm', 'MailHub has correct operating hours');
assert(capeTownHub.processingTimeHrs === 12, 'MailHub has correct processing time');
assert(capeTownHub.getCoordinates().toString() === '-33.9249, 18.4241', 'MailHub getCoordinates returns Coordinate');

assert(capeTownHub.isOpenAt(10) === true, 'Hub is open at 10:00');
assert(capeTownHub.isOpenAt(18) === false, 'Hub is closed at 18:00');
assert(capeTownHub.isOpenAt(5) === false, 'Hub is closed at 05:00');

console.log('\n=== MAILHUB CLASS - ALL TESTS PASSED ===\n');