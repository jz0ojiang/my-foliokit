---
title: 学生档案管理系统 (Flask全栈)
date: 2023-04-10
description: 基于 Flask + Peewee 的学生档案管理系统，支持多角色信息管理与成绩统计
endDate: 2023-05-10 # date / optional / support present ; 日期 / 可选项 / 支持 present (至今)
cover: https://image.im0o.top/2025/202505201332873.png # optional ; 可选项
tags:
  - Flask#3B80C2
  - 全栈开发#4A90E2
  - 教务系统#50E3C2
  - 学生管理#F5A623
  - Python
abbrlink: f7572ac9
---

<!-- 项目正文内容，可支持 Markdown 格式 / Project content below, supports Markdown format -->

## 📝 项目简介

本系统是一个基于 Flask 框架构建的学生档案管理平台，采用 Peewee ORM 进行数据库操作，支持学生、教师、管理员三类用户角色，具备完整的档案管理与教务功能。系统采用前后端分离的设计思路，通过 RESTful API 实现数据交互，前端页面以 Jinja2 模板结合 Layui 渲染展示，功能丰富、逻辑清晰，适用于中小型教学场景下的信息管理需求。

## 🔧 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | HTML、Jinja2、CSS、Layui、jQuery、ECharts |
| 后端 | Python Flask、RESTful API |
| 数据库 | SQLite（通过 Peewee ORM 操作） |
| 安全认证 | JWT（PyJWT） |
| 其他 | chinesecalendar（节假日日历支持）、pandas（Excel导出） |

## 🗂️ 功能模块与结构

### 系统角色

- 👤 学生：查看个人档案与成绩，支持导出
- 🧑‍🏫 教师：管理所带班级的学生信息与成绩
- 🧑‍💼 管理员：管理师生账号，发布系统公告

### 核心功能

- ✅ 用户登录/身份认证（JWT）
- 📋 学生档案管理（增删改查 + 导出 Excel）
- 📊 成绩管理（平时/期中/期末成绩录入与图表统计）
- 📣 公告系统（后台发布/前端展示）
- 📅 日历功能（结合节假日计算）
- 📁 头像上传与菜单权限自动分配

### 项目结构（简略）

```

├── api/         # RESTful 接口
├── app/         # 各角色页面路由
├── database/    # 数据表定义（Peewee ORM）
├── service/     # 业务逻辑处理
├── templates/   # 页面模板（Jinja2）
├── static/      # JS、CSS、图标等静态资源
├── main.py      # 启动入口

```

### 系统流程图

![](https://image.im0o.top/2025/202505201335142.jpg)

### 数据库结构（E-R 图）

![](https://image.im0o.top/2025/202505201335063.jpg)

## 🖼️ 页面展示

### 登录与主页

- 登录页界面  
  ![登录页](https://image.im0o.top/2025/202505201331890.png) <!-- 图1 -->

- 学生登录后主页  
  ![学生主页](https://image.im0o.top/2025/202505201332873.png)

### 学生模块

- 个人档案页（信息+头像）  
  ![学生档案](https://image.im0o.top/2025/202505201332289.png) <!-- 图3 -->

  ![](https://image.im0o.top/2025/202505201332293.png)

- 成绩页：无数据状态  
  ![](https://image.im0o.top/2025/202505201333783.png)

- 成绩页：图表展示（ECharts）  
  ![](https://image.im0o.top/2025/202505201333530.png)

### 教师模块

- 学生档案管理界面  
  ![](https://image.im0o.top/2025/202505201333619.png)

- 导出学生名单
  ![](https://image.im0o.top/2025/202505201333495.png)

- 编辑学生信息  
  ![](https://image.im0o.top/2025/202505201334372.png)

- 成绩管理总览页  
  ![](https://image.im0o.top/2025/202505201334621.png)

- 成绩编辑界面  
  ![](https://image.im0o.top/2025/202505201334374.png)

### 管理员模块

- 学生账号管理  
  ![](https://image.im0o.top/2025/202505201334072.png)

- 教师账号管理  
  ![](https://image.im0o.top/2025/202505201335851.png)

- 公告发布管理  
  ![](https://image.im0o.top/2025/202505201335137.png)

## ✅ 项目成效

- 完整覆盖学生、教师、管理员三类教务操作场景
- 实现模块清晰、前后端逻辑分离，维护与扩展性良好
- 支持图表可视化、Excel 导出、节假日日历等增强功能
- 项目已部署运行，系统稳定，功能完整

## 💡 经验与收获

在该项目中实现了完整的 Web 全栈开发闭环，涵盖接口设计、权限控制、数据建模与前端交互，尤其通过 Peewee ORM 的实际应用，提升了对数据库抽象层设计的理解；同时，也锻炼了跨层数据联动与模块化架构拆分能力。
