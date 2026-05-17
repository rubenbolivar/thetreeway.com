import type { Thing, WithContext } from "schema-dts";

// Renders a JSON-LD <script>. Typed via schema-dts (REFACTOR §6).
export function JsonLd<T extends Thing>({
  data,
}: {
  data: WithContext<T>;
}) {
  return (
    <script
      type="application/ld+json"
      // Controlled, server-serialized object — safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
