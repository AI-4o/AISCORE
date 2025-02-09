import { InputInterface } from "./input-interface";
import "./inputs-style.css";
export default function InputDate({
  label,
  name,
  state,
  value,
  onChange,
}: InputInterface) {
  return (
    <div className="flex flex-col min-w-64 date">
      {label && (
        <label
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      {!label && <div className="mt-5"></div>}
      <div className="relative">
        <input
          className="date h-input-height peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
          id="date"
          type="date"
          name={name}
          placeholder="yyyy-mm-dd"
          value={value}
          onChange={onChange}
        />
      </div>
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
