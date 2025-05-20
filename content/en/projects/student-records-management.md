---
title: Student Records Management System (Flask Full Stack)
date: 2023-04-10
description: A Flask + Peewee based student records management system supporting multi-role information management and grade statistics
endDate: 2023-05-10
cover: https://image.im0o.top/2025/202505201332873.png
tags:
  - Flask#3B80C2
  - Full Stack#4A90E2
  - Academic System#50E3C2
  - Student Management#F5A623
  - Python
abbrlink: c8683bda
---

## 📝 Project Introduction

This system is a student records management platform built on the Flask framework, utilizing Peewee ORM for database operations. It supports three user roles: students, teachers, and administrators, with comprehensive records management and academic functions. The system adopts a frontend-backend separation design approach, implementing data interaction through RESTful APIs. The frontend pages are rendered using Jinja2 templates combined with Layui, featuring rich functionality and clear logic, suitable for information management needs in small to medium-sized educational scenarios.

## 🔧 Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | HTML, Jinja2, CSS, Layui, jQuery, ECharts |
| Backend | Python Flask, RESTful API |
| Database | SQLite (via Peewee ORM) |
| Authentication | JWT (PyJWT) |
| Others | chinesecalendar (holiday calendar support), pandas (Excel export) |

## 🗂️ Features and Structure

### System Roles

- 👤 Student: View personal records and grades, with export support
- 🧑‍🏫 Teacher: Manage student information and grades for assigned classes
- 🧑‍💼 Administrator: Manage teacher and student accounts, publish system announcements

### Core Features

- ✅ User login/authentication (JWT)
- 📋 Student records management (CRUD + Excel export)
- 📊 Grade management (regular/midterm/final grade entry and chart statistics)
- 📣 Announcement system (backend publishing/frontend display)
- 📅 Calendar functionality (with holiday calculations)
- 📁 Avatar upload and automatic menu permission assignment

### Project Structure (Simplified)

```
├── api/         # RESTful interfaces
├── app/         # Role-specific page routes
├── database/    # Data table definitions (Peewee ORM)
├── service/     # Business logic processing
├── templates/   # Page templates (Jinja2)
├── static/      # JS, CSS, icons and other static resources
├── main.py      # Entry point
```

### System Flow Diagram

![](https://image.im0o.top/2025/202505201335142.jpg)

### Database Structure (E-R Diagram)

![](https://image.im0o.top/2025/202505201335063.jpg)

## 🖼️ Page Showcase

### Login and Homepage

- Login Page  
  ![Login Page](https://image.im0o.top/2025/202505201331890.png)

- Student Homepage after Login  
  ![Student Homepage](https://image.im0o.top/2025/202505201332873.png)

### Student Module

- Personal Records Page (Information + Avatar)  
  ![Student Records](https://image.im0o.top/2025/202505201332289.png)

  ![](https://image.im0o.top/2025/202505201332293.png)

- Grades Page: No Data State  
  ![](https://image.im0o.top/2025/202505201333783.png)

- Grades Page: Chart Display (ECharts)  
  ![](https://image.im0o.top/2025/202505201333530.png)

### Teacher Module

- Student Records Management Interface  
  ![](https://image.im0o.top/2025/202505201333619.png)

- Export Student List
  ![](https://image.im0o.top/2025/202505201333495.png)

- Edit Student Information  
  ![](https://image.im0o.top/2025/202505201334372.png)

- Grade Management Overview  
  ![](https://image.im0o.top/2025/202505201334621.png)

- Grade Editing Interface  
  ![](https://image.im0o.top/2025/202505201334374.png)

### Administrator Module

- Student Account Management  
  ![](https://image.im0o.top/2025/202505201334072.png)

- Teacher Account Management  
  ![](https://image.im0o.top/2025/202505201335851.png)

- Announcement Management  
  ![](https://image.im0o.top/2025/202505201335137.png)

## ✅ Project Achievements

- Complete coverage of academic operation scenarios for students, teachers, and administrators
- Clear module implementation with frontend-backend logic separation, good maintainability and extensibility
- Support for enhanced features like chart visualization, Excel export, and holiday calendar
- System deployed and running stably with complete functionality

## 💡 Experience and Insights

This project implemented a complete Web full-stack development cycle, covering interface design, permission control, data modeling, and frontend interaction. Particularly through the practical application of Peewee ORM, it enhanced understanding of database abstraction layer design. It also developed capabilities in cross-layer data linkage and modular architecture splitting. 