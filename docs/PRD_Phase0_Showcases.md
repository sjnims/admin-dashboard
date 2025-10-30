# Product Requirements Document: Phase 0 - Component Showcases

**Project**: Admin Dashboard Enhancement
**Phase**: 0 - Component Showcases
**Version**: 1.0
**Date**: 2025-10-29
**Status**: Ready for Implementation

---

## Executive Summary

Create a comprehensive reference library showcasing all Bootstrap 5.3.8 components, Bootstrap Icons 1.13.1, Chart.js 4.5.1 chart types, and utility classes. Each showcase page will serve as both documentation and a living style guide, fully themed to match the existing dashboard with automatic light/dark mode support.

**Goal**: Provide copy-paste ready reference pages for all existing dependencies
**Scope**: 4 self-contained HTML pages in `showcase/` directory
**Timeline**: Phase 0 foundation for future feature development
**Dependencies**: Bootstrap 5.3.8, Bootstrap Icons 1.13.1, Chart.js 4.5.1 (already loaded)

---

## 1. Project Context

### 1.1 Current State
- Production-ready admin dashboard template (v1.0)
- Modular architecture: HTML (454 lines), CSS (575 lines), JS (853 lines)
- Bootstrap 5.3.8 + Bootstrap Icons + Chart.js loaded via CDN with SRI hashes
- Theme system using CSS custom properties (30+ variables)
- WCAG AAA compliant dark mode
- No build process, browser-ready

### 1.2 Problem Statement
Developers need quick reference for:
- What Bootstrap components are available
- How components look themed for this dashboard
- Which of 2,000+ icons to use and how to implement them
- Chart.js configuration patterns for theme-aware visualizations
- Bootstrap utility classes for rapid prototyping

Without this reference, developers must:
- Leave the project to consult external docs
- Guess at theming implementation
- Test dark mode compatibility manually
- Search through 2,000+ icons without context

### 1.3 Success Metrics
- ✅ All 4 showcase pages functional and accessible
- ✅ Every Bootstrap component documented with code snippet
- ✅ Icon search returns results in <100ms
- ✅ All charts auto-update colors on theme switch
- ✅ Copy-to-clipboard works for all code snippets
- ✅ 100% WCAG 2.1 AA compliance (AAA where possible)
- ✅ Mobile responsive on all viewport sizes
- ✅ Zero console errors in Chrome/Firefox/Safari/Edge

---

## 2. Technical Architecture

### 2.1 Technology Stack

**Core Dependencies** (already loaded in existing dashboard):
```html
<!-- Bootstrap CSS 5.3.8 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous">

<!-- Bootstrap Icons 1.13.1 -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
      integrity="sha384-CK2SzKma4jA5H/MXDUU7i1TqZlCFaD4T01vtyDFvPlD97JQyS+IsSh1nI2EFbpyk"
      crossorigin="anonymous">

<!-- Chart.js 4.5.1 -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.js"
        integrity="sha384-hfkuqrKeWFmnTMWN31VWyoe8xgdTADD11kgxmdpx2uyE6j5Az5uZq6u6AKYYmAOw"
        crossorigin="anonymous"></script>
```

**Existing Assets** (reuse from dashboard):
- `assets/css/styles.css` - Theme system with 30+ CSS variables
- `assets/js/app.js` - Theme manager and utility functions
- Google Fonts Inter (weights: 300, 400, 500, 600, 700)

**New JavaScript Requirements**:
- Clipboard API for copy-to-clipboard functionality
- Array filtering for icon search
- Chart.js instances with theme update listeners
- Bootstrap component initialization (tooltips, popovers, etc.)

### 2.2 File Structure

```
admin-dashboard/
├── showcase/                         # NEW
│   ├── bootstrap-components.html     # ~800-1000 lines
│   ├── icons-gallery.html           # ~600-800 lines
│   ├── charts-gallery.html          # ~700-900 lines
│   └── utilities.html               # ~500-700 lines
├── assets/
│   ├── css/
│   │   └── styles.css               # EXISTING - reuse theme
│   └── js/
│       └── app.js                   # EXISTING - reuse ThemeManager
└── admin-dashboard.html             # EXISTING - navigation will link here
```

### 2.3 Theme Integration

All showcase pages MUST use existing CSS variables:

```css
/* Light Mode (default) */
:root {
  --primary-color: #2563eb;
  --page-bg: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  /* ... 30+ more variables ... */
}

/* Dark Mode */
[data-bs-theme="dark"] {
  --page-bg: #0f172a;
  --card-bg: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  /* ... automatic variable overrides ... */
}
```

**Theme Switching**:
- Reuse existing theme flicker prevention script from dashboard
- Reuse existing ThemeManager module from `assets/js/app.js`
- All charts must subscribe to theme change events
- No hardcoded colors - all via CSS variables

---

## 3. Deliverable Specifications

### 3.1 Deliverable 1: `showcase/bootstrap-components.html`

#### 3.1.1 Purpose
Complete visual reference of all Bootstrap 5.3.8 components themed for the dashboard.

#### 3.1.2 Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Standard meta tags, theme flicker prevention script -->
  <!-- Same CDN resources as dashboard -->
  <!-- Link to assets/css/styles.css -->
  <title>Bootstrap Components Showcase - Admin Dashboard</title>
</head>
<body>
  <!-- Top navbar with theme switcher (reuse dashboard pattern) -->

  <!-- Main content -->
  <div class="container-fluid py-4">
    <!-- Page header -->
    <header class="mb-4">
      <h1>Bootstrap 5.3.8 Components</h1>
      <p class="lead">Complete component reference themed for this dashboard</p>
    </header>

    <!-- Table of contents (sticky sidebar or top navigation) -->
    <nav aria-label="Component categories">
      <!-- Links to each component section -->
    </nav>

    <!-- Component sections (alphabetical) -->
    <section id="accordion">
      <h2>Accordion</h2>
      <p>Description and use cases</p>

      <!-- Live example -->
      <div class="example-container">
        <!-- Working accordion -->
      </div>

      <!-- Code snippet with copy button -->
      <div class="code-container">
        <button class="copy-btn" aria-label="Copy code">
          <i class="bi bi-clipboard"></i>
        </button>
        <pre><code class="language-html"><!-- HTML code --></code></pre>
      </div>

      <!-- Dark mode preview toggle -->
      <div class="preview-controls">
        <button data-preview-theme="light">Light</button>
        <button data-preview-theme="dark">Dark</button>
      </div>
    </section>

    <!-- Repeat for all components... -->
  </div>

  <!-- Scripts -->
  <script src="../assets/js/app.js" defer></script>
  <script>
    // Copy-to-clipboard functionality
    // Bootstrap component initialization (tooltips, popovers, etc.)
    // Preview theme toggling
  </script>
