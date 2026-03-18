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
    this.longitude = longitude;
    this.latitude = latitude;
  }

  toString() {
    return `${this.longitude}, ${this.latitude}`;
  }

  distanceToInKm(other) {
    const R = 6371;
    const dLat = this.toRad(other.latitude - this.latitude);
    const dLon = this.toRad(other.longitude - this.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(this.latitude)) * Math.cos(this.toRad(other.latitude)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRad(deg) {
    return deg * (Math.PI / 180);
  }
}

class MailHub {
  constructor({ location, operatingHours, processingTimeHrs, longitude, latitude }) {
    this.location = location;
    this.operatingHours = operatingHours;
    this.processingTimeHrs = processingTimeHrs;
    this.coordinate = new Coordinate(longitude, latitude);
  }

  getCoordinates() {
    return this.coordinate;
  }

  isOpenAt(hour) {
    const hours = this.operatingHours.match(/(\d+):(\d+)(am|pm)/g);
    if (!hours || hours.length !== 2) return false;

    const parseTime = (timeStr) => {
      const match = timeStr.match(/(\d+):(\d+)(am|pm)/);
      let h = parseInt(match[1]);
      const mins = parseInt(match[2]);
      const period = match[3];
      if (period === 'pm' && h < 12) h += 12;
      if (period === 'am' && h === 12) h = 0;
      return h * 60 + mins;
    };

    const openTime = parseTime(hours[0]);
    const closeTime = parseTime(hours[1]);
    const currentTime = hour * 60;

    return currentTime >= openTime && currentTime <= closeTime;
  }
}

class MailRoute {
  constructor(fromHub, toHub, route = []) {
    this.fromHub = fromHub;
    this.toHub = toHub;
    this.route = route;
  }

  getTotalHops() {
    return this.route.length;
  }

  getTotalProcessingTime() {
    return this.route.reduce((total, hub) => total + hub.processingTimeHrs, 0);
  }

  getRouteLocations() {
    return this.route.map(hub => hub.location);
  }
}

function findHubByLocation(locationName) {
  const hubData = mailHubs.find(hub => hub.location === locationName);
  if (!hubData) return null;
  return new MailHub(hubData);
}

function findClosestHub(latitude, longitude) {
  if (mailHubs.length === 0) return null;
  const targetCoord = new Coordinate(longitude, latitude);
  let closestHub = null;
  let minDistance = Infinity;
  for (const hubData of mailHubs) {
    const hubCoord = new Coordinate(hubData.longitude, hubData.latitude);
    const dist = targetCoord.distanceToInKm(hubCoord);
    if (dist < minDistance) {
      minDistance = dist;
      closestHub = new MailHub(hubData);
    }
  }
  return closestHub;
}

function findClosestHubToCoordinate(coord) {
  if (mailHubs.length === 0) return null;
  let closestHub = null;
  let minDistance = Infinity;
  for (const hubData of mailHubs) {
    const hubCoord = new Coordinate(hubData.longitude, hubData.latitude);
    const dist = coord.distanceToInKm(hubCoord);
    if (dist < minDistance) {
      minDistance = dist;
      closestHub = new MailHub(hubData);
    }
  }
  return closestHub;
}

const capeTown = findHubByLocation('Cape Town Central');
const umhlanga = findHubByLocation('Umhlanga');

const capeTownToUmhlangaRoute = new MailRoute(
  capeTown,
  umhlanga,
  [
    findHubByLocation('Cape Town Central'),
    findHubByLocation('Gqeberha Central'),
    findHubByLocation('East London Central'),
    findHubByLocation('Durban Central'),
    findHubByLocation('Umhlanga')
  ]
);

module.exports = { Coordinate, MailHub, MailRoute, mailHubs, findHubByLocation, findClosestHub, findClosestHubToCoordinate };
