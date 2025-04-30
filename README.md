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

#### 1 Unit： vitest + RTL（react test library）

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

#### Commit-Message 规则：

```shell
## 记住<subject>前有一个空格
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

| 字段        | 说明                                            | 举例                                                                                                                                                                                                                |
| ----------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **type**    | 本次变更的类别                                  | `feat` (新功能) · `fix` (修复) · `docs` (文档) · `style` (格式，无逻辑变更) · `refactor` (重构) · `perf` (性能) · `test` (测试) · `build` (构建脚本或依赖) · `ci` (持续集成) · `chore` (日常事务) · `revert` (回滚) |
| **scope**   | 可选：受影响的模块或目录                        | `auth` `api` `navbar`                                                                                                                                                                                               |
| **subject** | 50 字符以内的动词短句，首字母小写，末尾不加句号 | `add login redirect`, `fix dropdown z-index`                                                                                                                                                                        |
| **body**    | 可选：阐述动机、对比前后行为                    | 多行文本，换行宽度 ≤ 72                                                                                                                                                                                             |
| **footer**  | 关闭 issue / 破坏性变更说明                     | `BREAKING CHANGE:` 或 `Closes #123`                                                                                                                                                                                 |

| 类型       | 典型场景                      | 例子                           |
| ---------- | ----------------------------- | ------------------------------ |
| `feat`     | 新增用户可以直接看到的新功能  | 新增 dark mode                 |
| `fix`      | 修复 bug                      | 修复 token 失效问题            |
| `docs`     | 改文档内容                    | 更新 README.md                 |
| `style`    | 调整代码格式/排版，不影响功能 | 调整缩进、改引号               |
| `refactor` | 重构现有代码逻辑，不加新功能  | 优化 hooks 构造器              |
| `perf`     | 提升性能                      | 加快页面渲染速度               |
| `test`     | 添加或修改测试用例            | 新增 login 测试                |
| `build`    | 构建系统/打包工具变更         | 升级 Webpack 配置              |
| `ci`       | CI/CD 配置更新                | 改 GitHub Actions 流程         |
| `chore`    | 杂项/维护性修改               | 修改 Husky、更新脚本、升级依赖 |
| `revert`   | 回滚之前的提交                | 回滚 "feat: 新增支付功能"      |

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

```shell
webDemo-next-learn/										# 文件夹统一使用：kebab-case
├── src/                              # Static assets (images, fonts)
    ├── app/                          # Routing (app directory for App Router)
    │   ├── api
    │       ├── save                  # 必须使用route.ts
    │   ├── layout.js
    │   ├── page.js                   # Root page
    │   └── dashboard/                # route即url。短：全部小写，长：kebab-case	egg：/user-settings
    │       ├── layout.js
    │       └── page.js               # 默认页面导出：Page命名。如下
    │       └── components						 # 文件夹
    │           └── DashboardStatus.js # 组件命名：不论是组件文件夹名还是文件名都是：大驼峰（PascalCase）非nextjs框架，页面级同此且使用index.tsx
                                       # DashboardStatus文件夹（当有内嵌子组件）
                                        /index.js
                                        /DashboardStatus.module.css																										              						/Other.js 子组件
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
## 路由页面统一使用：Page 命名。
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


## i18n
src/
└── locales/
    ├── en/
    │   └── common.json
    └── zh/
        └── common.json

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
