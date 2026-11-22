import TourDirectory from "@/components/common/tour-directory";
import type {Locale} from "@/lib/localization";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <TourDirectory locale={locale as Locale}/>}