</body>
</html>
```

#### 3.1.3 Components to Document

**Layout** (4 components):
1. Containers (fluid, fixed, responsive)
2. Grid system (12-column, auto-layout, responsive)
3. Columns (sizing, ordering, offsetting)
4. Breakpoints (xs, sm, md, lg, xl, xxl demonstrations)

**Forms** (15 variations):
1. Text inputs (text, email, password, number, tel, url, search)
2. Textarea (standard, with sizing)
3. Select (single, multiple, disabled options)
4. Checkboxes (default, inline, switch, disabled)
5. Radio buttons (default, inline, disabled)
6. Range slider (standard, with min/max/step)
7. File input (single, multiple)
8. Input groups (prepend text, append text, buttons, dropdowns)
9. Floating labels (all input types)
10. Form validation (valid, invalid, feedback)
11. Form text (help text, hints)
12. Disabled state
13. Readonly state
14. Sizing (sm, default, lg)
15. Form layout (horizontal, inline, grid)

**Components** (30+ components):
1. Accordion (single, always-open, flush)
2. Alerts (all 8 semantic colors, dismissible, with links/icons)
3. Badges (all colors, pill, positioned on buttons)
4. Breadcrumbs (standard, custom separator)
5. Buttons (all colors, sizes, states, outline, groups, toolbars)
6. Button group (horizontal, vertical, checkbox/radio groups)
7. Cards (basic, with header/footer, images, overlays, horizontal)
8. Carousel (with indicators, controls, captions, fade)
9. Close button (default, white)
10. Collapse (basic, horizontal, multiple targets)
11. Dropdowns (all directions, menu alignment, split button, header/divider)
12. List group (basic, links, buttons, badges, active, disabled, flush, horizontal)
13. Modal (all sizes, centered, scrolling, static backdrop, fullscreen)
14. Navs (tabs, pills, fill, justified, vertical, dropdowns)
15. Navbar (color schemes, responsive, dropdowns, forms, text)
16. Offcanvas (all positions, backdrop, scrolling body)
17. Pagination (basic, sizing, active, disabled, alignment)
18. Placeholders (animation, sizing, colors) - loading skeletons
19. Popovers (all directions, triggers, dismissible)
20. Progress (basic, labeled, striped, animated, multiple bars, heights)
21. Scrollspy (with nested nav)
22. Spinners (border, grow, all sizes, all colors, buttons)
23. Toasts (basic, stacking, colors, positioning, live)
24. Tooltips (all directions, HTML content)

**Content** (4 categories):
1. Typography (h1-h6, display, lead, text utilities, blockquote, lists)
2. Images (responsive, thumbnails, figures, alignment)
3. Tables (basic, striped, bordered, borderless, hoverable, responsive, dark, sm)
4. Figures (with captions)

#### 3.1.4 Code Snippet Format

```html
<div class="code-container mb-4">
  <div class="code-header d-flex justify-content-between align-items-center">
    <span class="badge bg-secondary">HTML</span>
    <button class="btn btn-sm btn-outline-primary copy-btn"
            data-clipboard-target="#code-accordion-1"
            aria-label="Copy HTML code">
      <i class="bi bi-clipboard"></i>
      <span class="ms-1">Copy</span>
    </button>
  </div>
  <pre class="code-body"><code id="code-accordion-1" class="language-html">&lt;div class="accordion" id="accordionExample"&gt;
  &lt;div class="accordion-item"&gt;
    &lt;h2 class="accordion-header"&gt;
      &lt;button class="accordion-button" type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"&gt;
        Accordion Item #1
      &lt;/button&gt;
    &lt;/h2&gt;
    &lt;div id="collapseOne" class="accordion-collapse collapse show"&gt;
      &lt;div class="accordion-body"&gt;
        Content goes here
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
</div>
```

#### 3.1.5 Acceptance Criteria
- [ ] All 50+ Bootstrap components documented
- [ ] Each component has working live example
- [ ] Each component has copy-paste code snippet
- [ ] Copy button works and shows success feedback
- [ ] All components work in light and dark mode
- [ ] Components use CSS variables (no hardcoded colors)
- [ ] Table of contents navigation works (smooth scroll)
- [ ] Page is accessible (WCAG 2.1 AA minimum)
- [ ] Responsive on mobile, tablet, desktop
- [ ] No console errors or warnings

---

### 3.2 Deliverable 2: `showcase/icons-gallery.html`

#### 3.2.1 Purpose
Searchable, interactive gallery of all Bootstrap Icons with click-to-copy functionality.

#### 3.2.2 Features

**Search & Filter**:
- Real-time text search (filters as you type)
- Category filter dropdown (UI, Social, File Types, etc.)
- Search by icon name or keyword
- Clear search button
- Results count display

**Icon Display**:
- Grid layout (responsive columns: 6 on mobile, 8 on tablet, 10+ on desktop)
- Each icon card shows:
  - Icon visual (at default 24px size)
  - Icon name below
  - Click anywhere on card to copy
- Hover state (lift effect, background highlight)
- Active state when clicked (success feedback)

**Size Variations**:
- Toggle buttons: 16px | 24px | 32px | 48px
- Updates all visible icons in real-time

**Color Variations**:
- Color picker buttons: Default | Primary | Success | Danger | Warning | Info
- Shows icons in different semantic colors

**Copy Functionality**:
- Click icon card to copy HTML: `<i class="bi bi-heart"></i>`
- Success toast notification: "Copied bi-heart!"
- Also show CSS alternative: `content: "\f4c6";`

#### 3.2.3 Technical Implementation

**Icon Data Structure**:
```javascript
const icons = [
  { name: 'alarm', code: '\\f101', category: 'ui', keywords: ['time', 'clock', 'alert'] },
  { name: 'heart', code: '\\f4c6', category: 'ui', keywords: ['like', 'favorite', 'love'] },
  // ... ~2,000 icons
];
```

**Search Algorithm**:
```javascript
function searchIcons(query) {
  const lower = query.toLowerCase();
  return icons.filter(icon =>
    icon.name.includes(lower) ||
    icon.keywords.some(k => k.includes(lower))
  );
}
```

**Performance Optimization**:
- Virtual scrolling for large result sets (render only visible icons)
- Debounce search input (300ms delay)
- Use document fragments for batch DOM updates
- Lazy load icon categories (load on demand)

#### 3.2.4 UI Layout

```html
<div class="container-fluid py-4">
  <!-- Header -->
  <header class="mb-4">
    <h1>Bootstrap Icons Gallery</h1>
    <p class="lead">2,000+ icons - Click any icon to copy HTML</p>
  </header>

  <!-- Controls -->
  <div class="controls-section mb-4">
    <div class="row g-3">
      <!-- Search input -->
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="search"
                 id="iconSearch"
                 class="form-control"
                 placeholder="Search icons..."
                 aria-label="Search icons">
          <button class="btn btn-outline-secondary"
                  id="clearSearch"
                  aria-label="Clear search">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <!-- Category filter -->
      <div class="col-md-3">
        <select class="form-select" id="categoryFilter" aria-label="Filter by category">
          <option value="">All Categories</option>
          <option value="ui">User Interface</option>
          <option value="social">Social Media</option>
          <option value="files">File Types</option>
          <option value="actions">Actions</option>
          <option value="status">Status</option>
          <!-- ... more categories -->
        </select>
      </div>

      <!-- Size selector -->
      <div class="col-md-3">
        <div class="btn-group w-100" role="group" aria-label="Icon size">
          <button type="button" class="btn btn-outline-primary" data-size="16">16px</button>
          <button type="button" class="btn btn-outline-primary active" data-size="24">24px</button>
          <button type="button" class="btn btn-outline-primary" data-size="32">32px</button>
          <button type="button" class="btn btn-outline-primary" data-size="48">48px</button>
        </div>
      </div>
    </div>

    <!-- Color selector -->
    <div class="row g-3 mt-2">
      <div class="col-12">
        <div class="btn-group" role="group" aria-label="Icon color">
          <button type="button" class="btn btn-sm btn-outline-secondary active" data-color="">Default</button>
          <button type="button" class="btn btn-sm btn-outline-primary" data-color="text-primary">Primary</button>
          <button type="button" class="btn btn-sm btn-outline-success" data-color="text-success">Success</button>
          <button type="button" class="btn btn-sm btn-outline-danger" data-color="text-danger">Danger</button>
          <button type="button" class="btn btn-sm btn-outline-warning" data-color="text-warning">Warning</button>
          <button type="button" class="btn btn-sm btn-outline-info" data-color="text-info">Info</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Results info -->
  <div class="mb-3">
    <p class="text-muted mb-0">
      Showing <span id="resultCount">2,000</span> icons
    </p>
  </div>

  <!-- Icons grid -->
  <div class="icons-grid" id="iconsGrid" role="list">
    <!-- Icon cards generated via JavaScript -->
    <div class="icon-card" role="listitem" data-icon="heart" tabindex="0">
      <i class="bi bi-heart fs-3"></i>
      <p class="icon-name">heart</p>
    </div>
    <!-- ... more icons -->
  </div>

  <!-- Usage examples section -->
  <section class="mt-5" aria-labelledby="usage-heading">
    <h2 id="usage-heading">Usage Examples</h2>
    <!-- Show icons in buttons, badges, forms, navigation -->
  </section>
