import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// PUT - อัพเดทข้อมูลผู้ใช้ (เฉพาะ admin)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    // ตรวจสอบว่าเป็น admin หรือไม่
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'ไม่มีสิทธิ์เข้าถึง' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, password, role } = body;
    const { id: userId } = await params;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !email) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'รูปแบบอีเมลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    await dbConnect();

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้นี้' },
        { status: 404 }
      );
    }

    // ตรวจสอบว่าอีเมลซ้ำกับผู้อื่นหรือไม่
    const existingUser = await User.findOne({
      email,
      _id: { $ne: userId },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้แล้ว' },
        { status: 400 }
      );
    }

    // เตรียมข้อมูลที่จะอัพเดท
    const updateData: {
      name: string;
      email: string;
      role: string;
      password?: string;
    } = {
      name,
      email,
      role: role || user.role,
    };

    // ถ้ามีการเปลี่ยนรหัสผ่าน
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // อัพเดทข้อมูล
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'อัพเดทข้อมูลสำเร็จ',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล' },
      { status: 500 }
    );
  }
}

// DELETE - ลบผู้ใช้ (เฉพาะ admin)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    // ตรวจสอบว่าเป็น admin หรือไม่
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'ไม่มีสิทธิ์เข้าถึง' },
        { status: 403 }
      );
    }

    const { id: userId } = await params;

    await dbConnect();

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'ไม่พบผู้ใช้นี้' },
        { status: 404 }
      );
    }

    // ป้องกันไม่ให้ลบตัวเอง
    if (session.user.id === userId) {
      return NextResponse.json(
        { error: 'ไม่สามารถลบบัญชีของตัวเองได้' },
        { status: 400 }
      );
    }

    // ลบผู้ใช้
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: 'ลบผู้ใช้สำเร็จ',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการลบผู้ใช้' },
      { status: 500 }
    );
  }
}
