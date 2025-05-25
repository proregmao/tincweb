以下是你完整的 Tinc VPN 管理系统开发项目需求文档（PRD），使用 Markdown 格式书写。文末附上 setup_env.sh 环境初始化脚本。

⸻

📘 Tinc VPN 管理系统开发项目需求文档 (PRD)

一、项目概述

Tinc VPN 管理系统是一款面向网络管理员和业务设备操作者设计的网络VPN配置和管理工具。系统提供一个基于 Web 的可视化界面用于管理 Tinc VPN 服务端和客户端配置，实现配置自动生成、远程下载、状态监控等功能，支持通过云系统进行多客户端管理。

⸻

二、核心功能列表

1. 服务端管理
	•	创建 VPN 服务端节点
	•	编辑配置（名称、IP、端口、网卡等）
	•	启动、停止、重启服务进程
	•	查看状态与日志信息

2. 客户端管理
	•	单个或批量创建客户端
	•	启用、禁用、删除客户端
	•	设置连接目标服务端
	•	查看连接状态

3. 配置文件管理
	•	模板生成配置文件
	•	自动打包压缩
	•	生成临时下载链接（含过期时间）
	•	配置变更自动更新链接

4. 用户与权限系统
	•	JWT 用户认证
	•	管理员 / 普通用户权限控制
	•	修改密码、退出登录

5. 系统监控
	•	VPN 网络流量统计
	•	在线客户端数量
	•	系统资源使用（CPU / 内存 / 磁盘）

6. 远程客户端管理
	•	启动自动连接服务端
	•	上报 MAC、公网 IP、LAN IP、路由、地理位置
	•	状态心跳监控
	•	服务端远程控制客户端（重启、重新获取配置）
	•	MAC 与节点绑定、黑名单管理

⸻

三、用户画像与使用场景

用户类型
	•	企业 IT 管理员
	•	DevOps 运维人员
	•	边缘设备工程师
	•	VPN 服务提供商

应用场景
	•	总部-分支 VPN 管理
	•	嵌入式设备远程接入网络
	•	客户端大规模配置和远程维护
	•	快速部署 VPN 接入系统

⸻

四、非功能性需求

性能
	•	1000+ 节点稳定管理
	•	配置生成 < 1 秒
	•	并发下载支持 100+ 用户

安全
	•	通信全程加密（HTTPS/TLS）
	•	私钥加密存储
	•	JWT 登录验证 + RBAC 权限控制
	•	防注入、防CSRF/XSS攻击

兼容性
	•	服务端支持 Ubuntu/CentOS
	•	客户端兼容 Linux / OpenWRT
	•	前端兼容 Chrome、Firefox、Edge

⸻

五、产品设计

页面流程说明

登录页 → 控制台 → [服务端管理 | 客户端管理 | 配置下载 | 系统监控 | 远程客户端]

数据流
	•	登录 → JWT → 附带请求头
	•	节点操作 → API → 数据库 & 文件系统
	•	客户端状态上报 → 服务端记录 → 页面轮询获取

页面组件
	•	顶栏：用户名、退出
	•	左侧菜单：导航模块入口
	•	主区域：表格、表单、状态图
	•	操作弹窗：新增、编辑、预览配置等

⸻

六、UI 设计说明

颜色字体
	•	主色调：#409EFF（蓝）
	•	成功：#67C23A，错误：#F56C6C，警告：#E6A23C
	•	字体：PingFang SC，14px 正文，20px 标题

图标按钮
	•	操作按钮统一风格（保存/下载/启用）
	•	图标采用线性风格 iconfont 或 lucide-react

UI 约定
	•	表格分页 + 搜索 + 排序
	•	所有操作对话框使用 Element Plus 弹窗组件
	•	所有状态统一颜色标签风格

⸻

七、系统设计与技术方案

技术选型
	•	前端：Vue 3 + Element Plus + Vite
	•	后端：Node.js + Express
	•	数据库：SQLite
	•	配置生成：模板引擎 ejs / handlebars
	•	通信：REST API + JWT + TLS

架构
	•	前后端分离
	•	后端单体（分层结构）
	•	文件系统 + SQLite 混合持久化
	•	部署使用 Nginx + PM2 + Systemd

模块划分
	1.	登录与认证模块
	2.	服务端管理模块
	3.	客户端管理模块
	4.	配置生成与下载模块
	5.	系统监控模块
	6.	远程客户端监控模块

数据表草图
	•	users（用户）
	•	servers（VPN 服务端）
	•	clients（VPN 客户端）
	•	config_files（配置文件内容）
	•	client_status（客户端状态上报）

⸻

八、环境初始化脚本（setup_env.sh）

#!/bin/bash

# 安装 Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 安装 Python 环境（客户端 Agent 使用）
apt-get install -y python3 python3-pip
pip3 install requests psutil

# 安装 SQLite3 工具
apt-get install -y sqlite3

# 安装全局构建工具
npm install -g vite

# 后端初始化
cd server
npm install

# 前端初始化
cd ../frontend
npm install

# 初始化数据库
cd ../server
node scripts/init-db.js

echo "✅ 开发环境初始化完成"


⸻

九、项目开发执行计划

阶段划分

阶段	时间	内容
阶段一	第1-2周	架构搭建、用户系统、数据库模型
阶段二	第3-5周	服务端/客户端/配置下载模块
阶段三	第6周	Agent 上报系统实现
阶段四	第7周	前端 UI 与状态展示
阶段五	第8周	联调测试、部署、文档


⸻

十、角色分工建议

角色	数量	职责
项目经理	1	全局管理、进度协调
产品经理	1	需求输出、验收
前端工程师	1	Vue 开发与交互
后端工程师	1-2	API + 系统命令调用
Python 工程师	1	Agent 脚本开发
测试工程师	1	编写测试用例与跟踪 bug
运维工程师	1	部署脚本、服务器上线


⸻

十一、远程客户端 Agent 设计

功能
	•	自动连接服务端
	•	定期上报状态（IP/MAC/负载）
	•	拉取配置、比对更新、自动应用
	•	上报接口：/api/client/ping
	•	配置接口：/api/client/config

技术
	•	Python 3 脚本
	•	crontab/systemd 定时运行
	•	requests + psutil 模块
	•	本地日志记录与上传支持

⸻