</div>

<!-- Toast for copy feedback -->
<div class="toast-container position-fixed top-0 end-0 p-3">
  <div id="copyToast" class="toast align-items-center text-white bg-success border-0" role="alert">
    <div class="d-flex">
      <div class="toast-body">
        <i class="bi bi-check-circle me-2"></i>
        <span id="copyToastMessage">Copied!</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</div>
```

#### 3.2.5 Icon Categories

Organize icons into logical categories:

1. **User Interface** (~400 icons): arrows, chevrons, carets, menu, hamburger, etc.
2. **Social Media** (~50 icons): Twitter, Facebook, GitHub, LinkedIn, Instagram, etc.
3. **File Types** (~30 icons): PDF, Excel, Word, ZIP, code files, etc.
4. **Actions** (~200 icons): edit, delete, save, download, upload, copy, etc.
5. **Status** (~50 icons): check, x, alert, info, warning, error, etc.
6. **Navigation** (~80 icons): house, search, menu, compass, map, etc.
7. **Communication** (~60 icons): email, chat, phone, message, bell, etc.
8. **Commerce** (~40 icons): cart, credit card, wallet, tag, receipt, etc.
9. **Media** (~70 icons): play, pause, stop, camera, image, video, etc.
10. **Calendar & Time** (~30 icons): calendar, clock, alarm, stopwatch, etc.
11. **Weather** (~25 icons): sun, cloud, rain, snow, storm, etc.
12. **Miscellaneous** (~965 icons): remaining uncategorized

#### 3.2.6 Acceptance Criteria
- [ ] All ~2,000 Bootstrap Icons displayed
- [ ] Search filters icons in real-time (<100ms)
- [ ] Category filter works correctly
- [ ] Size toggle updates all icons (16/24/32/48px)
- [ ] Color toggle works with Bootstrap color utilities
- [ ] Click-to-copy shows success toast
- [ ] Copied HTML format: `<i class="bi bi-{name}"></i>`
- [ ] CSS code shown: `content: "\f{code}";`
- [ ] Keyboard navigation works (tab, enter to copy)
- [ ] Screen reader announces icon names and copy action
- [ ] Responsive grid (6→8→10+ columns)
- [ ] No performance issues with 2,000+ icons
- [ ] Usage examples section shows icons in context

---

### 3.3 Deliverable 3: `showcase/charts-gallery.html`

#### 3.3.1 Purpose
Visual reference for all Chart.js chart types with theme-aware color schemes.

#### 3.3.2 Chart Types to Document

**1. Line Charts** (6 variations):
- Simple line (single dataset)
- Multi-line (multiple datasets, legend)
- Stepped line (step interpolation)
- Curved vs straight lines comparison
- Area chart (filled line)
- Line with point styles (circle, cross, star, etc.)

**2. Bar Charts** (5 variations):
- Vertical bars
- Horizontal bars
- Stacked bars
- Grouped bars (multiple datasets side by side)
- Mixed chart (bar + line combo)

**3. Pie & Doughnut Charts** (4 variations):
- Pie chart (full circle)
- Doughnut chart (with cutout)
- Semi-circle doughnut (half circle)
- Doughnut with custom cutout percentages

**4. Radar Charts** (2 variations):
- Basic radar (single dataset)
- Multi-dataset radar (comparison)

**5. Polar Area Charts** (1 variation):
- Basic polar area with custom colors

**6. Bubble Charts** (2 variations):
- Simple bubble (x, y, radius)
- Multi-dataset bubble

**7. Scatter Charts** (2 variations):
- Basic scatter
- Multi-dataset scatter

**Total**: 22 chart examples

#### 3.3.3 Theme-Aware Color System

**Define color palettes in JavaScript**:
```javascript
const chartColors = {
  light: {
    primary: '#2563eb',
    success: '#059669',
    warning: '#d97706',
    danger: '#dc2626',
    info: '#0891b2',
    secondary: '#64748b',
    gridLines: '#e2e8f0',
    textColor: '#0f172a'
  },
  dark: {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    secondary: '#94a3b8',
    gridLines: '#334155',
    textColor: '#f1f5f9'
  }
};

