# webDemo-next-learn

Personal learning project built with Next.js. This project showcases a variety of demo pages that help reinforce key frontend skills using real-world examples.

## 一 Next project

### 1 创建项目

```shell
npx create-next-app@latest

config:
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for `next dev`? … Yes
✔ Would you like to customize the import alias (`@/*` by default)? … Yes
```

### 2 test

> E2E 暂时不做！这里仅仅做“unit test”：单元测试

#### Unit： vitest + RTL（react test library）

目的：

1. **组件：测交互行为**
2. **Hook/函数：测输入输出**
3. **页面结构：测文本是否存在**
4. **状态管理：测 getter/setter 是否响应**

```shell
# npm
## 核心
vitest
jsdom

## 测试套装
@test-library/react
@test-library/jestdom
@test-library/user-event

## 其他
@vitejs/plugin-react-swc
@vitest/coverage-v8

# 配置文件
vitest.config.ts
vitest.setup.ts => 扩充expect断言
tsconfig.json => describe/it/expect/不会报错

# scripts 脚本
	  "test": "vitest run",
    "test:watch": "vitest",
    "test:ci": "vitest run --coverage",

分别将:
test脚本放入lint-staged,
test:ci 放入XXX.yml
test:watch 用于本地的执行和监控
```

### 3 ESLint + Prettier + scripts

```shell
## 安装vscode 插件
- ESLint (by Microsoft)
- Prettier - Code formatter (by Prettier)

## prettier
### eslint-config-prettier：关闭所有与 Prettier 的格式规则相冲突的 ESLint，则ESLint不会检查格式。
### eslint-plugin-prettier：提供一个prettier规则，则ESlint会报告prettier规则错误（性能不建议使用）
npm install -D prettier eslint-config-prettier

### 配置 .prettierrc
设置代码规范

### 配置.prettierignore文件
哪些文件不用生效

## eslint
### 配置 eslint.config.mjs（使用Flatcompat）
配置：eslint-config-prettier =》 'prettier'

## package.json scripts
### 1 format 和 lint 用于修复。
#### prettier自动修复所有格式问题。
#### lint自动修复：1 var =》const 2 配置eslint：'react/jsx-sort-props'。修复jsx/tsx属性顺序.不要选择ESLint第一参数"error"(源自next内置：eslint-plugin-react)
#### 坑：next lint 接目录，和lint-staged传递单文件不符合。所以使用原本的eslint
    "format": "prettier --write .",
    "lint": "eslint --fix --max-warnings=0 --no-ignore",
    "lint:next": "next lint --fix --max-warnings=0 --no-ignore",

### 2 check 用于集合所有的校验
    "check": "npm run format:check && npm run lint:check && npm run tsc",
    "format:check": "prettier --check .",
    "lint:check": "next lint",
    "tsc": "npx tsc --noEmit"
```

#### tailwind CSS

```shell
## vscode
- Tailwind CSS IntelliSense

## npm包：用来格式化顺序
prettier-plugin-tailwindcss:

## 配置.prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 4 husky/lint-staged 与 Git hooks

说明：

1 Git hooks 原本在：.git/hooks/。 husky install 改变了目录。所以确保Husky目录和.git在同一目录。

2 如何自动触发husky install。配置scripts： 'prepare':'husky install'。通过npm的生命周期（npm lifecycle scripts）：‘prepare’ 阶段。当执行npm install后则会执行prepare。

```shell
## 安装
npm install -D husky lint-staged

## 创建.husky 文件夹,并改变Git hooks路径为.husky
npx husky install

## pre-commit（文件）
### npx =》 lint-staged node包 =》 执行package.json中的 "lint-staged"配置 =》 -- 表示将提交的文件（参数）不交给npm而是交给 prettier/eslint
npx lint-staged

## pre-push（文件）
npm run check

## commit-message（文件）
### 安装：规则和CLI： https://www.npmjs.com/package/@commitlint/config-conventional
### 1 规则（@commitlint/config-conventional）：配置进commitlint.config.mjs
### 2 使用commitlint去执行
npx --no -- commitlint --edit "$1"
```

#### Commit-Message 规则：同样适合git分支名

```shell
## 注意：<subject>前有一个空格
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]

## 分支名：创建分支日期
<type>/2558-<scope>
```

| 字段        | 说明                                            | 举例                                                                                                                                                                                                                |
| ----------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**    | 本次变更的类别                                  | `feat` (新功能) · `fix` (修复) · `docs` (文档) · `style` (格式，无逻辑变更) · `refactor` (重构) · `perf` (性能) · `test` (测试) · `build` (构建脚本或依赖) · `ci` (持续集成) · `chore` (日常事务) · `revert` (回滚) |
| **scope**   | 可选：受影响的模块或目录                        | `auth` `api` `navbar`                                                                                                                                                                                               |
| **subject** | 50 字符以内的动词短句，首字母小写，末尾不加句号 | `add login redirect`, `fix dropdown z-index`                                                                                                                                                                        |
| **body**    | 可选：阐述动机、对比前后行为                    | 多行文本，换行宽度 ≤ 72                                                                                                                                                                                             |
| **footer**  | 关闭 issue / 破坏性变更说明                     | `BREAKING CHANGE:` 或 `Closes #123`                                                                                                                                                                                 |

| 类型       | 典型场景                      | 例子                                 |
| ---------- | ----------------------------- | ------------------------------------ |
| `feat`     | 新增用户可以直接看到的新功能  | 新增 dark mode                       |
| `fix`      | 修复 bug                      | 修复 token 失效问题                  |
| `docs`     | 改文档内容                    | 更新 README.md                       |
| `style`    | 调整代码格式/排版，不影响功能 | 调整缩进、改引号                     |
| `refactor` | 重构现有代码逻辑，不加新功能  | 优化 hooks 构造器                    |
| `perf`     | 提升性能，改进(替代improve)   | 加快页面渲染速度                     |
| `test`     | 添加或修改测试用例            | 新增 login 测试                      |
| `build`    | 构建系统/打包工具变更         | 升级 Webpack 配置                    |
| `ci`       | CI/CD 配置更新                | 改 GitHub Actions 流程               |
| `chore`    | 杂项/维护性修改               | 修改 Husky、更新脚本、升级依赖(deps) |
| `revert`   | 回滚之前的提交                | 回滚 "feat: 新增支付功能"            |

### 5 github workflows (.github/workflows/XXX.yml)：GitHub action=》code quality

> 注意点：
>
> 1 yml 的 key-value 格式：必须有一个空格。
>
> 2 workflows permissions 问题。 security-events: write 表示可以将结果发送到github security标签页。
>
> 3 串行： 当ci-fast.yml执行完，再执行codeql.yml

1 ci-check-test-build.yml：

- 1 lint 阶段

- 2 test阶段

- 3 build阶段

2 codeql.yml

使用官方的CodeQL

### 6 vercel

> 说明：
>
> 1 vercel和github关联后，每次 push / PR 触发部署并把结果写回 GitHub Checks。比如选择分支规则：Require deployments to succeed。 生产部署失败即禁止 merge / push（针对main分支）
>
> 2 vercel仅提供两个环境preview 和 production。非main分支统一部署到preview环境。
>
> 3 非main分支提交pr后。vercel会自动把preview的链接注入到comment中

### 7 github repo

#### settings-environment

vercel: 使用main分支部署一次production环境，使用非main分支部署一次preview环境。则会自动生成两个环境。

#### branch rules

main-branch-rules

- Restrict updates
- Restrict deletions
- Require deployments to succeed => 检测部署的环境后，允许pr（环境：production/preview）
- Require signed commits
- Require a pull request before merging
- Require status checks to pass => 需要先创建XXX.yml 跑一遍。 然后选择 add checks
- Block force pushes
- Require code scanning results =》codeQL执行通过，允许pr

all-branches-rules

- Require signed commits =》 注意配置 signature 使用ssh
- Block force pushes

### 8 project structure

> Demo 命名规范
>
> 1 style 类： taiwind-“theme”
>
> 2 react 类：react-“theme”
>
> 3 app类：app-“theme”-demo : 完整功能性页面

```shell
webdemo-next-learn/										# 文件夹统一使用：kebab-case  vercel也要求项目全部小写
├── src/                              # Static assets (images, fonts)
    ├── app/                          # Routing (app directory for App Router)
    │   ├── api
    │       ├── save                  # 必须使用route.ts
    │   ├── layout.js
    │   ├── page.js                   # Root page
    │   └── dashboard/                # route即url。短：全部小写，长：kebab-case	egg：/user-settings
    │       ├── layout.js
    │       └── page.js               # 默认页面导出：Page命名。
    │       └── components
    │           └── DashboardStatus   # 组件命名：PascalCase文件夹 + index.tsx文件名
    ├── components/                   # Reusable components
    │   ├── ui/                       # UI-specific components (Button, Modal, Card...)
    │   └── shared/                   # Shared components across features
    ├── lib/                          # 系统模块或第三方集成封装，有副作用、非纯函数。工具库 / API 封装 / 第三方整合
    │   ├── api.js                    # API calls or data fetching methods
    │   └── parseToken.ts             # Miscellaneous utility functions => 使用小驼峰
		└── utils/                				# 小而通用的pure functions，不依赖应用上下文，职责单一，可重复使用：lodash
       └── formatDate.ts
    └── services/											# APIs
        ├── authService.ts
        ├── userService.ts
        └── apiClient.ts
    ├── hooks/                        # Custom React hooks => use 开头，小驼峰
    │   ├── useAuth.js
    │   ├── useFetch.js
    │   └── index.js                  # Export all hooks
    ├── contexts/                     # React Context API providers => Context结尾，大驼峰
    │   └── AuthContext.js
    ├── types/                        # TS类型: 统一使用PascalCase（首字母大写）：ResponseData
    │   └── index.ts
    ├── constants/                    # 常量：统一导入index.ts
    │   └── pages.ts                  # 页面层级的常量
    │   └── index.ts
├── public/                        # Static assets (images, fonts)
├── middleware.js                  # Next.js middleware (optional)
├── next.config.js                 # Next.js configuration
├── jsconfig.json / tsconfig.json  # Path aliases configuration
└── package.json
└── eslint.config.mjs            	 # ESLint 配置
└── .prettierrc										 # prettier 配置
└── .prettierignore								 # 过滤prettier文件
```

```shell
# 补充
## 但凡组件,统一使用：PascalCase文件夹 + index.tsx + __test__(单测)。 其他则统一不使用文件夹进行包裹路由页面统一使用：Page 命名。
export default function Page() {
    return (
        <div>
        		<组件 />
        </div>
    )
}


## constants
├── api.ts           # API endpoints
├── messages.ts      # 文案 / 提示语
├── routes.ts/pages.ts # 页面定义
├── roles.ts         # 用户角色权限定义
├── index.ts         # 统一导出

## tsconfig.json配置路径
      "@components/*": [
        "./src/components/*"
      ],
      "@hooks/*": [
        "./src/hooks/*"
      ],
      "@lib/*": [
        "./src/lib/*"
      ],
      "@types/*": [
        "./src/types/*"
      ],
      "@utils/*": [
        "./src/utils/*"
      ],
      "@constants/*": [
        "./src/constants/*"
      ]
```

### 9 upgrade

#### npm

```shell
## 基于package.json（可安装版本） / package-lock.json（实际安装的版本）
## 注意：删除package-lock.json + node_module 会导致重新安装package.json允许的新版本（semver允许版本）。引发所有人升级库更新。（新建分支）
规则为：
^: major不变
~: minor不变

npm update


## 基于npm上最新版本
### 罗列：后者信息更全
npm outdated --all  或者 npx npm-check -u

## 改写package.json。
### --target minor  --target patch  默认升级major
npx npm-check-updates -u

## 安全漏洞
npm audit
```

#### yml action

可以通过github marketplace 查看最新版本。

## 二 Implementation

### 1 i18n

```shell
src/
└── locales/
    ├── en/
    │   └── common.json
    └── zh/
        └── common.json
```

### 2 tailwind（V4） theme style

> 推荐使用next-themes的npm包。next‑themes 会在服务端插入一段行内脚本，把 `.dark` 或 `.light` 类**在 HTML 发送给浏览器之前**就写好，彻底杜绝闪烁和水合不匹配。更好的解决首帧“闪烁”的问题。因为在 HTML 发送到浏览器之前就确定好主题而不仅靠 `useEffect`。

```shell
@import "tailwindcss"
1 Preflight：现代化 CSS reset 进行初始化，让不同的浏览器处于同一基准。
2 tailwind 默认的所有utility class + variant（自带的变体 hover: sm: md:） 注入 @layer utilities中。 除非自己显示声明来覆盖。

问题：默认值 比如 p-2。 tailwind 默认对应为（value x 4） 2 => 8px. 生成代码为：  padding: 0.5rem。 其中0.5= 8px/16px

## 1 define “variant”（Tailwind V4）
### 第一个参数：变体名（dark）语法糖前缀: "hover:" "dark:bg-red-500"
### 第二个参数：选择器模板：触发的作用条件。当父元素存在dark类
@custom-variant dark (&:is(.dark *))

eg:<div class="dark:bg-red-500">…</div>
=> tailwind编译为： .dark\:bg-red-500 { background-color: #ef4444 /* red‑500 */ }
=> & 换成上面的 .dark\:bg-red-500。
=> 则：.dark\:bg-red-500:is(.dark *) 表示 1 必须父元素存在dark类 2 自身有“dark:”前缀才生效.

