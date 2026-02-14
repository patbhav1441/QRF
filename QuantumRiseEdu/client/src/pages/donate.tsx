import { useState } from "react";
import { Heart, CreditCard, Gift, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  frequency: z.enum(["one-time", "monthly"]),
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});

type DonationFormData = z.infer<typeof donationSchema>;

const presetAmounts = [10, 25, 50, 100, 250, 500];

const impactInfo = [
  { amount: 25, description: "Provides materials for one student workshop" },
  { amount: 50, description: "Sponsors a student for a full-day hackathon" },
  { amount: 100, description: "Funds equipment for a robotics project" },
  { amount: 250, description: "Supports development of educational curriculum" },
  { amount: 500, description: "Enables a complete research project initiative" },
];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 50,
      frequency: "one-time",
      name: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: DonationFormData) => {
      const response = await apiRequest("POST", "/api/donations", {
        ...data,
        amount: data.amount * 100,
      });
      return response;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Thank you for your support!",
        description: "Your generosity helps us empower the next generation of innovators.",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    form.setValue("amount", amount);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    const numValue = parseInt(value) || 0;
    form.setValue("amount", numValue);
  };

  const onSubmit = (data: DonationFormData) => {
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 lg:pt-24">
          <section className="py-16 lg:py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="heading-donation-success">
                Thank You!
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your donation helps us continue our mission of educating students on Quantum Computing 
                and AI while implementing real-world solutions to pressing challenges.
              </p>
              <p className="text-muted-foreground mb-8">
                A confirmation email has been sent to your inbox.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline" data-testid="button-donate-again">
                Make Another Donation
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Support Our Mission
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="heading-donate">
                Make a Donation
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your support helps us educate the next generation of quantum computing and AI innovators,
                empowering students to solve real-world challenges.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Your Donation
                    </CardTitle>
                    <CardDescription>
                      Choose an amount and frequency to support our programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          <Label>Select Amount</Label>
                          <div className="grid grid-cols-3 gap-3">
                            {presetAmounts.map((amount) => (
                              <Button
                                key={amount}
                                type="button"
                                variant={selectedAmount === amount ? "default" : "outline"}
                                className="h-12"
                                onClick={() => handleAmountSelect(amount)}
                                data-testid={`button-amount-${amount}`}
                              >
                                ${amount}
                              </Button>
                            ))}
                          </div>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                              type="number"
                              placeholder="Custom amount"
                              value={customAmount}
                              onChange={(e) => handleCustomAmountChange(e.target.value)}
                              className="pl-7"
                              data-testid="input-custom-amount"
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="frequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Frequency</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex gap-4"
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="one-time" id="one-time" data-testid="radio-one-time" />
                                    <Label htmlFor="one-time" className="cursor-pointer">One-time</Label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="monthly" id="monthly" data-testid="radio-monthly" />
                                    <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your@email.com" 
                                  {...field} 
                                  data-testid="input-donation-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  {...field} 
                                  data-testid="input-donation-name"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full gap-2"
                          size="lg"
                          disabled={mutation.isPending}
                          data-testid="button-submit-donation"
                        >
                          {mutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4" />
                              Donate ${form.watch("amount") || 0}
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          Quantum Rise Foundation is a 501(c)(3) nonprofit organization. 
                          Your donation is tax-deductible to the extent allowed by law.
                        </p>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-primary" />
                      Your Impact
                    </CardTitle>
                    <CardDescription>
                      See how your donation makes a difference
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {impactInfo.map((item) => (
                        <div 
                          key={item.amount} 
                          className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                        >
                          <Badge variant="secondary" className="font-mono">
                            ${item.amount}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Why Donate?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>100% of donations support student programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Tax-deductible 501(c)(3) nonprofit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Empower the next generation of innovators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Support hands-on learning experiences</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
