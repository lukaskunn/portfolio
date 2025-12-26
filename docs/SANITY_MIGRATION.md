# Sanity CMS Migration Guide

## Overview

This guide documents the migration from using `usePageContext` and local JSON content (`en.json`) to Sanity CMS for your portfolio project.

## What Changed

### Architecture Shift

**Before:**

- Content stored in `/src/content/en.json`
- `LanguageContext` provided content to all components via `useLanguage()` hook
- Client-side only content management

**After:**

- Content stored in Sanity CMS (cloud)
- Server Components fetch data using utility functions from `/src/sanity/lib/fetch.ts`
- Data passed as props to Client Components
- Automatic caching and revalidation (1 hour)
- `PageContext` kept for animation state (NOT removed - it's unrelated to content)

### Modified Files

#### Created

- `/src/sanity/lib/fetch.ts` - Utility functions for fetching Sanity content with caching

#### Updated Pages (now async Server Components)

- `/src/app/layout.tsx` - Fetches header/footer and passes to components
- `/src/app/projects/page.tsx` - Fetches projects data
- `/src/app/about-me/page.tsx` - Fetches about me content
- `/src/app/contact/page.tsx` - Fetches contact content
- `/src/app/projects/ProjectsClient.tsx` - Created to separate client logic

#### Updated Components (now accept data props)

- `/src/components/Header/index.tsx`
- `/src/components/Header/components/HeaderDesktop/HeaderDesktop.tsx`
- `/src/components/Header/components/HeaderDesktop/DownloadResumeButton.tsx`
- `/src/components/Header/components/HeaderDesktop/ContactMeButton.tsx`
- `/src/components/Header/components/HeaderMobile/index.tsx`
- `/src/components/Footer/index.tsx`
- `/src/components/Footer/SocialLinks.tsx`
- `/src/components/Footer/WorkMessage.tsx`
- `/src/app/about-me/components/HeroSection.tsx`
- `/src/app/about-me/components/IntroSection.tsx`
- `/src/app/about-me/components/BackgroundSection.tsx`
- `/src/app/about-me/components/CertificationsSection.tsx`
- `/src/app/contact/components/PageHeader.tsx`
- `/src/app/contact/components/ContactForm.tsx`
- `/src/app/contact/components/ContactInfo.tsx`

## Data Migration Steps

### 1. Understand the Sanity Schema Structure

Your Sanity queries expect these document types:

- `landing` - Homepage content
- `headerContent` - Header navigation
- `footer` - Footer content
- `aboutMe` - About me page
- `contact` - Contact page
- `works` - Projects section metadata
- `project` - Individual projects

### 2. Map JSON to Sanity Documents

#### Example: Header Content

**en.json structure:**

```json
{
  "header": {
    "headerTitle": "Lucas Oliveira",
    "menuItems": [
      { "title": "Home", "link": "/home" }
    ],
    "resumeButton": {
      "title": "My Resume",
      "link": "https://..."
    }
  }
}
```

**Sanity schema expects:**

```json
{
  "_type": "headerContent",
  "headerTitle": "Lucas Oliveira",
  "menuItems": [
    { "text": "Home", "url": "/home", "isExternal": false }
  ],
  "resumeButton": {
    "text": "My Resume",
    "url": "https://...",
    "isExternal": true
  }
}
```

**Note:** Field names changed (`title` → `text`, `link` → `url`)

### 3. Create Documents in Sanity Studio

You need to populate your Sanity dataset with content. Options:

#### Option A: Manual Entry via Sanity Studio

1. Go to your Sanity Studio (likely at `https://your-project.sanity.studio`)
2. Create each document type and fill in fields manually
3. Use `en.json` as reference for content

#### Option B: Programmatic Import (Recommended)

Create a migration script to import from `en.json`:

```javascript
// scripts/migrate-to-sanity.js
import { client } from '../src/sanity/client.js'
import content from '../src/content/en.json' assert { type: 'json' }

async function migrateContent() {
  // Migrate header
  await client.create({
    _type: 'headerContent',
    headerTitle: content.header.headerTitle,
    menuItems: content.header.menuItems.map(item => ({
      text: item.title,
      url: item.link,
      isExternal: item.link.startsWith('http')
    })),
    resumeButton: {
      text: content.header.resumeButton.title,
      url: content.header.resumeButton.link,
      isExternal: true
    },
    contactButton: {
      text: content.header.contactButton.title,
      url: content.header.contactButton.link,
      isExternal: false
    },
    mobileNavigation: content.header.mobileNavigation,
    socialLinks: content.header.socialLinks.map(link => ({
      text: link.label,
      url: link.href,
      isExternal: true
    }))
  })

  // Continue for other document types...
  console.log('Migration complete!')
}

migrateContent()
```

Run with: `node scripts/migrate-to-sanity.js`

### 4. Field Mapping Reference

| en.json Field | Sanity Field | Notes |
|---------------|--------------|-------|
| `title` | `text` | For links/buttons |
| `link`/`href` | `url` | For links |
| N/A | `isExternal` | New field - set true for external URLs |
| `label` | `text` | For social links |
| `sectionTitle` | `pageTitle` or `sectionTitle` | Check schema |

### 5. Important Notes

#### Projects Data

- Projects in `en.json` have a specific structure
- Sanity's `project` schema may differ slightly
- Pay attention to image field structures (they use asset references)
- Gallery images need to be uploaded to Sanity's asset system

#### Image Migration

Images referenced in `en.json` need to be:

1. Uploaded to Sanity's media library
2. Referenced by their asset ID in documents

Example:

```javascript
// Upload image first
const imageAsset = await client.assets.upload('image', imageFile)

// Then reference in document
{
  mainImageUrl: {
    _type: 'image',
    asset: {
      _ref: imageAsset._id
    }
  }
}
```

## Testing the Migration

1. **Start Dev Server:** `npm run dev`
2. **Check Each Page:**
   - `/home` - Should display landing content from Sanity
   - `/projects` - Should list projects from Sanity
   - `/about-me` - Should show about me content
   - `/contact` - Should show contact form
3. **Check Header/Footer** on all pages
4. **Verify Fallbacks** - Components have default values if Sanity data is missing

## Rollback Plan

If needed, you can temporarily revert by:

1. Keeping `useLanguage` imports
2. Commenting out Sanity fetch calls
3. Passing `currentContent` props instead of Sanity data

However, the clean approach is to ensure Sanity is properly populated.

## Benefits of This Migration

✅ Content updates without redeployment
✅ Better content structure validation
✅ Image optimization via Sanity CDN
✅ Versioning and draft/publish workflow
✅ Server-side rendering with caching
✅ Scalable for future features (CMS UI, content scheduling, etc.)

## Next Steps

1. ✅ Complete code migration (DONE)
2. ⏳ Populate Sanity with content from `en.json`
3. ⏳ Upload and link all images
4. ⏳ Test all pages thoroughly
5. ⏳ Deploy and verify production
6. ⏳ (Optional) Remove `LanguageContext` and `en.json` once confirmed working

## Support

For Sanity-specific issues:

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image CDN](https://www.sanity.io/docs/image-url)
