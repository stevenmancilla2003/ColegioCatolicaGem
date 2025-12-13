// src/paginas/Inicial.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getDriveImage } from "../utils/getDriveImage";

/* -------------------------------------------------------------------------- */
/* TIPADO                                                                     */
/* -------------------------------------------------------------------------- */

type ImageConfig = Record<string, string>;
type GetImageUrl = (key: string) => string;

/* -------------------------------------------------------------------------- */
/* PÁGINA PRINCIPAL                                                           */
/* -------------------------------------------------------------------------- */

const Inicial: React.FC = () => {
  const [imageConfig, setImageConfig] = useState<ImageConfig>({});

  useEffect(() => {
    const fetchImages = async () => {
      const ref = doc(db, "imagenes", "image");
      const snap = await getDoc(ref);
      if (snap.exists()) setImageConfig(snap.data() as ImageConfig);
    };
    fetchImages();
  }, []);

  const getImageUrl: GetImageUrl = (key) => {
    const id = imageConfig[key];
    return id ? getDriveImage(id) : "";
  };

  return (
    <div className="bg-[#E8F1FF]">
      <HeroInicial getImageUrl={getImageUrl} />

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        <Bienvenida getImageUrl={getImageUrl} />
        <PorqueElegir getImageUrl={getImageUrl} />
        <Aprendizaje />
        <AreasCurriculares />
      </main>
    </div>
  );
};

export default Inicial;

/* -------------------------------------------------------------------------- */
/*                               HERO INICIAL                                 */
/* -------------------------------------------------------------------------- */

interface HeroInicialSectionProps {
  getImageUrl: (key: string) => string;
}

