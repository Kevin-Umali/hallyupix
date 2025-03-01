import { useForm } from "@tanstack/react-form";
import { useState, useMemo } from "react";
import { CreateProductWithVariantsRequest, CreateProductWithVariantsRequestSchema } from "@/shared/types/product-variant.request";
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/custom/stepper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BasicInfoFields from "@/components/custom/products/basic-info-fields";
import VariantFields from "@/components/custom/products/variant-fields";
import ProductSettingFields from "@/components/custom/products/product-setting-fields";
import AvailabilityFields from "./availability-fields";
import ProductReview from "./product-overview";

export const ProductForm = () => {
  // Memoize the steps so they don't get recreated on each render.
  const steps = useMemo(
    () => [
      {
        step: 1,
        title: "Basic Information",
        description: "Product name, description, and categories",
        component: BasicInfoFields,
      },
      {
        step: 2,
        title: "Variants",
        description: "Add product variants and pricing",
        component: VariantFields,
      },
      {
        step: 3,
        title: "Product Settings",
        description: "Configure special product settings",
        component: ProductSettingFields,
      },
      {
        step: 4,
        title: "Availability",
        description: "Set stock and visibility",
        component: AvailabilityFields,
      },
      {
        step: 5,
        title: "Review",
        description: "Review product information",
        component: ProductReview,
      },
    ],
    []
  );

  const [activeStep, setActiveStep] = useState(1);

  const form = useForm<CreateProductWithVariantsRequest>({
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      origin: "",
      artist: "",
      merchType: "",
      productStatus: "Pre-order",
      visibility: "Private",
      inventoryStatus: "",
      minimumStockAlert: 0,
      releaseDate: "",
      isLimitedEdition: false,
      variants: [
        {
          variantName: "",
          sku: "",
          price: 0,
          quantityAvailable: 0,
          metadata: [],
        },
      ],
    },
    onSubmit: (values) => {
      console.log("values", values);
    },
    validators: {
      onChange: CreateProductWithVariantsRequestSchema,
    },
  });

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-8"
    >
      <Stepper value={activeStep} onValueChange={setActiveStep}>
        {steps.map((stepItem) => (
          <StepperItem key={stepItem.step} step={stepItem.step} className="relative flex-1 !flex-col">
            <StepperTrigger type="button" className="flex-col gap-3">
              <StepperIndicator />
              <div className="space-y-0.5 px-2">
                <StepperTitle>{stepItem.title}</StepperTitle>
                <StepperDescription className="max-sm:hidden">{stepItem.description}</StepperDescription>
              </div>
            </StepperTrigger>
            {stepItem.step !== steps[steps.length - 1].step && (
              <StepperSeparator className="absolute inset-x-0 left-[calc(50%+0.75rem+0.125rem)] top-3 -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>

      <Card>
        <CardContent className="pt-4">
          {/* Render all steps but show only the active one */}
          {steps.map((stepItem) => (
            <div key={stepItem.step} style={{ display: activeStep === stepItem.step ? "block" : "none" }}>
              <stepItem.component form={form} />
            </div>
          ))}
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack} disabled={activeStep === 1}>
              Back
            </Button>
            {activeStep === steps.length ? (
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isValidating]}>
                {([canSubmit, isSubmitting, isValidating]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || isValidating}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Product"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="mt-2 text-xs text-muted-foreground text-center" aria-live="polite">
        Step {activeStep} of {steps.length}
      </p>
    </form>
  );
};

export default ProductForm;
