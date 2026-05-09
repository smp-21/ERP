# Liquid Glass ERP Frontend

A high-fidelity, enterprise-grade ERP frontend system characterized by a bespoke "Liquid Glass" design language. This project features a modular architecture designed to support over 30 high-density business modules, complete with a master shell, command palette, sidebar navigation, and fluid physics-based animations.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 💻 Getting Started Locally

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## ⚠️ How to Push to an Existing Repository (Replacing All Content)

Follow these exact steps if you want to upload this fresh folder to an existing Git repository on the `main` branch, **completely overwriting and deleting** whatever is currently in that repository.

**Warning: This will destroy all existing history and files in the remote repository.**

1. Open your terminal in this folder (`final-erp-glass`).
2. Remove any existing git configuration to start completely fresh:
   ```bash
   rm -rf .git
   ```
3. Initialize a new fresh Git repository:
   ```bash
   git init
   ```
4. Checkout to the `main` branch (or create it if it doesn't exist):
   ```bash
   git checkout -b main
   ```
5. Add all the files in this folder to the staging area:
   ```bash
   git add .
   ```
6. Commit the files:
   ```bash
   git commit -m "Initial commit of fresh Liquid Glass ERP frontend"
   ```
7. Link to your existing remote repository (replace `<YOUR_REPOSITORY_URL>` with your actual Git URL, e.g., `https://github.com/username/repo.git`):
   ```bash
   git remote add origin <YOUR_REPOSITORY_URL>
   ```
8. **Force push** to the remote repository. This is the command that deletes whatever was there and replaces it with this new project:
   ```bash
   git push -u origin main --force
   ```
