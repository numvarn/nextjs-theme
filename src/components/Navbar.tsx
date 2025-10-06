"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement && typeof window !== 'undefined') {
      const bootstrap = (window as typeof window & { bootstrap?: { Offcanvas?: { getInstance: (element: HTMLElement) => { hide: () => void } | null } } }).bootstrap;
      const bsOffcanvas = bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'badge bg-danger';
      case 'staff':
        return 'badge bg-warning text-dark';
      case 'user':
        return 'badge bg-secondary';
      default:
        return 'badge bg-secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" suppressHydrationWarning>
      <div className="container">
        <Link className="navbar-brand" href="/">
          My Next.js App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end bg-dark" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
          <ul className="navbar-nav me-auto" suppressHydrationWarning>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/")}`}
                href="/"
                onClick={closeOffcanvas}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/products")}`}
                href="/products"
                onClick={closeOffcanvas}
              >
                {/* <i className="bi bi-bag me-1"></i> */}
                products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about")}`}
                href="/about"
                onClick={closeOffcanvas}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact")}`}
                href="/contact"
                onClick={closeOffcanvas}
              >
                Contact
              </Link>
            </li>
            {session?.user?.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/dashboard")}`}
                  href="/dashboard"
                  onClick={closeOffcanvas}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto" suppressHydrationWarning>
            {status === "loading" ? (
              <li className="nav-item">
                <span className="nav-link">Loading...</span>
              </li>
            ) : session ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light d-flex align-items-center gap-2">
                    Welcome, {session.user?.name}
                    {session.user?.role && (
                      <span className={getRoleBadgeClass(session.user.role)}>
                        {getRoleLabel(session.user.role)}
                      </span>
                    )}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/login")}`}
                    href="/login"
                    onClick={closeOffcanvas}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/signup")}`}
                    href="/signup"
                    onClick={closeOffcanvas}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