function getThemeColors() {
  const theme = document.documentElement.getAttribute('data-bs-theme');
  return chartColors[theme === 'dark' ? 'dark' : 'light'];
}
```

**Subscribe to theme changes**:
```javascript
// When theme changes, update all chart colors
window.addEventListener('themeChanged', () => {
  allCharts.forEach(chart => updateChartColors(chart));
});

function updateChartColors(chart) {
  const colors = getThemeColors();

  // Update datasets
  chart.data.datasets.forEach(dataset => {
    dataset.backgroundColor = colors.primary;
    dataset.borderColor = colors.primary;
  });

  // Update grid lines
  chart.options.scales.x.grid.color = colors.gridLines;
  chart.options.scales.y.grid.color = colors.gridLines;

  // Update text
  chart.options.scales.x.ticks.color = colors.textColor;
  chart.options.scales.y.ticks.color = colors.textColor;

  chart.update('none'); // No animation
}
```

#### 3.3.4 Chart Card Layout

```html
<div class="row g-4 mb-4">
  <div class="col-lg-6">
    <div class="card shadow-sm">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h3 class="h5 mb-0">Line Chart - Simple</h3>
        <button class="btn btn-sm btn-outline-primary copy-config-btn"
                data-chart="lineSimple"
                aria-label="Copy chart configuration">
          <i class="bi bi-clipboard"></i> Copy Config
        </button>
      </div>
      <div class="card-body">
        <!-- Chart container -->
        <div class="chart-container" style="position: relative; height: 300px;">
          <canvas id="lineSimpleChart"></canvas>
        </div>

        <!-- Description -->
        <p class="mt-3 text-muted small">
          Basic line chart with single dataset. Ideal for showing trends over time.
        </p>

        <!-- Configuration (collapsible) -->
        <div class="accordion mt-3" id="configLineSimple">
          <div class="accordion-item">
            <h4 class="accordion-header">
              <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseLineSimple">
                View Configuration
              </button>
            </h4>
            <div id="collapseLineSimple" class="accordion-collapse collapse">
              <div class="accordion-body">
                <pre><code class="language-javascript">const config = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'var(--primary-color)',
      backgroundColor: 'var(--primary-color)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }
    }
  }
};

