This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 🏦 Zorvyn - Modern Financial Analytics Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge\&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge\&logo=framer-motion)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

---

## 📑 Table of Contents

* [📌 Project Overview](#-project-overview)
* [🧠 Problem Statement](#-problem-statement)
* [💡 Solution](#-solution)
* [✨ Features](#-features)
* [🏗 Architecture](#-architecture)
* [📂 Folder Structure](#-folder-structure)
* [🛠 Tech Stack](#-tech-stack)
* [📸 Screenshots](#-screenshots)
* [🎥 Demo](#-demo)
* [⚙️ Installation & Setup](#️-installation--setup)
* [🚀 Usage](#-usage)
* [📈 Performance Optimizations](#-performance-optimizations)
* [📈 Future Improvements](#-future-improvements)
* [👨‍💻 Author](#-author)

---

## 📌 Project Overview

**Zorvyn** is a premium financial analytics dashboard designed to provide deep insights into transactions, spending patterns, and financial trends.

It focuses on:

* ⚡ High performance UI
* 🎯 Clean architecture
* 🎨 Modern UX with micro-interactions
* 📊 Real-time analytics simulation (mock data driven)

---

## 🧠 Problem Statement

Most dashboards suffer from:

* ❌ Cluttered UI
* ❌ Poor data visualization
* ❌ Slow interactions
* ❌ No role-based access control

---

## 💡 Solution

Zorvyn solves these problems by:

* ✅ Clean, minimal UI design
* ✅ Interactive charts with smooth animations
* ✅ Feature-based scalable architecture
* ✅ Role-based UI (Admin / Viewer)
* ✅ Optimized rendering using memoization

---

## ✨ Features

### 📊 Advanced Analytics

* Interactive Area Charts (7D / 30D / 3M)
* Dynamic Pie Chart with hover interaction
* Real-time data simulation

### 🔐 Role-Based Access

* Admin → Full CRUD access
* Viewer → Read-only mode
* Persistent state using Zustand

### 📋 Smart Data Table

* Global search
* Category filters
* Date filtering
* Animated row loading
* Empty state UX

### 💎 UI/UX Enhancements

* Glassmorphism UI
* Animated counters
* Smooth transitions (Framer Motion)

---

## 🏗 Architecture

This project uses **Feature-Based Architecture**, which improves scalability and maintainability.

```text
src/
├── app/
├── components/
├── features/
├── lib/
└── types/
```

---

## 📂 Folder Structure (Detailed)

```text
src/
├── app/
|   ├── transactions/
│   │   ├── page.tsx      # Transaction page 
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main entry page
│
├── components/
│   ├── providers/        # Theme, Toast, Context providers
│   ├── shared/           # Navbar, Sidebar, Layouts
│   └── ui/               # Reusable UI components (buttons, modals)
│
├── features/
│   ├── auth/
│   │   ├── hooks/        # Auth logic
│   │   ├── store/        # Zustand store
│   │   └── components/   # Auth UI
│
│   ├── dashboard/
│   │   ├── components/   # Charts, cards
│   │   ├── hooks/        # Data processing
│   │   └── services/     # Data logic
│
│   ├── transactions/
│   │   ├── components/   # Table UI
│   │   ├── hooks/        # Filtering logic
│   │   └── services/     # CRUD operations
│
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   └── mock-data.ts

```

---

## 🛠 Tech Stack

* **Frontend:** Next.js 15
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn UI
* **State Management:** Zustand
* **Charts:** Recharts
* **Tables:** TanStack Table
* **Animations:** Framer Motion
* **Icons:** Lucide React

---

## 📸 Screenshots


```
![Dashboard Dark Desktop](/public/screenshots/dashboard-desktop-dark.png)
![Dashboard light Desktop](/public/screenshots/dashboard-desktop-light.png)
![Dashboard Dark Mobile](/public/screenshots/dashboard-mobile-dark.png)
![Dashboard Dark Mobile](/public/screenshots/sidebar-mobile-dark.png)
![Dashboard light Mobile](/public/screenshots/sidebar-mobile-light.png)
![Dashboard Dark Desktop](/public/screenshots/transactions-desktop-dark.png)
![Dashboard light Desktop](/public/screenshots/transactions-desktop-light.png)
![Dashboard Dark Mobile](/public/screenshots/transactions-mobile-dark.png)
![Dashboard light Mobile](/public/screenshots/transactions-mobile-light.png)
![Dashboard Dark Mobile](/public/screenshots/userswitcher-mobile.png)

```

---

## 🎥 Demo

🔗 Live Demo: https://zorvynfinancedashboard.vercel.app/
📂 GitHub Repo: https://github.com/Theharishpatel/zorvyn-finance-dashboard

---

## ⚙️ Installation & Setup

```bash
# Clone repo
git clone https://github.com/Theharishpatel/zorvyn-finance-dashboard.git

# Install dependencies
npm install

# Run project
npm run dev
```

Visit: http://localhost:3000

---

## 🚀 Usage

* Toggle between Admin / Viewer
* Filter transactions
* View analytics charts
* Simulate financial data insights


---

## 🧪 Testing

* Manual UI testing
* Component-level validation
* Edge cases handled (empty state, filters)

---

## 📈 Performance Optimizations

* useMemo for heavy computations
* useCallback for stable functions
* Lazy loading components
* Optimized re-renders

---


## 📈 Future Improvements

* 🔗 Backend integration (Node.js + MongoDB)
* 🔐 JWT Authentication
* 📡 Real-time updates (WebSockets)
* 📊 Advanced analytics (AI insights)
* 📱 Mobile app version

---


## 👨‍💻 Author

**Harish Patel**
Frontend Developer | MERN Stack Developer

* LinkedIn: https://www.linkedin.com/in/theharishpatel/
* Twitter: https://x.com/theharishpatel

---

⭐ If you like this project, don't forget to star the repo!
