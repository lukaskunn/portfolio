import type { StructureResolver } from "sanity/structure"

export const SINGLETONS = [
  { id: "homePage", title: "Home page" },
  { id: "servicesPage", title: "Services page" },
  { id: "aboutPage", title: "About page" },
  { id: "projectPage", title: "Project page" },
  { id: "settings", title: "Site settings" },
] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      ...SINGLETONS.filter(({ id }) => id !== "settings").map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
      S.divider(),
      ...SINGLETONS.filter(({ id }) => id === "settings").map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title)),
      ),
    ])
