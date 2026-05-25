import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getPageByPath } from "@/lib/cms";
import { documentToMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata() {
  const doc = await getPageByPath("/");
  if (!doc) return { title: "ДЕЛСНАБ" };
  return documentToMetadata(doc);
}

export default async function HomePage() {
  const doc = await getPageByPath("/");
  if (!doc) notFound();
  return <ContentPage document={doc} />;
}
