import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const CONTACT_INFO = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "yashkabra143@gmail.com",
    href: "mailto:yashkabra143@gmail.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+91 8370043219",
    href: "tel:+918370043219",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Indore, Madhya Pradesh, India",
    href: undefined,
  },
];

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("/api/contact", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: FormValues) {
    contactMutation.mutate(data);
  }

  const isSubmitting = contactMutation.isPending;
  const isSuccess = contactMutation.isSuccess;
  const isError = contactMutation.isError;

  return (
    <section id="contact" className="bg-background py-10 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="h-px w-24 bg-primary mx-auto" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <Card className="p-6 border-border shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4">
                {CONTACT_INFO.map((info, index) => {
                  const inner = (
                    <div className={`flex items-start gap-4 p-4 rounded-lg bg-muted/50 transition-colors ${info.href ? "hover:bg-muted group cursor-pointer" : ""}`}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">{info.label}</p>
                        <p className="text-sm text-foreground font-medium break-words">{info.value}</p>
                      </div>
                    </div>
                  );

                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      {info.href ? (
                        <a href={info.href}>{inner}</a>
                      ) : (
                        inner
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="p-6 rounded-xl bg-primary/5 border border-primary/20"
            >
              <h4 className="text-sm font-semibold text-foreground mb-1">Response Time</h4>
              <p className="text-sm text-muted-foreground">
                I typically respond within 24 hours during business days.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 border-border shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Yash Kabra" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="How can I help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me more about your inquiry..."
                            rows={6}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full sm:w-auto min-w-[200px]"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.span
                            key="submitting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Send className="w-4 h-4" />
                            </motion.div>
                            Sending...
                          </motion.span>
                        ) : isSuccess ? (
                          <motion.span
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Message Sent!
                          </motion.span>
                        ) : isError ? (
                          <motion.span
                            key="error"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <AlertCircle className="w-4 h-4" />
                            Failed to Send
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Send Message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>

                    <AnimatePresence>
                      {isSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400"
                        >
                          <p className="text-sm font-medium">
                            Thank you for your message! I'll get back to you soon.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
