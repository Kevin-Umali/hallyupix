import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { CalendarDays, Info } from "lucide-react";
import { PRIVACY_CONTENT, TERMS_CONTENT } from "@/constant";

// Types
type SubSection = {
  readonly title?: string;
  readonly content?: string | readonly string[];
  readonly items?: readonly string[];
  readonly important?: boolean;
};

type Section = {
  readonly title: string;
  readonly content: string | readonly string[];
  readonly items?: readonly string[];
  readonly subsections?: readonly SubSection[];
  readonly important?: boolean;
};

type LegalContent = {
  readonly title: string;
  readonly description: string;
  readonly lastUpdated: string;
  readonly sections: readonly Section[];
};

interface LegalDialogProps {
  readonly trigger: React.ReactNode;
  readonly content: LegalContent;
}

const LegalDialog = ({ trigger, content }: LegalDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[85vh]">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{content.title}</DialogTitle>
            <Badge variant="secondary" className="text-xs">
              <CalendarDays className="mr-1 h-3 w-3" />
              Last Updated: {content.lastUpdated}
            </Badge>
          </div>
          <DialogDescription className="text-base leading-relaxed">{content.description}</DialogDescription>
        </DialogHeader>
        <span className="my-2 border-t-2" />
        <ScrollArea className="h-full pr-4">
          <div className="text-sm pb-8">
            <div className="space-y-4">
              {content.sections.map((section, index) => (
                <div key={index} className={cn("p-6 rounded-lg transition-colors", "hover:bg-muted/50", section.important && "border-l-4 border-primary")}>
                  <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight mb-4">
                    {section.title}{" "}
                    {section.important && (
                      <Badge variant="secondary" className="text-xs">
                        Important
                      </Badge>
                    )}
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc pl-6 space-y-2">
                        {section.content.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="leading-relaxed">{section.content}</p>
                    )}
                    {section.items && (
                      <ul className="list-disc pl-6 space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.subsections?.map((subsection, i) => (
                      <div key={i} className={cn("mt-6 p-4 rounded-md bg-background/50 border", subsection.important && "border-l-4 border-primary")}>
                        {subsection.title && (
                          <h4 className="flex items-center gap-2 font-medium text-foreground mb-3">
                            {subsection.important && <Info className="h-4 w-4 text-primary" />}
                            {subsection.title}
                          </h4>
                        )}
                        {Array.isArray(subsection.content) ? (
                          <ul className="list-disc pl-6 space-y-2">
                            {subsection.content.map((item, j) => (
                              <li key={j} className="leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="leading-relaxed">{subsection.content}</p>
                        )}
                        {subsection.items && (
                          <ul className="list-disc pl-6 space-y-2 mt-2">
                            {subsection.items.map((item, j) => (
                              <li key={j} className="leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export const TermsDialog = () => (
  <LegalDialog trigger={<span className="text-primary hover:underline cursor-pointer transition-colors">Terms of Service</span>} content={TERMS_CONTENT} />
);

export const PrivacyDialog = () => (
  <LegalDialog trigger={<span className="text-primary hover:underline cursor-pointer transition-colors">Privacy Policy</span>} content={PRIVACY_CONTENT} />
);

LegalDialog.displayName = "LegalDialog";
TermsDialog.displayName = "TermsDialog";
PrivacyDialog.displayName = "PrivacyDialog";
