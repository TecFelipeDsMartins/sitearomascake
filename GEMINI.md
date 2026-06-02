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
- **`pages/api/hello.js`**: A sample API route.

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

## Hybrid Development Workflow (Code + Design)

To ensure stability when working with both code components and visual design, follow this "Code First, Design Second" workflow. This prevents production errors where the design tries to use a component that hasn't been deployed yet.

1.  **Development Branch (`dev`):**
    *   Set `PLASMIC_PREVIEW=true` in `.env.local`.
    *   Develop React components and register them in `plasmic-init.js`.
    *   Use these components in Plasmic Studio (synced via `localhost:3000/plasmic-host`).
2.  **Code Deployment (Merge to `main`):**
    *   Merge `dev` into `main` and push/deploy.
    *   This ensures the production environment has the necessary React code *before* the design requires it.
    *   The production site remains stable because `PLASMIC_PREVIEW` is `false` (or undefined) in production, still rendering the previous "Published" version.
3.  **Visual Deployment (Publish in Plasmic):**
    *   Once the code deploy is successful, click **Publish** in Plasmic Studio.
    *   The production site now fetches the new design that utilizes the newly deployed code components.

## Development Conventions

### Git Branching
- **`main`**: Production-ready code. Always reflects the stable, published version.
- **`dev`**: Active development branch. All new features and fixes should be implemented here before being merged into `main`.

### Environment Configuration
Local environment variables are managed in `.env.local` (ignored by Git).
- **`PLASMIC_PREVIEW`**: Set to `true` to enable Plasmic's preview mode, allowing you to see unpublished changes from Plasmic Studio in real-time.

### Plasmic Workflow
- **Visual Editing**: Most page layouts and content are managed in Plasmic Studio.
- **Preview Mode**: Controlled via `process.env.PLASMIC_PREVIEW` in `plasmic-init.js`. This allows developers to see live changes on `dev` without affecting the production build.
- **Code Components**: If a component requires custom logic or data fetching that can't be handled in Plasmic, it should be created as a React component and registered in `plasmic-init.js` using `PLASMIC.registerComponent()`.
- **App Hosting**: Ensure the Plasmic project settings point to the local or deployed `/plasmic-host` URL to enable real-time previews of custom components.

### Routing
- Static pages can still be created by adding files to the `pages/` directory.
- The `[[...catchall]].jsx` file handles all routes not explicitly defined by other files in `pages/`, delegating them to Plasmic.

### Styles
- Global styles are located in `styles/globals.css`.
- Component-specific styles should use CSS Modules (`*.module.css`).
