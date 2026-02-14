import { GraduationCap, Lightbulb, Users, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const missionPillars = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Teaching students the fundamentals of Quantum Computing and Artificial Intelligence, preparing them for the technologies that will shape our future.",
  },
  {
    icon: Lightbulb,
    title: "Implementation",
    description: "Transforming theoretical knowledge into practical solutions that address real-world challenges in our communities and environment.",
  },
];

const impactMetrics = [
  { value: "5", label: "Focus Areas", icon: Target },
  { value: "20+", label: "Potential Projects", icon: Lightbulb },
  { value: "Georgia", label: "Based In", icon: Users },
  { value: "USG", label: "University System", icon: GraduationCap },
];

export function MissionSection() {
  return (
    <section id="mission" className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-mission">
            Our Dual Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Quantum Rise Foundation bridges the gap between advanced technology education and 
            practical implementation, creating pathways for students to make real impact.
          </p>
        </div>

        {/* Mission Pillars */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {missionPillars.map((pillar, index) => (
            <Card key={pillar.title} className="group relative overflow-visible hover-elevate" data-testid={`card-pillar-${pillar.title.toLowerCase()}`}>
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center">
                      <pillar.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl font-bold text-primary/20">0{index + 1}</span>
                      <h3 className="text-2xl font-bold" data-testid={`heading-pillar-${pillar.title.toLowerCase()}`}>
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quote */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-md" />
          <blockquote className="relative py-12 px-8 lg:px-16 text-center">
            <p className="text-2xl lg:text-3xl font-medium italic text-foreground leading-relaxed max-w-4xl mx-auto">
              "We believe that empowering students with quantum computing and AI knowledge today 
              will create the problem-solvers of tomorrow."
            </p>
            <footer className="mt-6 text-muted-foreground">
              — Quantum Rise Foundation
            </footer>
          </blockquote>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric) => (
            <Card key={metric.label} className="text-center hover-elevate" data-testid={`card-metric-${metric.label.toLowerCase().replace(" ", "-")}`}>
              <CardContent className="p-6 lg:p-8">
                <metric.icon className="h-8 w-8 mx-auto text-primary mb-4" />
                <div className="text-3xl lg:text-4xl font-bold mb-2" data-testid={`metric-${metric.label.toLowerCase().replace(" ", "-")}`}>
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
