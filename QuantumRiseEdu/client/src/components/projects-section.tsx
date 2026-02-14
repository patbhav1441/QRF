import { useState } from "react";
import { Leaf, Heart, TrendingUp, Brain, Cpu, ExternalLink, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { focusAreas } from "@shared/schema";

const categoryInfo: Record<string, { icon: typeof Leaf; color: string; badgeColor: string }> = {
  environmental: { 
    icon: Leaf, 
    color: "text-green-600 dark:text-green-400",
    badgeColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  },
  health: { 
    icon: Heart, 
    color: "text-red-600 dark:text-red-400",
    badgeColor: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
  },
  finance: { 
    icon: TrendingUp, 
    color: "text-blue-600 dark:text-blue-400",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  },
  "ai-cyber": { 
    icon: Brain, 
    color: "text-purple-600 dark:text-purple-400",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
  },
  mechatronics: { 
    icon: Cpu, 
    color: "text-orange-600 dark:text-orange-400",
    badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
  },
};

// Flatten all projects for display
const allProjects = focusAreas.flatMap((area) =>
  area.projects.map((project, idx) => ({
    id: `${area.id}-${idx}`,
    title: project,
    category: area.id,
    categoryTitle: area.title,
    description: getProjectDescription(project),
  }))
);

function getProjectDescription(projectTitle: string): string {
  const descriptions: Record<string, string> = {
    "Exhaust pipe probe for carbon output measurement": "Develop sensors to measure and analyze vehicle emissions in real-time, contributing to environmental monitoring efforts.",
    "Extreme weather condition forecasting": "Use quantum algorithms to improve weather prediction accuracy for extreme events like hurricanes and floods.",
    "Water quality monitoring (pH, saltiness, cleanliness)": "Build IoT devices that continuously monitor water quality parameters to ensure safe drinking water.",
    "Quantum optimized recycling logistics": "Apply quantum optimization to improve recycling collection routes and sorting efficiency.",
    "Epidemic prediction using diagnosis data and travel patterns": "Leverage AI and quantum computing to predict disease outbreaks before they spread.",
    "Molecular interaction simulations": "Simulate drug interactions at the molecular level to accelerate pharmaceutical research.",
    "Thermodynamics behavior modeling": "Explore quantum thermodynamics to understand energy transfer in biological systems.",
    "Brain neuron connection simulations": "Model neural networks using quantum computing to advance neuroscience research.",
    "Quantum portfolio optimization": "Apply quantum algorithms to optimize investment portfolios for better risk-adjusted returns.",
    "Supply chain cost optimization": "Use quantum optimization to reduce costs and improve efficiency in supply chains.",
    "Quantum blockchain exploration": "Research quantum-resistant blockchain technologies for future-proof financial systems.",
    "Quantum-enhanced financial modeling & risk analysis": "Develop advanced risk models using quantum computing for financial institutions.",
    "Quantum neural networks": "Build hybrid quantum-classical neural networks for enhanced machine learning.",
    "NLP processing via quantum computing": "Explore quantum approaches to natural language processing tasks.",
    "Quantum cryptography and encryption": "Research quantum key distribution and post-quantum cryptographic methods.",
    "Attack simulation and encryption solutions": "Simulate cyber attacks to test and strengthen quantum encryption systems.",
    "Robotics with Arduino and Raspberry Pi": "Build hands-on robotics projects using accessible single-board computers.",
    "Web hosting on single board computers": "Learn to deploy and manage web applications on resource-efficient hardware.",
    "Kubernetes clusters for efficiency": "Create distributed computing clusters for parallel processing tasks.",
    "AI and LLM integration projects": "Integrate large language models into practical applications using edge computing.",
  };
  return descriptions[projectTitle] || "An innovative project applying quantum computing and AI to solve real-world challenges.";
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? allProjects.filter((p) => p.category === selectedCategory)
    : allProjects;

  const displayedProjects = filteredProjects.slice(0, 8);

  return (
    <section id="projects" className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Potential Initiatives
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-projects">
            Project Showcase
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the innovative projects our students can work on across five key areas, 
            applying quantum computing and AI to create meaningful impact.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="gap-2"
            data-testid="filter-all"
          >
            <Filter className="h-4 w-4" />
            All Projects
          </Button>
          {focusAreas.map((area) => {
            const Icon = categoryInfo[area.id].icon;
            return (
              <Button
                key={area.id}
                variant={selectedCategory === area.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(area.id)}
                className="gap-2"
                data-testid={`filter-${area.id}`}
              >
                <Icon className="h-4 w-4" />
                {area.title.split(" ")[0]}
              </Button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProjects.map((project) => {
            const Icon = categoryInfo[project.category].icon;
            return (
              <Card key={project.id} className="group hover-elevate overflow-visible" data-testid={`card-project-${project.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${categoryInfo[project.category].badgeColor} border-0 text-xs`}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {project.category === "ai-cyber" ? "AI & Cyber" : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-base mb-2 leading-tight" data-testid={`project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All */}
        {filteredProjects.length > 8 && (
          <div className="text-center mt-10">
            <p className="text-muted-foreground">
              Showing 8 of {filteredProjects.length} projects
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
