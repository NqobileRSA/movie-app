import ar from "./ar";
import en from "./en";

export type Lang = "en" | "ar";
export const strings = (lang: Lang) => (lang === "ar" ? ar : en);
