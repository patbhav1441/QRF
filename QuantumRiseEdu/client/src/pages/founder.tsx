import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

export default function Founder() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                <Card className="relative overflow-hidden border-none shadow-2xl bg-muted aspect-[4/5] flex items-center justify-center">
                  <div className="text-center p-8">
                    <User className="h-24 w-24 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">Founder Image Space</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">Replace this placeholder with Bhavya Patel's portrait</p>
                  </div>
                  {/* Overlay for aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                </Card>
                
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-6">
                <div>
                  <Badge variant="secondary" className="mb-4">Founder & Executive Director</Badge>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2" data-testid="text-founder-name">
                    Bhavya Patel
                  </h1>
                  <p className="text-xl text-primary font-medium">Visionary behind Quantum Rise Foundation</p>
                </div>

                <Separator className="bg-primary/20" />

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Bhavya Patel founded the Quantum Rise Foundation with a singular vision: to democratize access to 
                    the most transformative technologies of our age. Recognizing that Quantum Computing and AI 
                    are not just future trends but current tools for global change, Bhavya established the 
                    foundation to bridge the gap between complex theory and real-world impact.
                  </p>
                  <p>
                    Under Bhavya's leadership, the foundation has grown into a hub for students across Georgia, 
                    focusing on both high-level education and the practical implementation of solutions in 
                    sustainability, healthcare, and cybersecurity.
                  </p>
                  <p>
                    "We are not just teaching students how to code or understand quantum mechanics; we are 
                    empowering them to build a better world with these tools. The future of innovation is 
                    inclusive, ethical, and quantum-ready."
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-foreground font-bold text-2xl">2024</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Founded</span>
                  </div>
                  <Separator orientation="vertical" className="h-12" />
                  <div className="flex flex-col">
                    <span className="text-foreground font-bold text-2xl">GA</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Base</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
