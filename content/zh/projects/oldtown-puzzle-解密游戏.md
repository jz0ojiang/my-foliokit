---
title: Oldtown Puzzle 解密游戏
date: 2022-08-19
description: 对话式剧情驱动的互动解谜游戏，融合输入、拖拽、机关等多重玩法，纯前端实现
cover: https://image.im0o.top/2022/20220819101914.png
tags:
  - Vue
  - TypeScript
  - H5游戏#FF9F43
  - 解谜设计#4834D4
  - 组件化#26DE81
link: https://oldtown.oh.ac.cn/
abbrlink: de4ec1f6
---

<!-- 项目正文内容，可支持 Markdown 格式 / Project content below, supports Markdown format -->

## 项目简介

Oldtown Puzzle 是一款基于 Vue3 + TypeScript 开发的网页解密游戏，采用对话式小说表现形式，引导玩家逐步破解嵌套在剧情中的谜题，最终通关获得彩蛋。

游戏为一次线下活动定制，支持扫码即玩，整体流程完全基于前端逻辑实现，部署于 Vercel，适配移动端与桌面端浏览体验。

## 核心玩法

- 💬 **对话式剧情推进**：以微信聊天气泡形式呈现故事节奏，引导玩家进入剧情；
- 🧩 **谜题设计**：
  - 八卦图拖拽排序（使用 Vue Draggable 实现）；
  - 文案诗句类填空谜题；
  - 九字真言手印顺序点击机关；
- 📜 **剧情穿插彩蛋**：最后输入暗号可触发彩蛋与结算验证。

## 技术实现

- 使用 Vue3 + TypeScript 构建 SPA；
- `speech/*.vue` 实现五类消息组件（按钮、输入、玩家、NPC、系统）；
- 使用 `Vuex + Storage` 管理全局进度，并实现简单反作弊检测；
- 使用 CSS Grid 实现拖拽布局，配合动画与滚动平滑优化用户体验；
- 使用 `onUpdated` 实现消息自动滚动到底；
- 自定义滚动条样式，兼容 Chrome 和 Firefox。

## 项目截图

![](https://image.im0o.top/2024/202505181005626.png)
> 对话式气泡系统（点击任意位置继续）

![](https://image.im0o.top/2024/202505181005099.png)
> 拖动石板还原八卦顺序

![](https://image.im0o.top/2025/202505181005665.png)
> 输入正确关键词，触发剧情推进

![](https://image.im0o.top/2025/202505181006702.png)
> 九字真言顺序机关，按错将自动失败

![](https://image.im0o.top/2025/202505181006472.png)
> 输入暗号，解锁结局彩蛋

## 总结亮点

- 组件化设计良好，具备复用性；
- 融合叙事 + 解谜，表现形式新颖；
- 接入 Storage 状态持久化与异常判定，提升用户行为反馈；
- 全流程前端驱动，具备较高独立完成度与表现力。

---

📄 [开发记录博客](https://blog.im0o.top/posts/abfffc1b.html)