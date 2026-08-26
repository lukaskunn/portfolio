import { defineQuery } from "next-sanity"

// Field-level i18n: every localised field is projected down to one locale with
// `coalesce(field[$lang], field.pt)` — pt is the primary and the fallback.
// Every query takes a `$lang` param of "pt" | "en".
//
// ponytail: unconsumed until the dataset has documents. Two things are
// unverified against a real document — the `[$lang]` bracket access on an
// object, and whether `sanity typegen` can narrow a coalesce over it.

const seoProjection = `
  seo {
    "metaTitle": coalesce(metaTitle[$lang], metaTitle.pt),
    "metaDescription": coalesce(metaDescription[$lang], metaDescription.pt),
    ogImage { alt, asset-> { url, metadata { dimensions } } }
  }
`

export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc, year desc) {
    "slug": slug.current,
    name,
    client,
    year,
    technologies,
    "type": coalesce(type[$lang], type.pt),
    "industry": coalesce(industry[$lang], industry.pt),
    "role": coalesce(role[$lang], role.pt),
    "description": coalesce(description[$lang], description.pt),
    images,
    ${seoProjection}
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    client,
    year,
    technologies,
    showLiveLink,
    liveUrl,
    "type": coalesce(type[$lang], type.pt),
    "industry": coalesce(industry[$lang], industry.pt),
    "role": coalesce(role[$lang], role.pt),
    "description": coalesce(description[$lang], description.pt),
    images,
    ${seoProjection}
  }
`)

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)].slug.current
`)

export const homePageQuery = defineQuery(`
  *[_id == "homePage"][0] {
    ${seoProjection},
    "heroTitle": coalesce(heroTitle[$lang], heroTitle.pt),
    heroChips[] { image },
    "heroSectionLabel": coalesce(heroSectionLabel[$lang], heroSectionLabel.pt),
    "heroLocationLabel": coalesce(heroLocationLabel[$lang], heroLocationLabel.pt),
    "heroCurrentRole": coalesce(heroCurrentRole[$lang], heroCurrentRole.pt),
    "heroRoles": heroRoles[] { "value": coalesce(@[$lang], @.pt) }.value,
    "worksTitle": coalesce(worksTitle[$lang], worksTitle.pt),
    "worksSectionLabel": coalesce(worksSectionLabel[$lang], worksSectionLabel.pt),
    "expandRowLabel": coalesce(expandRowLabel[$lang], expandRowLabel.pt),
    "collapseRowLabel": coalesce(collapseRowLabel[$lang], collapseRowLabel.pt)
  }
`)

export const servicesPageQuery = defineQuery(`
  *[_id == "servicesPage"][0] {
    ${seoProjection},
    "heroTitle": coalesce(heroTitle[$lang], heroTitle.pt),
    "heroSectionLabel": coalesce(heroSectionLabel[$lang], heroSectionLabel.pt),
    "scrollCueLabel": coalesce(scrollCueLabel[$lang], scrollCueLabel.pt),
    "helpTitle": coalesce(helpTitle[$lang], helpTitle.pt),
    "helpSectionLabel": coalesce(helpSectionLabel[$lang], helpSectionLabel.pt),
    "servicesTitle": coalesce(servicesTitle[$lang], servicesTitle.pt),
    "servicesSectionLabel": coalesce(servicesSectionLabel[$lang], servicesSectionLabel.pt),
    services[] {
      "title": coalesce(title[$lang], title.pt),
      "body": coalesce(body[$lang], body.pt)
    },
    serviceGroups[] {
      "title": coalesce(title[$lang], title.pt),
      "items": items[] { "value": coalesce(@[$lang], @.pt) }.value,
      image,
      size
    },
    "processTitle": coalesce(processTitle[$lang], processTitle.pt),
    "processSectionLabel": coalesce(processSectionLabel[$lang], processSectionLabel.pt),
    process[] {
      "title": coalesce(title[$lang], title.pt),
      "body": coalesce(body[$lang], body.pt)
    },
    "contactSectionLabel": coalesce(contactSectionLabel[$lang], contactSectionLabel.pt)
  }
`)

export const aboutPageQuery = defineQuery(`
  *[_id == "aboutPage"][0] {
    ${seoProjection},
    "heroTitle": coalesce(heroTitle[$lang], heroTitle.pt),
    "bio": coalesce(bio[$lang], bio.pt),
    clients,
    "clientsLabel": coalesce(clientsLabel[$lang], clientsLabel.pt),
    profileImage
  }
`)

export const projectPageQuery = defineQuery(`
  *[_id == "projectPage"][0] {
    "backLabel": coalesce(backLabel[$lang], backLabel.pt),
    "nextLabel": coalesce(nextLabel[$lang], nextLabel.pt)
  }
`)

