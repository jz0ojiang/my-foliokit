---
title: MythicGenerator - MythicMobs 配置生成器
date: 2022-04-12
endDate: 2023-10-24
description: MythicMobs 插件配置生成器，探索基于 Wails 与 Tauri 的桌面工具实践
cover: https://image.im0o.top/2025/202505201436933.png
tags:
  - Go
  - Vue
  - Tauri#FE7F2D
  - 桌面应用#4A90E2
  - Minecraft#7FB069
link: https://github.com/jz0ojiang/mythicgenerator
abbrlink: f1fdbd09
---


## 项目简介

MythicGenerator 是一个用于生成 Minecraft 插件 MythicMobs 配置的可视化工具。用户可通过图形界面配置物品属性、附魔等信息，并导出为符合插件要求的 YAML 文件，简化配置流程。本项目包含两个阶段的实现：

- ✅ **v1（已完成）**：使用 Wails + Go 构建的跨平台桌面应用；
- 🚧 **v2（开发中止）**：基于 Tauri + Vue3 + TypeScript 的现代化重构版本。


## v1：Wails 桌面版

![](https://image.im0o.top/2025/202505201434886.png)

### 🛠 技术栈

- 后端：**Golang + SQLite**，使用 GORM 操作数据库
- 框架：**[Wails](https://wails.io/)**，实现前后端融合的桌面应用
- 前端：**Vue 3 + Vite**，使用 `<script setup>` 单文件组件

### ✨ 实现功能

- **物品数据管理**：支持添加、编辑、删除、查询，涵盖属性、附魔、描述等字段；
- **数据持久化**：采用 SQLite 本地数据库；
- **YAML 导出**：可直接生成 MythicMobs 插件所需的配置；
- **跨平台支持**：支持 Windows / macOS 构建；
- **高效通信**：Wails 实现 Go 与前端间的数据桥接。

### 📂 目录结构简述

- `main.go`：应用入口
- `app.go`：业务逻辑处理
- `functions.go`：数据操作与导出功能
- `frontend/`：Vue 前端页面与组件

### ✨ 图片展示

![](https://image.im0o.top/2025/202505201435720.png)

![](https://image.im0o.top/2025/202505201435516.png)

![](https://image.im0o.top/2025/202505201436619.png)

![](https://image.im0o.top/2025/202505201436988.png)

![](https://image.im0o.top/2025/202505201436237.png)

![](https://image.im0o.top/2025/202505201436646.png)

![](https://image.im0o.top/2025/202505201436933.png)

## v2：Tauri + Vue3 重构版（已中止）

### 🎯 重构目标

为提升 UI 表现与扩展能力，尝试使用更轻量的 Tauri 框架，结合 Vue 3 与 TypeScript 实现模块化拖拽式组件系统。

### ✨ 拖拽功能实现

- 使用 `vuedraggable` 实现组件克隆拖拽；
- 支持锁定源组件，避免重复添加；
- 拖拽动画与自定义占位样式提升交互体验；
- 组件结构分离清晰，支持属性、展示、颜色等独立模块。

```ts
const siderlist = [
  {
    id: 0,
    name: "首页",
    component: null,
    locked: ref(true),
  },
  ...
];
```

### 🧪 技术亮点

* 类型安全的 TypeScript + Vue3 Composition API
* 使用 Naive UI 构建响应式界面，支持暗色主题
* 颜色代码可视化输入与实时预览（支持 `<gradient>` / `<rainbow>` 标签）
* 禁用右键菜单、自定义拖拽反馈等细节优化

---

## 📌 项目状态说明

MythicGenerator v1 已作为一个完整工具完成开发，并具备实用价值。v2 版本在探索 Tauri 桌面开发方案、组件系统与交互设计过程中，完成了拖拽系统与 UI 构建，但因以下原因中止开发：

* 🔻 MythicMobs 社区热度下降（MCBBS 社区关闭）；
* 🎓 个人进入毕业设计阶段，开发时间不足；
* 🎯 综合判断后选择优先推进更具价值的项目方向。

虽然 v2 未最终落地，但本次重构积累的组件设计、拖拽系统、TypeScript 实践等经验，为后续项目提供了良好技术基础。

## 🎞️ 项目演示

### 拖拽示例

![](https://image.im0o.top/2025/202505201432394.gif)

<figcaption>v2 中支持侧边栏拖拽组件到编辑区域并锁定，体现模块化设计思路</figcaption>

### 颜色字符渲染

![](https://image.im0o.top/2025/202505201433100.gif)

## 🔚 总结

MythicGenerator 是一次结合桌面开发、可视化配置生成与实际插件需求的综合型项目。其两个阶段分别体现了：

* **v1 的实用性**：小工具快速成型并实际落地；
* **v2 的探索性**：面向现代 UI/UX 的架构试验。

即使最终未能持续维护，也展示了主动重构、理性止损的技术与项目判断力。
