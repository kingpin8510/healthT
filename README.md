# **Workout Tracker SPA**  

## **Overview**  
This is a single-page application (SPA) built using **Angular 19** that allows users to track their workouts. Users can enter their **name**, select a **workout type**, and specify the **duration** of their workout. The app provides features such as **search**, **filtering**, **pagination**, and **data persistence using localStorage**. Additionally, it includes **charts to visualize workout progress**.  

## **Features**  

✅ Add user workouts (User Name, Workout Type, and Minutes)  
✅ Display workouts in a table grid  
✅ Search workouts by user name  
✅ Filter workouts by workout type  
✅ Pagination for more than 5 users  
✅ Store data using localStorage  
✅ Preloaded with 3 default users  
✅ Unit tests for 1 component & 1 service (100% code coverage)  
✅ Hosted on Vercel
✅ Bonus: Charts for workout progress  

## **Screenshots**  

### **Application UI**  
![App Screenshot](Images/Chart.png)  
![App Screenshot](Images/UserInput.png)
![App Screenshot](Images/UserList.png)

### **Unit Test Coverage Report**  
![Code Coverage](Images/Coverage.png)  

---

## **Tech Stack**  

- **Angular 14+** (Frontend Framework)  
- **Tailwind CSS** (Styling)  
- **Angular Material & PrimeNG** (UI Components)  
- **Chart.js & ng2-charts** (Charts)  
- **Jest/Karma** (Unit Testing)  

---

## **Installation & Setup**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/yourusername/workout-tracker.git
cd workout-tracker
```

### **2. Installation** 
```bash
npm install
```

### **3. Run it locally** 
```bash
ng serve
```

### **4. Run tests**
```bash
npm run test:cov
```

## **Project Stucture**
```
📦 healthT
├─ .editorconfig
├─ .gitignore
├─ .postcssrc.json
├─ .vscode
│  ├─ extensions.json
│  ├─ launch.json
│  └─ tasks.json
├─ Images
│  ├─ Chart.png
│  ├─ Coverage.png
│  ├─ UserInput.png
│  └─ UserList.png
├─ README.md
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ src
│  ├─ app
│  │  ├─ app-routing.module.ts
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  ├─ app.module.ts
│  │  ├─ components
│  │  │  ├─ workout-chart
│  │  │  │  ├─ workout-chart.component.css
│  │  │  │  ├─ workout-chart.component.html
│  │  │  │  └─ workout-chart.component.ts
│  │  │  ├─ workout-form
│  │  │  │  ├─ workout-form.component.html
│  │  │  │  └─ workout-form.component.ts
│  │  │  └─ workout-list
│  │  │     ├─ workout-list.component.html
│  │  │     ├─ workout-list.component.spec.ts
│  │  │     └─ workout-list.component.ts
│  │  ├─ models
│  │  │  └─ workout.model.ts
│  │  └─ services
│  │     ├─ workout.service.spec.ts
│  │     └─ workout.service.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json
```

