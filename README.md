# 📚 InternAtlas

**InternAtlas** is a web platform designed to streamline the internship search process for university students. It connects students with relevant internship opportunities, allows companies to manage their postings, and enables admins to maintain the platform’s integrity by overseeing activities and verifying organizations. Our goal is to make internships more accessible, organized, and student-friendly.

---

## 🚀 Features

- Students can search and filter internships based on various criteria.
- Students can track the status of their internship applications.
- Companies can register, post internship opportunities, and manage applications.
- Admins can approve/reject company profiles, delete inappropriate content, and generate reports.
- Integration with external APIs (e.g., LinkedIn Jobs, Maps) for enhanced experience.

---

## 🛠️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/internatlas.git
   cd internatlas
   ```

2. **Install dependencies**
   ```bash
   npm install react-bootstrap
   npm install bootstrap
   npm install react-router-dom
   npm install react-icons
   npm install d3
   npm install bootstrap-icons
   npm install bcrypt
   npm install multer
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
## 💡 Usage Instructions and Examples

### 👩‍🎓 Student

- **Sign Up / Log In** – Create an account or log in with your credentials.
- **Browse Internships** – Navigate to the homepage to explore available internship opportunities.
- **Search & Filter** – Use the search bar and filters (e.g., location, opportunity type, company) to find relevant internships.
- **Apply** – Click on a specific opportunity and hit “Apply” to submit your application.
- **Track Applications** – Monitor the status of your submitted applications.
- **Ratings & Reviews** - Read feedback from fellow students about their internship experiences and contribute by writing your review to help others.

### 🏢 Company

- **Register Your Company** – Sign up and fill out your company profile. Wait for admin approval.
- **Post Opportunities** – After approval, post new internships and manage listings.
- **Review Applications** – View student applications and contact candidates if needed.
- **Update Existing Opportunity** – Edit any posted internship by selecting it from the list, updating its details, and saving the changes.
- **View & Respond to Reviews** – Check student feedback on your internships and respond directly through your dashboard.

### 🛡️ Admin

- **Dashboard Access** – Log in to view all admin functionalities.
- **Approve/Reject Company Profiles** – Review submitted company registrations for approval.
- **Manage Content** – Delete inappropriate company profiles, internship postings, ratings, or applications.
- **Generate Reports** – Access analytics and generate reports on platform activity.

---


## 🔐 Login Credentials for Demo

- **Admin**:  
  - Username: `admin`  
  - Password: `admin`

- **Company**:  
  - Username: `company`  
  - Password: `company`

- **Student**:  
  - Username: `student`  
  - Password: `student`

---

## 📝 InternAtlas Backend & API Documentation
### 👩‍🎓 Company Reviews / Responses / Inappropriate Reviews
***This backend handles:***

- ✅ Fetching company reviews
- ✅ Posting company responses
- ✅ Managing inappropriate review flags

#### 📍 API Endpoints
➤ GET /api/reviews/:company/:position
- Returns reviews for a specific company and position.

Example Request:
````bash
GET /api/reviews/Sabic/Software%20Engineering%20Intern
````
Example Response:
````bash
{
  "_id": "680fe7aa9311423468ab9bb3",
  "company": "Sabic",
  "position": "Software Engineering Intern",
  "studentId": 1,
  "studentName": "Ahmed Al-Saud",
  "rating": 4,
  "reviewText": "Learned a lot, but onboarding could improve.",
  "companyResponse": null,
  "is_inappropriate": false
}
````
➤ PATCH /api/reviews/:id/response
- Updates a review with the company’s official response.

Example Request:
````bash
PATCH /api/reviews/680fe7aa9311423468ab9bb3/response
Content-Type: application/json

{
  "responseText": "Thank you for the feedback!"
}
````
Example Response:
````bash
{
  "_id": "680fe7aa9311423468ab9bb3",
  "company": "Sabic",
  "position": "Software Engineering Intern",
  "studentId": 1,
  "studentName": "Ahmed Al-Saud",
  "rating": 4,
  "reviewText": "Learned a lot, but onboarding could improve.",
  "companyResponse": "Thank you for the feedback!",
  "is_inappropriate": false
}
````
➤ PATCH /api/reviews/:id/flag
- Flags or unflags a review as inappropriate by updating the is_inappropriate boolean field.

Example Request (flagging a review):
````bash
PATCH /api/reviews/680fe7aa9311423468ab9bb3/flag
Content-Type: application/json

{
  "is_inappropriate": true
}
````
Example Request (unflagging a review):
````bash
PATCH /api/reviews/680fe7aa9311423468ab9bb3/flag

Content-Type: application/json

{
  "is_inappropriate": false
}
````
---


## 👥 Team Members & Roles

| Name            | Role        |
|-----------------|-------------|
| Joud Alsayid    | Team Member |
| Rawan Asiri     | Team Member |
| Aryam Alshehri  | Team Member |
| Danah Alotaibi  | Team Member |
| Aishah Algharib | Team Member |
