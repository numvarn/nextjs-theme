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
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto" suppressHydrationWarning>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/")}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/create/product")}`}
                href="/create/product"
              >
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/about")}`}
                href="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/contact")}`}
                href="/contact"
              >
                Contact
              </Link>
            </li>
            {session?.user?.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/dashboard")}`}
                  href="/dashboard"
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
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/signup")}`}
                    href="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
