
import React, { useState, useRef } from 'react';
import { Project } from './types';
import { projects } from './data/projects';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import HowItWorks from './components/HowItWorks';
import Constructor from './components/Constructor';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const constructorRef = useRef<HTMLDivElement>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setTimeout(() => {
        constructorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleScrollToConstructor = () => {
     constructorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans">
      <Header />
      <main>
        <Hero onScrollToConstructor={handleScrollToConstructor} />
        <ProjectsSection onSelectProject={handleSelectProject} />
        <HowItWorks />
        <div ref={constructorRef}>
          <Constructor project={selectedProject} />
        </div>
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
