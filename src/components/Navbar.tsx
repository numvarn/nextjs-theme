"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
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
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/signup")}`}
                href="/signup"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
