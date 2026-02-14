import { Leaf, Heart, TrendingUp, Brain, Cpu, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { focusAreas } from "@shared/schema";

import environmentalIcon from "@assets/generated_images/environmental_sustainability_icon.png";
import healthIcon from "@assets/generated_images/health_medicine_icon.png";
import financeIcon from "@assets/generated_images/finance_economics_icon.png";
import aiCyberIcon from "@assets/generated_images/ai_cybersecurity_icon.png";
import mechatronicsIcon from "@assets/generated_images/mechatronics_robotics_icon.png";

const iconMap: Record<string, string> = {
  environmental: environmentalIcon,
  health: healthIcon,
  finance: financeIcon,
  "ai-cyber": aiCyberIcon,
  mechatronics: mechatronicsIcon,
};

const lucideIconMap: Record<string, typeof Leaf> = {
  environmental: Leaf,
  health: Heart,
  finance: TrendingUp,
  "ai-cyber": Brain,
  mechatronics: Cpu,
};

const colorMap: Record<string, string> = {
  environmental: "from-green-500/20 to-emerald-500/20",
  health: "from-red-500/20 to-rose-500/20",
  finance: "from-blue-500/20 to-cyan-500/20",
  "ai-cyber": "from-purple-500/20 to-violet-500/20",
  mechatronics: "from-orange-500/20 to-amber-500/20",
};

export function FocusAreasSection() {
  return (
    <section id="focus-areas" className="py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Implementation Areas
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-focus-areas">
            Five Pillars of Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our students apply quantum computing and AI knowledge across five key areas, 
            creating innovative solutions that address real-world challenges.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {focusAreas.map((area, index) => {
            const LucideIcon = lucideIconMap[area.id];
            return (
              <Card 
                key={area.id} 
                className={`group relative overflow-visible hover-elevate ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                data-testid={`card-focus-area-${area.id}`}
              >
                <CardContent className="p-6 lg:p-8">
                  {/* Icon Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`relative w-16 h-16 rounded-md bg-gradient-to-br ${colorMap[area.id]} flex items-center justify-center overflow-hidden`}>
                      <img 
                        src={iconMap[area.id]} 
                        alt={area.title}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold leading-tight mb-1" data-testid={`heading-area-${area.id}`}>
                        {area.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <LucideIcon className="h-3 w-3" />
                        <span>{area.projects.length} projects</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {area.description}
                  </p>

                  {/* Sample Projects */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-foreground uppercase tracking-wide mb-3">
                      Example Projects
                    </div>
                    {area.projects.slice(0, 2).map((project) => (
                      <div
                        key={project}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ArrowRight className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>{project}</span>
                      </div>
                    ))}
                    {area.projects.length > 2 && (
                      <div className="text-xs text-primary font-medium mt-2">
                        +{area.projects.length - 2} more projects
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
