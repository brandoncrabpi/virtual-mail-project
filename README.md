# Virtual Mail Project 🏢📬

## 🚀 Beginner Setup (5 Minutes - No Experience Needed!)

### 1. Install Git
**🖥️ Mac:**
- Press **Cmd+Space** → type "Terminal" → Enter
- Copy/paste:  
  ```
  /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"
  ```
- Enter password → Wait → Then:  
  ```
  brew install git
  ```
- Test: `git --version`

**💻 Windows:**
- Download: [Git for Windows](https://git-scm.com/download/win) (big green button)
- Run installer → **Next** all the way (use defaults)
- Search "Git Bash" in Start menu → Open
- Test: `git --version`

**Alternative:** Download from [git-scm.com](https://git-scm.com/downloads)

### 2. Clone This Repo (Download Project)
Open **Terminal** (Mac) or **Git Bash** (Windows):  
```
git clone https://github.com/brandoncrabpi/virtual-mail-project.git
cd virtual-mail-project
```

### 3. Update for New Tasks
```
git pull origin main
ls  # See project folders
```

### 4. Edit & Test
- **Recommended:** [VS Code](https://code.visualstudio.com/) (free) → File → Open Folder → Select `virtual-mail-project`
- Open `test.html` in browser (double-click)
- **F12** → Console → Test code
- Save → Refresh browser

## 📁 Current Projects
- **project1-closest-hub/**: Find closest post office from lat/long (JS objects + functions + distance calc).

## 🔄 How to Work on a Project
1. `cd project1-closest-hub`
2. Open `test.html` → **F12 Console** → Test function.
3. Edit `script.js` → Save → Refresh → Test.
4. Done?  
   ```
   git add .
   git commit -m \"feat: closestPostOffice works!\"
   git push origin main
   ```

Next projects unlocked as you complete! 🚀🦀