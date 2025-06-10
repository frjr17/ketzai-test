import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeString(input:string){
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}