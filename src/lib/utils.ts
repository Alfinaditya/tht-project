import { clsx, type ClassValue } from 'clsx';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names using `clsx` and `twMerge` to handle conditional classnames
 * and avoid conflicts in Tailwind CSS classes.
 *
 * This function allows combining multiple class names, removing duplicates,
 * and ensuring compatibility between Tailwind CSS utilities.
 *
 * @param inputs - An array of class names or conditional class names to be merged.
 * @returns A string representing the merged class names.
 *
 * @example
 * ```typescript
 * const buttonClass = cn("btn", isPrimary && "btn-primary", isLarge && "btn-large");
 * console.log(buttonClass); // "btn btn-primary btn-large" or "btn btn-primary"
 * ```
 */

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Retrieves the authentication token (session ID) stored in cookies.
 *
 * This function fetches the value of the 'sid' cookie using `js-cookie`,
 * which is typically used for user authentication.
 *
 * @returns The authentication token if it exists, otherwise `undefined`.
 *
 * @example
 * ```typescript
 * const token = getAuthToken();
 * console.log(token); // "abc123xyz" or undefined
 * ```
 */
export function getAuthToken() {
	return Cookies.get('sid');
}

/**
 * Formats a given number as Indonesian Rupiah (IDR) currency.
 *
 * @param value - The numeric value to be formatted as currency.
 * @returns A string representing the value in Indonesian Rupiah format.
 *
 * @example
 * ```typescript
 * const formattedValue = toRupiahFormat(100000);
 * console.log(formattedValue); // "Rp 100.000"
 * ```
 */
export function toRupiahFormat(value: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(value);
}

/**
 * Converts a Blob into a Base64-encoded data URL string.
 *
 * This function reads the provided Blob and returns a Base64-encoded string,
 * making it useful for handling file uploads, previews, or storage in a format
 * compatible with HTML and JavaScript.
 *
 * @param content - The Blob to be encoded.
 * @returns A Promise that resolves to a Base64-encoded string or `null` if encoding fails.
 *
 * @example
 * ```typescript
 * const file = new Blob(["Hello, world!"], { type: "text/plain" });
 * const base64String = await encodedContent(file);
 * console.log(base64String); // "data:text/plain;base64,SGVsbG8sIHdvcmxkIQ=="
 * ```
 */
export async function encodedContent(content: Blob): Promise<string | null> {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve((reader.result as string) || null);
		reader.readAsDataURL(content);
	});
}
