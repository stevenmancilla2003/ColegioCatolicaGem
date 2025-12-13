// src/paginas/Home.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getDriveImage } from "../utils/getDriveImage";

/* -------------------------------------------------------------------------- */
/*                          TIPADO PARA CONFIGURACIÓN                         */
/* -------------------------------------------------------------------------- */

type ImageConfig = Record<string, string>;
type GetImageUrl = (key: string) => string;

/* -------------------------------------------------------------------------- */
/*                                HOME MODERNO                                */
/* -------------------------------------------------------------------------- */

const Home: React.FC = () => {
  const [imageConfig, setImageConfig] = useState<ImageConfig>({});

  // Cargar 1 sola vez el documento /imagenes/image
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const ref = doc(db, "imagenes", "image");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setImageConfig(snap.data() as ImageConfig);
        } else {
          console.warn("No se encontró el documento 'imagenes/image'");
        }
      } catch (error) {
        console.error("Error cargando imágenes desde Firestore:", error);
      }
    };

    fetchImages();
  }, []);

  // Helper para obtener URL final desde una key
  const getImageUrl: GetImageUrl = (key) => {
    const id = imageConfig[key];
    return id ? getDriveImage(id) : "";
  };

  return (
    <div className="min-h-screen bg-[#E8F1FF]">
      {/* HERO ADMISION */}
      <HeroSection getImageUrl={getImageUrl} />

      {/* RESTO DEL HOME */}
      <main className="bg-[#E8F1FF]">
        <InfoStrip />
        <InspiracionWhySection getImageUrl={getImageUrl} />
        <NivelesSection getImageUrl={getImageUrl} />
        <VacacionalSection getImageUrl={getImageUrl} />
        <TalleresSection getImageUrl={getImageUrl} />
        
      </main>
    </div>
  );
};

export default Home;

/* -------------------------------------------------------------------------- */
/*                            COMPONENTES DE SECCIÓN                          */
/* -------------------------------------------------------------------------- */

/* ----------------------------- HERO SECTION ----------------------------- */

interface HeroSectionProps {
  getImageUrl: GetImageUrl;
}

