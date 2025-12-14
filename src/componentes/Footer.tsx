import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#02153A] text-white pt-20 pb-10 overflow-hidden">

      {/* Onda superior */}
      <div className="absolute -top-6 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[80px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#02153A"
            d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,64C1120,43,1280,21,1360,10.7L1440,0L1440,120L0,120Z"
          />
        </svg>
      </div>

      {/* CONTENIDO */}
      <div className="
        max-w-7xl mx-auto px-6
        grid gap-14
        md:grid-cols-3
        relative z-10
      ">

        {/* ================= COLUMNA 1 ================= */}
        <div className="order-1">
          <h3 className="font-extrabold text-xl mb-4 leading-tight">
            Colegio
            <br />
            La Católica GEM
          </h3>

          <p className="text-sm text-white/90 leading-relaxed max-w-sm">
            22 años formando estudiantes con valores, disciplina y excelencia
            académica. Orgullo educativo de Pilcomayo.
          </p>

          {/* BADGES */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
              🎓 Educación Integral
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
              ⭐ 22 años de experiencia
            </span>
          </div>
        </div>

        {/* ================= COLUMNA 2 ================= */}
        <div className="order-2 md:order-2">
          <h4 className="font-semibold text-lg mb-4">
            Contáctanos
          </h4>

          <p className="text-sm text-white/90">
            📍 Jr. Simón Bolívar N° 150 – Pilcomayo
          </p>
          <p className="text-sm text-white/90">
            📍 Cruce de Sicaya y Chupaca
          </p>

          {/* CONTACTOS */}
          <div className="mt-6 space-y-3">

            {/* WhatsApp principal */}
            <a
              href="https://api.whatsapp.com/send?phone=51960119354"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2
                w-full
                px-5 py-3
                rounded-full
                bg-[#25D366]
                text-[#02153A]
                font-semibold
                text-sm
                shadow-md
                hover:shadow-lg hover:brightness-110
                transition
              "
            >
              💬 WhatsApp
            </a>

            {/* Teléfonos */}
            <div className="flex gap-3 flex-wrap">
              <span className="flex-1 text-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                📞 960 119 354
              </span>
              <span className="flex-1 text-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
                📞 943 794 727
              </span>
            </div>
          </div>
        </div>

        {/* ================= COLUMNA 3 ================= */}
        <div className="order-3 md:order-3">
          <h4 className="font-semibold text-lg mb-4">
            Enlaces rápidos
          </h4>

          <ul className="space-y-2 text-sm">
            {[
              { label: "Inicio", href: "/" },
              { label: "Inicial", href: "/inicial" },
              { label: "Primaria", href: "/primaria" },
              { label: "Secundaria", href: "/secundaria" },
              { label: "Vacacional", href: "/ciclo-vacacional" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="
                    inline-flex items-center gap-2
                    text-white/90
                    hover:text-[#F6C200]
                    transition
                  "
                >
                  → {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p className="text-center mt-14 text-xs text-white/70 relative z-10 px-4">
        © 2026 La Católica GEM — Todos los derechos reservados
      </p>
    </footer>
  );
};

export default Footer;