export const settingsQuery = defineQuery(`
  *[_id == "settings"][0] {
    "defaultTitle": coalesce(defaultTitle[$lang], defaultTitle.pt),
    "defaultDescription": coalesce(defaultDescription[$lang], defaultDescription.pt),
    ogImage { alt, asset-> { url, metadata { dimensions } } },
    loaderImages,
    pages[] {
      "label": coalesce(label[$lang], label.pt),
      action,
      href,
      showInHeader,
      showInFooter
    },
    "sitemapLabel": coalesce(sitemapLabel[$lang], sitemapLabel.pt),
    logoName,
    "contactLabel": coalesce(contactLabel[$lang], contactLabel.pt),
    "sendMessageLabel": coalesce(sendMessageLabel[$lang], sendMessageLabel.pt),
    fieldLabels {
      "projectName": coalesce(projectName[$lang], projectName.pt),
      "client": coalesce(client[$lang], client.pt),
      "type": coalesce(type[$lang], type.pt),
      "role": coalesce(role[$lang], role.pt),
      "year": coalesce(year[$lang], year.pt),
      "industry": coalesce(industry[$lang], industry.pt),
      "technologies": coalesce(technologies[$lang], technologies.pt),
      "description": coalesce(description[$lang], description.pt)
    },
    "viewProjectLabel": coalesce(viewProjectLabel[$lang], viewProjectLabel.pt),
    "viewLiveProjectLabel": coalesce(viewLiveProjectLabel[$lang], viewLiveProjectLabel.pt),
    "scrollToExploreLabel": coalesce(scrollToExploreLabel[$lang], scrollToExploreLabel.pt),
    "roleLabel": coalesce(roleLabel[$lang], roleLabel.pt),
    available,
    "availableLabel": coalesce(availableLabel[$lang], availableLabel.pt),
    "unavailableLabel": coalesce(unavailableLabel[$lang], unavailableLabel.pt),
    "email": coalesce(email[$lang], email.pt),
    "copyEmailLabel": coalesce(copyEmailLabel[$lang], copyEmailLabel.pt),
    "emailCopiedLabel": coalesce(emailCopiedLabel[$lang], emailCopiedLabel.pt),
    phone,
    "copyPhoneLabel": coalesce(copyPhoneLabel[$lang], copyPhoneLabel.pt),
    "phoneCopiedLabel": coalesce(phoneCopiedLabel[$lang], phoneCopiedLabel.pt),
    social[] { label, href, popupLabel },
    "socialLabel": coalesce(socialLabel[$lang], socialLabel.pt),
    "menuLabel": coalesce(menuLabel[$lang], menuLabel.pt),
    "closeMenuLabel": coalesce(closeMenuLabel[$lang], closeMenuLabel.pt),
    "contactModalLabel": coalesce(contactModalLabel[$lang], contactModalLabel.pt),
    "closeContactFormLabel": coalesce(closeContactFormLabel[$lang], closeContactFormLabel.pt),
    switchLanguageLabel { pt, en },
    "logoPopupLabel": coalesce(logoPopupLabel[$lang], logoPopupLabel.pt),
    "ctaTitle": coalesce(ctaTitle[$lang], ctaTitle.pt),
    "ctaPopupLabel": coalesce(ctaPopupLabel[$lang], ctaPopupLabel.pt),
    latitude,
    longitude,
    "remoteFromLabel": coalesce(remoteFromLabel[$lang], remoteFromLabel.pt),
    timeZone,
    "timeOffsetAheadLabel": coalesce(timeOffsetAheadLabel[$lang], timeOffsetAheadLabel.pt),
    "timeOffsetBehindLabel": coalesce(timeOffsetBehindLabel[$lang], timeOffsetBehindLabel.pt),
    "timeOffsetSameLabel": coalesce(timeOffsetSameLabel[$lang], timeOffsetSameLabel.pt)
  }
`)

export const contactMessagesQuery = defineQuery(`
  *[_id == "settings"][0].contactForm {
    "eyebrowLabel": coalesce(eyebrowLabel[$lang], eyebrowLabel.pt),
    "titleMuted": coalesce(titleMuted[$lang], titleMuted.pt),
    "title": coalesce(title[$lang], title.pt),
    "optionalSuffixLabel": coalesce(optionalSuffixLabel[$lang], optionalSuffixLabel.pt),
    "addOptionalLabel": coalesce(addOptionalLabel[$lang], addOptionalLabel.pt),
    "submitLabel": coalesce(submitLabel[$lang], submitLabel.pt),
    "sendingLabel": coalesce(sendingLabel[$lang], sendingLabel.pt),
    "successMessage": coalesce(successMessage[$lang], successMessage.pt),
    "fixFieldsMessage": coalesce(fixFieldsMessage[$lang], fixFieldsMessage.pt),
    "rateLimitMessage": coalesce(rateLimitMessage[$lang], rateLimitMessage.pt),
    "sendFailureMessage": coalesce(sendFailureMessage[$lang], sendFailureMessage.pt),
    name {
      "label": coalesce(label[$lang], label.pt),
      required,
      errors {
        "requiredError": coalesce(requiredError[$lang], requiredError.pt),
        "minError": coalesce(minError[$lang], minError.pt),
        "maxError": coalesce(maxError[$lang], maxError.pt)
      }
    },
    businessName {
      "label": coalesce(label[$lang], label.pt),
      required,
      errors {
        "maxError": coalesce(maxError[$lang], maxError.pt)
      }
    },
    phone {
      "label": coalesce(label[$lang], label.pt),
      required,
      errors {
        "maxError": coalesce(maxError[$lang], maxError.pt),
        "invalidError": coalesce(invalidError[$lang], invalidError.pt)
      }
    },
    email {
      "label": coalesce(label[$lang], label.pt),
      required,
      errors {
        "invalidError": coalesce(invalidError[$lang], invalidError.pt),
        "maxError": coalesce(maxError[$lang], maxError.pt)
      }
    },
    message {
      "label": coalesce(label[$lang], label.pt),
      required,
      errors {
        "requiredError": coalesce(requiredError[$lang], requiredError.pt),
        "minError": coalesce(minError[$lang], minError.pt),
        "maxError": coalesce(maxError[$lang], maxError.pt)
      }
    }
  }
`)
