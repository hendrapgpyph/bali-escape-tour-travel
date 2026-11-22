import {CategoryPage} from "@/components/common/content-pages";
import categories from "@/src/data/tour-categories.json";
import {text,type Locale} from "@/lib/localization";
import type {Metadata} from "next";
type Params={locale:string;slug:string};
export async function generateMetadata({params}:{params:Promise<Params>}):Promise<Metadata>{const {locale,slug}=await params;const category=categories.find(x=>x.slug===slug);if(!category)return {title:"Tour collection not found"};const language=locale==="id"?"id":"en";const title=text(category.title,language);return {title,description:text(category.description,language),openGraph:{title,description:text(category.description,language)}}}
export default async function Page({params}:{params:Promise<Params>}){const {locale,slug}=await params;return <CategoryPage locale={locale as Locale} slug={slug}/>}
