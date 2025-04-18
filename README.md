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

### 2 project structure

```shell
webDemo-next-learn/										# 文件夹统一使用：kebab-case
├── src/                              # Static assets (images, fonts)
    ├── app/                          # Routing (app directory for App Router)
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
    ├── types/                        # TS类型
    │   └── index.ts
    ├── constants/                    # 常量
    │   └── index.ts
├── public/                        # Static assets (images, fonts)
├── middleware.js                  # Next.js middleware (optional)
├── next.config.js                 # Next.js configuration
├── jsconfig.json / tsconfig.json  # Path aliases configuration
└── package.json
└── .eslintrc.js              		 # ESLint 配置

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

## i18n
src/
└── locales/
    ├── en/
    │   └── common.json
    └── zh/
        └── common.json
```

### 3 configurations

#### tailwind CSS

```shell
## vscode
- Tailwind CSS IntelliSense

## npm
- prettier-plugin-tailwindcss:
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}

```

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

#### ESLint + Prettier

```shell
目的：
1 检测代码是否按照Prettier 的约定，否则按照eslint 进行报错
2 shift + option + f ： 按照约定格式化


## 安装vscode 插件
- ESLint (by Microsoft)
- Prettier - Code formatter (by Prettier)

## prettier
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

## .prettierrc 文件
  // Integrate ESLint + Prettier:
  ...compat.extends("plugin:prettier/recommended")

## .prettierignore文件

## package.json。设置format命令，所有代码格式化
 "format": "prettier --write ."
```

#### Husky + Lint-staged (for git hook & code quality)

#### React Testing Library (Jest for testing)
