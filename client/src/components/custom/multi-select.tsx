import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";

interface MultiSelectProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  creatable?: boolean;
  maxSelected?: number;
}

export const MultiSelect = ({ value = [], onChange, placeholder = "Select items...", options = [], creatable = false, maxSelected }: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Sync internalOptions with incoming options
  const [internalOptions, setInternalOptions] = useState(options);
  useEffect(() => {
    setInternalOptions(options);
  }, [options]);

  // Filter options based on input
  const filteredOptions = useMemo(() => {
    if (!inputValue) return internalOptions;
    return internalOptions.filter(
      (option) => option.label.toLowerCase().includes(inputValue.toLowerCase()) || option.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [internalOptions, inputValue]);

  const handleAddNew = useCallback(() => {
    if (!inputValue) return;

    // Check if item already exists (exact match)
    const exists = internalOptions.some((opt) => opt.value.toLowerCase() === inputValue.toLowerCase() || opt.label.toLowerCase() === inputValue.toLowerCase());

    if (!exists) {
      const newOption = {
        value: inputValue.toLowerCase(),
        label: inputValue,
      };
      setInternalOptions((prev) => [...prev, newOption]);
      onChange?.([...value, newOption.value]);
      setInputValue("");
    }
  }, [inputValue, internalOptions, value, onChange]);

  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (value.includes(selectedValue)) {
        onChange?.(value.filter((v) => v !== selectedValue));
      } else {
        if (maxSelected && value.length >= maxSelected) return;
        onChange?.([...value, selectedValue]);
      }
    },
    [value, onChange, maxSelected]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent, itemValue: string) => {
      e.stopPropagation();
      onChange?.(value.filter((v) => v !== itemValue));
    },
    [value, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && creatable && inputValue) {
        e.preventDefault();
        handleAddNew();
      }
    },
    [creatable, inputValue, handleAddNew]
  );

  // Determine if the "Add" option should be shown:
  // Show if creatable, inputValue exists, and no exact match is found.
  const showAddOption = creatable && inputValue && !internalOptions.some((opt) => opt.label.toLowerCase() === inputValue.toLowerCase());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button" aria-expanded={open} className="w-full justify-between min-h-[2.5rem] h-auto font-normal">
          <div className="flex flex-wrap gap-1">
            {value.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
            {value.map((item) => {
              const option = internalOptions.find((opt) => opt.value === item);
              return (
                <Badge key={item} variant="default" className="mr-2 mb-1">
                  {option?.label ?? item}
                  <button
                    type="button"
                    className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleRemove(e as unknown as React.MouseEvent, item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => handleRemove(e, item)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search items..." value={inputValue} onValueChange={setInputValue} onKeyDown={handleKeyDown} />
          <CommandList>
            {filteredOptions.length > 0 && (
              <CommandGroup>
                {filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {/* Render the add option separately if applicable */}
            {showAddOption && (
              <CommandGroup>
                <CommandItem onSelect={handleAddNew} className="text-muted-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add &quot;{inputValue}&quot;</span>
                </CommandItem>
              </CommandGroup>
            )}

            {/* Only show the empty fallback when there are no filtered options and no add option */}
            {filteredOptions.length === 0 && !showAddOption && (
              <CommandEmpty>
                <span>No results found.</span>
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
