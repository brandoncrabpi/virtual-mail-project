# Project 3: Mail Models

## Task Overview

Create JavaScript classes to model a mail delivery system with mail hubs and routes.

## Requirements

### 1. Coordinate Class

Create a class to handle geographic coordinates:
- `longitude` - Geographic longitude
- `latitude` - Geographic latitude

**Methods to implement:**
- `toString()` - Returns string format "longitude, latitude"
- `distanceToInKm(other)` - Calculate distance to another coordinate using Haversine formula or a simple approximation (return km)

### 2. MailHub Class

Create a class that represents a postal hub with these properties:
- `location` - Name of the hub location (e.g., "Cape Town Central")
- `operatingHours` - Opening hours string (e.g., "06:00am - 17:00pm")
- `processingTimeHrs` - Hours to process mail at this hub
- `coordinate` - Coordinate instance

**Methods to implement:**
- `getCoordinates()` - Returns Coordinate instance
- `isOpenAt(hour)` - Returns `true` if hub is open at the given hour (0-23)

### 3. MailRoute Class

Create a class that represents a route between two mail hubs:
- `fromHub` - Starting MailHub
- `toHub` - Destination MailHub
- `route` - Array of MailHubs the route passes through

**Methods to implement:**
- `getTotalHops()` - Returns number of stops in the route
- `getTotalProcessingTime()` - Returns sum of all processing times
- `getRouteLocations()` - Returns array of location names

### 4. Helper Function

Implement `findHubByLocation(locationName)` that:
- Searches `mailHubs` array for matching location
- Returns a new MailHub instance (or null if not found)

### 5. Sample Route

Create a route from **Cape Town Central** to **Umhlanga** passing through:
1. Cape Town Central (origin)
2. Gqeberha Central
3. East London Central
4. Durban Central
5. Umhlanga (destination)

## Testing

Run the file to verify your implementation:
```bash
node test.js
```

Expected output shows the route with hops and total processing time.
