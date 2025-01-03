import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/constant";

export const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground">Join hundreds of satisfied sellers</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-9">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}>
                    <Card className="h-full">
                      <CardHeader className="space-y-0 pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback className="text-sm">{testimonial.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{testimonial.name}</CardTitle>
                            <CardDescription className="text-xs">{testimonial.role}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{testimonial.content}</p>
                        <div className="text-xs space-y-1.5 text-muted-foreground">
                          {testimonial.business && (
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-[10px] h-5 px-2 font-normal">
                                Shop
                              </Badge>
                              <span className="truncate">{testimonial.business}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-[10px] h-5 px-2 font-normal">
                              Location
                            </Badge>
                            <span className="truncate">{testimonial.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="h-8 w-8 -left-4" />
            <CarouselNext className="h-8 w-8 -right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

Testimonials.displayName = "Testimonials";
