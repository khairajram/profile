"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Projects } from "./PortfolioPage";
import { SkillTag } from "./SkillTag";


export default function ProjectsSection({ projects }: { projects: Projects[] }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-lg rounded-2xl hover:shadow-2xl transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  {project.link && (
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="hover:text-blue-600"
                    >
                      <a href={project.link} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <p className="font-semibold mb-1">Tech Stack:</p>
                  {project.skills.map((s) => (
                    <SkillTag key={s.id} name={s.name}/>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
