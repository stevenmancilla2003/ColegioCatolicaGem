// src/pages/Primaria.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getDriveImage } from "../utils/getDriveImage";

/* ---------------------------------- TIPOS --------------------------------- */

type ImageConfig = Record<string, string>;
type GetImageUrl = (key: string) => string;

/* ----------------------------- COMPONENTE MAIN ----------------------------- */

const Primaria: React.FC = () => {
  const [imageConfig, setImageConfig] = useState<ImageConfig>({});

  useEffect(() => {
    const loadImages = async () => {
      try {
        const ref = doc(db, "imagenes", "image");
        const snap = await getDoc(ref);
        if (snap.exists()) setImageConfig(snap.data() as ImageConfig);
      } catch (e) {
        console.error("Error cargando imágenes:", e);
      }
    };
    loadImages();
  }, []);

  const getImageUrl: GetImageUrl = (key) => {
    const id = imageConfig[key];
    return id ? getDriveImage(id) : "";
  };

  return (
    <div className="min-h-screen bg-[#E8F1FF]">
      <HeroPrimaria getImageUrl={getImageUrl} />

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <IntroduccionPrimaria />
        {/* ⬅️ AQUÍ LE PASAMOS getImageUrl COMO PROP */}
        <DesarrolloAcademico getImageUrl={getImageUrl} />
        <ActividadesGaleriaPrimaria getImageUrl={getImageUrl} />
        <VideosPrimaria />
      </main>
    </div>
  );
};

export default Primaria;

/* ------------------------------- HERO PRIMARIA ------------------------------ */

interface HeroProps {
  getImageUrl: (key: string) => string;
}

