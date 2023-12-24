import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function arrayToObject<T>(arr: T[]): { [id: string]: T } {
	return arr.reduce(
		(acc, val, index) => {
			acc[String(index)] = val;
			return acc;
		},
		{} as { [id: string]: T }
	);
}

let idCounter = 0;

export function generateId(): string {
	const uniqueId = `${Date.now().toString(36)}_${idCounter.toString(36)}`;
	idCounter++;
	return uniqueId;
}