# Project Overview: sitearomascake

`sitearomascake` is a Next.js application integrated with Plasmic, a visual CMS and page builder. This setup allows for rapid development by enabling visual design and content management through Plasmic Studio, while maintaining the flexibility of a React-based Next.js project.

## Core Technologies
- **Framework:** Next.js (13.1.5)
- **CMS/Design:** Plasmic (@plasmicapp/loader-nextjs)
- **Styling:** CSS Modules & Global CSS

## Project Architecture
- **`plasmic-init.js`**: Initializes the Plasmic loader. This is where the project ID and tokens are configured, and where custom code components should be registered.
- **`pages/[[...catchall]].jsx`**: The dynamic catch-all route that fetches and renders pages defined in Plasmic Studio.
- **`pages/plasmic-host.jsx`**: Accessible at `/plasmic-host`, this page allows Plasmic Studio to "host" the application for live previewing and code component interaction.
- **`components/`**: Directory for custom React components.
  - **`ui/`**: Basic UI primitives (e.g., Accordion base).
  - **`AromasAccordion.jsx`**: Modularized accordion components (`AromasAccordion`, `AromasAccordionItem`) registered for Plasmic.

## Building and Running

### Development
Starts the development server with hot-reloading.
```bash
npm run dev
```

### Production
Builds the project for production.
```bash
npm run build
```
Starts the production server after a build.
```bash
npm run start
```

### Linting
Runs ESLint to check for code quality and potential issues.
```bash
npm run lint
```

## Custom Components & Plasmic Integration

### Accordion (Modular)
We have implemented a modular accordion system that allows for full visual customization in Plasmic Studio.
- **AromasAccordion (Container)**: The main wrapper. Controls whether single or multiple items can be open.
- **AromasAccordionItem**: Individual tabs. Uses **Slots** for both Title and Content, allowing users to edit typography, colors, and add other components directly in the Studio.

### Development Conventions

### Git Branching
- **`main`**: Production-ready code. Always reflects the stable, published version.
- **`dev`**: Active development branch. All new features and fixes should be implemented here before being merged into `main`.

### Environment Configuration
Local environment variables are managed in `.env.local` (ignored by Git).
- **`PLASMIC_PREVIEW`**: Set to `true` to enable Plasmic's preview mode. The configuration in `plasmic-init.js` automatically converts this to a boolean for the loader.

### Hybrid Development Workflow (Code + Design)
1. **Develop** components in `dev` branch.
2. **Register** in `plasmic-init.js`.
3. **Use** in Plasmic Studio via `localhost:3000/plasmic-host`.
4. **Merge** to `main` and deploy code.
5. **Publish** in Plasmic Studio.
