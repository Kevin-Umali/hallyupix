import { FieldApi } from "@tanstack/react-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FieldInfo = ({ field }: Readonly<{ field: FieldApi<any, any, any, any> }>) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-sm text-destructive">{field.state.meta.errors.join(", ")}</span>
      ) : null}
    </>
  );
};

FieldInfo.displayName = "FieldInfo";

export default FieldInfo;
