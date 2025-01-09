import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { ShopProfileFormType } from "@/components/custom/shop/profile";
import FieldInfo from "@/components/custom/field-info";

export interface SocialLinksSectionProps {
  form: ReturnType<typeof useForm<ShopProfileFormType>>;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ form }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>Connect your shop's social media accounts</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form.Field
          name="socialLinks.website"
          children={(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Website</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="https://your-website.com"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="socialLinks.facebook"
          children={(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Facebook</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="https://facebook.com/yourshop"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="socialLinks.instagram"
          children={(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Instagram</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="https://instagram.com/yourshop"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="socialLinks.twitter"
          children={(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Twitter</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="https://twitter.com/yourshop"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="socialLinks.discord"
          children={(field) => (
            <div className="grid gap-2">
              <Label htmlFor={field.name}>Discord</Label>
              <Input
                id={field.name}
                name={field.name}
                placeholder="https://discord.gg/yourserver"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

SocialLinksSection.displayName = "SocialLinksSection";

export default SocialLinksSection;
