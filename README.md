# 🚗 DriveMax - Client Side

DriveMax is a modern full-stack automotive e-commerce platform where users can browse, search, and manage automotive products such as car parts, motorcycle parts, electric vehicles, and accessories. The application features secure authentication, role-based authorization, responsive UI, product management, and an intuitive shopping experience.

## 🌐 Live Website

**Client:** https://drive-max-project-client.vercel.app

**Server:** https://drive-max-project-server.vercel.app

---

## ✨ Features

- 🔐 Secure Authentication with Better Auth
- 🔑 Google Sign-In & Email/Password Login
- 👤 Role-Based Authorization (Admin & User)
- 🚘 Browse Automotive Products
- 🔍 Search Products by Name
- 🗂️ Filter Products by Category
- 💰 Filter Products by Price Range
- ➕ Add New Products
- ✏️ Update Existing Products
- 🗑️ Delete Products (Admin Only)
- 📱 Fully Responsive Design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast Performance using Next.js 16
- 🔔 Toast Notifications
- 🌙 Clean User Experience
- 🔒 Protected Routes
- 🖼️ Optimized Image Loading
- 📄 Dynamic Product Details Page

---

## 🛠️ Technologies Used

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- React Hook Form
- React Icons
- Sonner
- Axios

### Backend

- Express.js
- MongoDB
- Better Auth
- JWT Authentication
- JOSE
- TypeScript

---

## 📂 Project Structure

```bash
src/
│
├── app/
├── components/
├── hooks/
├── lib/
├── provider.tsx
├── styles/
└── utils/
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_SERVER_URI=http://localhost:5000

MONGO_URL=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_secret

BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Symun-Hossain-Shifat/DriveMax-project-client.git
```

Move into the project directory

```bash
cd DriveMax-project-client
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Create production build.

```bash
npm run start
```

Run production server.

```bash
npm run lint
```

Run ESLint.

---

## 🔐 User Roles

### 👤 User

- Register/Login
- Browse Products
- Search Products
- Filter Products
- View Product Details
- Add Products
- Update Own Products

### 👑 Admin

- All User Permissions
- Delete Products
- Manage Products
- Manage Users

---

## 📸 Screenshots

| Home | Products | Dashboard |
|------|----------|-----------|
| Add your screenshot | Add your screenshot | Add your screenshot |

---

## 🚀 Deployment

### Client

Vercel

### Server

Vercel / Render

---

## 👨‍💻 Developer

**Symun Hossain Shifat**

- GitHub: https://github.com/Symun-Hossain-Shifat
- Email: your-email@example.com

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
