import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => (
  <div className="min-h-[100dvh]">
    <Navbar />
    <main className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default App;
