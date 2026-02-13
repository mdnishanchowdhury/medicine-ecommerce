# 💊 Medicine Store (Full Stack E-commerce)

A modern and comprehensive pharmaceutical e-commerce platform built with a robust tech stack. This application features a multi-role dashboard for Admins, Sellers, and Customers, ensuring a seamless experience for medicine discovery, management, and ordering.

---

## 🚀 Key Features

* **Multi-Role Dashboard:** Distinct interfaces and functionalities for Admins, Sellers, and Customers.
* **Medicine Management:** Admins and Sellers can Add, Edit, or Delete medicines with real-time inventory updates.
* **Order Tracking:** Customers can monitor their order status (Pending, Processing, Delivered) in real-time.
* **Advanced Search & Filtering:** Quickly find medications by category, price range, or name.
* **Secure Authentication:** Integrated user login and signup with role-based access control.
* **Fully Responsive:** Optimized for all devices, from desktop monitors to mobile screens.

---

## 🛠️ Tech Stack

### Frontend:
* **Tailwind CSS** (Styling)
* **Shadcn UI** (Component Library)
* **Next.js** (App Router)
* **Zustand/Redux** (State Management)
* **Deployment:** Hosted on **[Vercel](https://medi-store-client-eight.vercel.app/)** for fast, scalable frontend delivery

### Backend:
* **Node.js & Express**
* **Prisma** (ORM)
* **PostgreSQL**
* **TypeScript** (Typed Development)
* **Deployment:** Hosted on **[Vercel](https://medi-store-omega.vercel.app/)** (API routes) or **Vecel** for backend services
---

## 📁 Project Structure

```text
medicine-ecommerce/
├── Frontend/      # Next.js Client Side Application
├── Backend/       # Node.js & Prisma Server Side API
└── README.md      # Project Documentation
```
## ⚙️ Local Setup Instructions
1. Clone the Repository
```bash
git clone [https://github.com/mdnishanchowdhury/medicine-ecommerce.git](https://github.com/mdnishanchowdhury/medicine-ecommerce.git)
cd medicine-ecommerce
```
## 2. Server Setup (Backend)
```bash
cd Backend
npm install
```
# Create a .env file and add your DATABASE_URL
```bash
npx prisma generate
npm run dev
```
## 3. Client Setup (Frontend)
```bash
cd ../Frontend
npm install
npm run dev
```
# 👨‍💻 Developer  
Md Nishan Chowdhury — [GitHub Profile](https://github.com/mdnishanchowdhury) | [Portfolio](https://personalportfolio-a0877.web.app/)

