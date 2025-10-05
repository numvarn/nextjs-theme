'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'staff' | 'admin';
  createdAt: string;
}

export default function UsersManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'staff' | 'admin',
  });

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setLoading(false);
    }
  };

  // Open modal for adding user
  const handleAddUser = () => {
    setModalMode('add');
    setCurrentUser(null);
    setFormData({ name: '', email: '', password: '', role: 'user' });
    setShowModal(true);
  };

  // Open modal for editing user
  const handleEditUser = (user: User) => {
    setModalMode('edit');
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
    setShowModal(true);
  };

  // Submit form (add or edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const url = modalMode === 'add' ? '/api/users' : `/api/users/${currentUser?._id}`;
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const body: {
        name: string;
        email: string;
        role: string;
        password?: string;
      } = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      // Only include password if provided
      if (formData.password) {
        body.password = formData.password;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(false);
        fetchUsers();
        await Swal.fire({
          icon: 'success',
          title: 'สำเร็จ!',
          text: modalMode === 'add' ? 'เพิ่มผู้ใช้สำเร็จ' : 'อัพเดทข้อมูลสำเร็จ',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string, userName: string) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ',
      text: `คุณต้องการลบผู้ใช้ "${userName}" ใช่หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        fetchUsers();
        await Swal.fire({
          icon: 'success',
          title: 'ลบสำเร็จ!',
          text: 'ลบผู้ใช้สำเร็จ',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setError(data.error || 'ไม่สามารถลบผู้ใช้ได้');
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="bi bi-people-fill me-2"></i>
                จัดการผู้ใช้งาน
              </h2>
              <button
                className="btn btn-light"
                onClick={handleAddUser}
              >
                <i className="bi bi-plus-circle me-2"></i>
                เพิ่มผู้ใช้
              </button>
            </div>
            <div className="card-body">
              <button
                className="btn btn-secondary mb-3"
                onClick={() => router.push('/dashboard')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                กลับหน้า Dashboard
              </button>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">กำลังโหลด...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>ชื่อ</th>
                        <th>อีเมล</th>
                        <th>Role</th>
                        <th>วันที่สร้าง</th>
                        <th className="text-center" style={{ width: '200px' }}>
                          จัดการ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center text-muted py-4">
                            ไม่พบข้อมูลผู้ใช้
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <span
                                className={`badge ${
                                  user.role === 'admin'
                                    ? 'bg-danger'
                                    : user.role === 'staff'
                                    ? 'bg-warning'
                                    : 'bg-secondary'
                                }`}
                              >
                                {user.role === 'admin'
                                  ? 'Admin'
                                  : user.role === 'staff'
                                  ? 'Staff'
                                  : 'User'}
                              </span>
                            </td>
                            <td>
                              {new Date(user.createdAt).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEditUser(user)}
                              >
                                <i className="bi bi-pencil-square"></i> แก้ไข
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteUser(user._id, user.name)}
                              >
                                <i className="bi bi-trash"></i> ลบ
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit User */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === 'add' ? 'เพิ่มผู้ใช้ใหม่' : 'แก้ไขข้อมูลผู้ใช้'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">ชื่อ</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">อีเมล</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      รหัสผ่าน {modalMode === 'edit' && '(เว้นว่างหากไม่ต้องการเปลี่ยน)'}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required={modalMode === 'add'}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as 'user' | 'staff' | 'admin',
                        })
                      }
                      required
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === 'add' ? 'เพิ่มผู้ใช้' : 'บันทึกการแก้ไข'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