const HeroPrimaria: React.FC<HeroProps> = ({ getImageUrl }) => {
  const banner = getImageUrl("primariaBanner");

  return (
    <section
      className="relative min-h-[90vh] flex items-center text-white overflow-hidden"
      style={{
        backgroundImage: banner ? `url(${banner})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro elegante */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020F2E]/95 via-[#02153A]/85 to-[#02153A]/50" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-semibold mb-6">
            Formación sólida en valores y conocimiento
          </span>

          {/* Título */}
          <h1 className="font-title text-4xl md:text-6xl font-extrabold leading-tight">
            Nivel{" "}
            <span className="text-[#F6C200]">Primaria</span>
          </h1>

          {/* Descripción */}
          <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed">
            Impulsamos una educación integral basada en comprensión lectora,
            habilidades sociales, creatividad y proyectos innovadores que
            fortalecen el pensamiento crítico.
          </p>

          {/* Lista */}
          <ul className="mt-6 space-y-3 text-sm md:text-base text-white/90">
            <li className="flex items-center gap-2">
              ✔ Proyectos de investigación y experimentación moderna.
            </li>
            <li className="flex items-center gap-2">
              ✔ Aprendizaje personalizado según ritmos y estilos.
            </li>
            <li className="flex items-center gap-2">
              ✔ Cultura de valores, disciplina y convivencia positiva.
            </li>
            <li className="flex items-center gap-2">
              ✔ Actividades culturales, deportivas y artísticas.
            </li>
          </ul>
        </div>
      </div>

      {/* ONDA INFERIOR */}
      <div className="absolute bottom-0 inset-x-0 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-32"
          preserveAspectRatio="none"
        >
          <path
            fill="#E8F1FF"
            d="M0,96L80,101C160,107,320,117,480,117C640,117,800,107,960,96C1120,85,1280,75,1440,64L1440,160L0,160Z"
          />
        </svg>
      </div>
    </section>
  );
};

/* -------------------------- INTRODUCCIÓN PRIMARIA -------------------------- */

const IntroduccionPrimaria: React.FC = () => (
  <section className="mt-20 max-w-7xl mx-auto px-6 grid md:grid-cols-[1.3fr_0.7fr] gap-16 items-center">
    
    {/* TEXTO */}
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight">
        Formación Integral y Proyectos{" "}
        <span className="text-[#F6C200]">Innovadores</span>
      </h2>

      <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-xl">
        Desarrollamos en nuestros estudiantes una sólida cultura de investigación,
        análisis y experimentación moderna, promoviendo el pensamiento crítico y
        la curiosidad académica desde los primeros grados.
      </p>

      <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-xl">
        Nuestro enfoque se adapta a los{" "}
        <strong>ritmos y estilos de aprendizaje</strong> de cada niño,
        fortaleciendo su autonomía, responsabilidad y capacidad para resolver
        problemas mediante procesos educativos personalizados.
      </p>

      {/* Línea decorativa */}
      <div className="mt-8 h-1 w-24 rounded-full bg-[#F6C200]" />
    </div>

    {/* ICONO / ILUSTRACIÓN */}
    <div className="relative flex justify-center md:justify-start">
      
      {/* Glow suave */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />

      {/* Icono (sin caja) */}
      <img
        src="/icons/analitica.png"
        alt="Investigación y análisis académico"
        className="
          relative
          w-52 h-52 md:w-60 md:h-60
          object-contain
          drop-shadow-2xl
        "
      />
    </div>

  </section>
);


/* -------------------------- DESARROLLO ACADÉMICO – FRANJA HERO -------------------------- */

interface DesarrolloAcademicoProps {
  getImageUrl: GetImageUrl;
}

const DesarrolloAcademico: React.FC<DesarrolloAcademicoProps> = ({ getImageUrl }) => (
  <section
    className="
      relative w-screen
      left-1/2 right-1/2
      -ml-[50vw] -mr-[50vw]
      bg-gradient-to-b from-[#0E2E6D] to-[#081F4D]
      py-28
      overflow-hidden
    "
  >
    {/* CONTENEDOR INTERNO */}
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

      {/* TEXTO */}
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
          Desarrollamos en{" "}
          <span className="text-[#F6C200]">Primaria</span>
        </h2>

        <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-xl">
          Potenciamos las capacidades académicas, sociales y espirituales de
          nuestros estudiantes mediante una formación integral, moderna y
          alineada a valores cristianos.
        </p>

        <ul className="mt-8 space-y-4 text-white/95 text-lg">
          {[
            "Comprensión lectora y producción de textos.",
            "Habilidades sociales, espirituales, culturales y deportivas.",
            "Inglés, computación y ciencia aplicada.",
            "Valores cristianos y disciplina positiva.",
            "Nivelación, recuperación y reforzamiento académico.",
            "Talleres, proyectos y actividades interdisciplinarias.",
          ].map((item) => (
            <li key={item} className="flex gap-4 items-start">
              <span className="mt-1 text-[#F6C200] font-bold">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* IMAGEN */}
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-8 bg-[#F6C200]/20 blur-3xl rounded-[48px]" />

        <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
          <img
            src={getImageUrl("primariaAfiche1")}
            alt="Actividades académicas en Primaria"
            className="w-full h-[360px] object-cover"
          />
        </div>
      </div>

    </div>

    {/* ONDA INFERIOR */}
    <div className="absolute inset-x-0 bottom-0 translate-y-[1px]">
      <svg
        viewBox="0 0 1440 160"
        className="w-full h-32"
        preserveAspectRatio="none"
      >
        <path
          fill="#E8F1FF"
          d="M0,96L80,101C160,107,320,117,480,117C640,117,800,107,960,96C1120,85,1280,75,1440,64L1440,160L0,160Z"
        />
      </svg>
    </div>
  </section>
);

/* -------------------- ACTIVIDADES Y GALERÍA PRIMARIA (UNIFICADO) -------------------- */

interface ActividadesGaleriaProps {
  getImageUrl: GetImageUrl;
}

const ActividadesGaleriaPrimaria: React.FC<ActividadesGaleriaProps> = ({
  getImageUrl,
}) => {
  const actividades = [
    "Teatro",
    "Concursos Externos",
    "Feria de Ciencias",
    "Cine Educativo",
    "Proyectos Escolares",
    "Actividades Artísticas",
  ];

  const images = [
    "primariaGaleria1",
    "primariaGaleria2",
    "primariaGaleria3",
    "primariaGaleria4",
  ];

  return (
    <section className="mt-32">
      {/* TÍTULO */}
      <div className="text-center max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight">
          Actividades y Experiencias{" "}
          <span className="text-[#F6C200]">Formativas</span>
        </h2>

        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          Complementamos la formación académica con actividades que fortalecen la
          creatividad, el trabajo en equipo y la convivencia, permitiendo que
          nuestros estudiantes aprendan haciendo y vivan experiencias
          significativas dentro y fuera del aula.
        </p>
      </div>

      {/* ACTIVIDADES (BADGES) */}
      <div className="mt-12 max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {actividades.map((item) => (
            <span
              key={item}
              className="
                px-6 py-3 rounded-full
                bg-white text-blue-900 font-semibold
                shadow-md border border-blue-100
                hover:bg-blue-50 transition
              "
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* GALERÍA – CARRUSEL */}
      <div className="mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-6">
            Galería de actividades en{" "}
            <span className="text-[#F6C200]">Primaria</span>
          </h3>
        </div>

        {/* Carrusel */}
        <div className="relative">
          <div
            className="
              flex gap-6 overflow-x-auto px-6 pb-6
              snap-x snap-mandatory
              scrollbar-hide
            "
          >
            {images.map((key) => {
              const url = getImageUrl(key);
              return (
                <div
                  key={key}
                  className="
                    min-w-[280px] sm:min-w-[320px] md:min-w-[360px]
                    snap-center
                    rounded-[32px] overflow-hidden
                    shadow-xl bg-white
                    transition-transform hover:-translate-y-1
                  "
                >
                  {url && (
                    <img
                      src={url}
                      alt="Actividad Primaria"
                      className="w-full h-[420px] object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Indicador visual */}
          <div className="mt-6 flex justify-center">
            <span className="text-sm text-gray-500">
              Desliza para ver más →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------- VIDEO DESTACADO PRIMARIA -------------------------- */

const VideosPrimaria: React.FC = () => (
  <section
    className="
      relative w-screen
      left-1/2 right-1/2
      -ml-[50vw] -mr-[50vw]
      bg-gradient-to-r from-[#02153A] via-[#032B66] to-[#063B88]
      py-28
      overflow-hidden
    "
  >
    {/* CONTENEDOR INTERNO */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center text-white">
      
      {/* TEXTO */}
      <div>
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6">
          Experiencia en acción
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Video <span className="text-[#F6C200]">Destacado</span>
        </h2>

        <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-xl">
          Conoce cómo nuestros estudiantes de Primaria viven el aprendizaje
          día a día en un entorno dinámico, cercano y formativo, acompañado
          por docentes comprometidos con su desarrollo integral.
        </p>

        <ul className="mt-8 space-y-4 text-white/95 text-lg">
          {[
            "Metodologías activas y participación constante.",
            "Acompañamiento docente y formación en valores.",
            "Ambientes seguros, motivadores y creativos.",
          ].map((item) => (
            <li key={item} className="flex gap-4 items-start">
              <span className="mt-1 text-[#F6C200] font-bold">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Línea decorativa */}
        <div className="mt-10 h-1 w-24 rounded-full bg-[#F6C200]" />
      </div>

      {/* VIDEO */}
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-8 bg-blue-400/20 blur-3xl rounded-[48px]" />

        <div className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-black">
          <iframe
            src="https://www.youtube.com/embed/PKAbV5FruWY"
            title="Video Primaria - La Católica GEM"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>

    {/* ONDA INFERIOR */}
    <div className="absolute inset-x-0 bottom-0 translate-y-[1px]">
      <svg
        viewBox="0 0 1440 160"
        className="w-full h-32"
        preserveAspectRatio="none"
      >
        <path
          fill="#E8F1FF"
          d="M0,96L80,101C160,107,320,117,480,117C640,117,800,107,960,96C1120,85,1280,75,1440,64L1440,160L0,160Z"
        />
      </svg>
    </div>
  </section>
);