const HeroInicial: React.FC<HeroInicialSectionProps> = ({
  getImageUrl,
}) => {
  const bannerSrc = getImageUrl("inicialBanner");

  return (
    <section
      className="relative min-h-[90vh] flex items-center text-white overflow-hidden"
      style={{
        backgroundImage: bannerSrc ? `url(${bannerSrc})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020F2E]/95 via-[#02153A]/85 to-[#02153A]/40" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-semibold mb-6">
            🧸 Inicial · 3, 4 y 5 años
          </span>

          {/* Título */}
          <h1 className="font-title text-4xl md:text-6xl font-extrabold leading-tight">
            Donde su primer paso <br />
            <span className="text-[#F6C200]">es sagrado</span>
          </h1>

          {/* Descripción */}
          <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed">
            En <strong>Inicial La Católica GEM</strong>, cada niño inicia su
            historia escolar en un ambiente seguro, cálido y alegre. Educamos
            con amor, paciencia y respeto, acompañando sus primeros aprendizajes
            con juegos, valores y mucha creatividad.
          </p>

          {/* Lista de beneficios */}
          <ul className="mt-6 space-y-2 text-sm md:text-base text-white/90">
            <li className="flex items-center gap-2">
              ✔ Formación integral en valores cristianos.
            </li>
            <li className="flex items-center gap-2">
              ✔ Desarrollo emocional, social y cognitivo.
            </li>
            <li className="flex items-center gap-2">
              ✔ Docentes con amplia experiencia y vocación.
            </li>
            <li className="flex items-center gap-2">
              ✔ Comunicación constante con los padres.
            </li>
          </ul>

          {/* CTA FUNCIONALES */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#aprendizaje"
              className="px-8 py-3 rounded-full border border-white/60 text-white font-semibold hover:bg-white/10 transition"
            >
              Aprendizaje
            </a>

            <a
              href="#areas-curriculares"
              className="px-8 py-3 rounded-full bg-white text-[#02153A] font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition"
            >
              Areas Curriculares
            </a>
          </div>
        </div>
      </div>

      {/* Onda inferior */}
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

/* -------------------------------------------------------------------------- */
/* BIENVENIDA (MEJORADA CON IMAGEN)                                            */
/* -------------------------------------------------------------------------- */

const Bienvenida: React.FC<{ getImageUrl: (key: string) => string }> = ({
  getImageUrl,
}) => {
  const img = getImageUrl("inicialGaleria1");

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* TEXTO */}
        <div>
          <h2 className="font-title text-3xl md:text-4xl font-extrabold text-blue-900">
            Inicial La Católica GEM
          </h2>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            En nuestro nivel Inicial, creemos que el primer paso en la educación
            es <strong>sagrado</strong>. Por eso, ofrecemos un entorno donde los
            niños se sienten queridos, protegidos y motivados a descubrir el
            mundo que los rodea.
          </p>

          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            A través del juego, la exploración y actividades cuidadosamente
            planificadas, acompañamos a los pequeños de{" "}
            <strong>3, 4 y 5 años</strong> en el desarrollo de sus habilidades
            emocionales, sociales, cognitivas y espirituales, respetando su
            ritmo y celebrando cada logro.
          </p>

          {/* Línea decorativa */}
          <div className="mt-8 h-1 w-24 rounded-full bg-[#F6C200]" />
        </div>

        {/* IMAGEN */}
        <div className="relative">
          {/* Glow suave */}
          <div className="absolute -inset-4 bg-blue-300/30 blur-2xl rounded-3xl" />

          <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3] bg-white">
            {img && (
              <img
                src={img}
                alt="Inicial La Católica GEM"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* APRENDIZAJE A TRAVÉS DEL JUEGO (VIDEO + ALTURA CONTROLADA)                  */
/* -------------------------------------------------------------------------- */

const Aprendizaje: React.FC = () => (
  <section id="aprendizaje" className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
    
    {/* TEXTO */}
    <div>
      <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight">
        Aprendizaje a través del{" "}
        <span className="text-[#F6C200]">juego</span>
      </h3>

      <p className="mt-5 text-lg text-gray-700 leading-relaxed max-w-xl">
        Nuestro modelo pedagógico promueve el aprendizaje{" "}
        <strong>activo, significativo y vivencial</strong>, donde cada niño
        aprende explorando, creando y expresándose libremente en un entorno
        seguro y estimulante.
      </p>

      <p className="mt-3 text-lg text-gray-700 leading-relaxed max-w-xl">
        A través del juego, los niños desarrollan habilidades cognitivas,
        sociales y emocionales que fortalecen su autonomía, confianza y amor
        por aprender.
      </p>

      {/* LISTA */}
      <ul className="mt-6 space-y-3 text-lg">
        {[
          "Juegos simbólicos y de roles que estimulan la imaginación.",
          "Actividades manipulativas y sensoriales para aprender haciendo.",
          "Cuentos, canciones y expresión oral para fortalecer el lenguaje.",
          "Trabajo en grupo y proyectos simples que fomentan la convivencia.",
        ].map((item) => (
          <li key={item} className="flex gap-3 items-start">
            <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-[#F6C200]/20 text-[#F6C200] font-bold text-sm">
              ✓
            </span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* VIDEO */}
    <div className="relative">
      {/* Glow sutil */}
      <div className="absolute -inset-6 bg-blue-300/30 blur-3xl rounded-3xl" />

      <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-black">
        <iframe
          src="https://www.youtube.com/embed/m4ZFUgepxZQ"
          title="Aprendizaje a través del juego - Inicial La Católica GEM"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>

  </section>
);

/* -------------------------------------------------------------------------- */
/* ÁREAS QUE DESARROLLAMOS – FULL WIDTH REAL (BREAK OUT DEL MAIN)              */
/* -------------------------------------------------------------------------- */

import {
  MessageCircle,
  Calculator,
  Activity,
  Music,
  HeartHandshake,
  Users,
  Church,
  Compass,
} from "lucide-react";

const AreasCurriculares: React.FC = () => (
  <section
    id="areas-curriculares"
    className="
      relative w-screen
      left-1/2 right-1/2
      -ml-[50vw] -mr-[50vw]
      py-24
      bg-gradient-to-b from-[#0E2E6D] to-[#081F4D]
    "
  >
    <div className="max-w-7xl mx-auto px-6">

      {/* TÍTULO */}
      <h3 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
        Áreas que desarrollamos
      </h3>

      {/* TARJETAS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          {
            label: "Comunicación y lenguaje",
            Icon: MessageCircle,
            color: "text-blue-700",
            bg: "bg-blue-100",
          },
          {
            label: "Pensamiento lógico-matemático",
            Icon: Calculator,
            color: "text-yellow-600",
            bg: "bg-yellow-100",
          },
          {
            label: "Psicomotricidad y coordinación",
            Icon: Activity,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            label: "Expresión artística y musical",
            Icon: Music,
            color: "text-purple-600",
            bg: "bg-purple-100",
          },
          {
            label: "Desarrollo socioemocional",
            Icon: HeartHandshake,
            color: "text-rose-600",
            bg: "bg-rose-100",
          },
          {
            label: "Hábitos y normas de convivencia",
            Icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-100",
          },
          {
            label: "Educación en valores cristianos",
            Icon: Church,
            color: "text-amber-600",
            bg: "bg-amber-100",
          },
          {
            label: "Descubrimiento del entorno",
            Icon: Compass,
            color: "text-cyan-600",
            bg: "bg-cyan-100",
          },
        ].map(({ label, Icon, color, bg }) => (
          <div
            key={label}
            className="
              rounded-3xl p-8 text-center
              bg-white/90 backdrop-blur
              border border-white/40
              shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl
            "
          >
            {/* ICONO */}
            <div
              className={`
                w-20 h-20 mx-auto mb-6 rounded-2xl
                ${bg} ${color}
                flex items-center justify-center
              `}
            >
              <Icon size={34} strokeWidth={2.2} />
            </div>

            {/* TEXTO */}
            <p className="font-semibold text-blue-900 text-lg leading-snug">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* VIDEO */}
      <div className="mt-24 max-w-5xl mx-auto">
        <div className="relative rounded-[40px] overflow-hidden shadow-2xl bg-black aspect-video">
          <iframe
            src="https://www.youtube.com/embed/ravUVs0Z6aU"
            title="Áreas de desarrollo - Inicial La Católica GEM"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* POR QUÉ ELEGIR – FULL WIDTH REAL (BREAK OUT DEL CONTAINER)                  */
/* -------------------------------------------------------------------------- */

const PorqueElegir: React.FC<{ getImageUrl: (key: string) => string }> = ({
  getImageUrl,
}) => {
  const img = getImageUrl("inicialAfiche2");

  return (
    <section
      className="
        relative w-screen
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        bg-gradient-to-b from-[#0E2E6D] to-[#081F4D]
        text-white py-24
      "
    >
      {/* CONTENIDO INTERNO CONTROLADO */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* TEXTO */}
        <div>
          <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
            ¿Por qué elegir nuestro{" "}
            <span className="text-[#F6C200]">Inicial</span>?
          </h3>

          <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-xl">
            En La Católica GEM construimos una base sólida para el futuro de cada
            niño, combinando experiencia educativa, valores y un acompañamiento
            cercano a las familias.
          </p>

          <ul className="mt-10 space-y-4 text-lg">
            {[
              "22 años de experiencia educativa formando estudiantes con valores y disciplina.",
              "Creatividad y formación integral desde los primeros años.",
              "Evaluaciones constantes e informes de progreso claros para los padres.",
              "Logros académicos y participación en campeonatos escolares.",
              "Ambiente seguro, alegre y motivador donde los niños crecen felices.",
              "Comunicación directa y permanente con los padres de familia.",
            ].map((item) => (
              <li key={item} className="flex gap-4">
                <span className="text-[#F6C200] text-xl font-bold leading-none">
                  ✔
                </span>
                <span className="text-white/95">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* IMAGEN */}
        <div className="relative">
          <div className="absolute -inset-8 bg-[#F6C200]/20 blur-3xl rounded-[48px]" />

          <div className="relative overflow-hidden rounded-[40px] shadow-2xl aspect-[4/3]">
            {img && (
              <img
                src={img}
                alt="¿Por qué elegir Inicial La Católica GEM?"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
