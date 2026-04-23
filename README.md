## EMRix – EMR Appointment System

EMRix is a full-stack Electronic Medical Records (EMR) and appointment management system designed for healthcare applications.

    ⚠️ This project is currently in progress and actively being improved.

### 🚀 Features
- 🔐 Authentication & Security
    - JWT-based authentication (Access + Refresh Tokens)
    - Token rotation for enhanced security
    - Role-Based Access Control (Admin, Doctor, Receptionist)
- 📅 Appointment Scheduling
    - Dynamic slot generation based on doctor availability
    - Configurable working hours and slot duration
    - Real-time slot status tracking
- 📌 Appointment Management
    - Book, reschedule, and cancel appointments
    - Prevent double booking using concurrency control
- 🆔 Patient Management
    - Unique Patient ID generation (UHID-like format: PAT-YYYY/SEQ)
- 📊 System Reliability
    - Logging and audit tracking for system activities
    - Optimized database queries and indexing

### 🧠 Key Concepts Implemented
- Concurrency handling using atomic database operations
- Token rotation strategy for improved authentication security
- Role-based authorization using middleware
- Scalable ID generation using database counters
- Implemented secure password reset using OTP (Twilio SMS) with attempt limiting to prevent abuse.
- Added audit logging for tracking user actions such as login and appointment operations.
- Captured login metadata (IP address, browser, OS, device type) for basic security monitoring.

### Tech Stack
- Frontend: React.js, RTK Query
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (Access & Refresh Tokens)

### 🏗️ System Design Overview
- RESTful API architecture
- MVC pattern for backend structure
- Separate authentication middleware for role validation
- Centralized error handling

### Purpose
Built to demonstrate real-world full-stack development skills, including secure authentication, scalable architecture, and efficient data management in healthcare systems.

### Project Structure
```bash
EMR Appointment System/
│
├── backend/   # Express backend
├── frontend/   # React frontend
└── README.md
```

### ⚙️ Installation & Setup
1. Clone the repository
```bash
git clone https://git@github.com:shafeeqap/EMRix.git
cd EMR Appointment System
```
2. Install dependencies

🖥️ Backend Setup
```bash
cd backend
npm install
```
💻 Frontend Setup 
```bash
cd frontend 
npm install
```
3. Environment Variables
- Create a .env file in the backend:
```bash
PORT=5000 
MONGO_URI=your_mongodb_connection 

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_RESET_SECRET=your_reset_secret

ACCESS_TOKEN_EXPIRES=30m
REFRESH_TOKEN_EXPIRES=7d

NODE_ENV=development
MAX_SESSIONS=5

TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone

CLIENT_URL=http://localhost:5173
```
4. Run the application
Backend
```bash
cd backend 
npm run dev 
```
Server runs on:
```bash
http://localhost:3000
```
Frontend 
```bash
cd frontend 
npm run dev
```
Default Super Admin Credentials
```bash
Email: admin@clinic.com
Password: admin123
```
You can create it by running:
```bash
node seedAdmin.js
```
### 🔐 Authentication Flow
1. User logs in → receives Access Token + Refresh Token
2. Access Token is used for API requests
3. When expired → Refresh Token generates new Access Token
4. Refresh Token is rotated for improved security


### API Endpoints

 Authentication
- POST   /api/auth/login
- POST  /api/auth/refresh-token
- POST  /api/auth/forgot-password
- POST  /api/auth/verify-otp
- POST  /api/auth/reset-password

 Users
- GET     /api/users
- POST    /api/users
- PATCH   /api/users/:id
- DELETE  /api/users/:id

Doctors
- GET     /api/doctors
- POST    /api/doctors
- PUT     /api/doctors/:id
- DELETE  /api/doctors/:id

Patients
- POST   /api/patients  
- GET   /api/patients/:id 
- PUT   /api/patients/:id 
- DELETE   /api/patients/:id

Appointments
- GET     /api/appointments  
- POST    /api/appointments  
- PATCH   /api/appointments/:id 
- DELETE  /api/appointments/:id 

⚠️ Challenges & Solutions

❗ Preventing Double Booking
- Used atomic database operations (findOneAndUpdate with conditions)
- Ensures only one user can book a slot at a time

❗ Managing Token Security
- Implemented refresh token rotation to reduce risk of token misuse

📌 Future Improvements
- Payment integration for appointments
- Push Notification system
- Advanced analytics dashboard
- Microservices architecture for scalability

📄 License
- This project is for learning and demonstration purposes.

🙌 Author
- Aboobacker Shafeeq
- MERN Stack Developer

- GitHub: https://github.com/shafeeqap
- LinkedIn: https://linkedin.com/in/shafeeq-ap/