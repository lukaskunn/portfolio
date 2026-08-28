import { createClient, type QueryParams } from "next-sanity"
import { apiVersion, dataset, projectId } from "./env"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
})

// ponytail: plain fetch + ISR instead of defineLive/SanityLive — draft mode
// opts routes out of static rendering, which the <ViewTransition> can't absorb.
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } })
  } catch (error) {
    throw new Error(`Sanity query failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}
