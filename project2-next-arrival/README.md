# Project 2: Next Mail Hub Arrival Time ⏰📬

## 🎯 Goal
Learn **Date objects**, **Math**, and **logic**!  
Write `nextMailHubArrivalTime(departureTime, departureMailHub, destinationMailHub)` → Returns **Date** of expected arrival at next hub.

**Why?** Letters wait for processing + travel time (distance-based).

## 📋 Your Task
1. **Inputs:**
   - `departureTime`: Date (leave current hub)
   - `departureMailHub`: Object (with `processingTimeHrs`, lat/long)
   - `destinationMailHub`: Object (lat/long)

2. **Steps in function:**
   ```
   1. Add processing: currentTime = departureTime + (departureMailHub.processingTimeHrs * 60 * 60 * 1000)  // ms
   2. Calc distance: use simpleDistance(departure.lat, departure.lng, dest.lat, dest.lng)
   3. Distance → km: km = distanceDegrees * 111  // 1° ≈ 111km
   4. Travel hours: travelHrs = km / 500  // Speed: 500 km/h (truck/plane avg)
   5. Arrival = currentTime + (travelHrs * 60 * 60 * 1000)
   6. Return new Date(arrivalMs)
   ```

3. **Test:** Open `test.html` → Auto-tests pass → Console shows times.

## 💡 Hints
- **Date math:** `new Date(date.getTime() + ms)`
- **Distance:** Copy `simpleDistance` from project1 (or write).
- **Console:** `console.log(new Date().toLocaleString())` → Format dates nicely.
- **Precision:** Tests check **within 1 minute** (round travelHrs).

## Example
```
Input: CPT → JNB, depart 10:00
Process 12h → 22:00
Dist ~1200km → 2.4h travel → Arrive ~00:24 next day
```

**Done?** `git add . && git commit -m "feat: nextMailHubArrivalTime" && git push`  
Share → Project 3! 🚀🦀