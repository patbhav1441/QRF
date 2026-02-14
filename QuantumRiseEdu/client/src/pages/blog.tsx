import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowRight, Tag, Newspaper, BookOpen, Folder } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

const categoryInfo: Record<string, { icon: typeof Newspaper; label: string; color: string }> = {
  news: { 
    icon: Newspaper, 
    label: "News",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
  },
  educational: { 
    icon: BookOpen, 
    label: "Educational",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
  },
  "project-update": { 
    icon: Folder, 
    label: "Project Update",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
  },
};

function BlogPostCard({ post }: { post: BlogPost }) {
  const category = categoryInfo[post.category] || categoryInfo.news;
  const Icon = category.icon;

  return (
    <Card className="group hover-elevate overflow-visible h-full flex flex-col" data-testid={`card-blog-${post.slug}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className={`${category.color} border-0 text-xs`}>
            <Icon className="h-3 w-3 mr-1" />
            {category.label}
          </Badge>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer" data-testid={`blog-title-${post.slug}`}>
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Link href={`/blog/${post.slug}`}>
            <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto" data-testid={`link-read-more-${post.slug}`}>
              Read More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogPostSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Blog() {
  const { data, isLoading, error } = useQuery<{ success: boolean; posts: BlogPost[] }>({
    queryKey: ["/api/blog"],
  });

  const posts = data?.posts || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                News & Updates
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-blog">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest news, project updates, and educational content 
                from Quantum Rise Foundation.
              </p>
            </div>

            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <BlogPostSkeleton key={i} />
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load blog posts. Please try again later.</p>
              </div>
            )}

            {!isLoading && !error && posts.length === 0 && (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">Check back soon for updates!</p>
              </div>
            )}

            {!isLoading && !error && posts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
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
