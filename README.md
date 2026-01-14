# 🚀 GigFlow Frontend Setup Script

### This script clones the repo, installs dependencies, and provides commands for development and production.

## 1️⃣ Clone the repository
```
git clone https://github.com/gritik418/GigFlow-Frontend.git
```
```
cd GigFlow-Frontend
```

### 2️⃣ Install dependencies
```
npm install
```
## 3️⃣ Start development server (hot reload)
```
npm run dev
```
## 4️⃣ Build for production
```
npm run build
```
## 5️⃣ Preview production build
```
npm run preview
```
## 📌 Stack & Tools

- Framework: React 18 + Vite (Fast HMR)

- Styling: Tailwind CSS (Mobile-first)

- Routing: React Router v6

- State: Redux Toolkit + RTK Query

- Real-time: Socket.IO Client

- Types: TypeScript

## ✅ Features Overview

- User Auth : JWT + HttpOnly cookies

- Gig CRUD : Post, browse, search gigs

- Bidding : Price + message bids

- Hiring Flow : Hire → Auto-reject others

- Owner Bids : Client sees own gig bids

- Socket.IO : Live real-time bid/hire updates

- Redux Toolkit : Full RTK Query + slices

- Atomic Hire : Mongo Transactions, race-condition safe

- Responsive UI : Mobile-first, Tailwind breakpoints

---

echo "✅ Setup complete! You can now start developing GigFlow."