## 2 define tokens using css variables
@theme inline{
	--color-mycolor: var(--mycolor)
}
:root {
  --mycolor: oklch(1 0 0);
.dark{
	--mycolor: oklch(0.129 0.042 264.695);
}

1 --color-“token” 这是tailwind的命名空间。除了特定的color表示颜色，还有radius，size 等
2 mycolor 是自定义的token名。注册给tailwind(token名会被覆盖)。tailwind会自动解析生成对应的utility class。如：“bg-mycolor” 。
3 最终运行由--mycolor颜色决定。而--mycolor 由变量决定。

<div className="bg-mycolor h-10 w-10 border"></div>

.bg-mycolor => background-color: var(--color-mycolor) => background-color: var(--mycolor)

4 官网事例中：p-(<custom-property>) => padding: var(<custom-property>):
- bg-mycolor 推荐。由tailwind 自动生成 token
- bg-[var(--color-mycolor)]
- bg-[var(--mycolor)]: 没有经过token中转

--：前缀表示自定义属性。css要求任何自定义属性都需要var进行包裹。 所以 bg-[--color-mycolor] 错误

5 inline：“变量声明 和 token 注册 放在同一段代码里”。selector：当token很多，或形成独立文件使用。与Tailwind v3 的 theme.extend 不同。V4将token注册和utility解耦


## 3 给html添加父类：class => 浏览器触发 RecalcStyle => class优先级高于:root的div => 替换掉:root中的对应的token名，从新渲染。（重绘而不需要重排）
document.documentElement.classlist.add('dark');

## 4 通过 @apply 将bg-background text-foreground 放入body中。这样确定：background，foreground 的token名（换肤的基础），这也就是为什么body中出现color: var(--foreground);
@layer base{
	body{
		@apply bg-background text-foreground
	}
	h1{...}
}

### utility class的聚集
@layer components{
	.myBtn{
		@apply inline-flex items-center gap-2
	}
}

### 原子级别
@layer utilities {
  .bg-mybrand { background-color: var(--color-primary); }
}

1 三个维度：base(用于全局基础设置) components(组件层) utilities(原子类)。 优先级也是从低到高（会覆盖）

```
