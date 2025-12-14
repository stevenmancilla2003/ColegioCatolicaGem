import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Inicial", path: "/inicial" },
    { label: "Primaria", path: "/primaria" },
    { label: "Secundaria", path: "/secundaria" },
    { label: "Vacacional", path: "/ciclo-vacacional" },
  ];

  const handleClose = () => setOpen(false);

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/95 backdrop-blur
        shadow-[0_10px_40px_rgba(15,23,42,0.08)]
      "
    >
      {/* CONTENEDOR */}
      <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3" onClick={handleClose}>
          <img
            src="/icons/logo-catolica.jpg"
            alt="La Católica GEM"
            className="w-11 h-11 object-contain"
          />

          <div className="leading-tight">
            <span className="block text-xl font-extrabold text-blue-900">
              La Católica GEM
            </span>
            <span className="block text-xs text-blue-700 font-medium tracking-wide">
              Colegio & Academia
            </span>
          </div>
        </Link>

        {/* NAV DESKTOP (IGUAL QUE ANTES) */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-5 py-2.5 rounded-full text-[15px] font-semibold transition
                  ${
                    active
                      ? "bg-blue-700 text-white shadow-md"
                      : "text-blue-900 hover:bg-blue-100/80"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ACCIÓN DERECHA DESKTOP */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="
              px-6 py-2.5 rounded-full text-sm font-semibold
              bg-blue-700 text-white shadow-md
              hover:bg-blue-800 hover:shadow-lg transition
            "
          >
            Admin
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (MOBILE) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-blue-100 transition"
          aria-label="Abrir menú"
        >
          <svg
            className="w-7 h-7 text-blue-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MENÚ MOBILE DESPLEGABLE */}
      {open && (
        <div className="md:hidden bg-white shadow-xl border-t border-blue-100">
          <nav className="flex flex-col px-6 py-6 gap-3">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleClose}
                  className={`
                    px-4 py-3 rounded-xl text-base font-semibold transition
                    ${
                      active
                        ? "bg-blue-700 text-white"
                        : "text-blue-900 hover:bg-blue-100"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* ADMIN EN MOBILE */}
            <Link
              to="/admin"
              onClick={handleClose}
              className="
                mt-4 px-4 py-3 rounded-xl text-center font-semibold
                bg-blue-700 text-white
                hover:bg-blue-800 transition
              "
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;