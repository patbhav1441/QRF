import { BookOpen, Video, FileText, Link as LinkIcon, ExternalLink, GraduationCap, Atom, Code } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const resources = [
  {
    id: "quantum-basics",
    title: "Quantum Computing Fundamentals",
    description: "Start your journey into quantum computing with curated learning paths covering qubits, superposition, and entanglement.",
    icon: Atom,
    type: "Learning Path",
    links: [
      { label: "IBM Quantum Learning", url: "https://learning.quantum.ibm.com/" },
      { label: "Qiskit Textbook", url: "https://qiskit.org/textbook/" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Explore artificial intelligence and machine learning concepts through interactive courses and hands-on projects.",
    icon: Code,
    type: "Course Collection",
    links: [
      { label: "Google AI Education", url: "https://ai.google/education/" },
      { label: "Fast.ai", url: "https://www.fast.ai/" },
    ],
  },
  {
    id: "stem-education",
    title: "STEM Resources",
    description: "Access free educational materials covering science, technology, engineering, and mathematics fundamentals.",
    icon: GraduationCap,
    type: "Resource Hub",
    links: [
      { label: "Khan Academy", url: "https://www.khanacademy.org/" },
      { label: "MIT OpenCourseWare", url: "https://ocw.mit.edu/" },
    ],
  },
  {
    id: "hands-on",
    title: "Hands-On Projects",
    description: "Get started with practical projects using Raspberry Pi, Arduino, and other single-board computers.",
    icon: FileText,
    type: "Project Guides",
    links: [
      { label: "Raspberry Pi Projects", url: "https://projects.raspberrypi.org/" },
      { label: "Arduino Tutorials", url: "https://www.arduino.cc/en/Tutorial/HomePage" },
    ],
  },
];

export function ResourcesSection() {
  return (
    <section id="resources" className="py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Learn & Grow
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-resources">
            Educational Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Access curated learning materials to build your foundation in quantum computing, 
            AI, and the technologies that power our projects.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {resources.map((resource) => (
            <Card key={resource.id} className="group hover-elevate overflow-visible" data-testid={`card-resource-${resource.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold" data-testid={`resource-title-${resource.id}`}>
                      {resource.title}
                    </h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {resource.links.map((link) => (
                    <Button
                      key={link.label}
                      variant="outline"
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-resource-${resource.id}-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <LinkIcon className="h-3 w-3" />
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="inline-block max-w-2xl mx-auto">
            <CardContent className="p-8">
              <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Want More Resources?</h3>
              <p className="text-muted-foreground mb-6">
                Join our community to access exclusive educational materials, project guides, 
                and mentorship opportunities from industry professionals.
              </p>
              <Button
                onClick={() => {
                  const element = document.querySelector("#get-involved");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-join-for-resources"
              >
                Join Our Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
