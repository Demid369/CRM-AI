import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getPageByPath } from "@/lib/cms";
import { documentToMetadata } from "@/lib/seo";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [{ slug: "misc" }];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getPageByPath(`product-category/${slug}/`);
  if (!doc) return { robots: { index: false, follow: true } };
  return documentToMetadata(doc);
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getPageByPath(`product-category/${slug}/`);
  if (!doc) notFound();
  return <ContentPage document={doc} />;
}
