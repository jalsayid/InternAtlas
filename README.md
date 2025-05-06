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
  - Username: `aisha`  
  - Password: `aisha123`
 
  - Username: `joud`  
  - Password: `joud123`

- **Company**:  
 
  - Username: `Aramco`  
  - Password: `Aramco123`

- **Student**:  
  - Username: `NoufAlqahtani`  
  - Password: `Nouf123`
 
  - Username: `OmarAlharbi`  
  - Password: `Omar123`
---

## API Documentation

### POST /api/login
#### Description: Authenticates a user (student or company) and returns session details.
#### Request Body:
```
{
  "username": "string",
  "password": "string"
}
````

#### Response:
- **200 OK: Successfully logged in.
- **400 Bad Request: Missing username or password.
- **401 Unauthorized: Invalid username or password.
#### Example:
```
{
  "message": "Login successful",
  "userType": "student",
  "userId": "12345",
  "username": "johndoe",
  "fullName": "John Doe",
  "email": "johndoe@example.com"
}
```
### POST /api/register
#### Description: Registers a new user (student or company).

#### Request Body for Students:
```
{
"userType": "student",
"fullName": "string",
"username": "string",
"email": "string",
"password": "string",
"confirmPassword": "string",
"university": "string",
"major": "string",
"location": "string"
}
```
#### Request Body for Companies:
```
{
"userType": "company",
"companyName": "string",
"companySector": "string",
"companyUsername": "string",
"companyEmail": "string",
"companyPassword": "string",
"companyConfirmPassword": "string",
"companyDescription": "string",
"verificationFile": "/uploads/path/of/the/file/",
"Logo": "/uploads/path/of/the/file/",
"registrationStatus": "pending"
}
```

#### Response:
- **200 OK**: Registration successful.
- **400 Bad Request**: Missing fields or invalid input.

#### Example:

### POST /api/applications
#### Description: Submits an application for an internship. This endpoint handles both contact and general information.

#### Request Body:
```
{
"studentId": "string",
"internshipId": "string",
"contactInformation": {
"fullName": "string",
"email": "string",
"phone": "string",
"linkedin": "string",
"location": "string",
"gpa": "string",
"university": "string",
"major": "string",
"resume": "path/of/file"
},
"generalInformation": {
"availability": "Yes",
"fullTimeInterest": "Yes",
"relocation": "Yes",
"whyInterested": "string",
"skills": "string",
"careerGoals": "string"
}
}
```

#### Response:
- **201 Created**: Application submitted successfully.
- **400 Bad Request**: Missing required fields or invalid data.

#### Example:

```
{
"message": "Application submitted successfully!",
"applicationId": "abc123"
}
```

### GET /api/internships/id/:id
#### Description: Retrieves a specific internship's details by its ID.

#### Request: GET /api/internships/id/1

#### Response:
- **200 OK**: Internship details.

#### Example:
```
{
"title": "Software Engineering Internship",
"company": "TechCorp",
"location": "Remote",
"qualifications": "Bachelor's in Computer Science",
"responsibilities": "Develop software solutions"
}
```

### PUT /api/internships/id/:id
#### Description: Updates an existing internship opportunity.

#### Request Body:
```
{
"title": "Updated Internship Title",
"description": "Updated Description",
"location": "Updated Location",
"qualifications": "Updated Qualifications",
"responsibilities": "Updated Responsibilities"
}
```
#### Response:
- **200 OK**: Internship updated successfully.
- **400 Bad Request**: Invalid data or missing required fields.
---




## 👥 Team Members & Roles

| Name            | Role        |
|-----------------|-------------|
| Joud Alsayid    | Team Member |
| Rawan Asiri     | Team Member |
| Aryam Alshehri  | Team Member |
| Danah Alotaibi  | Team Member |
| Aishah Algharib | Team Member |
