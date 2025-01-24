import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WORKFLOW_STEPS } from "@/constant";
import { motion } from "framer-motion";

export const WorkflowSection = () => {
  return (
    <section className="relative py-12 md:py-20 bg-gradient-muted/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-muted/20 pointer-events-none" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Streamline Your Shop with <span className="bg-gradient-text bg-clip-text text-transparent">Efficiency</span>
          </h2>
          <p className="text-muted-foreground">Simple steps to optimize your workflow and achieve maximum productivity.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {WORKFLOW_STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative group"
            >
              <Card className="relative h-full bg-gradient-card/10 backdrop-blur-sm border border-muted-foreground/20 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 rounded-lg">
                <CardHeader className="pb-4">
                  <div className="space-y-1">
                    <div className="absolute -top-3 left-4 px-3 py-1 text-xs">
                      <Badge variant="secondary" className="font-normal transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        {step.step}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg md:text-xl transition-colors duration-300 group-hover:text-primary mt-2">{step.title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-normal transition-colors duration-300 group-hover:text-foreground">{step.description}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    {step.steps.map((subStep, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="rounded-full h-6 w-6 p-0 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary group-hover:text-primary"
                        >
                          {idx + 1}
                        </Badge>
                        <span className="text-sm text-muted-foreground mt-0.5 transition-colors duration-300 group-hover:text-foreground">{subStep}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

WorkflowSection.displayName = "WorkflowSection";
