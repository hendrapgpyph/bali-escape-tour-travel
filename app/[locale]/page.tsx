import HomePage from "@/components/home/home-page";
import type {Locale} from "@/components/layout/site-shell";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <HomePage locale={locale as Locale}/>}