const chart = new Chart(ctx, config);</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- More chart cards... -->
</div>
```

#### 3.3.5 Sample Data Sets

Provide realistic demo data for each chart type:

```javascript
const sampleData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  revenue: [12000, 19000, 15000, 22000, 28000, 25000, 32000, 30000, 35000, 38000],
  expenses: [8000, 11000, 9000, 13000, 15000, 14000, 18000, 17000, 19000, 21000],
  users: [120, 150, 180, 220, 280, 320, 380, 450, 520, 600],
  traffic: {
    labels: ['Organic', 'Direct', 'Referral', 'Social', 'Email'],
    data: [42, 25, 18, 10, 5]
  },
  skills: {
    labels: ['Communication', 'Problem Solving', 'Leadership', 'Technical', 'Creativity'],
    data: [85, 75, 65, 90, 70]
  }
};
```

#### 3.3.6 Acceptance Criteria
- [ ] All 22 chart variations implemented
- [ ] Each chart auto-updates on theme change
- [ ] Colors use theme-aware variables
- [ ] Charts are responsive (maintainAspectRatio: false)
- [ ] Copy config button works for each chart
- [ ] Configuration code is syntax-highlighted
- [ ] All charts have descriptive ARIA labels
- [ ] Charts work in light and dark mode
- [ ] No console errors
- [ ] Sample data is realistic and varied
- [ ] Chart animations disabled on theme change (update('none'))

---

### 3.4 Deliverable 4: `showcase/utilities.html`

#### 3.4.1 Purpose
Quick reference guide for Bootstrap 5.3.8 utility classes with live examples.

#### 3.4.2 Utility Categories

**1. Spacing** (margin, padding, gap):
- Syntax: `m-{side}-{size}`, `p-{side}-{size}`, `gap-{size}`
- Sides: t (top), b (bottom), s (start), e (end), x (horizontal), y (vertical), blank (all)
- Sizes: 0, 1, 2, 3, 4, 5, auto
- Examples for each combination

**2. Borders**:
- Border sides: `border`, `border-top`, `border-end`, etc.
- Border colors: `border-primary`, `border-success`, etc.
- Border width: `border-1` through `border-5`
- Border radius: `rounded`, `rounded-{side}`, `rounded-{size}`, `rounded-pill`, `rounded-circle`
- Border utilities: `border-0` (remove border)

**3. Colors**:
- Text colors: `text-primary`, `text-success`, `text-danger`, etc.
- Background colors: `bg-primary`, `bg-success`, `bg-danger`, etc.
- Background gradient: `bg-gradient`
- Border colors: `border-primary`, etc.
- Opacity: `text-opacity-{value}`, `bg-opacity-{value}`

**4. Display**:
- Display values: `d-none`, `d-inline`, `d-inline-block`, `d-block`, `d-flex`, `d-inline-flex`, `d-grid`, `d-table`, etc.
- Responsive display: `d-{breakpoint}-{value}`
- Print display: `d-print-{value}`

**5. Flexbox**:
- Direction: `flex-row`, `flex-column`, `flex-row-reverse`, `flex-column-reverse`
- Justify content: `justify-content-start`, `justify-content-end`, `justify-content-center`, `justify-content-between`, `justify-content-around`, `justify-content-evenly`
- Align items: `align-items-start`, `align-items-end`, `align-items-center`, `align-items-baseline`, `align-items-stretch`
- Align self: `align-self-{value}`
- Flex wrap: `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`
- Flex grow/shrink: `flex-grow-0`, `flex-grow-1`, `flex-shrink-0`, `flex-shrink-1`
- Gap: `gap-{size}`, `row-gap-{size}`, `column-gap-{size}`

**6. Sizing**:
- Width: `w-25`, `w-50`, `w-75`, `w-100`, `w-auto`
- Height: `h-25`, `h-50`, `h-75`, `h-100`, `h-auto`
- Max width: `mw-100`
- Max height: `mh-100`
- Viewport width: `vw-100`
- Viewport height: `vh-100`, `min-vh-100`

**7. Position**:
- Position: `position-static`, `position-relative`, `position-absolute`, `position-fixed`, `position-sticky`
- Top/bottom/start/end: `top-0`, `top-50`, `top-100`, etc.
- Translate middle: `translate-middle`, `translate-middle-x`, `translate-middle-y`

**8. Text**:
- Alignment: `text-start`, `text-center`, `text-end`, `text-justify`
- Wrapping: `text-wrap`, `text-nowrap`, `text-break`
- Transform: `text-lowercase`, `text-uppercase`, `text-capitalize`
- Font size: `fs-1` through `fs-6`
- Font weight: `fw-light`, `fw-normal`, `fw-bold`, `fw-bolder`
- Font style: `fst-italic`, `fst-normal`
- Line height: `lh-1`, `lh-sm`, `lh-base`, `lh-lg`
- Text decoration: `text-decoration-none`, `text-decoration-underline`, `text-decoration-line-through`

**9. Shadows**:
- Shadow: `shadow`, `shadow-sm`, `shadow-lg`
- Shadow none: `shadow-none`

**10. Overflow**:
- Overflow: `overflow-auto`, `overflow-hidden`, `overflow-visible`, `overflow-scroll`
- Overflow x/y: `overflow-x-auto`, `overflow-y-hidden`, etc.

**11. Visibility**:
- Visibility: `visible`, `invisible`
- Opacity: `opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-100`

**12. Z-index**:
- Z-index: `z-0`, `z-1`, `z-2`, `z-3`

#### 3.4.3 Layout Pattern

```html
<div class="container-fluid py-4">
  <header class="mb-4">
    <h1>Bootstrap Utilities Reference</h1>
    <p class="lead">Quick reference for utility classes</p>
  </header>

  <!-- Utility section -->
  <section class="mb-5" id="spacing" aria-labelledby="spacing-heading">
    <h2 id="spacing-heading" class="h3 mb-3">Spacing</h2>
    <p class="text-muted">Margin and padding utilities</p>

    <!-- Syntax explanation -->
    <div class="alert alert-info mb-4">
      <strong>Syntax:</strong> <code>m-{side}-{size}</code> or <code>p-{side}-{size}</code><br>
      <strong>Sides:</strong> t (top), b (bottom), s (start), e (end), x (horizontal), y (vertical), blank (all)<br>
      <strong>Sizes:</strong> 0, 1 (0.25rem), 2 (0.5rem), 3 (1rem), 4 (1.5rem), 5 (3rem), auto
    </div>

    <!-- Interactive examples -->
    <div class="row g-3">
      <!-- Margin example -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Margin Example</div>
          <div class="card-body">
            <div class="example-box">
              <div class="m-3 p-3 bg-primary text-white">m-3 (margin all sides 1rem)</div>
            </div>
            <code class="d-block mt-2">&lt;div class="m-3"&gt;...&lt;/div&gt;</code>
          </div>
        </div>
      </div>

      <!-- Padding example -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Padding Example</div>
          <div class="card-body">
            <div class="example-box">
              <div class="p-4 bg-success text-white">p-4 (padding all sides 1.5rem)</div>
            </div>
            <code class="d-block mt-2">&lt;div class="p-4"&gt;...&lt;/div&gt;</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Size comparison table -->
    <div class="table-responsive mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Class</th>
            <th>Size</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>m-0</code></td>
            <td>0</td>
            <td><div class="m-0 p-2 bg-light border">No margin</div></td>
          </tr>
          <tr>
            <td><code>m-1</code></td>
            <td>0.25rem (4px)</td>
            <td><div class="m-1 p-2 bg-light border">Small margin</div></td>
          </tr>
          <!-- ... more sizes -->
        </tbody>
      </table>
    </div>
  </section>

  <!-- More utility sections... -->
