import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getSession();

  // Check if user is authenticated
  if (!session) {
    redirect('/login');
  }

  // Check if user has admin role
  if (session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-danger text-white">
              <h2 className="mb-0">
                <i className="bi bi-speedometer2 me-2"></i>
                Admin Dashboard
              </h2>
            </div>
            <div className="card-body">
              <div className="alert alert-success mb-4" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                ยินดีต้อนรับ, <strong>{session.user.name}</strong>! คุณได้เข้าสู่ระบบในฐานะ Admin
              </div>

              <div className="row g-4">
                {/* Statistics Cards */}
                <div className="col-md-4">
                  <div className="card text-white bg-primary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title text-uppercase mb-0">Total Users</h6>
                          <h2 className="mb-0">150</h2>
                        </div>
                        <div className="fs-1">
                          <i className="bi bi-people-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-white bg-success">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title text-uppercase mb-0">Products</h6>
                          <h2 className="mb-0">48</h2>
                        </div>
                        <div className="fs-1">
                          <i className="bi bi-box-seam-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-white bg-warning">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title text-uppercase mb-0">Orders</h6>
                          <h2 className="mb-0">23</h2>
                        </div>
                        <div className="fs-1">
                          <i className="bi bi-cart-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="row mt-4">
                <div className="col-12">
                  <h4 className="mb-3">Quick Actions</h4>
                  <div className="list-group">
                    <a href="/dashboard/users" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                          <i className="bi bi-person-fill me-2 text-primary"></i>
                          <strong>จัดการผู้ใช้งาน</strong>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                      </div>
                      <p className="mb-1 text-muted small">เพิ่ม แก้ไข หรือลบผู้ใช้งานในระบบ</p>
                    </a>
                    <a href="/dashboard/products" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                          <i className="bi bi-box-seam me-2 text-success"></i>
                          <strong>จัดการสินค้า</strong>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                      </div>
                      <p className="mb-1 text-muted small">เพิ่มสินค้าใหม่ หรือแก้ไขข้อมูลสินค้า</p>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between align-items-center">
                        <div>
                          <i className="bi bi-gear-fill me-2 text-warning"></i>
                          <strong>ตั้งค่าระบบ</strong>
                        </div>
                        <i className="bi bi-chevron-right"></i>
                      </div>
                      <p className="mb-1 text-muted small">กำหนดค่าต่างๆ ของระบบ</p>
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="row mt-4">
                <div className="col-12">
                  <h4 className="mb-3">กิจกรรมล่าสุด</h4>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>เวลา</th>
                          <th>ผู้ใช้</th>
                          <th>กิจกรรม</th>
                          <th>สถานะ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>10:30 AM</td>
                          <td>John Doe</td>
                          <td>เพิ่มสินค้าใหม่</td>
                          <td><span className="badge bg-success">สำเร็จ</span></td>
                        </tr>
                        <tr>
                          <td>09:15 AM</td>
                          <td>Jane Smith</td>
                          <td>แก้ไขข้อมูลผู้ใช้</td>
                          <td><span className="badge bg-success">สำเร็จ</span></td>
                        </tr>
                        <tr>
                          <td>08:45 AM</td>
                          <td>Admin</td>
                          <td>ลบสินค้า</td>
                          <td><span className="badge bg-danger">ลบ</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
