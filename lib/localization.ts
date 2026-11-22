export type Locale = "en" | "id";
export const text = (value: { en: string; id: string }, locale: Locale) => value[locale];
