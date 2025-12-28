# SCSS Design Tokens - Quick Reference

Quick lookup for common design tokens. For complete documentation, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## Import Statement

```scss
@use "../references" as *;
```

## Most Common Tokens

### Colors

```scss
$background-color-main     // #E5E5DD (main bg)
$primary-color            // #000 (text/borders)
$error-color              // #e74c3c
$success-color            // #27ae60
$alpha-10                 // rgba(0,0,0,0.1) - for shadows
$alpha-30                 // rgba(0,0,0,0.3) - for borders
$alpha-40                 // rgba(0,0,0,0.4) - for placeholders
```

### Spacing (Most Used)

```scss
$spacing-2     // 4px   - tiny gaps
$spacing-4     // 8px   - small gaps
$spacing-6     // 12px  - compact
$spacing-8     // 16px  - standard padding
$spacing-10    // 20px  - medium padding
$spacing-12    // 24px  - large gap
$spacing-20    // 40px  - section spacing
$spacing-30    // 60px  - large section
$spacing-60    // 120px - page padding
```

### Typography

```scss
// Font Families
$primary-text-font        // Roboto Mono (body)
$gloock-font             // Gloock (titles)

// Common Sizes
$font-size-sm: 12px
$font-size-base: 14px
$font-size-base-16: 16px
$font-size-lg: 18px
$font-size-xl: 20px
$font-size-2xl: 24px
$font-size-3xl: 28px
$font-size-4xl: 36px

// Weights
$font-weight-light: 300
$font-weight-regular: 400
$font-weight-medium: 500
$font-weight-bold: 700
```

### Borders

```scss
$border-width-thin: 1px
$border-width-base: 2px
$border-radius-sm: 2px
$border-radius-full: 50%
```

## Most Common Mixins

### Responsive

```scss
@include respond-to(mobile-768) { ... }
@include respond-to(tablet-1024) { ... }
@include respond-to(desktop-1440) { ... }
```

### Transitions

```scss
@include transition(opacity, transform)
@include smooth-transition(all)
@include backdrop-blur
```

### Typography

```scss
@include title-style($font-size-8xl, $line-height-tight, $letter-spacing-tight-em)
@include menu-item
```

## Common Patterns

### Button

```scss
.button {
  padding: $spacing-8 $spacing-16;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $primary-color;
  border: $border-width-base solid $primary-color;
  @include smooth-transition(all);
}
```

### Card Container

```scss
.card {
  padding: $spacing-20;
  max-width: $container-max-width;

  @include respond-to(mobile-768) {
    padding: $spacing-10;
  }
}
```

### Form Input

```scss
.input {
  padding: $spacing-8 0;
  font-size: $font-size-base-16;
  border-bottom: $border-width-thin solid $alpha-30;
  @include transition(border-color);

  &::placeholder {
    color: $alpha-40;
  }

  &.error {
    border-color: $error-color;
  }
}
```

### Focus States

```scss
.interactive-element {
  @include focus-visible;

  // Or for links/buttons
  @include interactive-focus;
}
```

## Token Search Tips

### By Purpose

- **Small spacing**: `$spacing-2` to `$spacing-6`
- **Medium spacing**: `$spacing-8` to `$spacing-20`
- **Large spacing**: `$spacing-30` to `$spacing-60`
- **Page margins**: `$spacing-60` to `$spacing-95`

### By Element Type

- **Body text**: `$font-size-base-16` + `$font-weight-regular`
- **Small UI text**: `$font-size-sm` to `$font-size-base`
- **Headings**: `$font-size-2xl` to `$font-size-8xl`
- **Hero text**: `$font-size-9xl` to `$font-size-10xl`

### By State

- **Normal**: `$primary-color`
- **Error**: `$error-color` + `$error-alpha-10/30`
- **Success**: `$success-color` + `$success-alpha-10/30`
- **Disabled**: `$alpha-40`

## Quick Conversions

| Old Value | New Token |
|-----------|-----------|
| `2px` | `$spacing-1` |
| `4px` | `$spacing-2` |
| `8px` | `$spacing-4` |
| `12px` | `$spacing-6` |
| `16px` | `$spacing-8` |
| `20px` | `$spacing-10` |
| `24px` | `$spacing-12` |
| `40px` | `$spacing-20` |
| `#000` | `$primary-color` |
| `#E5E5DD` | `$background-color-main` |
| `#e74c3c` | `$error-color` |
| `rgba(0,0,0,0.1)` | `$alpha-10` |
| `rgba(0,0,0,0.3)` | `$alpha-30` |
| `1px` | `$border-width-thin` |
| `2px` | `$border-width-base` |
| `0.3s ease` | `$transition-base` |
| `300` | `$font-weight-light` |
| `400` | `$font-weight-regular` |
| `500` | `$font-weight-medium` |
| `700` | `$font-weight-bold` |

## See Also

- 📖 [Complete Design System Documentation](./DESIGN_SYSTEM.md)
- 📝 [SCSS Refactoring Summary](./SCSS_REFACTORING.md)
- 🔧 [Project Setup Guide](./QUICK_START.md)
