# Virtual Post Office 🏢📬

## 🎯 Project Goal
Build a fun **Virtual Post Office** app in JavaScript! Send virtual letters that travel across a map of mail hubs, just like real mail. Track their journey with delays and shortest paths.

**For beginners:** We'll build it in **small steps**. Each step adds one feature. Test in your browser!

## 📋 How It Works
1. **Login** as sender (simple username).
2. **Send a letter**: Pick recipient (name, phone, address).
3. **Journey starts**: Letter travels hub-to-hub (shortest path, random delays).
4. **Track it**: Enter tracking # to see progress on a map.
5. **Deliver**: Recipient logs in, gets notified, collects & reads letter.

## 🗺️ Mail Hubs (South Africa Example)
- Cape Town (CPT)
- Johannesburg (JNB)
- Durban (DUR)
- Pretoria (PTA)

Letters find **shortest path** (e.g. CPT → JNB → PTA).

## 📁 Starter Files
```
index.html     - Main page (login, send, track)
script.js      - All JavaScript logic
style.css      - Fun styles (post office theme)
data.js        - Hubs, letters, recipients (arrays)
```

Open `index.html` in browser. Use **F12 Console** to test code!

## 🚀 Step-by-Step Tasks (Do One at a Time)

### Step 1: Basic Page & Login
- Add login form: username input + \"Login\" button.
- On login: Show \"Welcome [name]!\" & hide form.
- Save username in `localStorage`.
- **Test:** Refresh → stays logged in.

**Hint:** `document.getElementById`, `addEventListener`, `localStorage.setItem/getItem`.

### Step 2: Recipients List
- Hardcode 3-5 fake recipients in `data.js`.
- Show dropdown after login: \"Send to:\".
- **Test:** Select recipient.

### Step 3: Send Letter
- Add message textarea + \"Send Letter\".
- Generate tracking # (e.g. \"ZA123-ABC456\").
- Create letter object & add to `letters` array.
- Show \"Sent! Track: ZA123-ABC456\".

### Step 4: Tracking
- Tracking input + \"Track\" button.
- Show progress: \"At JNB, next PTA (ETA 2min)\".
- Simulate: Every 10s, move hub (random delay 5-30s).

### Step 5: Delivery & Read
- Recipient login: Show letters at their hub.
- \"Collect\" → Show message, mark \"delivered\".

## 💡 Beginner Tips
- **Console:** F12 → Console. `console.log('hi')` to debug.
- **Refresh:** Ctrl+R.
- Stuck? Ask: \"How do I [thing] in JS?\"
- Commit: `git add . && git commit -m \"Step 1 done\" && git push`

## Next Steps
Tell me when Step 1 done → I'll review & give Step 2!

Happy coding! 🚀🦀