import { motion } from "framer-motion";
import { certificationsData } from "@/lib/data";
import { Award, Calendar, ExternalLink, CheckCircle2, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Certification = (typeof certificationsData)[number] & {
  credentialUrl?: string;
};

interface CertificationsSectionProps {
  certifications?: Certification[];
  title?: string;
  description?: string;
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
        {/* Status badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={cert.status === "active" ? "default" : "secondary"} className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {cert.status === "active" ? "Active" : "Expired"}
          </Badge>
        </div>

        <CardHeader className="space-y-3 pb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-lg leading-snug pr-16">{cert.title}</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium">{cert.issuer}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Issued {cert.date}</span>
          </div>

          {cert.credentialId && (
            <div className="text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-2 rounded-md">
              ID: {cert.credentialId}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          {cert.credentialUrl && (
            <Button variant="ghost" size="sm" className="w-full group/btn" asChild>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <span>View Credential</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          )}
        </CardContent>

        {/* Hover border overlay */}
        <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-xl transition-colors pointer-events-none" />
      </Card>
    </motion.div>
  );
}

export default function CertificationsSection({
  certifications = certificationsData,
  title = "Certifications & Credentials",
  description = "Professional certifications and achievements that validate my expertise",
}: CertificationsSectionProps) {
  const activeCount = certifications.filter((c) => c.status === "active").length;
  const skillCount = new Set(certifications.flatMap((c) => c.skills)).size;

  return (
    <section id="certifications" className="py-10 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-4"
        >
          <div className="h-px w-24 bg-primary mx-auto" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mt-4">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-foreground tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">{description}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { value: certifications.length, label: "Total Certifications" },
            { value: activeCount, label: "Active Credentials" },
            { value: skillCount, label: "Validated Skills" },
          ].map((stat, i) => (
            <Card key={i} className="text-center border-border">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
