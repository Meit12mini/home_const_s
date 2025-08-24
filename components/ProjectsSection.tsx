import React from 'react';
import { Project } from '../types';
import { projects } from '../data/projects';
import Button from './ui/Button';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const standardProjects = projects.filter(p => !p.isCustom);
  const customProject = projects.find(p => p.isCustom);

  // Calculate the starting price for the custom project
  let customProjectStartPrice = 0;
  if (customProject) {
    const baseConfig = customProject.configurationLevels[0];
    // More robust check for price calculation to prevent showing "0 ₽" incorrectly.
    if (baseConfig && typeof baseConfig.pricePerSqm === 'number' && typeof customProject.area === 'number') {
      customProjectStartPrice = baseConfig.pricePerSqm * customProject.area;
    }
  }

  return (
    <section id="projects" className="py-16 sm:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark">Наши проекты</h2>
            <p className="mt-4 text-lg text-gray-600">Выберите типовой проект и настройте его под себя</p>
        </div>
        
        {/* Standard Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {standardProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 flex flex-col">
                <img src={project.images[0]} alt={project.name} className="w-full h-56 object-cover"/>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">{project.name}</h3>
                    <div className="flex space-x-4 text-gray-600 mb-4">
                        <span>Площадь: {project.area} м²</span>
                        <span>Спален: {project.bedrooms}</span>
                    </div>
                    <p className="text-3xl font-extrabold text-brand-blue mb-6 flex-grow">
                        от {project.configurationLevels[0].priceModifier.toLocaleString('ru-RU')} ₽
                    </p>
                    <div className="mt-auto">
                      <Button onClick={() => onSelectProject(project)} variant="secondary" className="w-full">
                          Выбрать и рассчитать
                      </Button>
                    </div>
                </div>
            </div>
          ))}
        </div>

        {/* Custom Project Full-Width Card */}
        {customProject && (
            <div className="mt-12 lg:mt-16 max-w-5xl mx-auto">
                 <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 p-8 w-full">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="text-center lg:text-left flex-grow">
                            <h3 className="text-2xl font-bold text-brand-dark mb-2">{customProject.name}</h3>
                            {customProject.description && (
                               <p className="text-gray-600 max-w-2xl mx-auto lg:mx-0">{customProject.description}</p>
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-end gap-6 mt-4 lg:mt-0 flex-shrink-0">
                            <p className="text-3xl font-extrabold text-brand-blue whitespace-nowrap">
                                от {customProjectStartPrice.toLocaleString('ru-RU')} ₽
                            </p>
                            <Button onClick={() => onSelectProject(customProject)} variant="secondary" size="lg" className="w-full sm:w-auto">
                                Настроить свой проект
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;