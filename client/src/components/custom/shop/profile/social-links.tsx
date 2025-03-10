import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/custom/field-info";
import { Globe, Facebook, Instagram, Twitter, Disc2 } from "lucide-react";
import { SaveShopProfileRequest } from "@/lib/mutation/shop.mutation";

export interface SocialLinksSectionProps {
  form: ReturnType<typeof useForm<SaveShopProfileRequest>>;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media & Links</CardTitle>
        <CardDescription>Connect your shop with your online presence</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Website */}
        <form.Field name="socialLinks.website">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Website</Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="https://your-website.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full peer ps-9"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Globe size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Facebook */}
        <form.Field name="socialLinks.facebook">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Facebook</Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="https://facebook.com/yourshop"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full peer ps-9"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Facebook size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Instagram */}
        <form.Field name="socialLinks.instagram">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Instagram</Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="https://instagram.com/yourshop"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full peer ps-9"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Instagram size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Twitter */}
        <form.Field name="socialLinks.twitter">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Twitter</Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="https://twitter.com/yourshop"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full peer ps-9"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Twitter size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Discord */}
        <form.Field name="socialLinks.discord">
          {(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Discord</Label>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="https://discord.gg/yourserver"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full peer ps-9"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Disc2 size={16} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>

              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </CardContent>
    </Card>
  );
};

SocialLinksSection.displayName = "SocialLinksSection";

export default SocialLinksSection;
