# Gaurav Rathod — Personal Portfolio Website ⚡

An award-winning personal portfolio website built with **React**, **TypeScript**, **Tailwind CSS**, **React Spring** physics animations, and designed with the signature dark editorial aesthetics of **Godly.website** and component patterns from **Watermelon UI**.

---

## 🚀 Quick Start (Running Locally)

Since you're new to web development, running this website on your computer is super easy:

1. Open your terminal in this project folder (`c:\Users\Gaurav Rathod\Documents\Self_site`).
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and visit: **`http://localhost:5173`** (or the URL shown in your terminal).

That's it! Any edits you make will automatically refresh in your browser in real-time.

---

## ✏️ How to Customize Your Portfolio

You **do NOT** need to know React or CSS to customize this website. All your information is stored in **one single file**:

👉 **`src/data/portfolioData.ts`**

In that file, you can easily change:
- **Your Name, Role, Location, & Bio**
- **Social Links** (GitHub, LinkedIn, LeetCode, Codeforces)
- **Projects**: Add, remove, or modify your projects, tags, metrics, and GitHub links
- **Experience & Activities**: Update your IIT Mandi details, clubs (SAE, Ranneeti), and hackathon honors
- **Skills**: Add or adjust technologies in your tech stack
- **Resume**: Replace `public/Gaurav_Rathod_Resume.pdf` with any new version of your PDF

---

## 🌐 How to Deploy Live to the Internet (Free)

### Option 1: Deploy with Vercel (Recommended — Takes 1 Minute)
1. Push this folder to a GitHub repository on your GitHub account (`https://github.com/gvrathodd`).
2. Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Click **Deploy**! Vercel automatically builds and provides a free `https://gaurav-rathod.vercel.app` domain with free SSL.

### Option 2: Deploy with GitHub Pages
1. Build the production files:
   ```bash
   npm run build
   ```
2. The compiled site will be generated in the `dist/` directory ready to be published!

---

## 🛠️ Tech Stack & Features

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom glassmorphism and ambient glow utilities
- **Physics Animations**: `@react-spring/web`
  - 3D perspective tilt on project cards that react to mouse position
  - Smooth spring modal and drawer transitions
  - Magnetic button effects
- **Icons**: `lucide-react`
- **Micro-interactions**: `canvas-confetti` celebration on email dispatch, one-click copy email button with spring feedback
- **Responsive**: 100% mobile-friendly with touch drawer navigation and fluid typography
