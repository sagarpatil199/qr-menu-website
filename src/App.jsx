import { lazy, Suspense, useCallback, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import StoryProgress from './components/StoryProgress.jsx';
import { StoryDesktop, StoryMobile } from './components/Story.jsx';
import Pricing from './components/Pricing.jsx';
import Clients from './components/Clients.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import Scene07 from './scenes/Scene07.jsx';
import Scene08 from './scenes/Scene08.jsx';
import { useMediaQuery } from './hooks/useStoryProgress.js';

const DemoModal = lazy(() => import('./components/DemoModal.jsx'));

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 900px) and (min-height: 560px)');
  const reduced = useReducedMotion();
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  const cinematic = isDesktop && !reduced;
  const layoutKey = cinematic ? 'desktop' : 'stacked';

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#features">Skip the story</a>
      <Navbar />
      <StoryProgress layoutKey={layoutKey} />
      <main id="top">
        {cinematic ? <StoryDesktop key="d" /> : <StoryMobile key="m" reduced={Boolean(reduced)} />}
        <Scene07 onOpenDemo={openDemo} />
        <Clients />
        <Pricing />
        <Scene08 onOpenDemo={openDemo} />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Suspense fallback={null}>{demoOpen && <DemoModal open={demoOpen} onClose={closeDemo} />}</Suspense>
    </MotionConfig>
  );
}
