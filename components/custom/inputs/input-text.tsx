/**
 * InputText Component
 * 
 * A styled text input component for collecting single-line text input.
 * Provides consistent styling and behavior for text fields.
 * 
 * Features:
 * - Styled text input with consistent appearance
 * - Optional label and error display
 * - Form state integration
 * - Controlled or uncontrolled usage
 * - Supports disabled state
 * - Displays validation errors from form state
 */
import { InputInterface } from "./input-interface";

export default function InputText({
  label,
  name,
  state,
  value,
  onChange,
  textarea,
  minWidth,
  maxWidth,
}: InputInterface & {
  textarea?: boolean;
  minWidth?: string;
  maxWidth?: string;
}) {
  return (
    <div
      style={{ minWidth: minWidth ?? "100px", maxWidth: maxWidth ?? "100%" }}
    >
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor={label}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={label}
          name={name}
          className="h-input-height block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          placeholder={`note`}
          value={value ?? ""}
          onChange={onChange}
        />
      ) : (
        <input
          id={label}
          name={name}
          type="text"
          className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          placeholder={`text`}
          value={value ?? ""}
          onChange={onChange}
        />
      )}

      {name && (
        <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
          {state?.errors?.[name] &&
            state?.errors[name].map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
