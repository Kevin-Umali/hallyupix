import { useForm, useStore } from "@tanstack/react-form";
import { CreateProductWithVariantsRequest } from "@/shared/types/product-variant.request";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Box, Calendar, Eye, Info, LucideIcon, Settings, Tags } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

interface ReviewComponentProps {
  form: ReturnType<typeof useForm<CreateProductWithVariantsRequest>>;
}

const Section = ({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <h3 className="font-medium">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-4 py-1">
    <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
    <dd className="col-span-2 text-sm">{value || "Not specified"}</dd>
  </div>
);

const ProductReview: React.FC<ReviewComponentProps> = ({ form }) => {
  // Get all form values using useStore
  const formValues = useStore(form.store, (state) => state.values);
  const variants = formValues.variants || [];
  const totalStock = variants.reduce((sum, variant) => sum + (variant.quantityAvailable || 0), 0);
  const lowStockVariants = variants.filter((variant) => (variant.quantityAvailable || 0) <= formValues.minimumStockAlert);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Product Details</CardTitle>
          <CardDescription>Review all information before creating the product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <Section title="Basic Information" icon={Info}>
            <InfoRow label="Product Title" value={formValues.title} />
            <InfoRow label="Description" value={formValues.description} />
            <InfoRow label="Artist/Group" value={formValues.artist} />
            <InfoRow label="Merchandise Type" value={formValues.merchType} />
            <InfoRow label="Origin" value={formValues.origin} />
            <InfoRow
              label="Tags"
              value={
                formValues.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {formValues.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <Tags className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  "No tags"
                )
              }
            />
          </Section>

          <Separator />

          {/* Variants Overview */}
          <Section title="Variants Overview" icon={Box}>
            <div className="rounded-lg border p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Variants</p>
                  <p className="text-2xl font-medium">{variants.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-medium">{totalStock}</p>
                </div>
              </div>

              {lowStockVariants.length > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{lowStockVariants.length} variant(s) are below the minimum stock alert level</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-4 mt-4">
              {variants.map((variant, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{variant.variantName || `Variant ${index + 1}`}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <InfoRow label="SKU" value={variant.sku} />
                    <InfoRow
                      label="Price"
                      value={new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(variant.price)}
                    />
                    <InfoRow label="Stock" value={variant.quantityAvailable} />
                    {Object.entries(variant.metadata || {}).length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Additional Details</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(variant.metadata || {}).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              <span className="text-sm font-medium">{key}:</span>
                              <span className="text-sm">{value.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Separator />

          {/* Product Settings */}
          <Section title="Product Settings" icon={Settings}>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <InfoRow
                    label="Limited Edition"
                    value={<Badge variant={formValues.isLimitedEdition ? "default" : "secondary"}>{formValues.isLimitedEdition ? "Yes" : "No"}</Badge>}
                  />
                  <InfoRow
                    label="Release Date"
                    value={
                      formValues.releaseDate ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(formValues.releaseDate)}
                        </div>
                      ) : (
                        "Not set"
                      )
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <InfoRow
                    label="Product Status"
                    value={
                      <Badge variant="outline" className="font-normal">
                        {formValues.productStatus}
                      </Badge>
                    }
                  />
                  <InfoRow
                    label="Inventory Status"
                    value={
                      <Badge variant="outline" className="font-normal">
                        {formValues.inventoryStatus}
                      </Badge>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </Section>

          <Separator />

          {/* Availability Settings */}
          <Section title="Availability Settings" icon={Eye}>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <InfoRow
                  label="Visibility"
                  value={
                    <Badge variant="outline" className="font-normal">
                      {formValues.visibility}
                    </Badge>
                  }
                />
                <InfoRow label="Minimum Stock Alert" value={formValues.minimumStockAlert} />
                {lowStockVariants.length > 0 && (
                  <div className="mt-2">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        The following variants are below the minimum stock alert:
                        <ul className="list-disc list-inside mt-2">
                          {lowStockVariants.map((variant, index) => (
                            <li key={index}>
                              {variant.variantName || `Variant ${index + 1}`}: {variant.quantityAvailable} units
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReview;
