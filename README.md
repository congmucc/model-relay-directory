# Model Relay Directory

面向普通用户的 AI API 模型中转站导航页。

这是一个纯静态网站，用卡片展示平台域名、模型家族、公益额度、付费倍率、服务状态、登录方式和更新时间。整张卡片可直接打开对应平台的邀请链接。

线上地址：<https://ai.eas.us.ci/>

## 本地预览

项目不需要安装依赖或构建：

```bash
python3 -m http.server 4173
```

然后打开 <http://127.0.0.1:4173/>。

## 项目结构

```text
model-relay-directory/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── providers.json
├── AGENTS.md
└── README.md
```

站点数据集中在 `data/providers.json`。`app.js` 只负责加载数据、筛选和渲染。新增或更新平台时，请按照 [AGENTS.md](AGENTS.md) 的字段和文案规则维护。

本地预览需要通过 HTTP 服务访问，因为页面会加载 JSON 数据；不要直接双击 `index.html`。

### 改哪里

| 想改的东西 | 改这个文件 |
| --- | --- |
| 增删站点、改额度倍率、换邀请链接 | `data/providers.json` |
| 页面文案、筛选按钮 | `index.html` |
| 筛选、搜索、卡片渲染逻辑 | `app.js` |
| 配色、间距、卡片样式 | `styles.css` |

`styles.css` 按注释分成四段：设计变量、页面骨架、站点卡片、响应式断点。改样式时直接搜对应段落即可，窄屏的覆盖值统一放在最后的「响应式断点」里。

站点总数由 `data/providers.json` 自动计算，增删站点后不需要再改 HTML 里的数字。

## 部署到 Cloudflare Pages

这是纯静态页面，不需要服务器、数据库或构建命令。

1. 将仓库连接到 Cloudflare Pages。
2. Framework preset 选择 `None`。
3. Build command 留空。
4. 输出目录使用仓库根目录 `/`。
5. 在 Pages 项目中绑定自己的域名。

连接 GitHub 后，推送到 `main` 分支即可触发自动部署。

## 内容说明

部分入口包含邀请奖励或 AFF 参数。平台额度、倍率、模型可用性和活动规则可能变化，页面信息应以平台当前规则为准。
