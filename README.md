# 🚀 Next.js Full-Stack Application with Authentication & Admin Dashboard

โปรเจค Web Application แบบ Full-Stack ที่พัฒนาด้วย Next.js 15, MongoDB, NextAuth และ Bootstrap 5 พร้อมระบบ Authentication, Authorization และ Admin Dashboard สำหรับจัดการผู้ใช้งาน

---

## 📋 สารบัญ

- [ภาพรวมโปรเจค](#ภาพรวมโปรเจค)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
- [การติดตั้งและใช้งาน](#การติดตั้งและใช้งาน)
- [การตั้งค่า Environment Variables](#การตั้งค่า-environment-variables)
- [API Endpoints](#api-endpoints)
- [ระบบ Authentication](#ระบบ-authentication)
- [ระบบ Authorization](#ระบบ-authorization)
- [Database Models](#database-models)
- [การพัฒนาเพิ่มเติม](#การพัฒนาเพิ่มเติม)
- [Deploy บน Vercel](#deploy-บน-vercel)
- [คำแนะนำการใช้งาน](#คำแนะนำการใช้งาน)
- [Troubleshooting](#troubleshooting)
- [เอกสารเพิ่มเติม](#เอกสารเพิ่มเติม)
- [ผู้พัฒนา](#ผู้พัฒนา)
- [License](#license)

---

## 🎯 ภาพรวมโปรเจค

โปรเจคนี้เป็น Full-Stack Web Application ที่มีระบบจัดการผู้ใช้งานครบวงจร ประกอบด้วย:

- **Frontend**: Next.js 15 + React 19 + Bootstrap 5 + TypeScript
- **Backend**: Next.js API Routes + MongoDB + Mongoose
- **Authentication**: NextAuth.js v4 with JWT Strategy
- **UI Components**: Bootstrap 5.3.8 + Bootstrap Icons + SweetAlert2
- **Middleware**: Route Protection & Role-Based Access Control

โปรเจคนี้เหมาะสำหรับการพัฒนาต่อยอดเป็น:
- ระบบจัดการเนื้อหา (CMS)
- ระบบจัดการร้านค้าออนไลน์ (E-commerce)
- ระบบจัดการองค์กร (Enterprise Application)
- แพลตฟอร์มเรียนรู้ออนไลน์ (LMS)

---

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **[Next.js 15.5.4](https://nextjs.org/)** - React Framework with App Router & Turbopack
- **[React 19.1.0](https://react.dev/)** - JavaScript Library for UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Bootstrap 5.3.8](https://getbootstrap.com/)** - CSS Framework
- **[Bootstrap Icons 1.13.1](https://icons.getbootstrap.com/)** - Icon Library
- **[SweetAlert2 11.23.0](https://sweetalert2.github.io/)** - Beautiful Alert Popups

### Backend
- **[MongoDB](https://www.mongodb.com/)** - NoSQL Database
- **[Mongoose 8.19.0](https://mongoosejs.com/)** - MongoDB ODM
- **[NextAuth.js 4.24.11](https://next-auth.js.org/)** - Authentication Solution
- **[bcryptjs 3.0.2](https://www.npmjs.com/package/bcryptjs)** - Password Hashing

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code Linting
- **[Turbopack](https://turbo.build/pack)** - Fast Bundler
- **[@eslint/eslintrc](https://www.npmjs.com/package/@eslint/eslintrc)** - ESLint Configuration

---

## ✨ คุณสมบัติหลัก

### 🔐 ระบบ Authentication & Authorization
- ✅ ลงทะเบียนผู้ใช้ใหม่ (Sign Up) พร้อม Email Validation
- ✅ เข้าสู่ระบบ (Login) ด้วย Email & Password
- ✅ ออกจากระบบ (Logout) ด้วย NextAuth
- ✅ Session Management ด้วย JWT Strategy
- ✅ Password Hashing ด้วย bcryptjs (10 salt rounds)
- ✅ Role-Based Access Control (Admin, Staff, User)
- ✅ Protected Routes ด้วย Middleware
- ✅ Auto-redirect หากไม่มีสิทธิ์เข้าถึง

### 👥 ระบบจัดการผู้ใช้ (User Management)
- ✅ **CRUD Operations**
  - เพิ่มผู้ใช้ใหม่ (Create)
  - แสดงรายการผู้ใช้ทั้งหมด (Read)
  - แก้ไขข้อมูลผู้ใช้ (Update)
  - ลบผู้ใช้ (Delete)
- ✅ กำหนด Role ให้ผู้ใช้ (Admin/Staff/User)
- ✅ แสดง Role Badge บน Navbar
- ✅ Modal Form สำหรับเพิ่ม/แก้ไข
- ✅ Confirmation Dialog ก่อนลบ (SweetAlert2)
- ✅ Real-time Data Refresh
- ✅ Loading States & Error Handling

### 📊 Admin Dashboard
- ✅ หน้า Dashboard สำหรับ Admin เท่านั้น
- ✅ แสดงสถิติ (Total Users, Products, Orders)
- ✅ Quick Actions Menu
- ✅ ตารางกิจกรรมล่าสุด (Recent Activity)
- ✅ Responsive Cards & Charts
- ✅ Bootstrap Icons Integration

### 🎨 UI/UX Features
- ✅ **Responsive Design** - รองรับทุกขนาดหน้าจอ
- ✅ **Dark Theme Navbar** - สวยงามและทันสมัย
- ✅ **Offcanvas Menu** - เมนูแบบเลื่อนออกบนมือถือ
- ✅ **Active Link Highlighting** - แสดง Active State อัตโนมัติ
- ✅ **Loading Spinners** - แสดง Loading State
- ✅ **Toast Notifications** - แจ้งเตือนสำเร็จ/ผิดพลาด
- ✅ **Form Validation** - ตรวจสอบข้อมูลก่อน Submit
- ✅ **Error Messages** - แสดงข้อความ Error ที่ชัดเจน

### 🚀 Performance & SEO
- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ API Routes Optimization
- ✅ Image Optimization (Next.js Image)
- ✅ Code Splitting
- ✅ Fast Refresh with Turbopack

---

## 📁 โครงสร้างโปรเจค

```
my-app/
├── src/
│   ├── app/                          # App Router (Next.js 15)
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts     # NextAuth Configuration
│   │   │   │   └── signup/
│   │   │   │       └── route.ts     # Sign Up API
│   │   │   └── users/
│   │   │       ├── route.ts         # GET all users, POST new user
│   │   │       └── [id]/
│   │   │           └── route.ts     # GET, PUT, DELETE user by ID
│   │   │
│   │   ├── dashboard/               # Admin Dashboard
│   │   │   ├── page.tsx            # Dashboard Home (Protected)
│   │   │   └── users/
│   │   │       └── page.tsx        # User Management Page
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx            # Login Page
│   │   │
│   │   ├── signup/
│   │   │   └── page.tsx            # Sign Up Page
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx            # About Page
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact Page
│   │   │
│   │   ├── create/
│   │   │   └── product/
│   │   │       └── page.tsx        # Product Creation Page
│   │   │
│   │   ├── layout.tsx              # Root Layout (Navbar + Footer)
│   │   ├── page.tsx                # Home Page
│   │   └── globals.css             # Global Styles
│   │
│   ├── components/                  # Reusable Components
│   │   ├── Navbar.tsx              # Navigation Bar with Auth
│   │   ├── Footer.tsx              # Footer Component
│   │   └── SessionProvider.tsx     # NextAuth Session Provider
│   │
│   ├── lib/                        # Library & Utilities
│   │   └── mongodb.ts              # MongoDB Connection (with caching)
│   │
│   ├── models/                     # Mongoose Models
│   │   └── User.ts                 # User Model (Schema + Methods)
│   │
│   ├── types/                      # TypeScript Type Definitions
│   │   └── next-auth.d.ts         # NextAuth Type Extensions
│   │
│   └── middleware.ts               # Next.js Middleware (Route Protection)
│
├── public/                         # Static Assets
│
├── .env.local                      # Environment Variables (Git Ignored)
├── .env.example                    # Example Environment Variables
├── next.config.ts                  # Next.js Configuration
├── tsconfig.json                   # TypeScript Configuration
├── package.json                    # Dependencies
├── eslint.config.mjs              # ESLint Configuration
└── README.md                       # Documentation (This file)
```

---

## 💻 การติดตั้งและใช้งาน

### ข้อกำหนดของระบบ
- Node.js 20.x หรือสูงกว่า
- npm, yarn, หรือ pnpm
- MongoDB Atlas Account หรือ Local MongoDB Server

### ขั้นตอนการติดตั้ง

#### 1. Clone Repository
```bash
git clone <your-repository-url>
cd my-app
```

#### 2. ติดตั้ง Dependencies
```bash
npm install
# หรือ
yarn install
# หรือ
pnpm install
```

#### 3. ตั้งค่า Environment Variables
สร้างไฟล์ `.env.local` และเพิ่มค่าต่อไปนี้:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key
```

**วิธีสร้าง NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### 4. รันโปรเจคในโหมด Development
```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
```

เปิดเบราว์เซอร์และไปที่ [http://localhost:3000](http://localhost:3000)

#### 5. Build สำหรับ Production
```bash
npm run build
npm run start
```

---

## 🔑 การตั้งค่า Environment Variables

### ไฟล์ `.env.local` (ใช้ในการพัฒนา)

```env
# MongoDB Connection String
# ดึงได้จาก MongoDB Atlas Dashboard → Connect → Connect your application
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# NextAuth Configuration
# URL ของแอปพลิเคชัน (สำหรับ Development)
NEXTAUTH_URL=http://localhost:3000

# Secret Key สำหรับ JWT Signing (สร้างด้วย openssl rand -base64 32)
NEXTAUTH_SECRET=your_secret_key_here
```

### การตั้งค่าสำหรับ Production (Vercel)

เมื่อ Deploy บน Vercel ให้เพิ่ม Environment Variables ใน Dashboard:

1. ไปที่ Project Settings → Environment Variables
2. เพิ่ม Variables ต่อไปนี้:
   - `MONGODB_URI` → MongoDB connection string
   - `NEXTAUTH_URL` → URL ของแอปพลิเคชัน (https://your-app.vercel.app)
   - `NEXTAUTH_SECRET` → Secret key

---

## 🌐 API Endpoints

### Authentication APIs

#### 1. Sign Up (สมัครสมาชิก)
```
POST /api/auth/signup
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (Success):
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login (เข้าสู่ระบบ)
```
POST /api/auth/signin
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: JWT Token in Cookie
```

#### 3. Logout (ออกจากระบบ)
```
POST /api/auth/signout
```

### User Management APIs (Protected)

#### 1. Get All Users
```
GET /api/users

Response:
{
  "users": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2025-10-05T..."
    }
  ]
}
```

#### 2. Create User
```
POST /api/users
Content-Type: application/json

Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "staff"
}

Response:
{
  "message": "User created successfully",
  "user": { ... }
}
```

#### 3. Update User
```
PUT /api/users/[id]
Content-Type: application/json

Body:
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin",
  "password": "newpassword" // Optional
}

Response:
{
  "message": "User updated successfully",
  "user": { ... }
}
```

#### 4. Delete User
```
DELETE /api/users/[id]

Response:
{
  "message": "User deleted successfully"
}
```

---

## 🔐 ระบบ Authentication

### NextAuth.js Configuration

โปรเจคใช้ NextAuth.js v4 สำหรับจัดการ Authentication

**Features:**
- ✅ Credentials Provider (Email + Password)
- ✅ JWT Strategy for Session Management
- ✅ Custom Callbacks for Token & Session
- ✅ Custom Sign In Page
- ✅ Password Hashing with bcryptjs

### Authentication Flow

```
1. User กรอก Email & Password
   ↓
2. NextAuth authorize() ตรวจสอบข้อมูล
   ↓
3. เทียบ Password กับ Hash ใน Database
   ↓
4. สร้าง JWT Token
   ↓
5. เก็บ Token ใน Cookie
   ↓
6. Return Session Object to Client
```

### ไฟล์ที่เกี่ยวข้อง

- **`src/app/api/auth/[...nextauth]/route.ts`** - NextAuth Configuration
- **`src/app/login/page.tsx`** - Login Page
- **`src/app/signup/page.tsx`** - Sign Up Page
- **`src/components/SessionProvider.tsx`** - Session Provider Wrapper

### การใช้งาน Session

```tsx
// Client Component
'use client';
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Please login</div>;

  return <div>Welcome, {session.user.name}!</div>;
}
```

```tsx
// Server Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return <div>Welcome, {session.user.name}!</div>;
}
```

---

## 🛡️ ระบบ Authorization

### Role-Based Access Control

โปรเจคมี 3 Roles:
- **Admin** - เข้าถึงได้ทุก Feature (Dashboard, User Management)
- **Staff** - เข้าถึง Feature บางอย่าง (ขึ้นอยู่กับการกำหนดสิทธิ์)
- **User** - เข้าถึง Feature พื้นฐาน

### Middleware Protection

ไฟล์ `src/middleware.ts` จะตรวจสอบ Authentication & Authorization:

```typescript
// Protect Dashboard Routes
export const config = {
  matcher: ['/dashboard/:path*'],
};

// Middleware Logic
1. ตรวจสอบว่ามี Session หรือไม่
2. ตรวจสอบว่า Role เป็น 'admin' หรือไม่
3. ถ้าไม่ผ่าน → Redirect ไปหน้า Login หรือ Home
```

### Protected Pages

- **`/dashboard`** - Admin only
- **`/dashboard/users`** - Admin only
- **`/api/users`** - Authenticated users only

### การเพิ่ม Protected Route

```typescript
// ใน middleware.ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',  // เพิ่ม route ใหม่
  ],
};
```

---

## 💾 Database Models

### User Model

**ไฟล์:** `src/models/User.ts`

**Schema:**
```typescript
{
  email: String (required, unique, lowercase, validated)
  password: String (required, min 6 characters, hashed)
  name: String (required)
  role: Enum['admin', 'staff', 'user'] (default: 'user')
  createdAt: Date (default: now)
}
```

**Methods:**
- `comparePassword(candidatePassword)` - เทียบ Password กับ Hash

**Hooks:**
- `pre('save')` - Hash Password ก่อนบันทึก (ถ้า Password เปลี่ยน)

### MongoDB Connection

**ไฟล์:** `src/lib/mongodb.ts`

**Features:**
- ✅ Connection Caching (ไม่เปิด Connection ซ้ำ)
- ✅ Error Handling
- ✅ Environment Variable Validation
- ✅ Global Type Declaration

```typescript
// การใช้งาน
import connectDB from '@/lib/mongodb';

await connectDB();
// ใช้ Mongoose Models ได้เลย
```

---

## 🎨 การพัฒนาเพิ่มเติม

### เพิ่มหน้าใหม่

1. สร้างโฟลเดอร์ใน `src/app/` เช่น `services/`
2. สร้างไฟล์ `page.tsx`
3. Export Default Function Component

```tsx
// src/app/services/page.tsx
export default function ServicesPage() {
  return (
    <div className="container my-5">
      <h1>Our Services</h1>
      <p>Content here...</p>
    </div>
  );
}
```

4. เพิ่มลิงก์ใน Navbar (ถ้าต้องการ)

```tsx
// src/components/Navbar.tsx
<li className="nav-item">
  <Link
    className={`nav-link ${isActive("/services")}`}
    href="/services"
    onClick={closeOffcanvas}
  >
    Services
  </Link>
</li>
```

### เพิ่ม API Route

1. สร้างไฟล์ `route.ts` ใน `src/app/api/`
2. Export HTTP Methods: GET, POST, PUT, DELETE

```typescript
// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Logic here
  return NextResponse.json({ products: [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  // Logic here
  return NextResponse.json({ message: 'Created' });
}
```

### เพิ่ม Mongoose Model

1. สร้างไฟล์ใน `src/models/` เช่น `Product.ts`
2. กำหนด Schema และ Export Model

```typescript
// src/models/Product.ts
import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model('Product', productSchema);
```

### เพิ่ม Component

1. สร้างไฟล์ใน `src/components/`
2. Export Default Component

```tsx
// src/components/Card.tsx
interface CardProps {
  title: string;
  content: string;
}

export default function Card({ title, content }: CardProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
}
```

### แก้ไข Styling

**Global Styles:** `src/app/globals.css`

```css
/* Custom styles */
.my-custom-class {
  background-color: #f0f0f0;
  padding: 20px;
}
```

**Component Styles:** ใช้ Bootstrap Classes หรือ Inline Styles

---

## 🚀 Deploy บน Vercel

### ขั้นตอนการ Deploy

#### 1. เตรียม Repository
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

#### 2. เชื่อมต่อกับ Vercel
1. ไปที่ [vercel.com](https://vercel.com)
2. Login ด้วย GitHub Account
3. คลิก **"Add New Project"**
4. เลือก Repository ของคุณ
5. คลิก **"Import"**

#### 3. ตั้งค่า Environment Variables

ใน Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generated-secret>
```

**สร้าง NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### 4. Deploy

1. คลิก **"Deploy"**
2. รอให้ Vercel Build & Deploy เสร็จ (2-3 นาที)
3. เข้าถึงเว็บไซต์ผ่าน URL ที่ Vercel สร้างให้

**URL Format:** `https://your-project-name.vercel.app`

### Auto Deployment

Vercel จะ Deploy อัตโนมัติทุกครั้งที่คุณ Push ขึ้น Branch `main`

**Preview Deployments:**
- ทุก Pull Request จะได้ Preview URL แยก
- ทดสอบได้ก่อน Merge เข้า main

### Custom Domain

1. ไปที่ Project Settings → Domains
2. เพิ่ม Custom Domain ของคุณ
3. ตั้งค่า DNS Records ตามที่ Vercel แนะนำ
4. รอ DNS Propagation (15-48 ชั่วโมง)

---

## 📚 คำแนะนำการใช้งาน

### สำหรับผู้ใช้งานทั่วไป

1. **สมัครสมาชิก**
   - ไปที่หน้า Sign Up (`/signup`)
   - กรอก Name, Email, Password
   - คลิก "Sign Up"

2. **เข้าสู่ระบบ**
   - ไปที่หน้า Login (`/login`)
   - กรอก Email & Password
   - คลิก "Login"

3. **ออกจากระบบ**
   - คลิกปุ่ม "Logout" บน Navbar

### สำหรับ Admin

1. **เข้าสู่ระบบด้วย Admin Account**
   - Email & Password ของ Admin
   - จะเห็นเมนู "Dashboard" บน Navbar

2. **จัดการผู้ใช้**
   - ไปที่ Dashboard → จัดการผู้ใช้งาน
   - เพิ่ม/แก้ไข/ลบผู้ใช้ได้

3. **เปลี่ยน Role**
   - คลิก "แก้ไข" ที่ผู้ใช้
   - เลือก Role ใหม่ (Admin/Staff/User)
   - คลิก "บันทึก"

### การสร้าง Admin Account แรก

**Option 1: ผ่าน MongoDB Compass/Atlas**
1. เชื่อมต่อกับ MongoDB
2. เปิด Collection `users`
3. แก้ไข Document ของ User ที่ต้องการ
4. เปลี่ยน `role: "user"` เป็น `role: "admin"`
5. Save

**Option 2: ผ่าน API + Postman/Thunder Client**
```bash
POST /api/auth/signup
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123"
}

# จากนั้นไปแก้ role ใน Database เป็น "admin"
```

---

## 🐛 Troubleshooting

### ปัญหา: Cannot connect to MongoDB

**Solution:**
1. ตรวจสอบ `MONGODB_URI` ใน `.env.local`
2. ตรวจสอบ Network Access ใน MongoDB Atlas
3. เพิ่ม IP Address ของคุณใน Whitelist
4. ตรวจสอบ Username/Password

### ปัญหา: NextAuth Error - No secret provided

**Solution:**
```bash
# สร้าง Secret ใหม่
openssl rand -base64 32

# เพิ่มใน .env.local
NEXTAUTH_SECRET=<generated-secret>
```

### ปัญหา: Session ไม่ทำงาน

**Solution:**
1. ตรวจสอบว่า `NEXTAUTH_URL` ถูกต้อง
2. ลอง Clear Cookies ในเบราว์เซอร์
3. Restart Development Server

### ปัญหา: Bootstrap CSS ไม่โหลด

**Solution:**
1. ตรวจสอบ `layout.tsx` ว่ามี Bootstrap CDN
2. ตรวจสอบ Internet Connection
3. ลอง Hard Refresh (Ctrl+Shift+R)

### ปัญหา: TypeScript Errors

**Solution:**
```bash
# ลบ Cache และ Install ใหม่
rm -rf .next node_modules
npm install
npm run dev
```

### ปัญหา: Port 3000 already in use

**Solution:**
```bash
# Kill Process บน Port 3000
lsof -ti:3000 | xargs kill -9

# หรือใช้ Port อื่น
npm run dev -- -p 3001
```

---

## 📖 เอกสารเพิ่มเติม

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - React concepts and patterns
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction) - Authentication setup
- [MongoDB Documentation](https://www.mongodb.com/docs/) - MongoDB guides
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html) - Mongoose ODM
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/) - Bootstrap components
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript language

### Tutorials & Resources
- [Next.js Learn Course](https://nextjs.org/learn) - Interactive Next.js tutorial
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - TypeScript with React

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [React Community](https://react.dev/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

## 🎓 โครงสร้างการเรียนการสอน

โปรเจคนี้เหมาะสำหรับใช้ในการเรียนการสอนวิชา:
- **Web Application Development**
- **Full-Stack Development**
- **Database Management Systems**
- **Authentication & Security**
- **Modern JavaScript Frameworks**

### เนื้อหาที่ครอบคลุม
1. Frontend Development (React + Next.js)
2. Backend Development (API Routes)
3. Database Integration (MongoDB + Mongoose)
4. Authentication & Authorization (NextAuth.js)
5. UI/UX Design (Bootstrap + Responsive Design)
6. TypeScript Type Safety
7. Git Version Control
8. Cloud Deployment (Vercel)

---

## 👨‍💻 ผู้พัฒนา

**ผู้ช่วยศาสตราจารย์พิศาล สุขขี**
สาขาวิชาวิทยาการคอมพิวเตอร์
คณะวิทยาศาสตร์และเทคโนโลยี
มหาวิทยาลัยราชภัฏศรีสะเกษ

📧 **Email:** phisan.s@sskru.ac.th
🌐 **Website:** [sskru.ac.th](https://www.sskru.ac.th)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🙏 Acknowledgments

- Next.js Team สำหรับ Framework ที่ยอดเยี่ยม
- Vercel สำหรับ Hosting Platform ฟรี
- MongoDB สำหรับ Database Solution
- Bootstrap Team สำหรับ UI Framework
- NextAuth.js Team สำหรับ Authentication Library
- Open Source Community ทุกท่าน

---

## 📝 Changelog

### Version 0.1.0 (Current)
- ✅ Initial Release
- ✅ NextAuth Authentication System
- ✅ User Management CRUD
- ✅ Admin Dashboard
- ✅ Role-Based Access Control
- ✅ Responsive UI with Bootstrap 5
- ✅ MongoDB Integration
- ✅ SweetAlert2 Notifications

### Planned Features (Roadmap)
- 🔲 Product Management System
- 🔲 Order Management System
- 🔲 Email Verification
- 🔲 Password Reset Feature
- 🔲 User Profile Management
- 🔲 Image Upload (Cloudinary)
- 🔲 Dark Mode Toggle
- 🔲 Multi-language Support (i18n)
- 🔲 Analytics Dashboard
- 🔲 Export Data (CSV/Excel)

---

## 💡 Tips & Best Practices

### Security
- ✅ ใช้ Environment Variables สำหรับ Secrets
- ✅ Hash Passwords ก่อนเก็บ Database
- ✅ Validate Input ทุกครั้ง
- ✅ ใช้ HTTPS ใน Production
- ✅ ตั้งค่า CORS อย่างถูกต้อง

### Performance
- ✅ ใช้ Server Components เมื่อเป็นไปได้
- ✅ Lazy Load Components
- ✅ Optimize Images
- ✅ Cache Database Connections
- ✅ Minimize Bundle Size

### Code Quality
- ✅ ใช้ TypeScript สำหรับ Type Safety
- ✅ เขียน Clean Code
- ✅ Comment Code ที่ซับซ้อน
- ✅ ใช้ ESLint และ Prettier
- ✅ เขียน Meaningful Commit Messages

---

<div align="center">

**Made with ❤️ by Phisan Sukkhi**

⭐ ถ้าโปรเจคนี้มีประโยชน์ กรุณา Star ให้ด้วยนะครับ!

</div>
