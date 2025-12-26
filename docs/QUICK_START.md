# Quick Start Guide - Post Migration

## ✅ Migration Complete! What's Next?

### Step 1: Verify Your Setup

Check that you have:

```bash
# .env.local should have:
NEXT_PUBLIC_SANITY_PROJECT_ID=lav2qk6b
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here  # For write operations
```

### Step 2: Test Without Sanity Data

Even without Sanity data, your site should work with fallback values:

```bash
npm run dev
```

Visit: <http://localhost:3000/home>

You'll see placeholder text where Sanity data would appear. This is normal!

### Step 3: Populate Sanity (Quick Method)

#### Option A: Manual (Fastest for Testing)

1. Go to your Sanity Studio: <https://your-project.sanity.studio>
2. Create these 3 documents first:

**landing:**

```json
{
  "_type": "landing",
  "title": "CREATIVE DEVELOPER",
  "subtitle": {
    "currentPosition": "/ Currently",
    "positionTitle": "PL/SSR II Front End Developer",
    "companyName": "Corebiz",
    "companyUrl": "https://www.corebiz.ag/en",
    "location": "/ Based in São Paulo, Brazil."
  }
}
```

**headerContent:**

```json
{
  "_type": "headerContent",
  "headerTitle": "Lucas Oliveira",
  "menuItems": [
    {"text": "Home", "url": "/home"},
    {"text": "Projects", "url": "/projects"},
    {"text": "About Me", "url": "/about-me"}
  ]
}
```

**footer:**

```json
{
  "_type": "footer",
  "quickMessage": "I DESIGN MEMORABLE WEB EXPERIENCES FOR BRANDS OF ALL SIZES"
}
```

1. Refresh your site - Header, Footer, and Home page should now work!

#### Option B: Automated Import

Use the migration script in `SANITY_MIGRATION.md` to import all content from `en.json`.

### Step 4: Verify Each Page

| Page | What to Check | Status |
|------|---------------|--------|
| `/home` | Title, subtitle, clock | Test after Step 3 |
| `/projects` | Projects list | Needs `project` documents |
| `/about-me` | All sections | Needs `aboutMe` + `services` docs |
| `/contact` | Form and info | Needs `contact` doc |

### Step 5: Debug Issues

#### Problem: Pages show fallback text

**Solution:** Create the required Sanity documents for that page

#### Problem: Images don't load

**Solution:** Upload images to Sanity and link them in documents

#### Problem: TypeScript errors

**Solution:** All types are already defined, check console for specific errors

#### Problem: Build fails

**Solution:** Ensure all Sanity queries return valid data (or null)

### Step 6: Deploy

Once everything works locally:

```bash
# Build for production
npm run build

# Test production build
npm run start

# Deploy to Vercel
git push origin main  # If using Vercel auto-deploy
```

---

## 🔍 Quick Troubleshooting

### Check Sanity Connection

```typescript
// Add this to any page temporarily
console.log('Sanity Config:', {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
})
```

### Test a Query Directly

```typescript
import { client } from '@/sanity/client'

// In any async component:
const test = await client.fetch('*[_type == "landing"][0]')
console.log('Landing data:', test)
```

### Check What Documents Exist

In Sanity Studio or via GROQ:

```groq
*[_type == "landing"]
*[_type == "headerContent"]
*[_type == "footer"]
*[_type == "project"]
```

---

## 📁 File Reference

**Fetch utilities:** `/src/sanity/lib/fetch.ts`
**Queries:** `/src/sanity/sanity-queries.ts`
**Client config:** `/src/sanity/client.ts`
**Old content (reference):** `/src/content/en.json`

---

## 🎯 Success Checklist

- [ ] `.env.local` configured
- [ ] Site runs with `npm run dev`
- [ ] Created `landing` document in Sanity
- [ ] Created `headerContent` document
- [ ] Created `footer` document
- [ ] Header displays on all pages
- [ ] Footer displays on all pages
- [ ] Home page shows content
- [ ] Created at least 1 `project` document
- [ ] Projects page lists projects
- [ ] About me page loads
- [ ] Contact page loads
- [ ] No console errors
- [ ] Ready to populate remaining content!

---

## 🚀 You're Ready

The migration is complete. Follow these steps and your portfolio will be fully CMS-driven!

**Questions?** Check the main documentation:

- `SANITY_MIGRATION.md` - Detailed migration guide
- `MIGRATION_COMPLETE.md` - Full summary
- `MIGRATION_STATUS.md` - Status tracking
