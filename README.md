# Next.js + Bootstrap 5 Template

โปรเจคเทมเพลตสำหรับการพัฒนาเว็บแอปพลิเคชันด้วย Next.js 15 และ Bootstrap 5 พร้อมโครงสร้างที่เป็นระเบียบและใช้งานง่าย

## 🚀 เทคโนโลยีที่ใช้

- **Next.js 15** - React Framework สำหรับการพัฒนาเว็บแอปพลิเคชัน
- **React 19** - JavaScript Library สำหรับสร้าง User Interface
- **Bootstrap 5** - CSS Framework สำหรับการออกแบบ Responsive
- **TypeScript** - JavaScript with Type Safety
- **Geist Font** - Modern Font Family

## 📁 โครงสร้างโปรเจค

```
my-app/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # หน้า About
│   │   ├── contact/
│   │   │   └── page.tsx          # หน้า Contact
│   │   ├── layout.tsx            # Root Layout (มี Navbar และ Footer)
│   │   ├── page.tsx              # หน้า Home
│   │   └── globals.css           # Global Styles
│   │
│   └── components/
│       ├── Navbar.tsx            # Navigation Bar Component
│       └── Footer.tsx            # Footer Component
│
├── public/                       # Static Files
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🎨 คุณสมบัติหลัก

### 1. **Layout System**
- ใช้ Root Layout (`layout.tsx`) สำหรับจัดการ Navbar และ Footer ให้แสดงผลทุกหน้าอัตโนมัติ
- แต่ละหน้าเพียงแค่เขียน content ส่วนกลางโดยไม่ต้องกังวลเรื่อง navigation

### 2. **Navigation Component**
- Navbar แบบ Responsive ที่รองรับการใช้งานบนมือถือ
- แสดง Active State อัตโนมัติตาม URL ปัจจุบัน
- ใช้ `usePathname()` จาก Next.js Navigation

### 3. **หน้าเพจต่างๆ**
- **Home (/)** - หน้าแรกแสดง Features และข้อมูลเบื้องต้น
- **About (/about)** - หน้าแนะนำองค์กร วิสัยทัศน์ และเทคโนโลยีที่ใช้
- **Contact (/contact)** - หน้าติดต่อพร้อมฟอร์มและข้อมูลการติดต่อ

### 4. **Bootstrap Integration**
- นำเข้า Bootstrap CSS และ JavaScript ผ่าน CDN
- ใช้งาน Bootstrap Components เช่น Navbar, Cards, Forms, Grid System
- Responsive Design ที่ทำงานได้ดีทุกขนาดหน้าจอ

## 🛠️ การติดตั้งและใช้งาน

### ติดตั้ง Dependencies

```bash
npm install
# หรือ
yarn install
# หรือ
pnpm install
```

### รันโปรเจคในโหมด Development

```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
```

เปิดเบราว์เซอร์และไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

### Build สำหรับ Production

```bash
npm run build
npm run start
```

## 📝 การพัฒนาเพิ่มเติม

### เพิ่มหน้าใหม่

1. สร้างโฟลเดอร์ใหม่ใน `src/app/` เช่น `services/`
2. สร้างไฟล์ `page.tsx` ในโฟลเดอร์นั้น
3. Export default function component
4. เพิ่มลิงก์ใน `Navbar.tsx` (ถ้าต้องการ)

ตัวอย่าง:
```tsx
// src/app/services/page.tsx
export default function Services() {
  return (
    <div className="container my-5">
      <h1>Our Services</h1>
      <p>Content here...</p>
    </div>
  );
}
```

### แก้ไข Navbar

แก้ไขไฟล์ `src/components/Navbar.tsx` เพื่อเพิ่มหรือลดเมนู

```tsx
<li className="nav-item">
  <Link className={`nav-link ${pathname === "/services" ? "active" : ""}`} href="/services">
    Services
  </Link>
</li>
```

### แก้ไข Footer

แก้ไขไฟล์ `src/components/Footer.tsx` เพื่อปรับเปลี่ยนเนื้อหา footer

## 🎓 เอกสารเพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

## 📧 ติดต่อและสนับสนุน

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถติดต่อได้ที่อีเมล์ด้านล่าง

---

## 👨‍💻 ผู้พัฒนา

**ผู้ช่วยศาสตราจารย์พิศาล สุขขี**
สาขาวิชาวิทยาการคอมพิวเตอร์
มหาวิทยาลัยราชภัฏศรีสะเกษ
📧 Email: phisan.s@sskru.ac.th

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
