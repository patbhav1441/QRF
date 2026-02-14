import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Atom, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#mission", label: "Mission", isSection: true },
  { href: "#focus-areas", label: "Focus Areas", isSection: true },
  { href: "/founder", label: "Founder", isSection: false },
  { href: "/blog", label: "Blog", isSection: false },
  { href: "/events", label: "Events", isSection: false },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isSection: boolean) => {
    if (isSection) {
      if (location !== "/") {
        window.location.href = "/" + href;
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Atom className="h-8 w-8 text-primary transition-transform group-hover:rotate-180 duration-700" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight" data-testid="text-logo">
                Quantum Rise
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Foundation
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.isSection ? (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.isSection)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/donate">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-2" data-testid="button-donate-nav">
                <Heart className="h-4 w-4" />
                Donate
              </Button>
            </Link>
            <Button
              onClick={() => handleNavClick("#get-involved", true)}
              className="hidden sm:inline-flex"
              data-testid="button-get-involved-nav"
            >
              Get Involved
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    link.isSection ? (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href, link.isSection)}
                        className="text-lg font-medium text-left hover:text-primary transition-colors"
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full gap-2 mt-2" data-testid="button-donate-mobile">
                      <Heart className="h-4 w-4" />
                      Donate
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleNavClick("#get-involved", true)}
                    className="w-full"
                    data-testid="button-get-involved-mobile"
                  >
                    Get Involved
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
