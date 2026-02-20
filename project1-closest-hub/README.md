# Project 1: Find Closest Mail Hub 🏢📍

## 🎯 Goal
Learn **JavaScript objects** and **functions**!  
Write a function `closestPostOffice(myLat, myLong, postOffices)` that finds the **closest mail hub** to a location (latitude/longitude).

**Why?** When sending a letter, we need the nearest post office to start the journey.

## 📋 Your Task
1. **Understand objects**: Each post office is an object like:
   ```js
   const postOffice1 = {
     location: "Brandon St",
     operatingHours: "06:00am - 17:00pm",
     processingTimeHrs: 12,
     longitude: -33.956,
     latitude: 18.1
   };
   ```

2. **Load data**: Use `mailhubs_south_africa.js` (array of 20+ real SA post offices).

3. **Write the function**:
   - Loop through `postOffices` array.
   - For each, calculate **distance** to `myLat, myLong`.
   - Track the **closest one** (smallest distance).
   - Return the closest post office **object**.

4. **Simple distance formula** (for beginners):
   ```js
   function distance(lat1, lng1, lat2, lng2) {
     const latDiff = lat1 - lat2;
     const lngDiff = lng1 - lng2;
     return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);  // Euclidean (good enough!)
   }
   ```

5. **Test it**:
   - Open `test.html` in browser.
   - F12 Console → Try:
     ```js
     const closest = closestPostOffice(-33.9249, 18.4241, postOffices);  // Cape Town
     console.log(closest.location, closest.operatingHours);
     ```

## 💡 Hints
- **Array loop**: `for (let i = 0; i < postOffices.length; i++) { ... }`
- **Min distance**: `let closestDist = Infinity; let closestHub = null;`
- **Update if closer**: `if (dist < closestDist) { closestDist = dist; closestHub = postOffices[i]; }`
- Objects: `hub.longitude`, `hub.latitude`
- Console: `console.log()` to debug!

## Example Output
```
Closest: Cape Town Central, 06:00-17:00, 12hrs processing
```

**Done?** Commit: `git add . && git commit -m "feat: closestPostOffice function" && git push`  
Share your code → Next project unlocked! 🚀🦀