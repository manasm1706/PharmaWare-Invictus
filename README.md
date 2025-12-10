# JR-35-Invictus

# 💊 PharmaWare — Smart Medication Management System

PharmaWare is a **full-stack medication management platform** designed to help patients, caregivers, and families easily organize prescriptions, track dosage schedules, and never miss a medication again.

This project was built during the **Invictus 24-Hour Hackathon**, and later continued with deeper backend integration, authentication, pharmacy lookups, and real-world usability features.

---

## 🚀 Features

| Feature | Description |
|--------|------------|
| 🔐 **User Authentication** | Secure login/signup using JWT |
| 💊 **Medication Tracking** | Add, edit, delete prescribed medicines |
| ⏰ **Smart Reminders** | See your doses for today & upcoming schedule |
| 📈 **Adherence Rate Calculation** | Tracks consistency and displays percentage |
| 🧾 **Medication History** | Visual timeline of previously taken doses |
| 👨‍👩‍👧 **Caregiver Access** | Allow caregivers to monitor a patient |
| 🏥 **Pharmacy Finder** | Locate nearest pharmacies (geolocation + map integration) |
| 🔍 **Medicine Search** | Search drugs using external medical database API |
| ⚙️ **Profile & Settings** | Customize profile and medication preferences |

---

## 🖥 Dashboard Preview

> Displays statistics, today's medicines, upcoming doses, and past adherence.

*(Insert the screenshot you shared here)*  
Example:  

---

## 🏗 Tech Stack

### **Frontend**
- React (Vite)
- JSX + CSS (No Tailwind)
- Axios
- React Router

### **Backend**
- Node.js + Express
- MongoDB Atlas (Mongoose ODM)
- JWT Authentication + bcrypt

### **APIs**
- OpenFDA / Medicine Search API (or custom implemented if changed)
- Browser Geolocation + Maps (if integrated)

---

## 📦 Folder Structure

PharmaWare/
│
├── client/ # React Frontend
│ ├── src/components
│ ├── src/pages
│ ├── src/context
│ └── src/services
│
├── server/ # Node.js Backend
│ ├── routes
│ ├── controllers
│ ├── models
│ └── middleware
│
└── README.md

---

## ⚙️ Setup Instructions

### 🔧 Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/PharmaWare.git
cd PharmaWare
```
### Install Server Dependencies
cd server
npm install
### 💾 Create .env file
ini
###  create .env
MONGO_URI=YourMongoDBAtlasConnectionString
JWT_SECRET=YourRandomSecret
PORT=5000
### Run server:

npm start

### 🖥 Install Frontend Dependencies
cd client
npm install
npm run dev
```
🧠 Future Scope

🔔 Push Notification reminders (PWA / mobile app)

🤖 AI-based medicine interaction warnings

📱 Full mobile first UI

🧪 Pill recognition (upload image => detect medicine)

👨‍⚕ Doctor portal for prescriptions

🏅 Achievements

Built in 24 hours during Invictus Hackathon

Ranked Top 5 finalist selection

Continuing development as a production-ready product

📜 License

This project is licensed under the MIT License — free for personal and educational use.

⭐ If you like this project — give the repo a star!

Contributions are welcome 🚀
```
