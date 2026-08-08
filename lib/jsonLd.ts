export type JsonLdNode = Record<string, unknown>;

export function buildJsonLdGraph(
  nodes: readonly (JsonLdNode | null | undefined)[]
) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes
      .filter((node): node is JsonLdNode => Boolean(node))
      .map((node) => {
        const graphNode = { ...node };

        delete graphNode["@context"];
        return graphNode;
      }),
  };
}
