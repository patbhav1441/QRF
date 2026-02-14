import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, Users, ExternalLink, CalendarDays, Video, Building } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { Event } from "@shared/schema";
import { format } from "date-fns";

const eventTypeInfo: Record<string, { label: string; color: string }> = {
  workshop: { 
    label: "Workshop",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  },
  lecture: { 
    label: "Lecture",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  },
  hackathon: { 
    label: "Hackathon",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
  },
  meetup: { 
    label: "Meetup",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
  },
};

const locationIcon: Record<string, typeof Video> = {
  "Online": Video,
  "In-Person": Building,
  "Hybrid": Users,
};

function EventCard({ event }: { event: Event }) {
  const eventType = eventTypeInfo[event.eventType] || eventTypeInfo.workshop;
  const LocationIcon = locationIcon[event.location] || MapPin;

  return (
    <Card className="group hover-elevate overflow-visible" data-testid={`card-event-${event.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="outline" className={`${eventType.color} border-0 text-xs`}>
            {eventType.label}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <LocationIcon className="h-3 w-3 mr-1" />
            {event.location}
          </Badge>
        </div>
        <h3 className="text-xl font-bold leading-tight" data-testid={`event-title-${event.id}`}>
          {event.title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{format(new Date(event.startDate), "h:mm a")}</span>
            {event.endDate && (
              <span>- {format(new Date(event.endDate), "h:mm a")}</span>
            )}
          </div>
          {event.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.venue}</span>
            </div>
          )}
          {event.maxAttendees && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Limited to {event.maxAttendees} attendees</span>
            </div>
          )}
        </div>

        {event.registrationUrl && (
          <Button asChild className="w-full gap-2">
            <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-register-${event.id}`}>
              Register Now
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function EventSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-16 w-full mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Events() {
  const { data, isLoading, error } = useQuery<{ success: boolean; events: Event[] }>({
    queryKey: ["/api/events"],
  });

  const events = data?.events || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Workshops & Sessions
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-events">
                Upcoming Events
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join us for workshops, lectures, and educational sessions on quantum computing, 
                AI, and hands-on technology projects.
              </p>
            </div>

            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <EventSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load events. Please try again later.</p>
              </div>
            )}

            {!isLoading && !error && events.length === 0 && (
              <div className="text-center py-12">
                <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We're planning exciting events. Subscribe to our newsletter to be the first to know!
                </p>
              </div>
            )}

            {!isLoading && !error && events.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