</div>
```

#### 3.4.4 Interactive Demonstrations

For complex utilities (flexbox, grid), provide **interactive playgrounds**:

```html
<section class="mb-5" id="flexbox">
  <h2 class="h3 mb-3">Flexbox Utilities</h2>

  <!-- Interactive controls -->
  <div class="card mb-4">
    <div class="card-header">Flexbox Playground</div>
    <div class="card-body">
      <!-- Control panel -->
      <div class="row g-3 mb-3">
        <div class="col-md-4">
          <label class="form-label">Direction</label>
          <select class="form-select" id="flexDirection">
            <option value="flex-row">flex-row</option>
            <option value="flex-column">flex-column</option>
            <option value="flex-row-reverse">flex-row-reverse</option>
            <option value="flex-column-reverse">flex-column-reverse</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Justify Content</label>
          <select class="form-select" id="justifyContent">
            <option value="justify-content-start">start</option>
            <option value="justify-content-center">center</option>
            <option value="justify-content-end">end</option>
            <option value="justify-content-between">between</option>
            <option value="justify-content-around">around</option>
            <option value="justify-content-evenly">evenly</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Align Items</label>
          <select class="form-select" id="alignItems">
            <option value="align-items-start">start</option>
            <option value="align-items-center">center</option>
            <option value="align-items-end">end</option>
            <option value="align-items-baseline">baseline</option>
            <option value="align-items-stretch">stretch</option>
          </select>
        </div>
      </div>

      <!-- Live preview -->
      <div id="flexPreview" class="d-flex flex-row justify-content-start align-items-start p-3 border bg-light" style="min-height: 200px;">
        <div class="p-3 m-2 bg-primary text-white">Item 1</div>
        <div class="p-3 m-2 bg-success text-white">Item 2</div>
        <div class="p-3 m-2 bg-danger text-white">Item 3</div>
      </div>

      <!-- Generated code -->
      <div class="mt-3">
        <label class="form-label">Generated HTML:</label>
        <pre class="bg-dark text-light p-3 rounded"><code id="flexCode">&lt;div class="d-flex flex-row justify-content-start align-items-start"&gt;
  &lt;div&gt;Item 1&lt;/div&gt;
  &lt;div&gt;Item 2&lt;/div&gt;
  &lt;div&gt;Item 3&lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>
    </div>
  </div>
</section>
```

#### 3.4.5 Acceptance Criteria
- [ ] All 12 utility categories documented
- [ ] Each utility has visual example
- [ ] Spacing utilities show all size variations
- [ ] Color utilities show all semantic colors
- [ ] Flexbox playground works interactively
- [ ] Generated code updates in real-time
- [ ] Responsive utilities documented (breakpoint variations)
- [ ] Quick search/filter for utilities
- [ ] Print-friendly reference tables
- [ ] Mobile responsive layout

---

## 4. User Experience Requirements

### 4.1 Navigation

**Top Navbar** (on all showcase pages):
- Logo/title: "Admin Dashboard" (links to main dashboard)
- Breadcrumb: Dashboard > Showcase > [Current Page]
- Theme switcher (reuse existing component)
- "Back to Dashboard" link

**Page Navigation** (within each showcase page):
- Sticky table of contents (desktop sidebar, mobile hamburger)
- Smooth scroll to sections
- Active section highlighting
- "Back to top" button when scrolled >500px

### 4.2 Accessibility

**WCAG 2.1 AA Compliance** (minimum, AAA preferred):
- ✅ All interactive elements keyboard accessible (tab, enter, space)
- ✅ Focus indicators visible (2px outline, high contrast)
- ✅ ARIA labels on all buttons and links
- ✅ ARIA live regions for dynamic content (search results, copy feedback)
- ✅ Semantic HTML5 elements (header, main, section, nav, etc.)
- ✅ Heading hierarchy (h1→h2→h3, no skipped levels)
- ✅ Alt text on all images (or aria-hidden on decorative)
- ✅ Color contrast 4.5:1 for normal text, 3:1 for large text (AAA: 7:1 / 4.5:1)
- ✅ No content conveyed by color alone
- ✅ Form labels properly associated with inputs
- ✅ Skip links for keyboard navigation

**Screen Reader Testing**:
- Test with NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
- All showcase pages fully navigable and understandable

### 4.3 Responsive Design

**Breakpoints** (Bootstrap default):
- xs: <576px (mobile portrait)
- sm: ≥576px (mobile landscape)
- md: ≥768px (tablet)
- lg: ≥992px (desktop)
- xl: ≥1200px (large desktop)
- xxl: ≥1400px (extra large desktop)

**Layout Behavior**:
- Mobile (<768px):
  - Single column layout
  - Stacked components
  - Hamburger menu for navigation
  - Touch-friendly tap targets (min 44x44px)
  - Icons grid: 6 columns

- Tablet (768px-991px):
  - Two column layout where appropriate
  - Sidebar navigation visible
  - Icons grid: 8 columns

- Desktop (≥992px):
  - Full layout with sidebar
  - Multi-column grids
  - Hover states visible
  - Icons grid: 10+ columns

### 4.4 Performance

**Loading Performance**:
- Initial page load <2s on 3G (target: <1s on 4G)
- First Contentful Paint <1.8s
- Time to Interactive <3.8s
- Cumulative Layout Shift <0.1
- Largest Contentful Paint <2.5s

**Optimization Techniques**:
- Reuse existing CDN resources (Bootstrap, Icons, Chart.js)
- Lazy load images and charts (load when in viewport)
- Debounce search inputs (300ms)
- Virtual scrolling for icon gallery
- Minimize JavaScript bundle size
- Use CSS transforms for animations (GPU-accelerated)
- Minimize reflows and repaints

**Testing**:
- Lighthouse score >90 for Performance, Accessibility, Best Practices, SEO
- Test on throttled 3G network
- Test on low-end devices (CPU throttling 4x)

---

## 5. Code Quality Standards

### 5.1 HTML Standards

```html
<!-- ✅ Good: Semantic, accessible, valid -->
<section aria-labelledby="charts-heading">
  <h2 id="charts-heading" class="h3 mb-3">Charts</h2>
  <div class="row g-4">
    <div class="col-lg-6">
      <article class="card">
        <header class="card-header">
          <h3 class="h5 mb-0">Line Chart</h3>
        </header>
        <div class="card-body">
          <canvas id="lineChart" role="img"
                  aria-label="Line chart showing revenue trends"></canvas>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ❌ Bad: Non-semantic, inaccessible -->
<div>
  <div class="title">Charts</div>
  <div>
    <div>
      <div>
        <div>Line Chart</div>
      </div>
      <div>
        <canvas id="lineChart"></canvas>
      </div>
    </div>
  </div>
