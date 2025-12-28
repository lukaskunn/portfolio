# Design System Documentation

This document outlines the design tokens and best practices for the portfolio project's SCSS architecture.

## Table of Contents

1. [Overview](#overview)
2. [Design Tokens](#design-tokens)
3. [Mixins](#mixins)
4. [Best Practices](#best-practices)
5. [Usage Examples](#usage-examples)

## Overview

All design tokens are centralized in [`src/styles/sass/_references.scss`](../src/styles/sass/_references.scss). This file should be imported at the top of every SCSS module using:

```scss
@use "../references" as *;
```

## Design Tokens

### Color Tokens

#### Base Colors

- `$background-color-main: #E5E5DD` - Main background color
- `$background-color-dark: #1c1c1c` - Dark overlay background
- `$background-color-overlay: #292929` - Modal overlay background
- `$primary-color: #000000` - Primary text/border color
- `$secondary-color: #111111` - Secondary elements

#### State Colors

- `$error-color: #e74c3c` - Error messages and states
- `$success-color: #27ae60` - Success messages

#### Utility Colors

- `$color-transparent-bg` - Transparent background variant

#### Alpha Variations

For borders, shadows, and overlays:

- `$alpha-10` through `$alpha-40` - Black with 10%-40% opacity
- `$success-alpha-10`, `$success-alpha-30` - Success color with transparency
- `$error-alpha-10`, `$error-alpha-30` - Error color with transparency

### Typography Tokens

#### Font Families

- `$title-font` - Akshar (headings)
- `$primary-text-font` - Roboto Mono (body text)
- `$secondary-text-font` - Roboto (alternative body)
- `$gloock-font` - Gloock (special titles)

#### Font Sizes

Scale from `$font-size-tiny` (10px) to `$font-size-10xl` (220px):

```scss
$font-size-tiny: 10px;
$font-size-xs: 11px;
$font-size-sm: 12px;
$font-size-base: 14px;
$font-size-base-16: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$font-size-2xl: 24px;
// ... up to $font-size-10xl: 220px
```

#### Line Heights

- `$line-height-none: 1`
- `$line-height-tight: 1.1`
- `$line-height-snug: 1.2`
- `$line-height-normal: 1.4`
- `$line-height-relaxed: 1.5`

#### Letter Spacing

From `$letter-spacing-tightest` (-0.08rem) to `$letter-spacing-super` (0.3em)

#### Font Weights

- `$font-weight-light: 300`
- `$font-weight-regular: 400`
- `$font-weight-medium: 500`
- `$font-weight-bold: 700`

### Spacing Tokens

#### Base Spacing Scale

Powers of 2 + common UI values:

```scss
$spacing-1: 2px;
$spacing-2: 4px;
$spacing-4: 8px;
$spacing-8: 16px;
$spacing-10: 20px;
$spacing-20: 40px;
$spacing-60: 120px;
// ... etc
```

#### Container Max Widths

- `$container-max-width: 1440px` - Main content container
- `$container-sm` through `$container-4xl` - Component-specific widths

#### Image Sizes

- `$image-size-mobile: 180px`
- `$image-size-tablet: 220px`
- `$image-size-desktop: 260px`

### Border Tokens

- `$border-width-thin: 1px`
- `$border-width-base: 2px`
- `$border-width-thick: 3px`
- `$border-radius-sm: 2px`
- `$border-radius-full: 50%`

### Shadow Tokens

- `$shadow-sm: 0 4px 12px $alpha-10`

### Transition Tokens

- `$transition-fast: 0.2s ease`
- `$transition-base: 0.3s ease`
- `$transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### Z-Index Tokens

- `$z-index-overlay-bg: 998`
- `$z-index-overlay: 999`
- `$z-index-modal: 1000`

### Effects

- `$backdrop-blur: blur(20px)`

## Mixins

### Responsive Breakpoints

```scss
@include respond-to($breakpoint)
```

Available breakpoints:

- `mobile-375` - Max width 375px
- `mobile-480` - Max width 480px
- `mobile-768` - Max width 768px
- `tablet-1024` - Max width 1024px
- `desktop-1366` - Max width 1366px
- `desktop-1440` / `tablet-1440` - Max width 1440px
- `desktop-1920` - Min width 1920px

**Example:**

```scss
.container {
  padding: $spacing-20;

  @include respond-to(mobile-768) {
    padding: $spacing-10;
  }
}
```

### Typography Mixins

#### Title Style

```scss
@include title-style($font-size, $line-height, $letter-spacing)
```

#### Subtitle Style

```scss
@include subtitle-style($font-size, $line-height, $letter-spacing)
```

#### Predefined Text Styles

- `@include footer-text-box-text` - Footer text styling
- `@include text-box-text` - Content box text
- `@include menu-item` - Navigation menu items

### Utility Mixins

#### Focus Styles

```scss
@include focus-visible;
@include interactive-focus;
```

#### Transitions

```scss
// Standard transition
@include transition(opacity, transform);

// Smooth cubic-bezier transition
@include smooth-transition(all);
```

#### Backdrop Blur

```scss
@include backdrop-blur;
```

## Best Practices

### 1. Always Use Tokens

❌ **Don't:**

```scss
.button {
  padding: 16px 32px;
  color: #000;
  border: 2px solid black;
}
```

✅ **Do:**

```scss
.button {
  padding: $spacing-8 $spacing-16;
  color: $primary-color;
  border: $border-width-base solid $primary-color;
}
```

### 2. Use Mixins for Common Patterns

❌ **Don't:**

```scss
.card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

✅ **Do:**

```scss
.card {
  @include smooth-transition(transform);
}
```

### 3. Mobile-First Responsive Design

Always write base styles for mobile, then use `@include respond-to()` for larger screens:

```scss
.container {
  // Mobile styles (default)
  padding: $spacing-10;
  font-size: $font-size-base;

  // Tablet and up
  @include respond-to(tablet-1024) {
    padding: $spacing-20;
  }

  // Desktop and up
  @include respond-to(desktop-1440) {
    padding: $spacing-30;
    font-size: $font-size-lg;
  }
}
```

### 4. Semantic Color Usage

Use semantic color tokens rather than creating new hardcoded colors:

```scss
// For form errors
border-color: $error-color;

// For success messages
color: $success-color;
background-color: $success-alpha-10;

// For overlays/shadows
box-shadow: 0 2px 8px $alpha-20;
```

### 5. Consistent Spacing

Use the spacing scale consistently. Prefer tokens like:

- `$spacing-2` (4px) for small gaps
- `$spacing-4` (8px) for compact spacing
- `$spacing-8` (16px) for standard spacing
- `$spacing-12` (24px) for larger spacing
- `$spacing-20` (40px) for section spacing

### 6. Typography Hierarchy

Use the predefined font size scale:

```scss
.small-text { font-size: $font-size-sm; }      // 12px
.body-text { font-size: $font-size-base-16; }  // 16px
.heading { font-size: $font-size-4xl; }        // 36px
.hero { font-size: $font-size-8xl; }           // 72px
```

### 7. Avoid Magic Numbers

Every spacing, size, or timing value should use a token. If a token doesn't exist for your use case, consider if:

1. An existing token can work (round to nearest standard value)
2. A new token should be added to `_references.scss`

### 8. Component Organization

Structure your SCSS files logically:

```scss
@use "../references" as *;

// 1. Local variables (if needed)
$component-specific-var: value;

// 2. Container/wrapper styles
.container {
  // Positioning & Layout
  display: flex;
  width: 100%;

  // Spacing
  padding: $spacing-20;

  // Colors
  background-color: $background-color-main;

  // Typography
  font-family: $primary-text-font;

  // Responsive
  @include respond-to(mobile-768) {
    padding: $spacing-10;
  }
}

// 3. Child elements
.element {
  // ...
}
```

## Usage Examples

### Example 1: Button Component

```scss
@use "../references" as *;

.button {
  // Layout
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-2;

  // Spacing
  padding: $spacing-8 $spacing-16;

  // Typography
  font-family: $primary-text-font;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  letter-spacing: $letter-spacing-wide;

  // Colors
  color: $primary-color;
  background-color: transparent;
  border: $border-width-base solid $primary-color;

  // Effects
  @include smooth-transition(all);

  &:hover {
    background-color: $primary-color;
    color: $background-color-main;
    transform: translateY(-2px);
    box-shadow: $shadow-sm;
  }

  // Responsive
  @include respond-to(mobile-768) {
    padding: $spacing-6 $spacing-12;
    font-size: $font-size-sm;
  }
}
```

### Example 2: Card with Backdrop

```scss
@use "../references" as *;

.card {
  // Layout
  width: 100%;
  max-width: $container-lg;

  // Spacing
  padding: $spacing-20;
  margin-bottom: $spacing-12;

  // Colors & Effects
  background-color: $color-transparent-bg;
  @include backdrop-blur;
  border: $border-width-thin solid $alpha-20;
  border-radius: $border-radius-sm;

  // Responsive
  @include respond-to(mobile-768) {
    padding: $spacing-10;
  }
}
```

### Example 3: Form Input

```scss
@use "../references" as *;

.input {
  // Layout
  width: 100%;

  // Spacing
  padding: $spacing-8 0;

  // Typography
  font-family: $primary-text-font;
  font-size: $font-size-base-16;
  font-weight: $font-weight-regular;

  // Colors
  color: $primary-color;
  background-color: transparent;
  border: none;
  border-bottom: $border-width-thin solid $alpha-30;

  // Effects
  @include transition(border-color);

  &:focus {
    outline: none;
    border-bottom-color: $primary-color;
  }

  &::placeholder {
    color: $alpha-40;
  }

  &.error {
    border-bottom-color: $error-color;
  }
}

.error-message {
  margin-top: $spacing-2;
  font-size: $font-size-sm;
  color: $error-color;
}
```

## Maintenance

### Adding New Tokens

When adding new design tokens to `_references.scss`:

1. **Determine the category** - Colors, Spacing, Typography, etc.
2. **Follow naming conventions** - Use descriptive, semantic names
3. **Use existing scale** - Fit new values into existing patterns
4. **Document usage** - Update this file with examples
5. **Test compilation** - Run `npm run sass` to ensure no errors

### Refactoring Existing Styles

When refactoring legacy styles:

1. Identify hardcoded values (colors, spacing, sizes)
2. Map them to existing tokens
3. If no token exists, add to `_references.scss`
4. Update the component
5. Test compilation and visual appearance

## Migration Checklist

When creating new components or refactoring existing ones:

- [ ] Import `@use "../references" as *;` at top of file
- [ ] Replace all hardcoded colors with color tokens
- [ ] Replace all spacing values with spacing tokens
- [ ] Replace all font properties with typography tokens
- [ ] Use mixins for transitions, focus states, and responsive breakpoints
- [ ] Follow mobile-first responsive approach
- [ ] Test compilation with `npm run sass`
- [ ] Verify visual appearance in browser

## Resources

- Main design tokens: [`src/styles/sass/_references.scss`](../src/styles/sass/_references.scss)
- Global styles: [`src/styles/sass/global.scss`](../src/styles/sass/global.scss)
- Component examples: [`src/styles/sass/components/`](../src/styles/sass/components/)
