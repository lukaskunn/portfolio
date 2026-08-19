import { NextStudioLayout } from "next-sanity/studio"

// Second root layout — the Studio owns the whole document and gets none of the
// site chrome. NextStudioLayout is only the sizing wrapper, so <html>/<body>
// live here. Navigating here from the site is a full page load by design.
export default function StudioLayout({ children }: LayoutProps<"/studio/[[...tool]]">) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <NextStudioLayout>{children}</NextStudioLayout>
      </body>
    </html>
  )
}
