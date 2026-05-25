import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getProductBySlug, getAllProductSlugsForStaticParams } from "@/lib/cms";
import { documentToMetadata } from "@/lib/seo";

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProductSlugsForStaticParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getProductBySlug(slug);
  if (!doc) return {};
  return documentToMetadata(doc);
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getProductBySlug(slug);
  if (!doc) notFound();
  return <ContentPage document={doc} />;
}
