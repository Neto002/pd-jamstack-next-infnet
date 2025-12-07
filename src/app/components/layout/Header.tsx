"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gray-800 py-4">
      <nav className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-2xl font-bold no-underline hover:opacity-80"
        >
          AutoStore
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="text-white no-underline hover:underline">
            Home
          </Link>
          <Link
            href="/carros"
            className="text-white no-underline hover:underline"
          >
            Carros
          </Link>
          <Link
            href="/sobre"
            className="text-white no-underline hover:underline"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="text-white no-underline hover:underline"
          >
            Contato
          </Link>
          <Link
            href="/login"
            className="text-white no-underline hover:underline"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className="text-white no-underline hover:underline"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/carros"
              className="text-white no-underline hover:underline"
              onClick={() => setOpen(false)}
            >
              Carros
            </Link>
            <Link
              href="/sobre"
              className="text-white no-underline hover:underline"
              onClick={() => setOpen(false)}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="text-white no-underline hover:underline"
              onClick={() => setOpen(false)}
            >
              Contato
            </Link>
            <Link
              href="/login"
              className="text-white no-underline hover:underline"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
