# 🌟 PM Internship Scheme – AI-Powered Internship Recommendation System

### 🚀 Built by Team ThinkBots

An **AI-powered, inclusive internship recommendation platform** designed for the **PM Internship Scheme**, connecting youth from every corner of India to internships that truly match their **skills, education, and aspirations** — fast, fair, and smart.

---

## 🧠 Problem Statement

The **PM Internship Scheme** receives thousands of applications from youth across India — many from rural, tribal, or underprivileged backgrounds, often with **limited digital exposure** and **no prior internship experience**.  
With hundreds of listings available, identifying the *right* opportunity becomes confusing and overwhelming.  

This leads to:
- ❌ Misaligned applications  
- ⚙️ Missed opportunities  
- 📉 Low conversion rates  

---

## 🎯 Objective

To develop a **lightweight AI-based recommendation system** that:
- Suggests **3–5 best-fit internships** per candidate  
- Works on **low bandwidth and low-end devices**  
- Is **multilingual**, **inclusive**, and **easy to navigate**  
- Integrates seamlessly with the **existing PM Internship Scheme portal**

---

## 💡 Key Features

| Category | Features |
|-----------|-----------|
| **AI Recommendation Engine** | Suggests the most relevant internships using candidate profiles |
| **Profile Capture** | Collects education, skills, interests, and location preferences via simple forms and icons |
| **Hybrid Approach** | Combines rule-based filtering (eligibility check) + ML-light ranking (relevance scoring) |
| **Personalized Suggestions** | Shows only 3–5 top internships instead of long, confusing lists |
| **Simple UI/UX** | Card-based interface with icons, “Apply Now” buttons, and mobile-first layout |
| **Multilingual Support** | i18n integration – supports English, Hindi, and other Indian languages |
| **Inclusivity & Accessibility** | Icon-driven design for users with low digital literacy |
| **Chatbot Assistant** | Multilingual AI chatbot for guidance, FAQs, and quick help |
| **Integration Ready** | Can be directly embedded into the PM Internship Scheme portal |
| **Analytics & Notifications** | Firebase Cloud Functions for engagement tracking and email/SMS alerts |

---

## 🧩 System Architecture
Frontend (React.js)
↓
Backend (Node.js + Express.js)
↓
AI/ML Service (Python + FastAPI)
↓
Database (Firebase Firestore + Authentication)


**Data Flow:**
1. User logs in → profile data captured  
2. Backend sends profile → AI model via FastAPI  
3. Model computes embeddings & similarity scores  
4. Backend returns top 3–5 best-fit internships  
5. Frontend displays results in interactive cards  

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **React.js**, **HTML**, **CSS**, **JavaScript**
- Responsive UI for **web & mobile**
- **Dark/Light mode toggle**
- **Multilingual support (i18n)**
- Sections: *Explore*, *Applied*, *Profile*, *About*

### ⚙️ Backend
- **Node.js + Express.js**
- Middleware between frontend, Firebase, and ML service
- API endpoints for profile submission and internship recommendations

### 🧠 AI/ML Layer
- **Python (FastAPI)**
- **Sentence Transformer Model** for embeddings
- **Rule-based filtering** (eligibility, location)
- **Semantic similarity ranking** for relevance scoring
- Returns **Top 3–5 personalized recommendations**

### ☁️ Supporting Services
- **Firebase Authentication** – secure login & user management  
- **Firebase Firestore** – store candidate profiles and internships  
- **Firebase Cloud Functions** – for email/SMS notifications  
- **Firebase Hosting / Node.js Hosting** – scalable deployment  
- **Analytics** – track engagement and recommendation success  

---

## 🖼️ UI Walkthrough

- **Login Page** → Secure entry with dark/light mode toggle  
- **Home Page** → Explore, Applied, Profile & About sections  
- **Explore Page** → Manual search + AI Resume Analyzer  
- **Internship Cards** → Show More, View Details, Apply buttons  
- **Applied Section** → Track all applications easily  
- **Profile Page** → Organized personal information  
- **About Page** → Meet *Team ThinkBots*  
- **Chatbot** → Multilingual, interactive, and remembers chats  

---

## 📊 Innovation

- Focus on **quality over quantity**: Only the *most relevant* internships are shown  
- Uses a **hybrid AI approach** for precision and inclusivity  
- **Mobile-first**, **lightweight**, and **low-bandwidth friendly**  
- Designed to **bridge the gap** between rural talent and real-world opportunities  

---

## 🧑‍💻 Installation & Setup

### 1. Clone the repository
```
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Frontend Setup
```
cd client
npm install
npm start
```

### 3. Backend Setup
```
cd server
npm install
node server.js
```

### 4. Open the Application
```
http://localhost:3000
```
---

### 👥 Team ThinkBots

| Name                    | Role                         | Responsibilities                                                             |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| **Pulastya Bhagwat**    | Machine Learning Engineer    | AI model design adn fine tuned, FastAPI integration, Semantic matching logic |
| **Viraj Gupta**         | Backend Developer            | Node.js APIs, Firebase integration, server-side routing                      |
| **Vishesh Dwivedi**     | Backend Developer            | API optimization, middleware handling, database management                   |
| **Nihari Shrivastava**  | Frontend Developer           | Page structure, interactive design, React component                          |
| **Alok Singh Kushwaha** | Frontend Developer           | Animations, UI responsiveness, styling                                       | 
| **Prerna Pandey**       | UI/UX designer               | Designed initial structure and icons on figma                                |

---

### 🏁 Future Scope
- Expand to real-time internship data via API integration
- Develop a native mobile app (React Native)
- Add an AI Career Coach chatbot for skill-building guidance
- Integrate with government education and employment portals
- Voice-enabled chatbot for accessibility

---

### 📜 License
**This project is licensed under the MIT License — feel free to use and improve upon it!**
