// src/pages/Secundaria.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getDriveImage } from "../utils/getDriveImage";

/* --------------------------------- TIPOS ---------------------------------- */

type ImageConfig = Record<string, string>;
type GetImageUrl = (key: string) => string;

/* -------------------------------- PÁGINA ---------------------------------- */

const Secundaria: React.FC = () => {
  const [imageConfig, setImageConfig] = useState<ImageConfig>({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const ref = doc(db, "imagenes", "image");
        const snap = await getDoc(ref);
        if (snap.exists()) setImageConfig(snap.data() as ImageConfig);
      } catch (err) {
        console.error("Error cargando imágenes:", err);
      }
    };

    fetchImages();
  }, []);

  const getImageUrl: GetImageUrl = (key) => {
    const id = imageConfig[key];
    return id ? getDriveImage(id) : "";
  };

  return (
    <div className="min-h-screen bg-[#E8F1FF]">
      <HeroSecundaria getImageUrl={getImageUrl} />

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <SeccionFormacion getImageUrl={getImageUrl} />
        <SeccionPre getImageUrl={getImageUrl} />
        <SecundariaIntegral getImageUrl={getImageUrl} />
        {/* <VideosSecundaria /> */}
      </main>
    </div>
  );
};

export default Secundaria;


/* ------------------------------- HERO SECUNDARIA ------------------------------- */

interface HeroProps {
  getImageUrl: GetImageUrl;
}

