# 中国八大菜系静态网站架构设计

## 📂 文件与文件夹结构

```plaintext
Chinese-food-site/
│── index.html                     # 一级页面：首页（八大菜系方块网格）
│
├── cuisines/                      # 二级页面：各菜系页面
│   ├── sichuan.html               # 川菜
│   ├── cantonese.html             # 粤菜
│   ├── shandong.html              # 鲁菜
│   ├── jiangsu.html               # 苏菜
│   ├── zhejiang.html              # 浙菜
│   ├── hunan.html                 # 湘菜
│   ├── anhui.html                 # 徽菜
│   └── fujian.html                # 闽菜
│
├── dishes/                        # 三级页面：各菜品介绍
│   ├── sichuan/
│   │   ├── mapo-tofu.html
│   │   ├── kungpao-chicken.html
│   │   └── fish-pickle.html
│   ├── cantonese/
│   │   ├── dimsum.html
│   │   ├── charsiu.html
│   │   └── steamed-fish.html
│   └── ... （其它菜系以此类推）
│
├── assets/                        # 静态资源
│   ├── css/
│   │   ├── style.css              # 全局样式（字体、颜色、布局）
│   │   ├── navbar.css             # 导航栏样式
│   │   ├── breadcrumb.css         # 面包屑样式
│   │   ├── home.css               # 首页方块网格样式
│   │   └── responsive.css         # 响应式样式
│   │
│   ├── js/
│   │   ├── main.js                # 全局交互逻辑
│   │   ├── navbar.js              # 导航栏交互逻辑
│   │   ├── breadcrumb.js          # 面包屑动态生成
│   │   └── (无 map.js)            # 取消地图交互逻辑
│   │
│   └── images/
│       ├── cuisines/              # 各菜系示例图片
│       │   ├── sichuan.jpg
│       │   ├── cantonese.jpg
│       │   └── ...
│       ├── dishes/                # 各菜品图片
│       │   ├── sichuan/
│       │   │   ├── mapo-tofu.jpg
│       │   │   └── ...
│       │   └── cantonese/
│       │       ├── dimsum.jpg
│       │       └── ...
│       └── icons/                 # 网站小图标（返回、首页、菜单等）
│
├── maps/                          # （已移除）不再使用地图资源
│
└── common/                        # 公共组件（HTML片段，可复用）
    ├── navbar.html                # 导航栏
    ├── footer.html                # 页脚
    └── breadcrumb.html            # 面包屑导航

```

---

## 📑 各部分作用

### 1. 一级页面（`index.html`）

* 展示 **八大菜系总览**：2×4 方块卡片（图片 + 菜系名称）。
* 点击卡片 → 跳转到对应的二级菜系页面。
* 包含导航栏（可跳转到首页、关于网站、联系等）。

### 2. 二级页面（`/cuisines/*.html`）

* 展示该菜系的简要介绍（历史、特点）。
* 显示三道示例菜品（卡片式布局，含图片+标题+简介）。
* 点击菜品 → 跳转到对应三级页面。

### 3. 三级页面（`/dishes/[cuisine]/*.html`）

* 展示菜品的详细介绍，包括：

  * **简介**：起源、特色。
  * **去哪吃**：推荐城市或餐厅。
  * **怎么做**：简要烹饪步骤。
* 页面下方可加一个 “返回该菜系” 的链接。

### 4. 导航栏（`common/navbar.html`）

* 首页 | 八大菜系 | 关于我们 | 联系方式
* 固定在页面顶部，响应式布局（移动端折叠菜单）。

### 5. 面包屑导航（`common/breadcrumb.html`）

* 一级 → 二级 → 三级
* 示例：

  ```
  首页 > 川菜 > 麻婆豆腐
  ```
* 提供快速返回上级页面的功能。

### 6. 公共样式与脚本

* `style.css`：统一字体、颜色、页面布局。
* `responsive.css`：保证手机端友好。
* `navbar.js`：控制导航栏收起展开。
* `breadcrumb.js`：根据 URL 自动生成面包屑路径。

---

## 📑 首页说明（无地图）

首页采用 2×4 方块卡片网格展示八大菜系：鲁、川、粤、苏、浙、湘、闽、徽。每张卡片包含占位图片和菜系名称，点击跳转到对应的二级页面。地图与相关脚本/样式已移除，以降低复杂度并避免本地开发的 CORS 问题。
