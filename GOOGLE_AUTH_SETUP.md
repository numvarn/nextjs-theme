# 🚀 คู่มือการตั้งค่า Google OAuth Authentication

> **เป้าหมาย**: เปิดใช้งานการเข้าสู่ระบบด้วย Google Account สำหรับ Next.js Application

---

## 📋 Table of Contents

- [🔧 ขั้นตอนการตั้งค่า](#-ขั้นตอนการตั้งค่า)
- [🧪 การทดสอบระบบ](#-การทดสอบระบบ)
- [🔍 การแก้ไขปัญหา](#-การแก้ไขปัญหา)
- [✨ คุณสมบัติที่ใช้งานได้](#-คุณสมบัติที่ใช้งานได้)
- [🚀 Next Steps](#-next-steps)

---

## 🔧 ขั้นตอนการตั้งค่า

### **Step 1: 🏗️ สร้าง Google Cloud Project**

<details>
<summary>📖 คลิกเพื่อดูรายละเอียด</summary>

1. 🌐 ไปที่ [**Google Cloud Console**](https://console.cloud.google.com/)
2. 📁 **สร้างโปรเจกต์ใหม่** หรือเลือกโปรเจกต์ที่มีอยู่
3. ⚙️ เปิดใช้งาน **Google Identity API** หรือ **Google+ API**
   - ไปที่ "APIs & Services" > "Library"
   - ค้นหา "Google Identity" หรือ "Google+"
   - คลิก "Enable"

</details>

---

### **Step 2: 🔑 สร้าง OAuth 2.0 Client ID**

<details>
<summary>📖 คลิกเพื่อดูรายละเอียด</summary>

1. 🔐 ไปที่ **"APIs & Services"** > **"Credentials"**
2. ➕ คลิก **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
3. 🌐 เลือก **"Web application"**
4. 📝 ตั้งชื่อ Application (เช่น "My Next.js App")

#### **🔗 Authorized JavaScript Origins**
```
http://localhost:3000
http://localhost:3001
https://your-production-domain.com (ถ้ามี)
```

#### **↩️ Authorized Redirect URIs**
```
http://localhost:3000/api/auth/callback/google
http://localhost:3001/api/auth/callback/google
https://your-production-domain.com/api/auth/callback/google
```

> ⚠️ **สำคัญ**: ตรวจสอบให้แน่ใจว่า redirect URI ถูกต้องตาม port ที่ใช้งาน

</details>

---

### **Step 3: 📋 คัดลอก Client Credentials**

<details>
<summary>📖 คลิกเพื่อดูรายละเอียด</summary>

หลังจากสร้าง OAuth client ID สำเร็จ คุณจะได้รับ:

| Field | Description | Usage |
|-------|-------------|-------|
| 🆔 **Client ID** | รหัส ID สาธารณะ | ใช้สำหรับ `GOOGLE_CLIENT_ID` |
| 🔐 **Client Secret** | รหัสลับ | ใช้สำหรับ `GOOGLE_CLIENT_SECRET` |

> 🔒 **ข้อควรระวัง**: Client Secret เป็นข้อมูลลับ ห้ามเปิดเผยสาธารณะ

</details>

---

### **Step 4: ⚙️ อัปเดต Environment Variables**

<details>
<summary>📖 คลิกเพื่อดูรายละเอียด</summary>

📝 **แก้ไขไฟล์ `.env.local` ในโปรเจกต์:**

```bash
# 🗄️ Database Configuration
MONGODB_URI=mongodb+srv://web:numvarnSc28152456@cluster0.1nhwnyf.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0

# 🔐 NextAuth Configuration
NEXTAUTH_SECRET=5SDubzIncg4Ci4YvBbooUFp+tM+MCwV7/Lh5jBl40FM=
NEXTAUTH_URL=http://localhost:3001

# 🌐 Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
```

> 🔄 **แทนที่**: `your_actual_google_client_id_here` และ `your_actual_google_client_secret_here` ด้วยค่าจริงจาก Google Cloud Console

</details>

---

### **Step 5: 🔐 สร้าง NextAuth Secret (ทำแล้ว)**

<details>
<summary>📖 คลิกเพื่อดูรายละเอียด</summary>

✅ **NextAuth Secret ได้ถูกสร้างแล้ว**

หากต้องการสร้างใหม่:
```bash
openssl rand -base64 32
```

แล้วนำค่าที่ได้มาแทนที่ในไฟล์ `.env.local`

</details>

---

## 🧪 การทดสอบระบบ

### **🔄 Step 1: รันเซิร์ฟเวอร์**

```bash
npm run dev
```

### **🎯 Step 2: ทดสอบการกำหนดค่า**

1. 🌐 เปิด [`http://localhost:3001/auth/test`](http://localhost:3001/auth/test)
2. 📊 ตรวจสอบสถานะ:
   - ✅ Google Client ID ถูกกำหนดค่า
   - ✅ Database เชื่อมต่อสำเร็จ
   - ✅ NextAuth Secret ถูกต้อง

### **🔑 Step 3: ทดสอบ Google OAuth**

1. 🌐 ไปที่ [`http://localhost:3001/login`](http://localhost:3001/login)
2. 🖱️ คลิกปุ่ม **"เข้าสู่ระบบด้วย Google"**
3. 👤 ทำการเข้าสู่ระบบด้วย Google Account
4. ✅ ตรวจสอบว่าถูก redirect กลับมาที่หน้าแรก
5. 👁️ ตรวจสอบข้อมูล session ในหน้า `/auth/test`

### **🗄️ Step 4: ตรวจสอบฐานข้อมูล**

รันคำสั่งทดสอบฐานข้อมูล:
```bash
node scripts/test-db.js
```

ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล MongoDB:
- ✅ `email`: อีเมลจาก Google
- ✅ `name`: ชื่อจาก Google
- ✅ `provider`: "google"
- ✅ `providerId`: Google Account ID
- ✅ `role`: "user" (default)

---

## 🔍 การแก้ไขปัญหา

### **❌ ปัญหาที่อาจพบ**

<details>
<summary><b>1. Error: Configuration Error</b></summary>

**สาเหตุ**: ไม่ได้ตั้งค่า Google credentials

**วิธีแก้**:
- ✅ ตรวจสอบว่า `GOOGLE_CLIENT_ID` และ `GOOGLE_CLIENT_SECRET` ถูกตั้งค่าแล้ว
- ✅ ตรวจสอบว่า OAuth client ID ใน Google Cloud Console ถูกตั้งค่า redirect URIs ถูกต้อง

</details>

<details>
<summary><b>2. Error: OAuthSignin</b></summary>

**สาเหตุ**: ปัญหาในการเข้าสู่ระบบ Google

**วิธีแก้**:
- ✅ ตรวจสอบ redirect URI ใน Google Cloud Console
- ✅ ตรวจสอบว่า Google Identity API เปิดใช้งานแล้ว
- ✅ ลองใช้ Incognito/Private browsing mode

</details>

<details>
<summary><b>3. Error: OAuthCallback</b></summary>

**สาเหตุ**: ปัญหาในการรับ callback จาก Google

**วิธีแก้**:
- ✅ ตรวจสอบ `NEXTAUTH_URL` ใน .env.local
- ✅ ตรวจสอบ `NEXTAUTH_SECRET`
- ✅ ตรวจสอบว่า redirect URI ตรงกัน

</details>

<details>
<summary><b>4. ไม่สามารถบันทึกข้อมูลในฐานข้อมูล</b></summary>

**สาเหตุ**: ปัญหาการเชื่อมต่อฐานข้อมูล

**วิธีแก้**:
- ✅ ตรวจสอบการเชื่อมต่อ MongoDB
- ✅ รันคำสั่ง `node scripts/test-db.js`
- ✅ ตรวจสอบ User model schema

</details>

### **🔧 การตรวจสอบ Logs**

1. **Browser Console**: เปิด Developer Tools และดู Console logs
2. **Server Logs**: ตรวจสอบ terminal logs เพื่อดู error details
3. **Network Tab**: ดู network requests ใน Developer Tools

---

## ✨ คุณสมบัติที่ใช้งานได้

| Feature | Status | Description |
|---------|--------|-------------|
| 🔑 **Google Login** | ✅ | เข้าสู่ระบบด้วย Google Account |
| 👤 **Auto User Creation** | ✅ | สร้าง account อัตโนมัติสำหรับผู้ใช้ใหม่ |
| 🔗 **Account Linking** | ✅ | เชื่อมโยงกับ account ที่มีอยู่แล้ว |
| 🎫 **JWT Tokens** | ✅ | จัดการ session และ JWT tokens |
| 👮 **Role-based Access** | ✅ | ระบบจัดการสิทธิ์ตาม role |
| 🚪 **Logout** | ✅ | ออกจากระบบ |
| ⚠️ **Error Handling** | ✅ | จัดการ error และแสดงข้อความผู้ใช้ |
| 📱 **Responsive UI** | ✅ | หน้าจอที่ปรับตัวได้ |

---

## 🚀 Next Steps

### **📦 Production Deployment**

1. 🌐 อัปเดต `NEXTAUTH_URL` สำหรับ production environment
2. 🔧 เพิ่ม production domain ใน Google OAuth settings
3. 🗄️ ใช้ production MongoDB URI
4. ⚙️ ตั้งค่า environment variables ใน hosting platform

### **🔐 Security Enhancements**

1. 🛡️ เพิ่มการตรวจสอบเพิ่มเติมสำหรับ user roles
2. 📧 เพิ่มการยืนยันอีเมลสำหรับผู้ใช้ใหม่
3. 🔒 ตั้งค่า HTTPS สำหรับ production
4. 🎯 เพิ่มการจำกัดอัตราการเรียก API (rate limiting)

### **🎨 UI/UX Improvements**

1. ✨ ปรับปรุง UI design ตามต้องการ
2. 🌍 เพิ่มภาษาอื่น ๆ (i18n)
3. 📊 เพิ่มการติดตามการใช้งาน Google OAuth
4. 🔔 ระบบแจ้งเตือนสำหรับผู้ใช้

---

## 📖 เอกสารอ้างอิง

- 📚 [NextAuth.js Documentation](https://next-auth.js.org/)
- 🌐 [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- ⚛️ [Next.js Documentation](https://nextjs.org/docs)
- 🗄️ [MongoDB Documentation](https://docs.mongodb.com/)

---

## 💡 Tips & Best Practices

> **🔥 Pro Tips**:
> - ใช้ environment variables แยกสำหรับ development และ production
> - ตั้งค่า CORS policies ให้เหมาะสม
> - ใช้ HTTPS ใน production เสมอ
> - ทำ backup ฐานข้อมูลสม่ำเสมอ

---

## 📞 การติดต่อ & การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. 📋 ตรวจสอบ logs และ error messages
2. 🔍 ดูใน documentation ที่เกี่ยวข้อง
3. 🌐 ค้นหาปัญหาใน Stack Overflow
4. 💬 สอบถามในชุมชน developer

---

<div align="center">

**🎉 Google OAuth Authentication พร้อมใช้งาน! 🎉**

</div>