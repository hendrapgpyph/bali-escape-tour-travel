import {notFound} from "next/navigation";
import {SiteShell,type Locale} from "@/components/layout/site-shell";
export function generateStaticParams(){return [{locale:"en"},{locale:"id"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(locale!=="en"&&locale!=="id")notFound();return <SiteShell locale={locale as Locale}>{children}</SiteShell>}
