import React from 'react';
import { Band } from './components/Band';
import { GlassOrbs } from './components/GlassOrbs';
import { Navbar } from './components/Navbar';
import { Hero, MorningSky } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact, NightSky } from './components/Contact';
import { Footer } from './components/Footer';
import { SmoothScroll } from './components/SmoothScroll';

// One day, top to bottom: dawn, morning, midday, afternoon, dusk, night.
// Colour moves through neighbouring hues (never straight from blue to orange, which greys out),
// and each band starts on the colour the previous one ended on.
const sky = {
  // indigo -> violet -> plum -> raspberry -> coral -> apricot
  dawn: 'linear-gradient(180deg, #221f4f 0%, #3a2c6b 22%, #6b3a7e 42%, #b24a78 60%, #e46b62 76%, #f7955e 88%, #ffc27a 100%)',
  // apricot melts quickly into warm cream that lingers, then a fresh pale morning blue
  morning: 'linear-gradient(180deg, #ffc27a 0%, #fbdcba 9%, #f8ead9 22%, #f6f0e8 42%, #eef1f1 62%, #dde9f4 82%, #c6e3f8 100%)',
  midday: 'linear-gradient(180deg, #c6e3f8 0%, #a6d2f6 50%, #84bcef 100%)',
  // pale blue -> periwinkle -> soft lilac: the afternoon cools rather than blazing orange
  afternoon: 'linear-gradient(180deg, #84bcef 0%, #9fb8ea 30%, #b6b2e0 62%, #c6aed8 100%)',
  // lilac -> muted purple: dusk settles into the same purple the day started with
  dusk: 'linear-gradient(180deg, #c6aed8 0%, #8c78b4 5%, #614f91 13%, #45397a 32%, #2f2860 66%, #241f4f 100%)',
  // dark purple night, bookending the dawn hero
  night: 'linear-gradient(180deg, #241f4f 0%, #1c1840 45%, #120f2c 100%)',
};

export const App: React.FC = () => (
  <div className="min-h-[100dvh]">
    <SmoothScroll />
    <Navbar />
    <main>
      <Band tone="dark" variant="dawn" background={sky.dawn} decor={<MorningSky />}>
        <Hero />
      </Band>
      <Band tone="light" background={sky.morning} glass decor={<GlassOrbs layout="about" />}>
        <About />
      </Band>
      <Band tone="light" background={sky.midday} glass decor={<GlassOrbs layout="work" />}>
        <Projects />
      </Band>
      <Band tone="light" background={sky.afternoon} glass decor={<GlassOrbs layout="skills" />}>
        <Skills />
      </Band>
      <Band tone="dark" background={sky.dusk} glass decor={<GlassOrbs layout="experience" />}>
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
