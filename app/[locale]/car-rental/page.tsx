import {CarRentalPage} from "@/components/common/content-pages";
import type {Locale} from "@/components/layout/site-shell";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return <CarRentalPage locale={locale as Locale}/>}
