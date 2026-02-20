// TODO: Kid writes this function!

function closestPostOffice(myLat, myLong, postOffices) {
  // Your code here:
  // 1. Loop through postOffices
  // 2. Calculate distance for each
  // 3. Find min distance & return that post office object
  
  console.log('TODO: Implement closestPostOffice!');
  return null;
}

// Simple distance helper (kid can use/modify)
function simpleDistance(lat1, lng1, lat2, lng2) {
  const dLat = lat1 - lat2;
  const dLng = lng1 - lng2;
  return Math.sqrt(dLat * dLat + dLng * dLng);
}
