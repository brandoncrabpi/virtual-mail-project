const mailHubs = [
  {
    location: "Cape Town Central",
    operatingHours: "06:00am - 17:00pm",
    processingTimeHrs: 12,
    longitude: -33.9249,
    latitude: 18.4241
  },
  {
    location: "Table View",
    operatingHours: "08:00am - 16:00pm",
    processingTimeHrs: 10,
    longitude: -33.8240,
    latitude: 18.4900
  },
  {
    location: "Johannesburg Central",
    operatingHours: "06:00am - 18:00pm",
    processingTimeHrs: 14,
    longitude: -26.2041,
    latitude: 28.0473
  },
  {
    location: "Sandton",
    operatingHours: "07:00am - 17:00pm",
    processingTimeHrs: 12,
    longitude: -26.1063,
    latitude: 28.0546
  },
  {
    location: "Durban Central",
    operatingHours: "06:00am - 17:00pm",
    processingTimeHrs: 13,
    longitude: -29.8587,
    latitude: 31.0218
  },
  {
    location: "Umhlanga",
    operatingHours: "08:00am - 16:30pm",
    processingTimeHrs: 11,
    longitude: -29.7231,
    latitude: 31.0637
  },
  {
    location: "Pretoria Central",
    operatingHours: "06:00am - 17:00pm",
    processingTimeHrs: 12,
    longitude: -25.7479,
    latitude: 28.2293
  },
  {
    location: "Centurion",
    operatingHours: "07:30am - 16:00pm",
    processingTimeHrs: 10,
    longitude: -25.8607,
    latitude: 28.1892
  },
  {
    location: "Gqeberha Central",
    operatingHours: "06:30am - 17:00pm",
    processingTimeHrs: 12,
    longitude: -33.9608,
    latitude: 25.6022
  },
  {
    location: "Bloemfontein Central",
    operatingHours: "07:00am - 16:30pm",
    processingTimeHrs: 11,
    longitude: -29.1194,
    latitude: 26.2310
  },
  {
    location: "East London Central",
    operatingHours: "06:00am - 17:00pm",
    processingTimeHrs: 13,
    longitude: -33.0153,
    latitude: 27.9110
  },
  {
    location: "Mbombela Central",
    operatingHours: "08:00am - 16:00pm",
    processingTimeHrs: 10,
    longitude: -25.4748,
    latitude: 30.9675
  },
  {
    location: "Kimberley Central",
    operatingHours: "07:00am - 16:00pm",
    processingTimeHrs: 12,
    longitude: -28.7418,
    latitude: 24.7644
  },
  {
    location: "Polokwane Central",
    operatingHours: "06:30am - 17:00pm",
    processingTimeHrs: 11,
    longitude: -23.9046,
    latitude: 29.4629
  },
  {
    location: "George Central",
    operatingHours: "08:00am - 16:30pm",
    processingTimeHrs: 9,
    longitude: -33.9621,
    latitude: 22.4601
  },
  {
    location: "Pietermaritzburg Central",
    operatingHours: "07:00am - 17:00pm",
    processingTimeHrs: 12,
    longitude: -29.6006,
    latitude: 30.3794
  },
  {
    location: "Upington Central",
    operatingHours: "08:00am - 16:00pm",
    processingTimeHrs: 10,
    longitude: -28.4083,
    latitude: 21.2560
  },
  {
    location: "Mossel Bay Central",
    operatingHours: "07:30am - 16:30pm",
    processingTimeHrs: 9,
    longitude: -34.1833,
    latitude: 22.1333
  },
  {
    location: "Stellenbosch Post Office",
    operatingHours: "08:00am - 16:00pm",
    processingTimeHrs: 10,
    longitude: -33.9340,
    latitude: 18.8584
  },
  {
    location: "Somerset West",
    operatingHours: "07:00am - 17:00pm",
    processingTimeHrs: 11,
    longitude: -34.0819,
    latitude: 18.8506
  }
];

class Coordinate {
  constructor(longitude, latitude) {
    // TODO: Initialize this.longitude and this.latitude
  }

  toString() {
    // TODO: Return "longitude, latitude" format
  }

  distanceTo(other) {
    // TODO: Calculate distance using Haversine formula (return km)
  }

  toRad(deg) {
    // TODO: Convert degrees to radians
  }
}

class MailHub {
  constructor({ location, operatingHours, processingTimeHrs, longitude, latitude }) {
    // TODO: Initialize properties (use Coordinate for location)
  }

  getCoordinates() {
    // TODO: Return Coordinate instance
  }

  isOpenAt(hour) {
    // TODO: Parse operatingHours and check if hub is open at given hour
  }
}

class MailRoute {
  constructor(fromHub, toHub, route = []) {
    // TODO: Initialize fromHub, toHub, route
  }

  getTotalHops() {
    // TODO: Return number of hubs in route
  }

  getTotalProcessingTime() {
    // TODO: Sum all processingTimeHrs from route hubs
  }

  getRouteLocations() {
    // TODO: Return array of location names from route
  }
}

function findHubByLocation(locationName) {
  // TODO: Find hub in mailHubs array and return MailHub instance
  // Return null if not found
}

// TODO: Create sample route from Cape Town to Umhlanga

module.exports = { Coordinate, MailHub, MailRoute, mailHubs, findHubByLocation };
