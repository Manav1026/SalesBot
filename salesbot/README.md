# **SalesBot 📞**  
**An AI-powered voice interview simulator for sales training, built with Next.js, Supabase, Vapi.ai, and TailwindCSS.**  

## 🌍 Live Demo  
[SalesBot](https://sales-bot-3g43.vercel.app/)

---

## 🚀 Features  
✅ **AI-driven sales interview** via phone calls using Vapi.ai  
✅ **Real-time scoring & feedback** on clarity, relevance, and persuasiveness  
✅ **Voice-based interactions** for a natural interview experience  
✅ **Results storage & display** powered by Supabase  
✅ **Fully responsive UI** with TailwindCSS  

---

## 📦 Tech Stack  
- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS  
- **Backend:** API routes in Next.js  
- **Database:** Supabase for storing responses & scores  
- **Voice AI:** Vapi.ai for phone calls  
- **Hosting:** Vercel  

---

## 🛠 Setup & Installation  

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Manav1026/SalesBot.git
cd SalesBot
```
### ** Install Dependencies**
```sh
npm install
```
### **Environmental Variable**
```ini
NEXT_PUBLIC_SUPABASE_URL=https://pqbskpimgogtgpkgpqno.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYnNrcGltZ29ndGdwa2dwcW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MTkxOTMsImV4cCI6MjA1ODA5NTE5M30.VRoLR6FqC7vTXwJUJpTdhWaskigz64TOkcVZn6g17M8
NEXT_PUBLIC_VAPI_PUBLIC_KEY=53e3b6f6-964e-4f67-af54-9e27048aa4e7
VAPI_PRIVATE_KEY= f60ca27f-4f0a-4a5d-8a1b-9ce046c1be90
NEXT_PUBLIC_VAPI_ASSISTANT_ID = 9c5ed71d-a2a9-4ebc-bca6-5f05390b3737

```
### **Folder Structure**
```bash
📂 SalesBot/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📂 api/                  # Backend API routes
│   │   │   ├── getResults/route.ts  # Fetch interview results
│   │   │   ├── startInterview/route.ts # Handle Vapi calls
│   │   ├── 📂 results/              # Results page
│   │   ├── page.tsx                 # Main landing page
│   ├── 📂 components/               # Reusable components
│   │   ├── InterviewButton.tsx      # Start interview button
│   │   ├── ResultDisplay.tsx        # Display interview results
│   ├── 📂 lib/                      # Utility functions
│   │   ├── supabase.ts              # Supabase client setup
│   │   ├── scoring.ts               # Scoring logic
│   ├── 📂 styles/                    # Tailwind CSS styles
├── .env.local                        # Local environment variables
├── README.md                         # Documentation
├── package.json                      # Dependencies
├── tsconfig.json                      # TypeScript config
└── vercel.json                        # Vercel config (if needed)

```
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

### Contact and Support
Manav Dhami - dhamimanav7@gmail.com
