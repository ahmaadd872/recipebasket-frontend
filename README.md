# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Recipe Basket Frontend

## Railway Deployment

This project is ready to deploy on [Railway](https://railway.app/).

### Steps
1. Push this repo to GitHub.
2. Create a new Railway project and link your repo.
3. Railway will use `railway.json` for build and deploy settings.
4. Health check endpoint is `/healthz` (handled in `index.html`).
5. The app will be built with `npm run build` and served with `npm run preview`.

### Health Check
- Railway expects a 200 OK response at `/healthz`.
- This is handled by a script in `index.html`.

### Environment Variables
- If you need to set API URLs, add them in Railway's dashboard as environment variables and use Vite's `import.meta.env` in your code.

---

For any issues, check Railway's [docs](https://docs.railway.app/deploy/deployments/health-checks) or open an issue in this repo.
