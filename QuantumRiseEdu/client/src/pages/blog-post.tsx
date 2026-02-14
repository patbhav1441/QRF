import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowLeft, Tag, Newspaper, BookOpen, Folder } from "lucide-react";
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

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      if (listType === 'ul') {
        elements.push(
          <ul key={key++} className="list-disc list-inside space-y-1 mb-4 text-muted-foreground">
            {currentList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );
      } else {
        elements.push(
          <ol key={key++} className="list-decimal list-inside space-y-1 mb-4 text-muted-foreground">
            {currentList.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={key++} className="text-2xl font-bold mt-8 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-xl font-semibold mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      let item = line.slice(2);
      item = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      currentList.push(item);
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      let item = line.replace(/^\d+\.\s/, '');
      item = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      currentList.push(item);
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      let text = line;
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: text }} />
      );
    }
  }

  flushList();
  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data, isLoading, error } = useQuery<{ success: boolean; post: BlogPost }>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  const post = data?.post;
  const category = post ? (categoryInfo[post.category] || categoryInfo.news) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <article className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-2 mb-8" data-testid="link-back-to-blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {isLoading && (
              <div className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-64 w-full" />
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load this blog post. Please try again later.</p>
                <Link href="/blog">
                  <Button variant="outline" className="mt-4">
                    Return to Blog
                  </Button>
                </Link>
              </div>
            )}

            {!isLoading && !error && !post && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
                <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
                <Link href="/blog">
                  <Button>Return to Blog</Button>
                </Link>
              </div>
            )}

            {!isLoading && !error && post && category && (
              <>
                <header className="mb-10">
                  <Badge variant="outline" className={`${category.color} border-0 mb-4`}>
                    <category.icon className="h-3 w-3 mr-1" />
                    {category.label}
                  </Badge>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="blog-post-title">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    {post.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                      </div>
                    )}
                  </div>
                </header>

                <div className="prose prose-lg max-w-none dark:prose-invert" data-testid="blog-post-content">
                  {renderContent(post.content)}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <Link href="/blog">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to All Posts
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