const HeroSecundaria: React.FC<HeroProps> = ({ getImageUrl }) => {
  const banner = getImageUrl("secundariaBanner");

  return (
    <section
      className="relative min-h-[90vh] flex items-center text-white overflow-hidden"
      style={{
        backgroundImage: banner ? `url(${banner})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020F2E]/95 via-[#02153A]/85 to-[#02153A]/40" />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-semibold mb-6">
            Formación académica con visión global
          </span>

          {/* TÍTULO */}
          <h1 className="font-title text-4xl md:text-6xl font-extrabold leading-tight">
            Nivel{" "}
            <span className="text-[#F6C200]">Secundaria</span>
          </h1>

          {/* DESCRIPCIÓN */}
          <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed">
            Fortalecemos valores, disciplina y pensamiento crítico. Formamos
            adolescentes capaces de asumir retos académicos y personales con
            <strong> autonomía, liderazgo y responsabilidad</strong>.
          </p>

          {/* BENEFICIOS */}
          <ul className="mt-6 space-y-3 text-sm md:text-base text-white/90">
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Pensamiento crítico y aprendizaje innovador.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Desarrollo analítico y creativo.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Evaluación personalizada y seguimiento constante.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Formación en valores, convivencia y disciplina positiva.
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

/* ----------------------------- SECCIÓN FORMACIÓN ----------------------------- */

interface SeccionFormacionProps {
  getImageUrl: GetImageUrl;
}

const SeccionFormacion: React.FC<SeccionFormacionProps> = ({ getImageUrl }) => (
  <section className="mt-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
    
    {/* TEXTO */}
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight">
        Formación Académica{" "}
        <span className="text-[#F6C200]">Integral</span>
      </h2>

      <p className="mt-6 text-gray-700 text-lg leading-relaxed max-w-xl">
        Nuestros estudiantes desarrollan competencias sólidas en
        <strong> Matemática, Comunicación, Ciencia y Tecnología</strong>,
        complementadas con programas que fortalecen liderazgo, disciplina,
        responsabilidad social y convivencia armoniosa.
      </p>

      <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-xl">
        Impulsamos una formación basada en valores y pensamiento crítico,
        preparando a nuestros alumnos para afrontar con éxito
        <strong> retos académicos superiores</strong> y su proyecto de vida.
      </p>

      {/* Línea decorativa */}
      <div className="mt-8 h-1 w-24 rounded-full bg-[#F6C200]" />
    </div>

    {/* IMAGEN */}
    <div className="relative">
      {/* Glow sutil */}
      <div className="absolute -inset-6 bg-blue-300/20 blur-3xl rounded-3xl" />

      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <img
          src={getImageUrl("secundariaAfiche2")}
          alt="Formación académica en Secundaria"
          className="w-full h-[340px] object-cover"
        />
      </div>
    </div>

  </section>
);

/* ----------------------------- SECCIÓN PREUNIVERSITARIO – FRANJA ----------------------------- */

interface SecPreProps {
  getImageUrl: GetImageUrl;
}

const SeccionPre: React.FC<SecPreProps> = ({ getImageUrl }) => {
  const bgImage = getImageUrl("secundariaAfiche1");

  return (
    <section
      className="
        relative w-screen
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        overflow-hidden
        mt-32
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center text-white">

        {/* TEXTO */}
        <div>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-semibold mb-6">
            Preparación académica de alto rendimiento
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Preparación{" "}
            <span className="text-[#F6C200]">Preuniversitaria</span>
          </h2>

          <p className="mt-6 text-white/90 text-lg leading-relaxed max-w-xl">
            Para <strong>4.º y 5.º de secundaria</strong>, ofrecemos un programa
            preuniversitario competitivo orientado a resultados, con simulacros
            tipo examen, docentes especializados y acompañamiento vocacional
            estratégico.
          </p>

          <p className="mt-4 text-white/85 text-lg leading-relaxed max-w-xl">
            Nuestros estudiantes acceden a metodologías exigentes que fortalecen
            su razonamiento, seguridad académica y desempeño en procesos de
            admisión a universidades nacionales y privadas.
          </p>

          <ul className="mt-6 space-y-3 text-white/95 text-base">
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Simulacros constantes tipo admisión universitaria.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Refuerzo intensivo en razonamiento matemático y verbal.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Preparación para universidades nacionales y privadas.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Estrategias avanzadas de estudio, rendimiento y gestión del tiempo.
            </li>
          </ul>

          {/* Línea decorativa */}
          <div className="mt-8 h-1 w-24 rounded-full bg-[#F6C200]" />
        </div>

        {/* BLOQUE VISUAL */}
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

/* ------------------- ECOSISTEMA FORMATIVO SECUNDARIA ------------------- */

import {
  GraduationCap,
  ShieldCheck,
  Users,
  Trophy,
  Activity,
  Brain,
  Target,
} from "lucide-react";

interface SecundariaIntegralProps {
  getImageUrl: GetImageUrl;
}

const SecundariaIntegral: React.FC<SecundariaIntegralProps> = ({ getImageUrl }) => {
  const galeria = [
    "secundariaGaleria1",
    "secundariaGaleria2",
    "secundariaGaleria3",
    "secundariaGaleria4",
  ];

  return (
    <section className="mt-32">

      {/* ================= HEADER ================= */}
      <div className="text-center max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-900 text-sm font-semibold mb-4">
          Formación integral en acción
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
          Ecosistema del Nivel{" "}
          <span className="text-[#F6C200]">Secundaria</span>
        </h2>

        <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          Un entorno educativo que integra acompañamiento académico, desarrollo
          personal, actividades formativas y experiencias reales que fortalecen
          el liderazgo y la proyección de nuestros estudiantes.
        </p>
      </div>

      {/* ================= BENEFICIOS ================= */}
      <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

        {[
          {
            icon: GraduationCap,
            title: "Acompañamiento Académico",
            desc: "Seguimiento constante, disciplina positiva y orientación formativa personalizada.",
          },
          {
            icon: Users,
            title: "Docentes con Vocación",
            desc: "Profesores con experiencia, compromiso humano y enfoque pedagógico moderno.",
          },
          {
            icon: ShieldCheck,
            title: "Ambiente Seguro",
            desc: "Espacios que promueven el respeto, la confianza y el desarrollo emocional.",
          },
          {
            icon: Brain,
            title: "Pensamiento Crítico",
            desc: "Formación analítica y creativa orientada a resolver problemas reales.",
          },
          {
            icon: Trophy,
            title: "Logros y Concursos",
            desc: "Participación activa en campeonatos académicos, deportivos y culturales.",
          },
          {
            icon: Target,
            title: "Proyección Futura",
            desc: "Preparación sólida para retos académicos superiores y proyecto de vida.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
              <Icon size={26} strokeWidth={2} />
            </div>

            <h3 className="text-xl font-bold text-blue-900">{title}</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ================= GALERÍA COMO EVIDENCIA ================= */}
      <div className="mt-28">
        <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 text-center">
          Vivencias que{" "}
          <span className="text-[#F6C200]">respaldan</span> nuestra formación
        </h3>

        <p className="mt-4 text-center text-gray-700 max-w-2xl mx-auto text-lg">
          Actividades, logros y experiencias reales que forman parte del día a día
          de nuestros estudiantes de Secundaria.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {galeria.map((key) => {
            const url = getImageUrl(key);
            return (
              <div
                key={key}
                className="group rounded-3xl overflow-hidden shadow-lg bg-white aspect-[3/4]"
              >
                {url && (
                  <img
                    src={url}
                    alt="Galería Secundaria"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= TALLERES ================= */}
      <div className="mt-28 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900">
          Talleres y{" "}
          <span className="text-[#F6C200]">Actividades Formativas</span>
        </h3>

        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
          Espacios que fortalecen disciplina, trabajo en equipo, habilidades físicas
          y desarrollo intelectual.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6">
          {[
            { name: "Ajedrez", icon: Brain },
            { name: "Ping Pong", icon: Activity },
            { name: "Taekwondo", icon: ShieldCheck },
            { name: "Concursos Externos", icon: Trophy },
          ].map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="
                bg-white rounded-3xl shadow-lg p-8
                hover:shadow-xl transition
                flex flex-col items-center text-center
              "
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
                <Icon size={26} />
              </div>

              <h4 className="text-lg font-semibold text-blue-900">{name}</h4>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

/* ----------------------------- VIDEOS ----------------------------- */

/*const VideosSecundaria = () => (
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl text-center font-extrabold text-blue-900">
      Videos Destacados
    </h2>

    <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">
      Videos subidos a YouTube, integrados directamente aquí.
    </p>

    <div className="grid md:grid-cols-2 gap-10 mt-10">
      
      <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-black">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_1"
          className="w-full h-full"
          title="Video secundaria 1"
          allowFullScreen
        ></iframe>
      </div>

      <div className="aspect-video rounded-3xl overflow-hidden shadow-xl bg-black">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_2"
          className="w-full h-full"
          title="Video secundaria 2"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  </section>
);*/