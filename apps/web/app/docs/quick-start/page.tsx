import { JsonLd } from "@/app/_components/json-ld";
import { docsMetadata } from "../_lib/docs-metadata";
import Content from "./content.mdx";

const { metadata, jsonLd } = docsMetadata["/docs/quick-start"];
export { metadata };

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Content />
    </>
  );
}
