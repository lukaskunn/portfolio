# Quick Accessibility Testing Guide

## 🚀 Quick Start - Test in 5 Minutes

### 1. **Keyboard Navigation Test** (2 minutes)

1. Open your portfolio in the browser
2. **Refresh the page** to start from the top
3. Press `Tab` key:
   - ✅ "Skip to main content" link should appear at the top
   - ✅ Press `Enter` to jump to content
   - ✅ Continue tabbing through all links/buttons
   - ✅ Every focused element should have a **visible outline** (blue/colored border)

**What to look for:**

- All interactive elements are reachable via Tab
- Focus indicator is clearly visible (not hidden by custom cursor)
- Tab order makes logical sense (top to bottom, left to right)

### 2. **Screen Reader Quick Test** (3 minutes)

#### **On Mac (VoiceOver - Built-in)**

```bash
# Turn on: Cmd + F5
# Turn off: Cmd + F5
```

**Quick test:**

1. Cmd + F5 to start VoiceOver
2. Navigate with `VO + Right Arrow` (VO = Control + Option)
3. Press `VO + U` to open Rotor, select "Headings"
4. Verify page structure makes sense

#### **On Windows (NVDA - Free)**

Download: <https://www.nvaccess.org/download/>

**Quick test:**

1. Start NVDA (Ctrl + Alt + N)
2. Press `H` to jump between headings
3. Press `K` to jump between links
4. Verify content is announced correctly

### 3. **Automated Test** (1 minute)

**Using Chrome DevTools Lighthouse:**

1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select only "Accessibility" checkbox
4. Click "Analyze page load"
5. **Goal: 95+ score**

---

## 🔧 What Was Fixed

### Before ❌

```tsx
// No skip link
<div> {/* Not semantic */}
  <div onClick={...}> {/* No keyboard support */}
    Click me
  </div>
</div>
```

### After ✅

```tsx
<SkipToContent /> {/* Keyboard users can skip navigation */}
<main id="main-content" role="main" aria-label="Page content">
  <article aria-label="Project: Website Redesign">
    <LinkHandler
      href="/project/website"
      aria-label="View Website Redesign project details"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
```

---

## ✅ Accessibility Checklist

Use this checklist for every new feature/page:

### Semantic HTML

- [ ] Use `<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`
- [ ] Only one `<main>` per page with `id="main-content"`
- [ ] Headings follow logical order (h1 → h2 → h3, no skipping levels)

### ARIA Labels

- [ ] All interactive elements have descriptive `aria-label` (if no visible text)
- [ ] Decorative elements have `aria-hidden="true"`
- [ ] Forms have proper labels (`<label htmlFor="...">`

### Keyboard Support

- [ ] All functionality works with Tab + Enter/Space
- [ ] Focus indicators are visible (`:focus-visible` styles)
- [ ] No keyboard traps
- [ ] Skip to content link present

### Screen Reader

- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Page structure makes sense when read aloud
- [ ] All images have alt text
- [ ] Links have descriptive text (not "click here")

---

## 🐛 Common Issues to Avoid

### 1. **Invisible Focus Indicators**

```scss
// ❌ Bad - hides focus for keyboard users
*:focus {
  outline: none;
}

// ✅ Good - only hides for mouse users
*:focus {
  outline: none;
}
*:focus-visible {
  outline: 3px solid blue;
}
```

### 2. **div Buttons**

```tsx
// ❌ Bad - not keyboard accessible
<div onClick={handleClick}>Click me</div>

// ✅ Good - proper button
<button onClick={handleClick}>Click me</button>

// ✅ Also good - if you must use div
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Descriptive action"
>
```

### 3. **Missing Alt Text**

```tsx
// ❌ Bad
<img src="project.jpg" />

// ✅ Good
<img src="project.jpg" alt="E-commerce dashboard interface" />

// ✅ Decorative images
<img src="decoration.svg" alt="" aria-hidden="true" />
```

### 4. **Non-Descriptive Links**

```tsx
// ❌ Bad - meaningless to screen reader users
<a href="/project/1">Click here</a>
<a href="/project/2">Read more</a>

// ✅ Good - descriptive
<a href="/project/1">View E-commerce Dashboard project</a>
<a href="/project/2" aria-label="Read more about Website Redesign project">
  Read more
</a>
```

---

## 📱 Mobile Accessibility

### Touch Target Size

All interactive elements should be at least **44x44 pixels**:

```scss
button, a, input {
  min-height: 44px;
  min-width: 44px;

  @media (pointer: coarse) { // Touch devices
    min-height: 48px;
    min-width: 48px;
  }
}
```

### Zoom Support

Don't disable zoom:

```html
<!-- ❌ Bad -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!-- ✅ Good -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 🎯 Testing Tools Reference

### Browser Extensions

| Tool | Browser | Purpose |
|------|---------|---------|
| [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools) | Chrome/Edge | Find accessibility issues |
| [WAVE](https://wave.webaim.org/extension/) | Chrome/Firefox | Visual feedback on accessibility |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) | Chrome (Built-in) | Audit accessibility score |

### Screen Readers

| Tool | Platform | Cost |
|------|----------|------|
| NVDA | Windows | Free |
| VoiceOver | macOS/iOS | Free (Built-in) |
| JAWS | Windows | Paid (Free trial) |
| TalkBack | Android | Free (Built-in) |

---

## 📚 Quick Reference Links

- **WCAG Quick Reference**: <https://www.w3.org/WAI/WCAG21/quickref/>
- **ARIA Practices**: <https://www.w3.org/WAI/ARIA/apg/>
- **WebAIM Checklist**: <https://webaim.org/standards/wcag/checklist>
- **MDN Accessibility**: <https://developer.mozilla.org/en-US/docs/Web/Accessibility>

---

## 🚨 Priority Fixes Still Needed

Based on the first analysis, these still require attention:

### High Priority

1. **Add alt text to all images** - Many project images missing alt text
2. **Color contrast audit** - Verify all text meets 4.5:1 contrast ratio
3. **Form validation** - Contact form needs ARIA live regions for errors

### Medium Priority

4. **Modal focus trap** - ProjectModal should trap focus when open
2. **Reduced motion** - Respect `prefers-reduced-motion` in animations
3. **Loading state announcements** - Add ARIA live regions

---

**Last Updated**: December 26, 2025
**Review Before Each Deploy**: Yes
**Automated Testing**: Set up CI/CD accessibility checks
