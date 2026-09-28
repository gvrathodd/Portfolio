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

// One day, top to bottom: dawn, morning, midday, golden hour, dusk, night.
// Colour moves through neighbouring hues (never straight from blue to orange, which greys out),
// and each band starts on the colour the previous one ended on.
const sky = {
  // indigo -> violet -> plum -> raspberry -> coral -> apricot
  dawn: 'linear-gradient(180deg, #221f4f 0%, #3a2c6b 22%, #6b3a7e 42%, #b24a78 60%, #e46b62 76%, #f7955e 88%, #ffc27a 100%)',
  // apricot -> cream (neutral bridge) -> pale sky
  morning: 'linear-gradient(180deg, #ffc27a 0%, #ffd7a3 14%, #ffe9cf 32%, #f4f1ea 50%, #dcecf8 72%, #c6e3f8 100%)',
  midday: 'linear-gradient(180deg, #c6e3f8 0%, #a6d2f6 50%, #84bcef 100%)',
  // blue -> periwinkle -> lilac -> pink -> peach -> orange, the way a real sunset turns
  goldenHour: 'linear-gradient(180deg, #84bcef 0%, #a2b6ee 22%, #c6b0e2 42%, #eeb3c3 62%, #fbb592 80%, #f89663 100%)',
  // orange -> rose -> magenta -> violet -> indigo -> navy
  dusk: 'linear-gradient(180deg, #f89663 0%, #e2676d 8%, #b4487a 18%, #6f3a86 32%, #3b3380 50%, #222d6c 72%, #16275a 100%)',
  night: 'linear-gradient(180deg, #16275a 0%, #0f1f4a 40%, #060f28 100%)',
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
      <Band tone="light" background={sky.goldenHour} glass decor={<GlassOrbs layout="skills" />}>
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
