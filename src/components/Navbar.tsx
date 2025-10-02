"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" href="/">My Next.js App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${mounted && pathname === "/" ? "active" : ""}`} href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${mounted && pathname === "/create/product" ? "active" : ""}`} href="/create/product">Product</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${mounted && pathname === "/about" ? "active" : ""}`} href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${mounted && pathname === "/contact" ? "active" : ""}`} href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
