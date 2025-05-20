---
title: SchoolPassport - Smart Campus Access System
date: 2022-03-01
endDate: 2022-05-30
description: "A complete system solution for campus leave verification, featuring WeChat Mini Program + Golang backend + Admin panel + Raspberry Pi QR code terminal"
cover: https://image.im0o.top/2025/202505202253873.png
tags:
  - Full Stack#FF9900
  - WeChat Mini Program#4A90E2
  - Go
  - Vue
  - Rust
  - Raspberry Pi#FF6B6B
  - Management System#42B883
top: false
draft: false
weight: 5
no_ai: false
abbrlink: 095fde3e
---

## 📺 Project Demo Video

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV15VJhzCEDi&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

## Project Background

This project originated during the Spring 2022 campus lockdown period, when student access relied on physical ID cards and paper passes, which were inefficient and error-prone. To improve the process, the "SchoolPassport" system was designed to cover the complete workflow from leave applications, teacher approval, QR code generation, to identity verification, adapting to closed campus management scenarios.

The project includes a WeChat Mini Program, Golang backend service, Vue admin panel, and Raspberry Pi QR code terminal, creating a closed-loop solution for this scenario. The development was primarily completed by myself, including interface design, system implementation, logic construction, and partial hardware integration.

## System Architecture

The overall architecture consists of 4 parts:

- 🧾 WeChat Mini Program (Student/Teacher Portal)
- 🔧 Backend Service (Go + GORM + MySQL)
- 🖥 Admin Panel (Vue + Naive UI)
- 📟 Raspberry Pi QR Code Terminal (QR verification + Rust driver)

The system adopts a frontend-backend separation architecture. The WeChat Mini Program is implemented using Uni-app + VantUI, while the backend provides RESTful API interfaces supporting identity binding, dynamic QR code display, leave record queries, etc. The backend service runs under Nginx reverse proxy, using MySQL master-slave structure, with API interfaces uniformly registered through Gin routing.

## WeChat Mini Program

The frontend is built with Uni-app, supporting both WeChat Mini Program and H5 environments. Page structure includes:

- **index**: Entry page (Student login / Teacher login / Verification info)
- **stucard**: Student QR code display page with dynamic background based on identity
- **leaveform**: Leave form submission, time + reason selection
- **tchmain**: Teacher leave approval list
- **binduser**: Initial student ID and identity binding

QR codes use a server-side generation mechanism, including encrypted timestamps and hash verification to prevent forgery. QR code background colors are linked to identity (day student/boarding student), with automatic refresh mechanism updating every minute.

## Backend Service Structure (Golang)

The backend service is based on the Gin framework, with modular separation and clear structure:

- `main.go`: Program entry, initializing database, middleware, routes, etc.
- `routers/`: Route definitions (stu, tch, img)
- `app/`: Business logic implementation
- `middleware/`: User authentication, session validation
- `utils/`: Utility functions (QR code generation, password encryption, timestamp processing, etc.)

### Selected API Endpoints

#### Student Portal
- `POST /stu/login` Login
- `GET /stu/getStuByWx` Get binding information
- `GET /stu/getStuByQr` Get student information via QR code
- `POST /stu/addLrequest` Add leave request
- `GET /stu/getLrequest` Get leave history
- `GET /stu/getLatestQr` Get latest QR code

#### Teacher Portal
- `POST /tch/login` Teacher login
- `POST /tch/auditLreq` Audit leave request
- `GET /tch/getLrequest` Get pending approval requests
- `POST /tch/cpasswd` Change password

#### Image Related
- `GET /img/:stuid` Get student avatar

## QR Code Encryption Design

QR codes are not generated in plain text but include dynamic timestamps and hash strings:

```go
hash := fmt.Sprintf("%s-%d-%d-%s%s%s", stuid, now, expire, hash2[:16], salt, hash2[16:])
```

Verification process:

* Extract timestamp field from QR code, verify expiration;
* Recalculate hash based on student ID and timestamp, compare for consistency;
* Return identity information if verified, otherwise consider invalid;

This mechanism, combined with frontend QR code auto-refresh, forms the basic anti-counterfeiting logic.

## Admin Panel (Vue 3)

The admin system is implemented using Vue 3 + Naive UI, with features covering:

* Teacher / Student / Class management
* Leave record queries and approval statistics
* Leave quantity / Department statistics charts
* Automatic light/dark mode switching

The admin panel focuses on management operations, suitable for school-level administrators, maintaining permission isolation from the Mini Program frontend.

## QR Code Terminal Implementation (Rust + Raspberry Pi)

The hardware end consists of Raspberry Pi + USB scanner, calling backend service interface to verify QR code legitimacy and providing voice feedback through speakers (Rust driver implementation).

Process:

1. Recognize QR code displayed in Mini Program;
2. Decode and call `/stu/vertifyStu` interface;
3. If valid, voice announces "Verification successful"; otherwise "Verification failed";
4. Verification behavior bound to leave status in backend database (including whether within allowed time period);

This part is demonstrated in detail in the demo video.

## Project Demo and Evaluation

The project supports complete functionality demonstration, having been presented on campus and participated in the "Innovation Enlightenment" category of Jiangsu Vocational College Innovation and Entrepreneurship Competition, submitted as my graduation project and passed defense. The system has been tested across multiple identities and process scenarios, completing preliminary validation.

Although not ultimately deployed, the overall process is complete, structure is clear, and has room for engineering expansion.

## Improvement Ideas

As an early practice project, if reconstructed, the following adjustments would be made:

* Replace Uni-app with native WXML implementation;
* Add backend testing and rate limiting mechanisms;
* Integrate OAuth/LDAP for unified authentication;
* Further refine admin panel by role permissions;
* Split into SaaS architecture supporting multi-school deployment;

QR code encryption mechanism could introduce signature strategy to enhance security, while Redis could be used to optimize cooling and time-limited verification logic.

This project laid the foundation for my subsequent system architecture projects, providing direct experience transfer value in server-side permission design, frontend-backend interaction conventions, and software-hardware integration. 