# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Interactive Data Visualization Platform

A modern React application built with Vite and TypeScript, featuring interactive data visualization using the eshipz-table-library component.

## 🚀 Features

- Interactive data table visualization
- Responsive design with Tailwind CSS
- Docker containerization
- Easy deployment to Vercel

## 🛠️ Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Docker
- Nginx (for production)

## 🏃‍♂️ Local Development

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## 🐳 Docker

### Building the Container

```bash
docker build -t my-react-app .
```

### Running the Container

```bash
docker run -p 80:80 my-react-app
```

### Docker Commands

- **Stop container:**

  ```bash
  docker stop my-react-app
  ```

- **Start container:**

  ```bash
  docker start my-react-app
  ```

- **Remove container:**
  ```bash
  docker rm -f my-react-app
  ```

## 🌐 Vercel Deployment

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy to Vercel:

```bash
vercel login
vercel
```

Alternatively, deploy through Vercel Dashboard:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Follow the deployment steps

## 📁 Project Structure

```
my-app/
├── src/
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global styles
│   └── App.css         # Component-specific styles
├── Dockerfile          # Docker configuration
├── vercel.json         # Vercel configuration
└── package.json        # Project dependencies
```

## 🔑 Environment Variables

The application uses the following API endpoint:

```
https://dt-api-226g.onrender.com/api/v1/table-data
```

## 📝 License

This project is MIT licensed.