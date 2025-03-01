import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import FieldInfo from "@/components/custom/field-info";
import { CreateProductWithVariantsRequest } from "@/shared/types/product-variant.request";
import { useForm } from "@tanstack/react-form";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface VariantFieldsProps {
  form: ReturnType<typeof useForm<CreateProductWithVariantsRequest>>;
}

export const VariantFields: React.FC<VariantFieldsProps> = ({ form }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Product Variants</CardTitle>
        <CardDescription>Add different versions or variations of your product</CardDescription>
      </CardHeader>
      <CardContent>
        <form.Field name="variants" mode="array">
          {(field) => (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    field.pushValue({
                      variantName: "",
                      sku: "",
                      price: 0,
                      quantityAvailable: 0,
                      metadata: [],
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>

              {Array.isArray(field.state.value) && field.state.value.length > 0 ? (
                <div className="space-y-6">
                  {field.state.value?.map((_, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium">Variant {index + 1}</CardTitle>
                          <Button type="button" variant="ghost" size="sm" onClick={() => field.removeValue(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <form.Field name={`variants[${index}].variantName`}>
                            {(variantField) => (
                              <div className="space-y-2">
                                <Label htmlFor={variantField.name}>Variant Name</Label>
                                <Input
                                  id={variantField.name}
                                  placeholder="e.g., Red / Version A"
                                  value={variantField.state.value}
                                  onChange={(e) => variantField.handleChange(e.target.value)}
                                />
                                <FieldInfo field={variantField} />
                              </div>
                            )}
                          </form.Field>

                          <form.Field name={`variants[${index}].sku`}>
                            {(skuField) => (
                              <div className="space-y-2">
                                <Label htmlFor={skuField.name}>SKU</Label>
                                <Input
                                  id={skuField.name}
                                  placeholder="Enter SKU"
                                  value={skuField.state.value}
                                  onChange={(e) => skuField.handleChange(e.target.value)}
                                />
                                <FieldInfo field={skuField} />
                              </div>
                            )}
                          </form.Field>

                          <form.Field name={`variants[${index}].price`}>
                            {(priceField) => (
                              <div className="space-y-2">
                                <Label htmlFor={priceField.name}>Price</Label>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₱</span>
                                  <Input
                                    id={priceField.name}
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    placeholder="0.00"
                                    value={priceField.state.value}
                                    onChange={(e) => priceField.handleChange(Number(e.target.value))}
                                    className="pl-8"
                                  />
                                </div>
                                <FieldInfo field={priceField} />
                              </div>
                            )}
                          </form.Field>

                          <form.Field name={`variants[${index}].quantityAvailable`}>
                            {(qtyField) => (
                              <div className="space-y-2">
                                <Label htmlFor={qtyField.name}>Quantity</Label>
                                <Input
                                  id={qtyField.name}
                                  type="number"
                                  min={0}
                                  placeholder="0"
                                  value={qtyField.state.value}
                                  onChange={(e) => qtyField.handleChange(Number(e.target.value))}
                                />
                                <FieldInfo field={qtyField} />
                              </div>
                            )}
                          </form.Field>
                        </div>

                        <Separator />

                        <form.Field name={`variants[${index}].metadata`} mode="array">
                          {(metadataField) => (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label>Additional Details</Label>
                                <Button type="button" variant="outline" size="sm" onClick={() => metadataField.pushValue({ key: "", value: "" })}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Detail
                                </Button>
                              </div>
                              {Array.isArray(metadataField.state.value) &&
                                metadataField.state.value.map((_, detailIndex) => (
                                  <div key={detailIndex} className="flex gap-4 items-start">
                                    <form.Field name={`variants[${index}].metadata[${detailIndex}].key`}>
                                      {(keyField) => (
                                        <Input
                                          placeholder="Key (e.g., Version)"
                                          value={keyField.state.value}
                                          onChange={(e) => keyField.handleChange(e.target.value)}
                                        />
                                      )}
                                    </form.Field>
                                    <form.Field name={`variants[${index}].metadata[${detailIndex}].value`}>
                                      {(valueField) => (
                                        <Input placeholder="Value" value={valueField.state.value} onChange={(e) => valueField.handleChange(e.target.value)} />
                                      )}
                                    </form.Field>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => metadataField.removeValue(detailIndex)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          )}
                        </form.Field>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 border rounded-lg border-dashed">
                  <p className="text-muted-foreground">No variants added yet. Add a variant to get started.</p>
                </div>
              )}
            </div>
          )}
        </form.Field>
      </CardContent>
    </Card>
  </div>
);

export default VariantFields;
