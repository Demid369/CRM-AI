import type { ContentDocument } from "@/types/content";
import { JsonLd } from "@/components/JsonLd";

type ContentPageProps = {
  document: ContentDocument;
};

export function ContentPage({ document }: ContentPageProps) {
  return (
    <main className="container">
      <JsonLd data={document.schema} />
      <article>
        <h1>{document.h1 ?? document.title}</h1>
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: document.content }}
        />
      </article>
    </main>
  );
}
