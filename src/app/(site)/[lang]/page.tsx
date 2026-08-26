import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import Loader from "@/components/Loader"
import { buildMetadata } from "@/utils/metadata"
import HeroSection from "@/components/HeroSection";
import WorksSection from "@/components/WorksSection";
import HomeBackdrop from "@/components/HomeBackdrop";
import style from "@/styles/homepage/home.module.scss";
import { sanityFetch } from "@/sanity/client"
import { imageUrl } from "@/sanity/image"
import { homePageQuery, settingsQuery, projectsQuery } from "@/sanity/queries"
import type { HomePage, Settings, ProjectListItem } from "@/types/content"

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  const homePage = await sanityFetch<HomePage | null>(homePageQuery, { lang })
  return buildMetadata({ seo: homePage?.seo, path: `/${lang}` })
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  const [homePage, settings, projects] = await Promise.all([
    sanityFetch<HomePage | null>(homePageQuery, { lang }),
    sanityFetch<Settings | null>(settingsQuery, { lang }),
    sanityFetch<ProjectListItem[]>(projectsQuery, { lang }),
  ])

  const loaderImages = (settings?.loaderImages ?? [])
    .map((image) => imageUrl(image, 240))
    .filter((url): url is string => Boolean(url))

  return (
    <>
      <Loader images={loaderImages} />
      <main id="main-content">
        <div className={style.pin}>
          <HomeBackdrop />
          <HeroSection
            title={homePage?.heroTitle ?? ""}
            chips={(homePage?.heroChips ?? []).map((chip) => ({
              url: imageUrl(chip.image, 214),
              alt: chip.image?.alt,
            }))}
            sectionLabel={homePage?.heroSectionLabel ?? ""}
            locationLabel={homePage?.heroLocationLabel ?? ""}
            currentRole={homePage?.heroCurrentRole ?? ""}
            roles={homePage?.heroRoles ?? []}
            timeZone={settings?.timeZone ?? "America/Sao_Paulo"}
            timeOffsetAheadLabel={settings?.timeOffsetAheadLabel}
            timeOffsetBehindLabel={settings?.timeOffsetBehindLabel}
            timeOffsetSameLabel={settings?.timeOffsetSameLabel}
          />
        </div>
        <WorksSection
          title={homePage?.worksTitle ?? ""}
          sectionLabel={homePage?.worksSectionLabel ?? ""}
          labels={settings?.fieldLabels ?? {}}
          viewProjectLabel={settings?.viewProjectLabel ?? ""}
          expandRowLabel={homePage?.expandRowLabel ?? ""}
          collapseRowLabel={homePage?.collapseRowLabel ?? ""}
          projects={projects ?? []}
        />
      </main>
      <ScrollProgress />
      <Footer settings={settings ?? { defaultTitle: "", defaultDescription: "" }} />
    </>
  );
}