</div>
```

**Requirements**:
- Valid HTML5 (no errors in W3C validator)
- Semantic elements (header, main, section, article, nav, etc.)
- Proper heading hierarchy (h1→h2→h3)
- ARIA attributes where needed
- No inline styles (use classes)
- Consistent indentation (2 spaces)

### 5.2 CSS Standards

```css
/* ✅ Good: Uses CSS variables, modular, maintainable */
.icon-card {
  padding: var(--spacing-3);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.icon-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.icon-card:active {
  transform: translateY(0);
  background-color: var(--success-color);
}

/* ❌ Bad: Hardcoded colors, no modularity */
.icon-card {
  padding: 16px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
}

.icon-card:hover {
  background: #f1f5f9;
}
```

**Requirements**:
- Use CSS variables for all colors, spacing, shadows
- Mobile-first responsive design
- No !important (except Bootstrap overrides)
- BEM or utility-first naming convention
- Consistent units (rem for spacing, px for borders)
- Vendor prefixes where needed (-webkit-, -moz-)

### 5.3 JavaScript Standards

```javascript
// ✅ Good: Modular, well-commented, error-handled
/**
 * Copies text to clipboard and shows success feedback
 * @param {string} text - Text to copy
 * @param {string} iconName - Icon name for toast message
 */
async function copyToClipboard(text, iconName) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`Copied ${iconName}!`, 'success');
  } catch (error) {
    console.error('Failed to copy:', error);
    showToast('Failed to copy', 'error');
    // Fallback to document.execCommand
    fallbackCopy(text);
  }
}

// ❌ Bad: No error handling, unclear naming, no comments
function copy(t, n) {
  navigator.clipboard.writeText(t);
  toast(n);
}
```

**Requirements**:
- ES6+ features (const/let, arrow functions, template literals)
- JSDoc comments for functions
- Error handling (try/catch)
- Defensive programming (check element existence)
- No global variables (use IIFE or modules)
- Event delegation for performance
- Debounce expensive operations

### 5.4 Code Comments

**Component Documentation**:
```javascript
/**
 * IconsGallery Module
 *
 * Manages the searchable icon gallery with filtering and copy functionality
 *
 * Features:
 * - Real-time search with debouncing
 * - Category filtering
 * - Size and color variations
 * - Click-to-copy with success feedback
 *
 * Dependencies:
 * - Bootstrap Icons 1.13.1
 * - Bootstrap 5.3.8 (for toast notifications)
 * - Clipboard API
 */
const IconsGallery = (() => {
  'use strict';

  // Private state
  const icons = []; // All icons data
  let filteredIcons = []; // Currently displayed icons
  let currentSize = 24; // Current icon size in pixels

  // ... implementation
})();
```

**Inline Comments**:
```javascript
// Initialize search with debouncing to avoid performance issues
const searchInput = document.getElementById('iconSearch');
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Copy HTML code to clipboard
async function copyIconHTML(iconName) {
  const html = `<i class="bi bi-${iconName}"></i>`;
  try {
    await navigator.clipboard.writeText(html);
    showSuccessToast(`Copied bi-${iconName}!`);
  } catch (error) {
    // Fallback for older browsers
    fallbackCopyToClipboard(html);
  }
}
```

---

## 6. Testing Requirements

### 6.1 Browser Compatibility

**Required Testing**:
- ✅ Chrome 120+ (latest)
- ✅ Firefox 120+ (latest)
- ✅ Safari 17+ (latest)
- ✅ Edge 120+ (latest)

**Test Scenarios**:
- All showcase pages load without errors
- Theme switching works correctly
- Copy-to-clipboard functions properly
- Search and filtering work
- Charts render and update colors
- Bootstrap components function correctly
- Responsive layouts work at all breakpoints
- No console errors or warnings

### 6.2 Accessibility Testing

**Manual Testing**:
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Skip links work
- [ ] ARIA labels announced correctly

**Automated Testing**:
- [ ] axe DevTools (0 violations)
- [ ] WAVE browser extension (0 errors)
- [ ] Lighthouse accessibility score >95

### 6.3 Performance Testing

**Tools**:
- Lighthouse (Chrome DevTools)
- WebPageTest.org
- PageSpeed Insights

**Targets**:
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

**Network Throttling**:
- Test on Fast 3G (750ms RTT, 1.6 Mbps down, 750 Kbps up)
- Test on Slow 3G (2000ms RTT, 400 Kbps down, 400 Kbps up)

### 6.4 Functional Testing

**Bootstrap Components Showcase**:
- [ ] All 50+ components render correctly
- [ ] Copy buttons work for all code snippets
- [ ] Components work in light and dark mode
- [ ] Bootstrap JavaScript components initialize (tooltips, popovers, modals)
- [ ] Table of contents navigation works
- [ ] Smooth scroll works

**Icons Gallery**:
- [ ] All ~2,000 icons display
- [ ] Search filters icons correctly
- [ ] Category filter works
- [ ] Size toggle updates icons
- [ ] Color toggle updates icons
- [ ] Click-to-copy shows success toast
- [ ] Keyboard navigation works (tab, enter)
- [ ] No performance lag with 2,000+ icons

**Charts Gallery**:
- [ ] All 22 charts render
- [ ] Charts update colors on theme change
- [ ] Copy config button works
- [ ] Charts are responsive
- [ ] Configuration accordions work
- [ ] No console errors

**Utilities Reference**:
- [ ] All utility categories documented
- [ ] Interactive playgrounds work (flexbox)
- [ ] Examples show correct visual output
- [ ] Search/filter works (if implemented)
- [ ] Reference tables are complete

---

## 7. Implementation Plan

### 7.1 Phase 0 Timeline

**Week 1: Bootstrap Components Showcase**
- Day 1-2: Page structure, layout, navigation
- Day 3-4: Document all components (Layout, Forms, Components)
- Day 5: Code snippets, copy functionality
- Day 6-7: Testing, polish, accessibility fixes

**Week 2: Icons Gallery**
- Day 1-2: Page structure, search UI, icon data
- Day 3: Search and filter implementation
- Day 4: Copy functionality, toast notifications
- Day 5: Size and color variations
- Day 6-7: Performance optimization, testing

**Week 3: Charts Gallery**
- Day 1-2: Page structure, all chart types
- Day 3: Theme-aware color system
- Day 4: Copy config functionality
- Day 5: Configuration accordions
- Day 6-7: Testing, polish

**Week 4: Utilities Reference + Integration**
- Day 1-3: Utilities documentation, interactive playgrounds
- Day 4: Update dashboard navigation links
- Day 5-6: Cross-page testing, accessibility audit
- Day 7: Final polish, documentation

**Total**: 4 weeks (28 days) for Phase 0 complete

### 7.2 Development Workflow

**For Each Page**:
1. Create HTML structure (header, nav, main content)
2. Add theme flicker prevention script
3. Link existing stylesheets (`assets/css/styles.css`)
4. Build content sections (components, icons, charts, utilities)
5. Add JavaScript functionality
6. Test in all browsers
7. Run accessibility audit
8. Fix issues
9. Code review
10. Merge to main branch

### 7.3 Git Workflow

**Branch Strategy**:
```
main (production-ready)
└── phase-0-showcases
    ├── feature/bootstrap-components
    ├── feature/icons-gallery
    ├── feature/charts-gallery
    └── feature/utilities-reference
