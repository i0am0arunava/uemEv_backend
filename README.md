<p align="center">
  <img src="https://github.com/user-attachments/assets/71057b05-61e5-4aa7-99ea-4f25113d24fe" alt="logo" />
</p>



An intelligent, collaborative **Event Management System** where HODs, Organisers, and Students work together to manage events efficiently. It handles event approvals, detects conflicts, allocates students to seminar halls using a best-fit algorithm, provides QR-based attendance verification, and displays events on a dynamic calendar.

![GitHub contributors](https://img.shields.io/github/contributors/i0am0arunava/uemEvent_fe?style=for-the-badge&color=21bf48)
![GitHub Repo stars](https://img.shields.io/github/stars/i0am0arunava/uemEvent_fe?style=for-the-badge&color=2176bf)
![GitHub issues](https://img.shields.io/github/issues/i0am0arunava/uemEvent_fe?style=for-the-badge&color=f5d742)
![GitHub pull requests](https://img.shields.io/github/issues-pr/i0am0arunava/uemEvent_fe?style=for-the-badge&color=7e5bef)
![GitHub License](https://img.shields.io/github/license/i0am0arunava/uemEvent_fe?style=for-the-badge&color=5c6ac4)
![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fi0am0arunava%2FuemEvent_fe&label=Repo%20Views&countColor=%2337d67a&labelStyle=upper)

---

## 🔮 Features

- 👩‍🎓 Role-Based Access: HOD, Organiser, Student
- ✅ Event Submission and Approval Workflow
- ⚡ Automatic Conflict Detection and Resolution
- 🧠 Best-Fit Seminar Hall Allotment (avg 24 seats per hall)
- 🎫 QR Code Generation and Scanning for Attendance
- 🗓️ Calendar View: Display upcoming and approved events
- 📋 View approval status and student enrollment status
- 🔄 Real-time updates across event statuses
- 📣 Notification system for approvals and rejections

---




## 🖼️ Preview




| Feature | Screenshot |
|:---|:---|
| **1. Organiser / HOD / Student Dashboards** | ![Screenshot from 2025-04-26 15-46-58](https://github.com/user-attachments/assets/1fbe9541-42a7-4629-83f4-47b05af1bca9)|
| **2. Calendar View** | ![Screenshot from 2025-04-26 15-47-30](https://github.com/user-attachments/assets/88ed5d1b-0515-4f6d-be79-3479c2420473) |
| **3. Checklist of Events** | ![Screenshot from 2025-04-26 15-47-13](https://github.com/user-attachments/assets/3ea34d08-7514-47eb-a7c5-208f8410c3b3)|
| **4. HOD Approval Section** | ![Screenshot from 2025-04-26 16-09-44](https://github.com/user-attachments/assets/b1d24914-f20e-4b99-927c-a5dc6c97fd29) |
| **5. Event Status Checking (Approved/Rejected)** |![Screenshot from 2025-04-26 16-06-14](https://github.com/user-attachments/assets/793919bc-5b44-4ba2-bad5-42203277e3ba) |
| **6. Best-Fit Algorithm (Seminar Hall Allocation)** | ![Screenshot from 2025-04-26 15-48-00](https://github.com/user-attachments/assets/e70b310f-b6a3-4933-b5f5-40c4cf96dd47) |
| **7. Student Verification by QR Code** | ![Screenshot from 2025-04-26 15-46-47](https://github.com/user-attachments/assets/c991e47f-a80c-4e74-bc52-d25e9772af4d) |



## 🚀 Live Preview

You can view the live preview of the project [here](https://your-live-link.com/).

---

## 💻 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-ffffff?style=for-the-badge)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## ⚙️ Installation

### Method 1: Manual Installation

1. **Fork this repository:** Click the Fork button located in the top-right corner of this page.
2. **Clone the repository:**
    ```bash
    git clone https://github.com/<your-username>/event-management-system.git
    ```
3. **Create .env file:**
   
   Inside the client and server directories, create `.env` files and set:

   Frontend:
   ```bash
   VITE_BACKEND_URL=<your_server_url>
