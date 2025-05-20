---
title: 智慧校园通
date: 2022-03-01
endDate: 2022-05-30
description: "微信小程序 + Golang 后端 + 管理后台 + 树莓派扫码终端，服务校园请假核验场景的完整系统方案"
cover: https://image.im0o.top/2025/202505202253873.png
tags:
  - 全栈开发#FF9900
  - 微信小程序#4A90E2
  - Go
  - Vue
  - Rust
  - 树莓派#FF6B6B
  - 管理系统#42B883
top: false # optional ; 可选项
draft: false # optional ; 可选项
weight: 5 # optional ; 可选项
no_ai: false # optional ; 可选项
abbrlink: 095fde3e
---

<!-- 项目正文内容，可支持 Markdown 格式 / Project content below, supports Markdown format -->

## 📺 项目演示视频

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV15VJhzCEDi&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>


## 项目背景

本项目源自 2022 年春季疫情封校期间，学生出入校门依赖纸质校牌和出门证，既低效又易错。为提升流程效率，设计了"智慧校园通"系统，覆盖从请假申请、教师审批、二维码生成与身份核验的完整流程，适配封闭管理校园场景。

项目包含微信小程序、Golang 后端服务、Vue 管理后台与树莓派扫码终端，为该场景构建了闭环型解决方案。开发任务主要由我一人完成，包含界面设计、系统实现、逻辑构建与部分硬件配合。

## 系统结构

整体架构分为 4 部分：

- 🧾 微信小程序（学生端 / 教师端）
- 🔧 后端服务（Go + GORM + MySQL）
- 🖥 管理后台（Vue + Naive UI）
- 📟 树莓派扫码终端（配合二维码验证 + Rust 驱动）

系统采用前后端分离架构，微信小程序使用 Uni-app + VantUI 实现，后端提供 RESTful API 接口，支持身份绑定、动态二维码展示、请假记录查询等。后端服务运行在 Nginx 反代下，采用 MySQL 主从结构，API 接口统一通过 Gin 路由注册。

## 微信小程序端

前端使用 Uni-app 构建，支持运行在微信小程序与 H5 环境中。页面结构包括：

- **index**：入口页（学生登录 / 教师登录 / 核验信息）
- **stucard**：学生端二维码展示页，动态背景区分身份
- **leaveform**：请假表单填写，选择时间+事由
- **tchmain**：教师端假条审核列表
- **binduser**：首次绑定学号与身份

二维码采用服务端自生成机制，包含加密时间戳与 hash 验证，防止伪造。二维码背景颜色与身份联动（走读/住宿生），并设定自动刷新机制，每分钟更新。

## 后端服务结构（Golang）

后端服务基于 Gin 框架，模块化拆分，结构清晰：

- `main.go`：程序入口，初始化数据库、中间件、路由等
- `routers/`：路由定义（stu、tch、img）
- `app/`：业务逻辑实现
- `middleware/`：用户身份鉴权、session 校验
- `utils/`：工具函数（二维码生成、密码加密、时间戳处理等）

### 部分 API 路径（节选）

#### 学生端
- `POST /stu/login` 登录
- `GET /stu/getStuByWx` 获取绑定信息
- `GET /stu/getStuByQr` 通过二维码获取学生信息
- `POST /stu/addLrequest` 添加请假请求
- `GET /stu/getLrequest` 获取历史假条
- `GET /stu/getLatestQr` 获取最新二维码

#### 教师端
- `POST /tch/login` 教师登录
- `POST /tch/auditLreq` 审核假条
- `GET /tch/getLrequest` 获取待审批请求
- `POST /tch/cpasswd` 修改密码

#### 图像相关
- `GET /img/:stuid` 获取学生头像

## 二维码加密机制设计

二维码并非明文生成，而是包含动态时间戳与 hash 字符串：

```go
hash := fmt.Sprintf("%s-%d-%d-%s%s%s", stuid, now, expire, hash2[:16], salt, hash2[16:])
```

验证流程如下：

* 提取二维码中的时间戳字段，验证是否过期；
* 根据学号与时间戳重新计算 hash，对比是否一致；
* 验证通过后返回身份信息，否则视为失效；

这一机制结合前端二维码自动刷新，构成基本防伪逻辑。

## 管理后台（Vue 3）

后台系统基于 Vue 3 + Naive UI 实现，功能覆盖：

* 教师 / 学生 / 班级管理
* 假条记录查询与审批情况统计
* 假条数量 / 系别统计图表展示
* 自动切换明暗模式

后台以管理操作为主，适用于校级管理员使用，与小程序前端保持权限隔离。

## 扫码终端实现（Rust + 树莓派）

硬件端使用树莓派 + USB 扫码器构成，扫码后调用服务端接口验证二维码合法性，并通过扬声器播放语音反馈（Rust 驱动实现）。

流程：

1. 识别小程序中展示的二维码；
2. 解码后调用 `/stu/vertifyStu` 接口；
3. 若返回合法，语音播报"验证成功"；否则"验证失败"；
4. 核验行为与后端数据库中假条状态绑定（含是否在可通行时间段内）；

该部分在演示视频中有详细展示。

## 项目演示与评价

项目支持完整功能演示，曾在校内演示并参加江苏省职业院校创新创业大赛"创新启蒙组"比赛，作为本人毕业设计提交并通过答辩。系统已测试多个身份、流程场景，完成初步验证。

虽未最终落地部署，但整体流程完整，结构清晰，具备工程扩展空间。

## 改进思路

该项目为早期实践作品，若重构将做如下调整：

* 替换 Uni-app 为原生 WXML 实现；
* 后端补充测试与限流机制；
* 接入 OAuth/LDAP 实现统一认证；
* 管理后台按角色权限进一步细化；
* 拆分为 SaaS 架构，支持多校部署；

二维码加密机制可引入签名策略提升安全性，同时可借助 Redis 做冷却与限时校验逻辑优化。

本项目为我后续多个系统架构项目打下基础，对服务端权限设计、前后端交互约定、软硬件对接等均有直接经验迁移价值。