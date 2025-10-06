'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ClientInfo {
  hasGoogleClientId: boolean;
  environment: string;
}

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);

  useEffect(() => {
    // Check environment variables on client side
    setClientInfo({
      hasGoogleClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      environment: process.env.NODE_ENV,
    });
  }, []);

  if (status === 'loading') {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">กำลังโหลด...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>การทดสอบระบบยืนยันตัวตน (Authentication Test)</h3>
            </div>
            <div className="card-body">
              <h5>สถานะเซสชัน (Session Status)</h5>
              <p><strong>สถานะ:</strong> {status}</p>
              
              {session ? (
                <div className="mt-4">
                  <h5>ข้อมูลผู้ใช้ (User Information)</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td><strong>ชื่อ (Name):</strong></td>
                          <td>{session.user?.name || 'ไม่ระบุ'}</td>
                        </tr>
                        <tr>
                          <td><strong>อีเมล (Email):</strong></td>
                          <td>{session.user?.email || 'ไม่ระบุ'}</td>
                        </tr>
                        <tr>
                          <td><strong>รูปโปรไฟล์ (Image):</strong></td>
                          <td>
                            {session.user?.image ? (
                              <Image 
                                src={session.user.image} 
                                alt="Profile" 
                                width={50} 
                                height={50} 
                                style={{ borderRadius: '50%' }} 
                                className="rounded-circle"
                              />
                            ) : (
                              'ไม่มีรูปโปรไฟล์'
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>บทบาท (Role):</strong></td>
                          <td>{session.user && 'role' in session.user ? (session.user as { role: string }).role : 'ไม่ระบุ'}</td>
                        </tr>
                        <tr>
                          <td><strong>User ID:</strong></td>
                          <td>{session.user && 'id' in session.user ? (session.user as { id: string }).id : 'ไม่ระบุ'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning">
                  <strong>ไม่ได้เข้าสู่ระบบ</strong><br />
                  กรุณาเข้าสู่ระบบเพื่อดูข้อมูล
                </div>
              )}

              <div className="mt-4">
                <h5>ข้อมูลการกำหนดค่า (Configuration Info)</h5>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td><strong>Environment:</strong></td>
                        <td>{clientInfo?.environment || 'ไม่ทราบ'}</td>
                      </tr>
                      <tr>
                        <td><strong>Google Client ID Configured:</strong></td>
                        <td>{clientInfo?.hasGoogleClientId ? '✅ กำหนดค่าแล้ว' : '❌ ยังไม่ได้กำหนดค่า'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4">
                <h5>Raw Session Data (สำหรับ Debug)</h5>
                <pre className="bg-light p-3 rounded">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>

              <div className="mt-4">
                <Link href="/login" className="btn btn-primary me-2">ไปหน้า Login</Link>
                <Link href="/" className="btn btn-secondary">กลับหน้าแรก</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
