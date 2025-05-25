# 📦 项目计划说明：Tinc VPN 管理系统开发

## 🧭 项目目标

开发一个 Web 管理系统，用于集中管理 Tinc VPN 网络，包括服务端与客户端配置生成、远程下载、客户端连接监控、用户权限控制、状态展示等功能。

---

## ✅ 系统架构

- 前端：Vue 3 + Element Plus + Vite
- 后端：Node.js + Express + SQLite
- 通信：RESTful API + JWT 鉴权
- 客户端：Python Agent 脚本（用于远程设备自动上报状态）
- 配置生成：使用模板引擎（如 EJS）生成 tinc 配置

---

## 📂 项目目录结构

tincweb/
├── server/
│   ├── index.js                # 后端主程序
│   ├── package.json            # 后端依赖
│   ├── routes/                 # 路由模块（users, clients, servers）
│   ├── controllers/            # 控制器
│   ├── services/               # 服务逻辑
│   ├── models/                 # SQLite 表结构封装
│   ├── middlewares/           # JWT & 认证中间件
│   └── scripts/init-db.js     # 数据库初始化脚本
├── frontend/
│   ├── package.json            # 前端依赖
│   ├── index.html              # 页面入口
│   ├── src/
│   │   ├── main.js             # Vue 初始化
│   │   ├── App.vue             # 根组件
│   │   ├── router/             # 页面路由
│   │   ├── views/              # 页面视图
│   │   └── components/         # 公共组件
└── agent/
└── agent.py                # Python 客户端脚本

---

## 🧩 功能模块需求

### 1. 用户管理
- 用户登录 / JWT 发放
- 管理员与普通用户权限控制
- 修改密码功能

### 2. 服务端节点管理
- 增删改查服务端节点
- 自动生成密钥对
- 配置文件结构支持 tinc.conf, tinc-up, tinc-down 等

### 3. 客户端管理
- 支持单个或批量生成客户端配置
- 可启用、禁用客户端
- 下载配置文件包

### 4. 配置文件下载
- 生成临时下载链接，包含过期时间
- 下载配置时进行 Token 校验

### 5. 系统监控
- 在线客户端数量
- 系统资源使用情况（CPU / 内存）
- 网络流量状态（Mock 数据即可）

### 6. 远程客户端 Python Agent（agent.py）
- 周期性上报：MAC、公网 IP、LAN IP、路由、系统负载
- 请求服务端获取配置，如果版本变化则下载更新并自动重启 Tinc
- 使用 requests 库通信，支持 crontab 定时执行

---

## 📑 数据表结构（SQLite）

### users
- id, username, password_hash, role, created_at

### servers
- id, name, public_ip, private_ip, interface, port, keys, created_at

### clients
- id, name, private_ip, mac, connect_to, keys, status, created_at

### config_files
- id, node_id, node_type, file_type, content, updated_at

### client_status
- id, client_id, wan_ip, lan_ip, location, last_seen, status

---

## 🧪 开发建议（Codex 执行提示）

- 每个模块请使用独立文件夹组织（按 MVC 分层结构）
- 后端需使用 JWT 进行用户认证
- 前端请使用 Vue Router + Element Plus 完成页面跳转
- 各 API 请求应带 JWT Token（Authorization Header）
- 所有配置文件请放置在 `server/configs/<node>` 目录下
- agent.py 可模拟上报 JSON 数据进行测试

---

## 🧵 最小可行产品（MVP）目标

- 用户认证登录成功
- 可添加服务端与客户端节点
- 客户端配置可下载
- 前端页面展示基本信息
- Agent 可上报数据并被后端记录

---

## 🔧 Codex 任务执行优先顺序

1. 初始化项目结构与依赖（根据 setup_env.sh）
2. 实现用户认证模块（含中间件）
3. 服务端管理模块（含密钥生成）
4. 客户端管理与配置下载功能
5. 前端登录页 + 节点管理页
6. Agent 脚本编写与接口联调
7. 状态展示页 + 监控图表（Mock 即可）
8. 系统测试与打包部署文档

---

Codex，请根据以上说明自动完成项目开发。


