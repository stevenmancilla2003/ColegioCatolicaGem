// src/pages/Vacacional.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getDriveImage } from "../utils/getDriveImage";

/* ----------------------------- TIPOS ---------------------------------- */

type ImageConfig = Record<string, string>;
type GetImageUrl = (key: string) => string;

/* ----------------------------- COMPONENTE ----------------------------- */

const Vacacional: React.FC = () => {
  const [imageConfig, setImageConfig] = useState<ImageConfig>({});

  useEffect(() => {
    const loadImages = async () => {
      try {
        const ref = doc(db, "imagenes", "image");
        const snap = await getDoc(ref);
        if (snap.exists()) setImageConfig(snap.data() as ImageConfig);
      } catch (error) {
        console.error("Error cargando imágenes:", error);
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
      <HeroVacacional getImageUrl={getImageUrl} />

      <main className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <DescripcionVacacional />
        <VacacionalCinematica getImageUrl={getImageUrl} />
        {/* <VideosVacacional /> */}
      </main>
    </div>
  );
};

export default Vacacional;

/* ----------------------------- HERO VACACIONAL – FRANJA ----------------------------- */

interface HeroProps {
  getImageUrl: GetImageUrl;
}

const HeroVacacional: React.FC<HeroProps> = ({ getImageUrl }) => {
  const bgImage = getImageUrl("vacacionalBanner");

  return (
    <section
      className="
        relative w-screen
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        overflow-hidden
      "
    >
      {/* IMAGEN DE FONDO */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02153A]/95 via-[#032B66]/90 to-[#063B88]/85" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-28 grid md:grid-cols-2 gap-16 items-center text-white">

        {/* TEXTO */}
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6">
            🌞 Ciclo Vacacional 2026
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
            Nivelación y{" "}
            <span className="text-[#F6C200]">Preparación</span>{" "}
            de Verano
          </h1>

          <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-xl">
            Refuerza Matemática, Comunicación, Ciencia y Tecnología con docentes
            especialistas. Actividades recreativas, deporte, cultura y creatividad
            en un ambiente seguro y motivador.
          </p>

          <ul className="mt-8 space-y-3 text-white/95 text-base">
            <li className="flex gap-3 items-start">
              <span className="text-[#F6C200] font-bold">✔</span>
              Inicio: <strong>05 de enero 2026</strong>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-[#F6C200] font-bold">✔</span>
              Duración: <strong>6 semanas completas</strong>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-[#F6C200] font-bold">✔</span>
              Programas para Inicial, Primaria, Secundaria y Preuniversitario
            </li>
          </ul>

          {/* Línea decorativa */}
          <div className="mt-8 h-1 w-24 rounded-full bg-[#F6C200]" />
        </div>

        {/* BLOQUE DERECHO (vacío para respiración visual) */}
        <div className="hidden md:block" />
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
};

/* ---------------------------- DESCRIPCIÓN GENERAL ---------------------------- */

import { Sun, BookOpen, Sparkles } from "lucide-react";

const DescripcionVacacional = () => (
  <section className="mt-24">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

      {/* CONTENIDO */}
      <div>
        {/* Ícono / badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F6C200]/15 text-[#B38B00] text-sm font-semibold mb-6">
          <Sun className="w-4 h-4" />
          Experiencia vacacional formativa
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] leading-tight">
          Un Verano Para{" "}
          <span className="text-[#F6C200]">Aprender</span> y Disfrutar
        </h2>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
          Nuestro Ciclo Vacacional combina <strong>reforzamiento académico</strong> con
          actividades deportivas, culturales, tecnológicas y artísticas, diseñadas
          para mantener a los estudiantes activos, motivados y en constante aprendizaje.
        </p>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-xl">
          Es un espacio ideal para <strong>fortalecer conocimientos</strong>, descubrir
          nuevas habilidades y prepararse con seguridad para el siguiente año académico.
        </p>

        {/* Mini features */}
        <div className="mt-8 space-y-4">
          <div className="flex gap-4 items-start">
            <BookOpen className="w-6 h-6 text-[#F6C200] mt-1" />
            <p className="text-gray-700 text-base">
              Refuerzo académico planificado y adaptado por nivel educativo.
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <Sparkles className="w-6 h-6 text-[#F6C200] mt-1" />
            <p className="text-gray-700 text-base">
              Actividades que estimulan la creatividad, el trabajo en equipo y la confianza.
            </p>
          </div>
        </div>

        {/* Línea decorativa */}
        <div className="mt-8 h-1 w-24 rounded-full bg-[#F6C200]" />
      </div>

      {/* BLOQUE VISUAL SUAVE */}
      <div className="hidden md:block">
        <div className="relative rounded-3xl bg-white shadow-xl p-10">
          <p className="text-[#1E3A8A] font-semibold text-lg leading-relaxed">
            “El verano es el mejor momento para reforzar, descubrir y crecer,
            sin la presión del año escolar.”
          </p>

          <p className="mt-4 text-sm text-gray-500">
            — Enfoque pedagógico La Católica GEM
          </p>
        </div>
      </div>

    </div>
  </section>
);

/* ---------------------- VACACIONAL – FRANJA CINEMÁTICA INTEGRAL ---------------------- */

interface VacacionalCinematicaProps {
  getImageUrl: GetImageUrl;
}

const VacacionalCinematica: React.FC<VacacionalCinematicaProps> = ({ getImageUrl }) => {
  const images = [
    getImageUrl("vacacional1"),
    getImageUrl("vacacional2"),
    getImageUrl("vacacional3"),
    getImageUrl("vacacional4"),
  ].filter(Boolean);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const i = setInterval(
      () => setActive((p) => (p + 1) % images.length),
      5000
    );
    return () => clearInterval(i);
  }, [images.length]);

  return (
    <section
      className="
        relative w-screen
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        -mt-32
        min-h-[140vh]
        overflow-hidden
      "
    >
      {/* BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 bg-cover bg-center scale-105
              transition-opacity duration-1000
              ${i === active ? "opacity-100" : "opacity-0"}
            `}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* OVERLAY CINEMÁTICO */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02153A]/95 via-[#032B66]/90 to-[#02153A]/95" />

      {/* CONTENIDO */}
      <div className="relative z-10 px-6 pt-44 pb-64 text-white">

        {/* INTRO */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Vacacional en{" "}
            <span className="text-[#F6C200]">Acción</span>
          </h2>

          <p className="mt-6 text-white/85 text-xl max-w-3xl mx-auto leading-relaxed">
            Un programa integral de verano que refuerza aprendizajes,
            desarrolla habilidades y potencia el crecimiento académico,
            social y personal de nuestros estudiantes.
          </p>
        </div>

        {/* FLASHCARDS */}
        <div className="mt-24 overflow-x-auto">
          <div
            className="
              flex gap-10 px-6 md:px-24
              snap-x snap-mandatory
              scrollbar-hide
            "
          >
            {/* NIVELES */}
            <Card icon="🎓" title="Niveles Atendidos" desc="Programas según la etapa del estudiante">
              <ul className="space-y-2">
                <li>Inicial · 3, 4 y 5 años</li>
                <li>Primaria · 1.º al 6.º</li>
                <li>Secundaria · 1.º a 3.º</li>
                <li>Preuniversitario · 4.º y 5.º</li>
              </ul>
            </Card>

            {/* CURSOS */}
            <Card icon="📘" title="Cursos Principales" desc="Refuerzo académico dinámico">
              <ul className="space-y-2">
                <li>Matemática</li>
                <li>Comunicación</li>
                <li>Ciencia y Tecnología</li>
                <li>Deporte, cultura y creatividad</li>
              </ul>
            </Card>

            {/* HORARIOS */}
            <Card icon="⏰" title="Horarios Flexibles" desc="Pensados para la rutina familiar">
              <div className="space-y-4">
                <div>
                  <strong>Primer Turno</strong>
                  <div>08:00 a. m. – 11:00 a. m.</div>
                </div>
                <div>
                  <strong>Segundo Turno</strong>
                  <div>11:00 a. m. – 2:00 p. m.</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Duración total:{" "}
                <span className="font-semibold text-[#F6C200]">
                  6 semanas completas
                </span>
              </p>
            </Card>
          </div>
        </div>

        {/* OFRECEMOS */}
        <div className="mt-32 max-w-5xl mx-auto">
          <h3 className="text-4xl font-extrabold text-center">
            ¿Qué <span className="text-[#F6C200]">Ofrecemos</span>?
          </h3>

          <div className="mt-16 grid md:grid-cols-2 gap-16 text-lg text-white/90">
            <ul className="space-y-5">
              <Benefit text="Profesores con amplia experiencia pedagógica." />
              <Benefit text="Refuerzo académico personalizado por nivel." />
              <Benefit text="Evaluaciones periódicas y seguimiento continuo." />
              <Benefit text="Actividades deportivas, culturales y artísticas." />
            </ul>

            <ul className="space-y-5">
              <Benefit text="Preparación efectiva para el retorno a clases." />
              <Benefit text="Tutoría y acompañamiento permanente." />
              <Benefit text="Ambiente seguro, organizado y motivador." />
              <Benefit text="Desarrollo de creatividad, disciplina y trabajo en equipo." />
            </ul>
          </div>
        </div>
      </div>

      {/* ONDA FINAL */}
      <div className="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 240" className="w-full h-44" preserveAspectRatio="none">
          <path
            fill="#E8F1FF"
            d="M0,140L80,150C160,160,320,180,480,180C640,180,800,160,960,140C1120,120,1280,100,1440,90L1440,240L0,240Z"
          />
        </svg>
      </div>
    </section>
  );
};

/* ---------------------- COMPONENTES AUX ---------------------- */

const Card = ({
  icon,
  title,
  desc,
  children,
}: {
  icon: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <div className="snap-center min-w-[320px] md:min-w-[400px] bg-white rounded-3xl p-10 shadow-2xl text-center text-[#02153A]">
    <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#E8F1FF] flex items-center justify-center text-3xl">
      {icon}
    </div>
    <h4 className="text-2xl font-extrabold mb-2">{title}</h4>
    <p className="text-gray-600 mb-6">{desc}</p>
    <div className="text-gray-700 font-medium">{children}</div>
  </div>
);

const Benefit = ({ text }: { text: string }) => (
  <li className="flex gap-4">
    <span className="text-[#F6C200] text-xl font-bold">✔</span>
    {text}
  </li>
);

/* ------------------------------ VIDEOS ------------------------------ */

/*const VideosVacacional = () => (
  <section id="informes" className="mt-20">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#02153A] text-center">
      Videos del <span className="text-[#F6C200]">Vacacional</span>
    </h2>

    <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">
      Puedes subir tus videos a YouTube y colocarlos aquí.
    </p>

    <div className="grid md:grid-cols-2 gap-10 mt-10">
      <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-black">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_1"
          className="w-full h-full"
          title="Vacacional Video 1"
          allowFullScreen
        ></iframe>
      </div>

      <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-black">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_2"
          className="w-full h-full"
          title="Vacacional Video 2"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </section>
);*/