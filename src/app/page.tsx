import { ArrowDown } from 'lucide-react';
import Hero from './components/hero';
import Navbar from './components/navbar';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/projects';
import Contact from './components/contact';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <Navbar />
        <div className="container mx-auto px-4">
          <section id="home" className="min-h-screen flex items-center justify-center relative">
            <Hero />
            <div className="absolute bottom-10 animate-bounce">
              <a
                href="#about"
                className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="mb-2">Scroll Down</span>
                <ArrowDown size={20} />
              </a>
            </div>
          </section>

          <section id="about" className="min-h-screen py-20">
            <About />
          </section>

          <section id="skills" className="min-h-screen py-20">
            <Skills />
          </section>

          <section id="projects" className="min-h-screen py-20">
            <Projects />
          </section>

          <section id="contact" className="min-h-screen py-20">
            <Contact />
          </section>
          <section id="footer">
            <footer className="flex flex-col w-full justify-center items-center text-sm p-10">
              <p>© Copyright {new Date().getFullYear()}</p>
              <p>
                Designed & Built by <strong>Michael Cecchini</strong>
              </p>
            </footer>
          </section>
        </div>
      </main>
    </>
  );
}
