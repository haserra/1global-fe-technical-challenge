# 1GLOBAL Technical Challenge Coding Preparation/ Boilerplate

Just another technical challenge to add to my set of endeavours

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Exercise helper

Pagination:
https://codesandbox.io/p/sandbox/inspiring-wilbur-l3tsqk?file=%2Fsrc%2FDemo.tsx%3A15%2C38
https://mui.com/material-ui/react-pagination/
https://reqres.in/api-docs/#/default/get_users
https://codesandbox.io/p/sandbox/polished-butterfly-j17lt?file=%2Fsrc%2FApp.tsx%3A21%2C16&from-embed=
https://reactrouter.com/en/main/route/loader#loader
