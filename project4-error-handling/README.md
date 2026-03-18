# Project 4: Error Handling in JavaScript

## Task Overview

Build on the mail delivery system from Project 3 by implementing robust error handling for all classes and functions.

## Error Handling in JavaScript

### What is Error Handling?

Error handling is the process of anticipating, detecting, and responding to errors that occur during program execution. Without proper error handling, programs crash on invalid input or unexpected states. With error handling, programs fail gracefully with informative messages.

### Why Error Handling Matters

1. **Prevents crashes** - Code handles unexpected inputs gracefully
2. **Debugging** - Clear error messages help identify issues quickly
3. **User experience** - Applications provide helpful feedback instead of cryptic failures
4. **Data integrity** - Invalid data is rejected before causing downstream issues

### Error Handling Techniques in JavaScript

#### 1. Try-Catch Blocks

```javascript
try {
  riskyOperation();
} catch (error) {
  console.error(error.message);
}
```

#### 2. Throwing Custom Errors

Generic errors like `throw new Error('invalid input')` lack specificity. Custom errors provide:

- **Debugging clarity** - Know exactly what went wrong without searching code
- **Programmatic handling** - Catch blocks can differentiate error types (`instanceof`)
- **Documentation** - Error class names describe the failure category
- **Future-proofing** - Easier to add specific handling later without refactoring

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}
```

Compare:
- `throw new Error('invalid')` - What is invalid? Where?
- `throw new RangeError('processingTimeHrs must be non-negative, got -5')` - Clear, actionable

#### 3. Type Checking

JavaScript is **dynamically typed** and **loosely typed**, meaning types are not checked at compile time and values are automatically converted in unexpected ways. This makes type checking essential:

- **No compile-time checking** - Type errors only surface at runtime, causing crashes in production
- **Implicit coercion** - JS silently converts types (e.g., `"5" + 3` → `"53"`, not `8`)
- **Undefined behavior** - Accessing a property on `null` throws, but `undefined` returns `undefined`

Type checking catches crashes, wrong results, security issues, and reduces debugging time.

```javascript
function processCoordinate(coord) {
  if (!(coord instanceof Coordinate)) {
    throw new TypeError('Expected Coordinate instance');
  }
}
```

#### 4. Guard Clauses

```javascript
function findHubByLocation(locationName) {
  if (!locationName || typeof locationName !== 'string') {
    return null;
  }
  // proceed with logic
}
```

#### 5. Validation Functions

```javascript
function isValidLatitude(lat) {
  return typeof lat === 'number' && lat >= -90 && lat <= 90 && !isNaN(lat);
}
```

### Error Types in JavaScript

| Error Type | When to Use |
|------------|-------------|
| `Error` | General errors |
| `TypeError` | Wrong type passed (e.g., string instead of number) |
| `RangeError` | Value out of acceptable range |
| `ReferenceError` | Using undefined variable |
| `SyntaxError` | Invalid syntax (parse-time) |

## Requirements

### Error Handling for Coordinate Class

**Constructor validation:**
- Both longitude and latitude must be numbers
- Longitude must be between -180 and 180
- Latitude must be between -90 and 90

**distanceToInKm validation:**
- Must receive a Coordinate instance
- Return `null` or throw descriptive error for invalid input

### Error Handling for MailHub Class

**Constructor validation:**
- Required fields must be present (location, operatingHours, processingTimeHrs, coordinate)
- processingTimeHrs must be a non-negative number

**isOpenAt validation:**
- Hour must be a number between 0 and 23
- Return `false` for invalid input instead of throwing

**Operating hours parsing:**
- Handle malformed time strings gracefully
- Handle missing or invalid time formats

### Error Handling for MailRoute Class

**Constructor validation:**
- fromHub and toHub should be MailHub instances
- Route should be an array

**Method validation:**
- getTotalHops: return 0 for invalid route
- getTotalProcessingTime: return 0 for empty/invalid route items
- getRouteLocations: return empty array for invalid route

### Error Handling for Helper Functions

**findHubByLocation:**
- Return `null` for non-string input
- Return `null` for empty/whitespace-only strings
- Return `null` for unknown locations

**findClosestHub:**
- Return `null` if mailHubs array is empty
- Return `null` for non-numeric coordinates
- Return `null` for out-of-range coordinates

**findClosestHubToCoordinate:**
- Return `null` if input is not a Coordinate instance
- Return `null` if mailHubs array is empty

## Testing

### Run All Tests

Run all tests at once using the test script:
```bash
./test.sh
```

Output is written to `test.log` and displayed in the terminal.

### Run Individual Tests

You can also run each test file separately:
```bash
node test.coordinate.js         # Coordinate class business logic
node test.coordinate.errors.js  # Coordinate error handling
node test.mailhub.js            # MailHub class business logic
node test.mailhub.errors.js     # MailHub error handling
node test.mailroute.js          # MailRoute class business logic
node test.mailroute.errors.js   # MailRoute error handling
node test.helpers.js            # Helper functions business logic
node test.helpers.errors.js     # Helper functions error handling
node test.custom-errors.js      # Custom error type verification
node test.js                    # Combined all tests
```

All edge cases should be tested and handled gracefully.