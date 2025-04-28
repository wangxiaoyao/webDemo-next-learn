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

### 2 ESLint + Prettier + check script

```shell
目的：check code

## 安装vscode 插件
- ESLint (by Microsoft)
- Prettier - Code formatter (by Prettier)

## prettier
### eslint-config-prettier：关闭所有与 Prettier 的格式规则相冲突的 ESLint，则ESLint不会检查格式。
### eslint-plugin-prettier：提供一个prettier规则，则ESlint会报告prettier规则错误（性能不建议使用）
npm install -D prettier eslint-config-prettier

### 配置 .prettierrc
设置规则

### 配置.prettierignore文件
哪些文件不用生效

## eslint
### 配置 eslint.config.mjs（使用Flatcompat）
配置：eslint-config-prettier =》 'prettier'


## package.json scripts
### 1 format 和 lint 用于修复。
#### prettier自动修复所有格式问题。
#### lint自动修复：1 var =》const 2 配置eslint：'react/jsx-sort-props'。修复jsx/tsx属性顺序.不要选择ESLint第一参数"error"(源自next 内置：eslint-plugin-react)
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

### 3 Husky 与 Git hooks

说明：

1 Git hooks 在：.git/hooks/。 确保Husky目录和.git在同一目录

2 husky install 的作用是将 /husky/XXX 中设计的git hook 写入.git/hooks/

3 如何自动触发husky install 。 我们通过npm的生命周期（npm lifecycle scripts）：‘prepare’ 阶段（nom install 之后），所以配置scripts： 'prepare':'husky install'

```shell
## 安装
npm install -D husky lint-staged

## 初始化
npx husky init

## pre-commit
### npx =》 lint-staged node包 =》 执行package.json中的 "lint-staged"配置 =》 -- 表示将提交的文件（参数）不交给npm而是交给 prettier/eslint
npx lint-staged

## pre-push
npm run check

## commit-message
### 安装规则和CLI： https://www.npmjs.com/package/@commitlint/config-conventional
### 将规则（@commitlint/config-conventional）：配置进commitlint.config.mjs
### 使用commitlint去执行
npx --no -- commitlint --edit "$1"
```

### Commit-Message 规则：

```shell
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

### 4 github workflows (.github/workflows/CI.yml)

### 5 github repo

#### branch rules

main-branch-rules

- Restrict updates
- Restrict deletions
- Require deployments to succeed => 需要部署环境。
- Require signed commits
- Require a pull request before merging
- Require status checks to pass

all-branches-rules

- Require signed commits
- Block force pushes

### 2 project structure

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
```

### 3 configurations

#### TypeScript

```
## 配置路径
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

#### Husky + Lint-staged (for git hook & code quality)

#### React Testing Library (Jest for testing)
