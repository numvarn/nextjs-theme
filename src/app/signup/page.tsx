'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    // Check for OAuth error in URL params
    const oauthError = searchParams.get('error');
    if (oauthError) {
      switch (oauthError) {
        case 'OAuthSignin':
          setError('เกิดข้อผิดพลาดในการลงทะเบียนด้วย Google');
          break;
        case 'OAuthCallback':
          setError('เกิดข้อผิดพลาดในการรับข้อมูลจาก Google');
          break;
        case 'OAuthCreateAccount':
          setError('ไม่สามารถสร้างบัญชีด้วย Google ได้');
          break;
        case 'EmailCreateAccount':
          setError('ไม่สามารถสร้างบัญชีด้วยอีเมลนี้ได้');
          break;
        case 'Callback':
          setError('เกิดข้อผิดพลาดในการลงทะเบียน');
          break;
        default:
          setError('เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง');
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Redirect to login or home page
      await Swal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'ลงทะเบียนสำเร็จ กำลังนำไปยังหน้าหลัก...',
        timer: 2000,
        showConfirmButton: false,
      });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });

      if (result?.error) {
        setError('เกิดข้อผิดพลาดในการลงทะเบียนด้วย Google กรุณาลองใหม่อีกครั้ง');
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error('Google signup error:', error);
      setError('เกิดข้อผิดพลาดในการลงทะเบียนด้วย Google กรุณาลองใหม่อีกครั้ง');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Sign Up</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <button
                type="button"
                className="btn btn-lg btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-3 mb-5"
                onClick={handleGoogleSignup}
                disabled={loading || googleLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                {googleLoading ? 'กำลังลงทะเบียนด้วย Google...' : 'ลงทะเบียนด้วย Google'}
              </button>

              <div className="position-relative my-5">
                <hr />
                <span
                  className="position-absolute top-50 start-50 translate-middle bg-white px-4 text-muted"
                  style={{ fontSize: '0.875rem' }}
                >
                  OR
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <div className="form-text">
                    Password must be at least 6 characters
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link href="/login" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="container mt-5"><div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div></div>}>
      <SignupForm />
    </Suspense>
  );
}
