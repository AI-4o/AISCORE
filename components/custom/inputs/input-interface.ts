/**
 * InputInterface
 * 
 * Common interface shared by all input components in the application.
 * Provides consistent props structure for form inputs.
 * 
 * Properties:
 * - label: Optional text label for the input
 * - name: Optional input name for form submission
 * - state: Optional state object for form libraries
 * - value: Optional current value of the input
 * - disabled: Optional flag to disable the input
 * - onChange: Optional callback for value changes
 */
export interface InputInterface {
    label?: string;
    name?: string;
    state?: any;
    value?: string;
    disabled?: boolean;
    onChange?: (e: any) => void;
}
function formatDate(defaultValue: string): string {
    const date = new Date(defaultValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
} 