const HeroSection: React.FC<HeroSectionProps> = ({ getImageUrl }) => {
  const heroSrc = getImageUrl("hero");

  return (
    <section
      className="relative text-white overflow-hidden min-h-[750px] flex items-center"
      style={{
        backgroundImage: heroSrc ? `url(${heroSrc})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro (NO cambia colores, solo mejora legibilidad) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02153A]/95 via-[#02153A]/85 to-[#02153A]/40" />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* TEXTO IZQUIERDO */}
        <div>
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-medium mb-4">
            🎓 22 años de educación para el mañana
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Admisión <span className="text-[#F6C200]">2026</span>
          </h1>

          <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
            ¡Vacantes limitadas!
          </h2>

          <p className="mt-5 text-sm md:text-lg text-white/90 max-w-xl leading-relaxed">
            Colegio y Academia La Católica GEM en Pilcomayo. Formación integral
            con valores, disciplina y excelencia académica en{" "}
            <strong>Inicial, Primaria y Secundaria</strong>.
          </p>

          <ul className="mt-5 space-y-2 text-sm md:text-base text-white/90">
            <li>✔ Logros académicos y campeonatos escolares.</li>
            <li>✔ Formación integral, creatividad y disciplina.</li>
            <li>✔ Acompañamiento permanente e informes de rendimiento.</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#inscripciones"
              className="px-7 py-3 rounded-full bg-white text-[#063B88] font-semibold shadow-lg hover:shadow-xl transition text-sm md:text-base"
            >
              Quiero informes
            </a>

            <a
              href="#vacacional"
              className="px-7 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition text-sm md:text-base"
            >
              Ver Ciclo Vacacional 2026
            </a>
          </div>

          <p className="mt-5 text-xs md:text-sm text-white/80">
            📍 Jr. Simón Bolívar N° 150 – Pilcomayo (cruce de Sicaya y Chupaca)
          </p>
        </div>

        {/* FORMULARIO / BLOQUE DERECHO (ESTILO Saco Oliveros) */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-blue-900 max-w-md ml-auto">
          <h3 className="text-2xl font-extrabold mb-2">
            INFORMES <span className="text-[#F6C200]">2026</span>
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            Déjanos tus datos y nos comunicaremos contigo.
          </p>

          <form className="grid gap-3">
            <input className="p-3 rounded-xl border border-gray-300" placeholder="Nombre completo" />
            <input className="p-3 rounded-xl border border-gray-300" placeholder="Celular / WhatsApp" />
            <input className="p-3 rounded-xl border border-gray-300" placeholder="Nivel de interés" />

            <button className="mt-2 px-6 py-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">
              Enviar
            </button>
          </form>
        </div>

      </div>

      {/* Onda inferior (la tuya, intacta) */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[1px]">
        <svg viewBox="0 0 1440 160" className="w-full h-32" preserveAspectRatio="none">
          <path
            fill="#E8F1FF"
            d="M0,96L80,101.3C160,107,320,117,480,117.3C640,117,800,107,960,96C1120,85,1280,75,1360,69.3L1440,64L1440,160L0,160Z"
          />
        </svg>
      </div>
    </section>
  );
};

/* ---------------------- INSPIRACIÓN + POR QUÉ ELEGIRNOS (COMBINADO) ---------------------- */

interface InspiracionWhyProps {
  getImageUrl: GetImageUrl;
}

const InspiracionWhySection: React.FC<InspiracionWhyProps> = ({ getImageUrl }) => {
  const bgImage = getImageUrl("homeInspiracion");

  return (
    <section
      className="relative overflow-hidden py-36"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#02153A]/95 via-[#02153A]/85 to-[#02153A]/60" />

      {/* CONTENIDO SUPERIOR */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-white mb-24">

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Pasión, Talento <br />
            <span className="text-[#F6C200]">e Inspiración</span>
          </h2>

          <p className="mt-6 text-white/90 text-lg leading-relaxed">
            En <strong>La Católica GEM</strong>, potenciamos las capacidades de cada
            estudiante a través de una formación integral basada en valores
            cristianos, disciplina y excelencia académica, preparando niños y
            jóvenes para afrontar con seguridad los retos del futuro.
          </p>

          <p className="mt-4 text-white/85 text-base leading-relaxed">
            Nuestro enfoque educativo promueve el desarrollo progresivo de
            habilidades académicas, sociales y humanas, acompañando de manera
            cercana a cada estudiante desde Inicial hasta Secundaria.
          </p>
        </div>

        {/* TARJETA FLOTANTE – WHY US */}
        <div className="relative bg-white rounded-[40px] shadow-2xl px-10 md:px-16 py-20">

          <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 text-center mb-16">
            ¿Por qué elegir <span className="text-[#F6C200]">La Católica GEM</span>?
          </h3>

          <div className="grid md:grid-cols-3 gap-16">

            {/* ITEM 1 */}
            <div className="text-center">
              <div className="
                mx-auto mb-6
                w-24 h-24 rounded-full
                bg-gradient-to-br from-blue-600 to-blue-800
                flex items-center justify-center
                text-white text-3xl
                shadow-xl
              ">
                ✓
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Formación integral con énfasis en{" "}
                <strong>valores cristianos, disciplina y excelencia académica</strong>,
                formando estudiantes responsables y comprometidos.
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="text-center">
              <div className="
                mx-auto mb-6
                w-24 h-24 rounded-full
                bg-gradient-to-br from-[#F6C200] to-[#E0A800]
                flex items-center justify-center
                text-blue-900 text-3xl
                shadow-xl
              ">
                🎓
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Docentes con amplia experiencia y verdadera{" "}
                <strong>vocación educativa</strong>, que acompañan de manera
                cercana el desarrollo de cada estudiante.
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="text-center">
              <div className="
                mx-auto mb-6
                w-24 h-24 rounded-full
                bg-gradient-to-br from-blue-600 to-blue-800
                flex items-center justify-center
                text-white text-3xl
                shadow-xl
              ">
                ⭐
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Más de <strong>22 años formando estudiantes en Pilcomayo</strong>,
                con logros académicos, talleres culturales y un entorno seguro.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ONDA INFERIOR */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[1px]">
        <svg viewBox="0 0 1440 160" className="w-full h-32" preserveAspectRatio="none">
          <path
            fill="#E8F1FF"
            d="M0,96L80,101C160,107,320,117,480,117C640,117,800,107,960,96C1120,85,1280,75,1440,64L1440,160L0,160Z"
          />
        </svg>
      </div>
    </section>
  );
};

/* --------------------------- INFO STRIP MEJORADO -------------------------------- */

const InfoStrip: React.FC = () => (
  <section className="max-w-7xl mx-auto px-6 mt-8 pb-14 relative z-20">
    <div className="rounded-3xl bg-gradient-to-r from-[#0F2A5F] to-[#1E4DB7] shadow-2xl px-6 md:px-12 py-5 flex flex-wrap gap-6 md:gap-10 items-center justify-between text-white">

      {/* TEXTO PRINCIPAL */}
      <div className="flex items-center gap-3 text-sm md:text-base font-semibold">
        <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
          🗓
        </span>
        <span>
          Inicio de clases <strong className="text-[#F6C200]">2026</strong> – Inscripciones abiertas
        </span>
      </div>

      {/* CHIPS */}
      <div className="flex flex-wrap gap-3 text-xs md:text-sm">
        <span className="px-4 py-1.5 rounded-full bg-white/15 border border-white/20 font-medium">
          Inicial · Primaria · Secundaria
        </span>

        <span className="px-4 py-1.5 rounded-full bg-white text-blue-900 font-semibold">
          📞 Informes: 960 119 354 · 943 794 727
        </span>
      </div>
    </div>
  </section>
);

/* -------------------------- NIVELES SECTION (MEJORADO) --------------------------- */

interface NivelesSectionProps {
  getImageUrl: GetImageUrl;
}

const NivelesSection: React.FC<NivelesSectionProps> = ({ getImageUrl }) => (
    <section className="py-28 bg-[#F1F6FF] relative">
    <div className="max-w-7xl mx-auto px-6">

      {/* TÍTULO */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Nuestros <span className="text-[#F6C200]">niveles educativos</span>
        </h2>

        <p className="mt-5 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Formamos estudiantes desde los primeros años hasta el término de la
          Secundaria, con una educación integral basada en valores, disciplina
          y excelencia académica.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-14">

        <NivelCard
          title="Inicial"
          lema="Aprender con amor, crecer con propósito"
          desc="3, 4 y 5 años. Un entorno seguro y afectivo donde los niños desarrollan habilidades sociales, emocionales y cognitivas desde temprana edad."
          imageKey="inicialPortada"
          badge="Vacantes limitadas"
          link="/inicial"
          getImageUrl={getImageUrl}
        />

        <NivelCard
          title="Primaria"
          lema="Bases sólidas para un futuro seguro"
          desc="Fortalecemos Matemática, Comunicación, Ciencia y Tecnología, promoviendo la autonomía, creatividad y responsabilidad en cada estudiante."
          imageKey="primariaPortada"
          badge="Formación de valores"
          link="/primaria"
          getImageUrl={getImageUrl}
        />

        <NivelCard
          title="Secundaria"
          lema="Consolidando metas y proyectos de vida"
          desc="Exigencia académica, asesoría vocacional y orientación preuniversitaria para formar jóvenes preparados para los retos del futuro."
          imageKey="secundariaPortada"
          badge="Orientación preuniversitaria"
          link="/secundaria"
          getImageUrl={getImageUrl}
        />

    </div>
        {/* Onda de transición */}
        <div className="absolute inset-x-0 bottom-0 translate-y-[1px]">
            <svg viewBox="0 0 1440 120" className="w-full h-24" preserveAspectRatio="none">
                <path
                fill="#E2ECFF"
                d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32L1440,160L0,160Z"
                />
            </svg>
            </div>
        </div>
    </section>
);

interface NivelCardProps {
  title: string;
  lema: string;
  desc: string;
  imageKey: string;
  link: string;
  badge: string;
  getImageUrl: GetImageUrl;
}

const NivelCard: React.FC<NivelCardProps> = ({
  title,
  lema,
  desc,
  imageKey,
  link,
  badge,
  getImageUrl,
}) => {
  const src = getImageUrl(imageKey);

  return (
    <article className="group bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2">

      {/* IMAGEN */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {src && (
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-blue-900/90 text-white text-xs font-semibold shadow">
          {badge}
        </span>
      </div>

      {/* CONTENIDO */}
      <div className="p-8 text-center">
        <h3 className="text-2xl font-extrabold text-blue-900">
          {title}
        </h3>

        <p className="mt-2 text-sm font-semibold text-blue-700">
          {lema}
        </p>

        <p className="mt-4 text-gray-600 text-base leading-relaxed">
          {desc}
        </p>

        <a
          href={link}
          className="inline-flex items-center justify-center mt-8 px-7 py-3 rounded-full bg-blue-700 text-white font-semibold shadow-md hover:bg-blue-800 transition"
        >
          Ver más
        </a>
      </div>
    </article>
  );
};

/* --------------------------- VACACIONAL (HOME – FRANJA AZUL HERO) ---------------------------- */

interface VacacionalSectionProps {
  getImageUrl: GetImageUrl;
}

const VacacionalSection: React.FC<VacacionalSectionProps> = ({ getImageUrl }) => {
  const bgImage = getImageUrl("vacacionalBanner");

  return (
    <section
      id="vacacional"
      className="
        relative overflow-hidden
        bg-gradient-to-br from-[#02153A] via-[#032B66] to-[#063B88]
        py-32
      "
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">

        {/* TEXTO IZQUIERDO */}
        <div className="text-white">

          <span className="
            inline-flex items-center gap-2
            px-5 py-2 rounded-full
            bg-white/10 border border-white/20
            text-sm font-semibold tracking-wide
            mb-6
          ">
            🌞 Ciclo Vacacional 2026 · Inicio 05 de enero
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Nivelación y <br />
            <span className="text-[#F6C200]">
              preparación de verano
            </span>
          </h2>

          <p className="mt-6 text-white/85 text-lg leading-relaxed max-w-xl">
            Refuerza Matemática, Comunicación, Ciencia y Tecnología con docentes
            especializados, complementado con actividades recreativas y
            culturales que potencian el aprendizaje y la formación integral.
          </p>

          <ul className="mt-8 space-y-3 text-white/90 text-base">
            <li className="flex gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Inicial (3, 4 y 5 años).
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Primaria de 1.º a 6.º grado.
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Secundaria (1.º a 3.º) y Preuniversitario (4.º y 5.º).
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Dos turnos: 8:00–11:00 a. m. y 11:00–2:00 p. m.
            </li>
            <li className="flex gap-3">
              <span className="text-[#F6C200] font-bold">✔</span>
              Duración: 6 semanas completas.
            </li>
          </ul>
        </div>

        {/* IMAGEN DERECHA */}
        <div className="relative">
          <div className="absolute -inset-6 bg-blue-400/20 blur-2xl rounded-[40px]" />
          <div className="relative rounded-[36px] overflow-hidden shadow-2xl bg-white aspect-[4/3]">
            {bgImage && (
              <img
                src={bgImage}
                alt="Ciclo Vacacional La Católica GEM"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

      </div>

      {/* ONDA INFERIOR – CONEXIÓN SUAVE */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-36"
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

/* ----------------------------- TALLERES / CARRUSEL ----------------------------- */

interface TalleresSectionProps {
  getImageUrl: GetImageUrl;
}

const TalleresSection: React.FC<TalleresSectionProps> = ({ getImageUrl }) => {
  const talleres = [
    { title: "Ajedrez", imageKey: "ajedrez", categoria: "Taller de deporte" },
    { title: "Fútbol", imageKey: "futbol", categoria: "Taller de deporte" },
    { title: "Vóley", imageKey: "voley", categoria: "Taller de deporte" },
    { title: "Música", imageKey: "musica", categoria: "Taller de arte" },
    { title: "Dibujo y Pintura", imageKey: "dibujo", categoria: "Taller de arte" },
    { title: "Robótica", imageKey: "robotica", categoria: "Taller de tecnología" },
  ];

  return (
    <section className="py-24 bg-[#E8F1FF]">
      <div className="max-w-7xl mx-auto px-6">

        {/* TÍTULO */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            Centro Cultural <span className="text-[#F6C200]">Católica 2026</span>
          </h2>

          <p className="mt-4 text-lg text-gray-700">
            Talleres de deporte, arte y tecnología desde el{" "}
            <strong>05 de enero</strong>.
          </p>
        </div>

        {/* CARRUSEL */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {talleres.map((taller) => (
              <TallerSlide
                key={taller.title}
                {...taller}
                getImageUrl={getImageUrl}
              />
            ))}
          </div>
        </div>

        {/* TEXTO FINAL */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Además contamos con talleres de Oratoria y Debate, Danza y Computación con IA.
        </p>
      </div>
    </section>
  );
};

interface TallerSlideProps {
  title: string;
  imageKey: string;
  categoria: string;
  getImageUrl: GetImageUrl;
}

const TallerSlide: React.FC<TallerSlideProps> = ({
  title,
  imageKey,
  categoria,
  getImageUrl,
}) => {
  const src = getImageUrl(imageKey);

  return (
    <article className="min-w-[280px] md:min-w-[340px] snap-center bg-white rounded-[28px] shadow-xl hover:shadow-2xl transition overflow-hidden">
      
      {/* IMAGEN */}
      <div className="aspect-[4/3] overflow-hidden">
        {src && (
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>

      {/* TEXTO */}
      <div className="p-5">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {categoria}
        </p>

        <h3 className="text-lg font-extrabold text-blue-900 mt-1">
          {title}
        </h3>
      </div>
    </article>
  );
};