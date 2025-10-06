# 🚀 Next.js Full-Stack E-Commerce Application with Admin Dashboard

โปรเจค Web Application แบบ Full-Stack ที่พัฒนาด้วย Next.js 15, MongoDB, NextAuth และ Bootstrap 5 พร้อมระบบ Authentication, Authorization, Product Management และ Google Cloud Storage Integration

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
- [Google Cloud Storage](#google-cloud-storage)
- [การพัฒนาเพิ่มเติม](#การพัฒนาเพิ่มเติม)
- [Deploy บน Vercel](#deploy-บน-vercel)
- [คำแนะนำการใช้งาน](#คำแนะนำการใช้งาน)
- [Troubleshooting](#troubleshooting)
- [เอกสารเพิ่มเติม](#เอกสารเพิ่มเติม)
- [ผู้พัฒนา](#ผู้พัฒนา)
- [License](#license)

---

## 🎯 ภาพรวมโปรเจค

โปรเจคนี้เป็น Full-Stack E-Commerce Web Application ที่มีระบบจัดการสินค้าและผู้ใช้งานครบวงจร ประกอบด้วย:

- **Frontend**: Next.js 15 + React 19 + Bootstrap 5 + TypeScript
- **Backend**: Next.js API Routes + MongoDB + Mongoose
- **Authentication**: NextAuth.js v4 with JWT Strategy + Google OAuth
- **File Storage**: Google Cloud Storage for product images
- **UI Components**: Bootstrap 5.3.8 + Bootstrap Icons + SweetAlert2
- **Middleware**: Route Protection & Role-Based Access Control

โปรเจคนี้เหมาะสำหรับการพัฒนาต่อยอดเป็น:
- ระบบร้านค้าออนไลน์ (E-commerce Platform)
- ระบบจัดการเนื้อหา (CMS)
- ระบบจัดการองค์กร (Enterprise Application)
- แพลตฟอร์มแสดงสินค้า (Product Showcase)

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
- **[@google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage)** - Google Cloud Storage SDK

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code Linting
- **[Turbopack](https://turbo.build/pack)** - Fast Bundler
- **[@eslint/eslintrc](https://www.npmjs.com/package/@eslint/eslintrc)** - ESLint Configuration

---

## ✨ คุณสมบัติหลัก

### 🔐 ระบบ Authentication & Authorization
- ✅ ลงทะเบียนผู้ใช้ใหม่ (Sign Up) พร้อม Email Validation
- ✅ เข้าสู่ระบบ (Login) ด้วย Email & Password
- ✅ **เข้าสู่ระบบด้วย Google Account (OAuth)**
- ✅ **ลงทะเบียนด้วย Google Account (OAuth)**
- ✅ ออกจากระบบ (Logout) ด้วย NextAuth
- ✅ Session Management ด้วย JWT Strategy
- ✅ Password Hashing ด้วย bcryptjs (10 salt rounds)
- ✅ Role-Based Access Control (Admin, Staff, User)
- ✅ Protected Routes ด้วย Middleware
- ✅ Auto-redirect หากไม่มีสิทธิ์เข้าถึง
- ✅ OAuth Error Handling และแสดงข้อความเป็นภาษาไทย

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

### 📦 ระบบจัดการสินค้า (Product Management)
- ✅ **CRUD Operations สำหรับสินค้า**
  - เพิ่มสินค้าใหม่พร้อมรูปภาพ
  - แสดงรายการสินค้าทั้งหมด
  - แก้ไขข้อมูลสินค้า
  - ลบสินค้าพร้อมรูปภาพใน Google Cloud Storage
- ✅ **Upload รูปภาพสินค้าไป Google Cloud Storage**
  - รองรับสูงสุด 3 รูปต่อสินค้า
  - แสดง Preview รูปภาพก่อน Upload
  - ลบรูปภาพเดิมได้
- ✅ **Product Fields**
  - ชื่อสินค้า, ราคา, หมวดหมู่
  - รายละเอียดสินค้า, จำนวนคงเหลือ
  - รูปภาพสินค้า (ไม่เกิน 3 รูป)
- ✅ Admin Only Access
- ✅ Image Management with Google Cloud Storage
- ✅ Form Validation & Error Handling

### 🛍️ หน้าแสดงสินค้าสำหรับลูกค้า
- ✅ **หน้ารายการสินค้า (Products Listing)**
  - แสดงสินค้าทั้งหมดในรูปแบบ Grid
  - กรองตามหมวดหมู่ (Category Filter)
  - แสดงรูปภาพ, ชื่อ, ราคา, จำนวนคงเหลือ
  - Badge สถานะสินค้า (หมด, เหลือน้อย, พร้อมจำหน่าย)
  - Hover Effects สวยงาม
  - Responsive Design
- ✅ **หน้ารายละเอียดสินค้า (Product Detail)**
  - Image Slideshow สำหรับรูปภาพสินค้า (สูงสุด 3 รูป)
  - ปุ่มลูกศรซ้าย-ขวาเปลี่ยนภาพ
  - Thumbnail Navigation
  - ตัวนับภาพ (1/3)
  - แสดงรายละเอียดครบถ้วน
  - ปุ่มเพิ่มลงตะกร้า (disabled เมื่อสินค้าหมด)
  - Breadcrumb Navigation
  - ปุ่มกลับหน้ารายการสินค้า

### 📊 Admin Dashboard
- ✅ หน้า Dashboard สำหรับ Admin เท่านั้น
- ✅ แสดงสถิติ (Total Users, Products, Orders)
- ✅ Quick Actions Menu
  - จัดการผู้ใช้งาน
  - **จัดการสินค้า**
  - ตั้งค่าระบบ
- ✅ ตารางกิจกรรมล่าสุด (Recent Activity)
- ✅ Responsive Cards & Charts
- ✅ Bootstrap Icons Integration

### 🎨 UI/UX Features
- ✅ **Responsive Design** - รองรับทุกขนาดหน้าจอ
- ✅ **Dark Theme Navbar** - สวยงามและทันสมัย
- ✅ **Offcanvas Menu** - เมนูแบบเลื่อนออกบนมือถือ
- ✅ **Active Link Highlighting** - แสดง Active State อัตโนมัติ
- ✅ **Loading Spinners** - แสดง Loading State
- ✅ **Toast Notifications** - แจ้งเตือนสำเร็จ/ผิดพลาด (SweetAlert2)
- ✅ **Form Validation** - ตรวจสอบข้อมูลก่อน Submit
- ✅ **Error Messages** - แสดงข้อความ Error ที่ชัดเจนเป็นภาษาไทย
- ✅ **Image Slideshow** - แสดงรูปภาพแบบ Carousel
- ✅ **Hover Effects** - Animation เมื่อเมาส์ชี้

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
nextJS-theme/
├── src/
│   ├── app/                          # App Router (Next.js 15)
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts     # NextAuth Configuration (Credentials + Google)
│   │   │   │   └── signup/
│   │   │   │       └── route.ts     # Sign Up API
│   │   │   ├── products/
│   │   │   │   ├── route.ts         # GET all products, POST new product
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts     # GET, PUT, DELETE product by ID
│   │   │   ├── upload/
│   │   │   │   └── route.ts         # Upload images to Google Cloud Storage
│   │   │   └── users/
│   │   │       ├── route.ts         # GET all users, POST new user
│   │   │       └── [id]/
│   │   │           └── route.ts     # GET, PUT, DELETE user by ID
│   │   │
│   │   ├── dashboard/               # Admin Dashboard (Protected)
│   │   │   ├── page.tsx            # Dashboard Home
│   │   │   ├── products/
│   │   │   │   └── page.tsx        # Product Management Page
│   │   │   └── users/
│   │   │       └── page.tsx        # User Management Page
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx            # Login Page (Credentials + Google OAuth)
│   │   │
│   │   ├── signup/
│   │   │   └── page.tsx            # Sign Up Page (Credentials + Google OAuth)
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx            # Products Listing Page
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Product Detail Page with Slideshow
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx            # About Page
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact Page
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
│   │   ├── auth.ts                 # Auth Helper Functions
│   │   ├── mongodb.ts              # MongoDB Connection (with caching)
│   │   └── gcs.ts                  # Google Cloud Storage Utilities
│   │
│   ├── models/                     # Mongoose Models
│   │   ├── User.ts                 # User Model (Schema + Methods)
│   │   └── Product.ts              # Product Model (Schema + Validation)
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
- Google Cloud Platform Account (สำหรับ Google Cloud Storage)

### ขั้นตอนการติดตั้ง

#### 1. Clone Repository
```bash
git clone <your-repository-url>
cd nextJS-theme
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

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Google Cloud Storage Configuration
GCS_PROJECT_ID=your_project_id
GCS_BUCKET_NAME=your_bucket_name
GCS_CLIENT_EMAIL=your_service_account_email
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
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
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Google OAuth Configuration (สำหรับ Google Login/Signup)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Google Cloud Storage Configuration
GCS_PROJECT_ID=your-project-id
GCS_BUCKET_NAME=your-bucket-name
GCS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
```

### วิธีการตั้งค่า Google OAuth

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจกต์ใหม่หรือเลือกโปรเจกต์ที่มีอยู่
3. เปิดใช้งาน Google+ API
4. ไปที่ Credentials → Create Credentials → OAuth 2.0 Client ID
5. เลือก Application Type: Web Application
6. เพิ่ม Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (Development)
   - `https://your-domain.com/api/auth/callback/google` (Production)
7. คัดลอก Client ID และ Client Secret

### วิธีการตั้งค่า Google Cloud Storage

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้าง Storage Bucket
3. สร้าง Service Account:
   - IAM & Admin → Service Accounts → Create Service Account
   - ให้สิทธิ์ Storage Admin
4. สร้าง JSON Key และคัดลอกข้อมูล:
   - `project_id` → `GCS_PROJECT_ID`
   - `client_email` → `GCS_CLIENT_EMAIL`
   - `private_key` → `GCS_PRIVATE_KEY`
5. Bucket Name → `GCS_BUCKET_NAME`

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

#### 3. Google OAuth Login
```
GET /api/auth/signin/google

Redirects to Google OAuth consent screen
```

### Product Management APIs (Admin Only)

#### 1. Get All Products
```
GET /api/products

Response:
{
  "products": [
    {
      "_id": "...",
      "name": "Product Name",
      "price": 1000,
      "category": "Electronics",
      "description": "Product description",
      "quantity": 50,
      "images": ["https://storage.googleapis.com/..."],
      "createdAt": "2025-10-06T...",
      "updatedAt": "2025-10-06T..."
    }
  ]
}
```

#### 2. Create Product
```
POST /api/products
Content-Type: application/json
Authorization: Required (Admin)

Body:
{
  "name": "New Product",
  "price": 1500,
  "category": "Electronics",
  "description": "Product description",
  "quantity": 100,
  "images": ["https://storage.googleapis.com/..."]
}

Response:
{
  "product": { ... }
}
```

#### 3. Update Product
```
PUT /api/products/[id]
Content-Type: application/json
Authorization: Required (Admin)

Body:
{
  "name": "Updated Product",
  "price": 2000,
  "category": "Electronics",
  "description": "Updated description",
  "quantity": 75,
  "images": ["https://storage.googleapis.com/..."]
}

Response:
{
  "product": { ... }
}
```

#### 4. Delete Product
```
DELETE /api/products/[id]
Authorization: Required (Admin)

Response:
{
  "message": "Product deleted successfully"
}
```

### File Upload API

#### Upload Images to Google Cloud Storage
```
POST /api/upload
Content-Type: multipart/form-data
Authorization: Required (Admin)

Body (FormData):
files: [File, File, File] // สูงสุด 3 ไฟล์

Response:
{
  "urls": [
    "https://storage.googleapis.com/bucket/products/1234_image1.jpg",
    "https://storage.googleapis.com/bucket/products/1234_image2.jpg"
  ]
}
```

### User Management APIs (Admin Only)

#### 1. Get All Users
```
GET /api/users
Authorization: Required (Admin)

Response:
{
  "users": [ ... ]
}
```

#### 2. Create User
```
POST /api/users
Authorization: Required (Admin)

Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "staff"
}
```

#### 3. Update User
```
PUT /api/users/[id]
Authorization: Required (Admin)

Body:
{
  "name": "Updated Name",
  "role": "admin"
}
```

#### 4. Delete User
```
DELETE /api/users/[id]
Authorization: Required (Admin)
```

---

## 🔐 ระบบ Authentication

### NextAuth.js Configuration

โปรเจคใช้ NextAuth.js v4 สำหรับจัดการ Authentication

**Features:**
- ✅ Credentials Provider (Email + Password)
- ✅ Google OAuth Provider
- ✅ JWT Strategy for Session Management
- ✅ Custom Callbacks for Token & Session
- ✅ Custom Sign In/Sign Up Pages
- ✅ Password Hashing with bcryptjs
- ✅ OAuth Error Handling

### Authentication Flow

#### Credentials Login
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

#### Google OAuth Login
```
1. User คลิก "เข้าสู่ระบบด้วย Google"
   ↓
2. Redirect ไป Google OAuth Consent Screen
   ↓
3. User อนุญาตสิทธิ์
   ↓
4. Google redirect กลับพร้อม Authorization Code
   ↓
5. NextAuth แลก Code เป็น Access Token
   ↓
6. ดึงข้อมูล Profile จาก Google
   ↓
7. สร้างหรืออัพเดต User ใน Database
   ↓
8. สร้าง Session และ JWT Token
```

### ไฟล์ที่เกี่ยวข้อง

- **`src/app/api/auth/[...nextauth]/route.ts`** - NextAuth Configuration
- **`src/app/login/page.tsx`** - Login Page
- **`src/app/signup/page.tsx`** - Sign Up Page
- **`src/lib/auth.ts`** - Auth Helper Functions
- **`src/components/SessionProvider.tsx`** - Session Provider Wrapper

---

## 🛡️ ระบบ Authorization

### Role-Based Access Control

โปรเจคมี 3 Roles:
- **Admin** - เข้าถึงได้ทุก Feature (Dashboard, User Management, Product Management)
- **Staff** - เข้าถึง Feature บางอย่าง (ขึ้นอยู่กับการกำหนดสิทธิ์)
- **User** - เข้าถึง Feature พื้นฐาน

### Protected Routes

- **`/dashboard`** - Admin only
- **`/dashboard/users`** - Admin only
- **`/dashboard/products`** - Admin only
- **`/api/products`** (POST, PUT, DELETE) - Admin only
- **`/api/upload`** - Admin only
- **`/api/users`** - Admin only

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
  provider: String (optional - 'google' for OAuth users)
  providerId: String (optional - Google User ID)
  createdAt: Date (default: now)
}
```

### Product Model

**ไฟล์:** `src/models/Product.ts`

**Schema:**
```typescript
{
  name: String (required)
  price: Number (required, min: 0)
  category: String (required)
  description: String (required)
  quantity: Number (required, min: 0, default: 0)
  images: [String] (max 3 images, URLs from Google Cloud Storage)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

---

## ☁️ Google Cloud Storage

### Configuration

โปรเจคใช้ Google Cloud Storage สำหรับเก็บรูปภาพสินค้า

**ไฟล์:** `src/lib/gcs.ts`

**Functions:**
- `uploadToGCS(file, fileName, folder)` - อัพโหลดไฟล์
- `deleteFromGCS(fileUrl)` - ลบไฟล์
- `deleteMultipleFromGCS(fileUrls)` - ลบหลายไฟล์พร้อมกัน

### การใช้งาน

```typescript
import { uploadToGCS } from '@/lib/gcs';

// Upload image
const buffer = Buffer.from(await file.arrayBuffer());
const url = await uploadToGCS(buffer, 'product-image.jpg', 'products');

// url = https://storage.googleapis.com/bucket-name/products/1234567890_product-image.jpg
```

### Features
- ✅ Auto-generate unique filenames (timestamp-based)
- ✅ Public URL generation
- ✅ Automatic file cleanup on product deletion
- ✅ Support for multiple file formats
- ✅ Error handling

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

4. เพิ่มลิงก์ใน Navbar

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

```typescript
// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ orders: [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ message: 'Created' });
}
```

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
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GCS_PROJECT_ID=<your-project-id>
GCS_BUCKET_NAME=<your-bucket-name>
GCS_CLIENT_EMAIL=<your-service-account-email>
GCS_PRIVATE_KEY=<your-private-key>
```

#### 4. Deploy

1. คลิก **"Deploy"**
2. รอให้ Vercel Build & Deploy เสร็จ (2-3 นาที)
3. เข้าถึงเว็บไซต์ผ่าน URL ที่ Vercel สร้างให้

---

## 📚 คำแนะนำการใช้งาน

### สำหรับผู้ใช้งานทั่วไป

1. **ลงทะเบียน**
   - เลือกลงทะเบียนด้วย Email หรือ Google Account
   - กรอกข้อมูลที่จำเป็น

2. **ดูรายการสินค้า**
   - คลิกเมนู "สินค้า"
   - เลือกหมวดหมู่ที่สนใจ
   - คลิกที่สินค้าเพื่อดูรายละเอียด

3. **ดูรายละเอียดสินค้า**
   - ดูรูปภาพแบบ Slideshow
   - อ่านรายละเอียดและราคา
   - เช็คสต็อกสินค้า

### สำหรับ Admin

1. **เข้าสู่ระบบด้วย Admin Account**

2. **จัดการสินค้า**
   - ไปที่ Dashboard → จัดการสินค้า
   - เพิ่มสินค้าใหม่พร้อมรูปภาพ (สูงสุด 3 รูป)
   - แก้ไขข้อมูลสินค้า
   - ลบสินค้า (รูปภาพจะถูกลบจาก Google Cloud Storage อัตโนมัติ)

3. **จัดการผู้ใช้**
   - ไปที่ Dashboard → จัดการผู้ใช้งาน
   - เพิ่ม/แก้ไข/ลบผู้ใช้
   - เปลี่ยน Role ของผู้ใช้

---

## 🐛 Troubleshooting

### Google Cloud Storage Errors

**ปัญหา:** Cannot upload images

**Solution:**
1. ตรวจสอบ Service Account Credentials
2. ตรวจสอบ Bucket permissions
3. ตรวจสอบ `GCS_PRIVATE_KEY` format (ต้องมี `\n`)

### Google OAuth Errors

**ปัญหา:** OAuth signin error

**Solution:**
1. ตรวจสอบ Authorized redirect URIs ใน Google Console
2. ตรวจสอบ `GOOGLE_CLIENT_ID` และ `GOOGLE_CLIENT_SECRET`
3. ตรวจสอบ `NEXTAUTH_URL` ให้ตรงกับ domain จริง

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

---

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ NextAuth Authentication System (Credentials + Google OAuth)
- ✅ User Management CRUD
- ✅ **Product Management System with Image Upload**
- ✅ **Google Cloud Storage Integration**
- ✅ **Products Listing Page with Category Filter**
- ✅ **Product Detail Page with Image Slideshow**
- ✅ Admin Dashboard
- ✅ Role-Based Access Control
- ✅ Responsive UI with Bootstrap 5
- ✅ MongoDB Integration
- ✅ SweetAlert2 Notifications
- ✅ Google OAuth Login/Signup
- ✅ Thai Language Support

---

<div align="center">

**Made with ❤️ by Phisan Sukkhi**

⭐ ถ้าโปรเจคนี้มีประโยชน์ กรุณา Star ให้ด้วยนะครับ!

</div>