```

**Commit Messages**:
```
feat(showcase): add Bootstrap components showcase page

- Document all 50+ Bootstrap components
- Add copy-to-clipboard functionality
- Theme switcher integration
- WCAG 2.1 AA compliance

Related: #1 (Phase 0 - Component Showcases)
```

**Pull Request Template**:
```markdown
## Description
Brief description of changes

## Checklist
- [ ] All components/features implemented
- [ ] Code follows style guidelines
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] Browser compatibility tested (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] No console errors
- [ ] Documentation updated if needed

## Screenshots
[Attach screenshots of new features]

## Related Issues
Closes #1
```

---

## 8. Success Criteria & Acceptance

### 8.1 Definition of Done

A showcase page is considered "done" when:
- [ ] All content is complete and accurate
- [ ] Page renders correctly in all supported browsers
- [ ] Accessibility audit passes (WCAG 2.1 AA minimum)
- [ ] Performance targets met (Lighthouse >90)
- [ ] All interactive features work (copy, search, filter, theme switch)
- [ ] Responsive design works on all breakpoints
- [ ] Code is well-commented and maintainable
- [ ] No console errors or warnings
- [ ] Peer review completed
- [ ] Tested by at least one other developer

### 8.2 Phase 0 Complete

Phase 0 is considered complete when:
- [ ] All 4 showcase pages live and functional
- [ ] Navigation from dashboard to showcase pages works
- [ ] Breadcrumb navigation implemented
- [ ] All copy-to-clipboard features working
- [ ] All charts update colors on theme change
- [ ] Icon search performs <100ms
- [ ] Zero accessibility violations (automated tools)
- [ ] Lighthouse scores >90 on all pages
- [ ] User documentation updated (README)
- [ ] Code merged to main branch
- [ ] GitHub release tagged (v1.1.0-showcase)

### 8.3 Quality Gates

**Before Merge**:
1. ✅ All tests pass
2. ✅ Accessibility audit clean
3. ✅ Performance benchmarks met
4. ✅ Code review approved
5. ✅ No blocking issues

**Before Release**:
1. ✅ All showcase pages functional
2. ✅ Cross-browser testing complete
3. ✅ Mobile testing complete
4. ✅ Documentation updated
5. ✅ Changelog updated

---

## 9. Risks & Mitigation

### 9.1 Technical Risks

**Risk**: Icon gallery performance with 2,000+ icons
**Impact**: High - Page could be slow/unresponsive
**Probability**: Medium
**Mitigation**: Virtual scrolling, lazy loading, debounced search

**Risk**: Chart.js theme updates causing flicker
**Impact**: Medium - Poor user experience
**Probability**: Low
**Mitigation**: Use `chart.update('none')` to disable animations on theme change

**Risk**: Copy-to-clipboard not supported in older browsers
**Impact**: Medium - Feature won't work for some users
**Probability**: Low
**Mitigation**: Fallback to `document.execCommand('copy')` with textarea trick

**Risk**: Bootstrap JavaScript conflicts with custom code
**Impact**: Low - Components may not initialize correctly
**Probability**: Low
**Mitigation**: Use Bootstrap's initialization API correctly, avoid namespace conflicts

### 9.2 Scope Risks

**Risk**: Scope creep (adding features beyond reference showcase)
**Impact**: High - Delays Phase 0 completion
**Probability**: Medium
**Mitigation**: Strict adherence to PRD, parking lot for future enhancements

**Risk**: Documentation taking longer than coding
**Impact**: Medium - Timeline overruns
**Probability**: Medium
**Mitigation**: Use templates, reuse patterns, focus on essential docs

---

## 10. Open Questions & Decisions

### 10.1 Decisions Made

✅ **Use existing dashboard theme system** - Reuse CSS variables, no new theme files
✅ **Browser-ready, no build process** - Maintain project philosophy
✅ **Self-contained pages** - Each showcase page works independently
✅ **Copy-to-clipboard via Clipboard API** - With fallback for older browsers

### 10.2 Open Questions

❓ **Should we add syntax highlighting for code snippets?**
- Options: Prism.js, Highlight.js, plain text
- Decision pending: Evaluate if worth additional dependency

❓ **Should utilities page have interactive playground for all categories?**
- Flexbox: Yes (complex, benefits from interaction)
- Spacing: Maybe (could be useful)
- Colors: No (straightforward)
- Decision: Implement for flexbox, evaluate others based on time

❓ **Should we create a unified showcase navigation sidebar?**
- Pro: Easier navigation between showcase pages
- Con: Additional complexity
- Decision pending: Test user flow first

---

## 11. Appendices

### 11.1 References

- [Bootstrap 5.3.8 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons Documentation](https://icons.getbootstrap.com/)
- [Chart.js 4.5.1 Documentation](https://www.chartjs.org/docs/latest/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

### 11.2 Related Documents

- `docs/ENHANCEMENT_PLAN.md` - Overall project enhancement plan
- `README.md` - Project setup and customization guide
- `CUSTOMIZATION.md` - Deep-dive configuration reference
- `assets/js/app.js` - Existing theme manager and utilities

### 11.3 Change Log

**Version 1.0** (2025-10-29)
- Initial PRD created for Phase 0: Component Showcases
- Defined all 4 deliverables with specifications
- Established technical architecture and standards
- Created testing requirements and acceptance criteria

---

## 12. Approval

**Prepared by**: Claude Code (AI Agent)
**Date**: 2025-10-29
**Status**: Ready for Implementation

**Stakeholder Sign-off**:
- [ ] Project Owner
- [ ] Technical Lead
- [ ] UX Designer
- [ ] QA Lead

---

**Next Steps**: Proceed to implementation of Phase 0.1 (Bootstrap Components Showcase)