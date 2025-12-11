'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Landing.module.scss';

// SVG Icons as components or simple imgs
const FlashIcon = () => (
  <Image src="/images/mingcute_flash-line.svg" alt="Rapide" width={64} height={64} />
);

const SearchMagnifierIcon = () => (
  <Image src="/images/si_search-fill.svg" alt="Recherche" width={64} height={64} />
);

const StarsIcon = () => (
  <Image src="/images/mingcute_ai-line.svg" alt="IA" width={64} height={64} />
);

export default function LandingPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/chat');
    }
  };

  return (
    <main className={styles.landingContainer}>
      <nav className={styles.navbar}>
        <a href="#home">Accueil</a>
        <a href="#why">Pourquoi Kino ?</a>
        <a href="#roadmap">Prochainement</a>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.logo}>
          <Image
            src="/images/kino-logo.svg"
            alt="Kino Logo"
            width={250}
            height={100}
            priority
          />
        </div>

        <h1>Demandez-lui, Kino s’en charge</h1>

        <form onSubmit={handleSearch} className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="En quoi puis-je vous aider ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Rechercher">
            <Image src="/images/kino-picto-gris.svg" alt="Go" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
        </form>
      </section>

      {/* WHY KINO SECTION */}
      <section id="why" className={styles.whySection}>
        <h2>Pourquoi Kino ?</h2>
        {/* Separator Image */}
        <Image
          src="/images/line.png"
          alt="Séparateur"
          width={1200}
          height={200}
          className={styles.separatorLine}
        />

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <FlashIcon />
            <h3>Moins de clics,<br />plus de temps</h3>
            <p>
              K.I.N.O retrouve le <strong>bon document</strong> à partir de <strong>quelques mots</strong>, d’un contexte ou d’un nom de client.
              Plus besoin de fouiller vos <strong>dossiers</strong> ou vos <strong>mails</strong> : vous posez la question, l’assistant vous <strong>apporte le fichier</strong>.
            </p>
          </div>

          <div className={styles.featureCard}>
            <SearchMagnifierIcon />
            <h3>L’ordre sans<br />l’effort</h3>
            <p>
              Au lieu de réorganiser votre <strong>drive</strong> à la main, <strong>K.I.N.O</strong> détecte les fichiers mal rangés, les doublons et les versions obsolètes.
              Il vous propose une <strong>structure</strong> plus claire, adaptée à vos projets et à votre <strong>façon de travailler</strong>.
            </p>
          </div>

          <div className={styles.featureCard}>
            <StarsIcon />
            <h3>L’IA qui respecte<br />vos données</h3>
            <p>
              K.I.N.O fonctionne en arrière-plan, s'intègre à vos <strong>outils existants</strong> et <strong>respecte les droits d'accès</strong> de chacun.
              Vos documents restent <strong>protégés</strong>, votre quotidien devient <strong>plus fluide</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      {/* COMING SOON SECTION */}
      <section id="roadmap" className={styles.comingSoonSection}>
        <h2>Prochainement</h2>

        <div className={styles.roadmapGrid}>
          <div className={styles.roadmapCard}>
            <h3>Fusions des<br />dossiers</h3>
          </div>
          <div className={styles.roadmapCard}>
            <h3>Synthèse<br />vocale</h3>
          </div>
          <div className={styles.roadmapCard}>
            <h3>Réorganisation<br />des dossiers</h3>
          </div>
          <div className={`${styles.roadmapCard} ${styles.wide}`}>
            <h3>Changement de nomenclature<br />automatique</h3>
          </div>
          <div className={styles.roadmapCard}>
            <h3>Reconnaissance<br />des documents</h3>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.leftSide}>
            <Image
              src="/images/kino-logo.svg"
              alt="Kino Logo"
              width={100}
              height={40}
              className={styles.footerLogo}
              style={{ filter: 'brightness(100)' }} // Ensure visibility on dark bg if needed
            />
            <div className={styles.address}>
              <p>40 Rue du Chemin Vert<br />75011, Paris</p>
              <p><a href="mailto:contact@kino.fr">contact@kino.fr</a></p>
              <p>01 64 56 74 97</p>
            </div>
          </div>

          <div className={styles.links}>
            <a href="#home">Accueil</a>
            <a href="#why">Pourquoi Kino ?</a>
            <a href="#roadmap">Prochainement</a>
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
          </div>
        </div>
        <div className={styles.copyright}>
            © 2025 Kino. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
