import React from 'react';
import { Band } from './components/Band';
import { Navbar } from './components/Navbar';
import { Hero, MorningSky } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact, NightSky } from './components/Contact';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';

// The page scrolls from morning to night; each band picks up where the last one ended.
const sky = {
  morning: 'linear-gradient(180deg, #5aa9e6 0%, #86c1ef 30%, #b3d9f6 65%, #cbe6fa 100%)',
  midday: 'linear-gradient(180deg, #cbe6fa 0%, #b5dbf7 100%)',
  afternoon: 'linear-gradient(180deg, #b5dbf7 0%, #8cc3ef 60%, #6aa6dc 100%)',
  dusk: 'linear-gradient(180deg, #6aa6dc 0%, #2d5ca6 16%, #1f4388 55%, #16316b 100%)',
  evening: 'linear-gradient(180deg, #16316b 0%, #0f2554 100%)',
  night: 'linear-gradient(180deg, #0f2554 0%, #0a1a40 45%, #060f28 100%)',
};

export const App: React.FC = () => (
  <div className="min-h-[100dvh]">
    <SmoothScroll />
    <Navbar />
    <main>
      <Band tone="light" background={sky.morning} decor={<MorningSky />}>
        <Hero />
      </Band>
      <Band tone="light" background={sky.midday}>
        <About />
      </Band>
      <Band tone="light" background={sky.afternoon}>
        <Projects />
      </Band>
      <Band tone="dark" background={sky.dusk}>
        <Skills />
      </Band>
      <Band tone="dark" background={sky.evening}>
        <Experience />
      </Band>
      <Band tone="dark" background={sky.night} decor={<NightSky />}>
        <Contact />
        <Footer />
      </Band>
    </main>
  </div>
);

export default App;
