import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { apiVersion, dataset, projectId } from "./src/sanity/env"
import { schemaTypes } from "./src/sanity/schemas"
import { structure, SINGLETONS } from "./src/sanity/structure"

const SINGLETON_TYPES = new Set<string>(SINGLETONS.map(({ id }) => id))

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  document: {
    // Singletons are reached through the structure items only — no "create new".
    newDocumentOptions: (prev) => prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)),
  },
})
