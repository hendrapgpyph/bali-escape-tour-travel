import site from "@/src/data/site.json";
import type {Locale} from "@/lib/localization";
export const tourHref=(locale:Locale,slug:string)=>`/${locale}/tour/${slug}`;
export const categoryHref=(locale:Locale,slug:string)=>`/${locale}/tours/${slug}`;
export const whatsappHref=(message:string)=>`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const money=(value:number)=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(value);
