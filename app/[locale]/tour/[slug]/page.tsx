import {TourPage} from "@/components/common/content-pages";
import tours from "@/src/data/tours.json";
import {text,type Locale} from "@/lib/localization";
import type {Metadata} from "next";
type Params={locale:string;slug:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{const {locale,slug}=await params;const tour=tours.find(x=>x.slug===slug);if(!tour)return {title:"Tour not found"};const language=locale==="id"?"id":"en";const title=text(tour.title,language);const description=text(tour.shortDescription,language);return {title,description,openGraph:{title,description,images:[tour.banner]}}}
export default async function Page({params}:{params:Promise<Params>}){const {locale,slug}=await params;return <TourPage locale={locale as Locale} slug={slug}/>}
