
import React, { useState, useRef } from 'react';
import { Project } from '../../types';
import { projects } from '../../data/projects';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import ProjectsSection from '../../components/ProjectsSection';
import HowItWorks from '../../components/HowItWorks';
import Constructor from '../../components/Constructor';
import WhyUs from '../../components/WhyUs';
import Gallery from '../../components/Gallery';
import Testimonials from '../../components/Testimonials';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import { Helmet } from "react-helmet-async";

function HomePage() {
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
      <>
            <Helmet>
              <link rel="canonical" href="https://www.d-stroy-chita.ru/" />
            <title>Каркасные дома по цене квартиры в Чите |
Тектоника</title>
            <meta
              name="description"
              content="Не покупайте студию! Соберите свой дом от
80 м² за те же деньги. Онлайн-конструктор на сайте. Гарантия,
маткапитал. Строительная компания 'Тектоника'"
            />
          </Helmet>
    <div className="min-h-screen bg-brand-light font-sans">
      <Header />
      <main>
        <Hero onScrollToConstructor={handleScrollToConstructor} /> 
        <div ref={constructorRef}>
          <Constructor project={selectedProject} />
        </div>
        <ProjectsSection onSelectProject={handleSelectProject} />
        <HowItWorks />
       
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Contact onScrollToConstructor={handleScrollToConstructor}  />
      </main>
      <Footer />
    </div>
    </>
  );
};



export default HomePage;