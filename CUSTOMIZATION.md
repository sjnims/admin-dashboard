# Dashboard Customization Guide

Complete guide to customizing the SaaS Admin Dashboard template using the THEME_CONFIG system.

## Table of Contents

1. [THEME_CONFIG Reference](#theme_config-reference)
2. [CSS Variables Guide](#css-variables-guide)
3. [Common Customization Tasks](#common-customization-tasks)
4. [Advanced Customization](#advanced-customization)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## THEME_CONFIG Reference

All customization starts with the `THEME_CONFIG` object located at the top of `assets/js/app.js`.

### Brand Configuration

```javascript
brand: {
    name: 'AdminPanel',           // Sidebar header title
    logoIcon: 'bi-bar-chart-fill' // Bootstrap icon class
}
```

#### Properties

- `name` (string): Company or application name displayed in sidebar header
- `logoIcon` (string): Bootstrap Icons class name for the logo icon

#### Icon Resources

- Browse available icons: <https://icons.getbootstrap.com/>
- Common choices: `bi-lightning-fill`, `bi-star-fill`, `bi-speedometer`, `bi-bar-chart-fill`

### Navigation Configuration

```javascript
navigation: {
    items: [
        {
            id: 'dashboard',        // Unique identifier
            icon: 'bi-speedometer2', // Bootstrap icon class
            label: 'Dashboard',      // Display text
            href: '#',              // Link destination
            active: true            // Current page indicator
        }
        // ... more items
    ]
}
```

#### Item Properties

- `id` (string, required): Unique identifier for the nav item
- `icon` (string, required): Bootstrap Icons class name
- `label` (string, required): Text displayed in menu
- `href` (string, required): URL or anchor for navigation
- `active` (boolean, required): Set `true` for current page (only one should be true)

#### Tips

- Maintain consistent icon style (filled vs outlined)
- Keep labels concise (1-2 words ideal)
- Use meaningful IDs for JavaScript targeting
- Order items by user workflow priority

### Statistics Configuration

```javascript
stats: {
    cards: [
        {
            title: 'Total Users',       // Card title
            value: '8,462',            // Main metric
            change: '12.5%',           // Change percentage
            trend: 'up',               // 'up' or 'down'
            icon: 'bi-people',         // Bootstrap icon
            colorClass: 'icon-primary' // Color theme class
        }
        // ... more cards
    ]
}
```

#### Card Properties

- `title` (string): Metric name/description
- `value` (string): Main statistic (formatted as needed)
- `change` (string): Percentage or absolute change
- `trend` (string): `'up'` (green arrow) or `'down'` (red arrow)
- `icon` (string): Bootstrap Icons class name
- `colorClass` (string): Color theme class

#### Available Color Classes

- `icon-primary` - Blue (#0d6efd)
- `icon-success` - Green (#198754)
- `icon-warning` - Yellow (#ffc107)
- `icon-info` - Cyan (#0dcaf0)
- `icon-danger` - Red (#dc3545)

### Charts Configuration

#### Revenue Chart (Line Chart)

```javascript
charts: {
    revenue: {
        title: 'Revenue Overview',
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        revenueData: {
            label: 'Revenue',
            data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.08)'
        },
        expensesData: {
            label: 'Expenses',
            data: [8000, 12000, 11000, 15000, 14000, 18000, 16000, 20000, 18000, 22000],
            borderColor: '#64748b',
            backgroundColor: 'rgba(100, 116, 139, 0.08)'
        },
        style: {
            tension: 0.4,          // Line curve smoothness (0-1)
            borderWidth: 2.5,      // Line thickness
            pointRadius: 4,        // Data point size
            pointHoverRadius: 6    // Hover data point size
        }
    }
}
```

#### Revenue Chart Properties

- `title` (string): Chart card header
- `labels` (array): X-axis labels (months, categories, etc.)
- `revenueData/expensesData` (object): Dataset configurations
- `style` (object): Visual styling options

#### Revenue Data Properties

- `label` (string): Dataset name in legend
- `data` (array): Numeric values for each label
- `borderColor` (string): Line color (hex or rgba)
- `backgroundColor` (string): Fill color below line (use rgba for transparency)

#### Revenue Style Properties

- `tension` (0-1): Line smoothness (0 = straight, 1 = very curved)
- `borderWidth` (number): Line thickness in pixels
- `pointRadius` (number): Data point circle size
- `pointHoverRadius` (number): Data point size on hover

#### Traffic Chart (Doughnut Chart)

```javascript
traffic: {
    title: 'Traffic Sources',
    labels: ['Direct', 'Organic Search', 'Social Media', 'Referral', 'Email'],
    data: [30, 25, 20, 15, 10],
    colors: ['#2563eb', '#059669', '#d97706', '#0891b2', '#64748b'],
    style: {
        cutout: '75%',           // Doughnut hole size
        borderWidth: 2,          // Segment border thickness
        hoverBorderWidth: 3      // Border thickness on hover
    }
}
```

#### Traffic Chart Properties

- `title` (string): Chart card header
- `labels` (array): Segment names
- `data` (array): Percentage values (should sum to 100)
- `colors` (array): Hex colors for each segment
- `style` (object): Visual styling options

#### Common Chart Configuration

```javascript
common: {
    fontFamily: 'Inter',
    gridColor: {
        light: '#f1f5f9',      // Grid lines in light mode
        dark: '#475569'        // Grid lines in dark mode
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 6,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 }
    }
}
```

#### Common Chart Properties

- `fontFamily` (string): Chart text font
- `gridColor` (object): Grid line colors for each theme
- `tooltip` (object): Tooltip appearance configuration

### Feature Flags

```javascript
features: {
    enableCharts: true,           // Show/hide all charts
    enableStats: true,            // Show/hide statistic cards
    enableRecentOrders: true,     // Show/hide orders table
    enableThemeSwitcher: true,    // Enable theme toggle dropdown
    enableNotifications: true,    // Show notification bell
    enableUserMenu: true          // Show user dropdown menu
}
```

#### Usage

Set any feature to `false` to hide that component. Useful for:

- Creating minimal dashboard variants
- Progressive feature rollout
- Role-based feature access
- Performance optimization

### Theme Settings

```javascript
theme: {
    default: 'auto',              // Initial theme preference
    availableThemes: ['light', 'dark', 'auto'],
    icons: {
        light: 'bi-sun-fill',     // Light theme icon
        dark: 'bi-moon-stars-fill', // Dark theme icon
        auto: 'bi-circle-half'    // Auto theme icon
    }
}
```

#### Theme Properties

- `default` (string): Starting theme - `'light'`, `'dark'`, or `'auto'`
- `availableThemes` (array): Enabled theme options
- `icons` (object): Bootstrap Icons class names for each theme

## CSS Variables Guide

The template uses CSS custom properties for consistent theming. Located in `assets/css/styles.css`.

### Color Variables

```css
:root {
    /* Primary brand color */
    --primary-color: #0d6efd;

    /* Background colors */
    --body-bg: #f8f9fa;
    --card-bg: #ffffff;
    --sidebar-bg: #212529;

    /* Text colors */
    --text-primary: #212529;
    --text-secondary: #6c757d;
    --text-muted: #adb5bd;

    /* Border colors */
    --border-color: #dee2e6;
    --border-subtle: #e9ecef;
}

[data-bs-theme="dark"] {
    --body-bg: #0d1117;
    --card-bg: #161b22;
    --sidebar-bg: #010409;
    --text-primary: #e6edf3;
    --text-secondary: #8b949e;
    --border-color: #30363d;
}
```

### Spacing Variables

```css
:root {
    --sidebar-width: 260px;
    --top-navbar-height: 70px;
    --card-padding: 1.5rem;
    --gap-size: 1.5rem;
}
```

### Typography Variables

```css
:root {
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-size-base: 0.95rem;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
}
```

### Customizing Variables

#### Method 1: Modify styles.css

```css
:root {
    --primary-color: #7c3aed; /* Purple brand color */
    --sidebar-width: 280px;   /* Wider sidebar */
}
```

#### Method 2: Add inline styles

```html
<style>
:root {
    --primary-color: #7c3aed;
}
</style>
```

#### Method 3: JavaScript override

```javascript
document.documentElement.style.setProperty('--primary-color', '#7c3aed');
```

## Common Customization Tasks

### Task 1: Changing Brand Colors

#### Step 1: Choose your color palette

```javascript
// Primary brand color
const brandColor = '#7c3aed'; // Purple example
```

#### Step 2: Update CSS variables in `styles.css`

```css
:root {
    --primary-color: #7c3aed;
}
```

#### Step 3: Update chart colors in `app.js`

```javascript
charts: {
    revenue: {
        revenueData: {
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.08)'
        }
    }
}
```

#### Step 4: Update icon color classes (if needed)

```css
.icon-primary {
    background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
}
```

### Task 2: Adding Navigation Items

#### Step 1: Add item to THEME_CONFIG

```javascript
navigation: {
    items: [
        // ... existing items
        {
            id: 'reports',
            icon: 'bi-file-text',
            label: 'Reports',
            href: '#reports',
            active: false
        }
    ]
}
```

#### Step 2: Add corresponding HTML section (if needed)

```html
<section id="reports" aria-labelledby="reports-heading">
    <h2 id="reports-heading">Reports</h2>
    <!-- Report content -->
</section>
```

#### Step 3: Implement navigation logic

```javascript
// Add click handler in app.js
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Handle page switching
    });
});
```

### Task 3: Customizing Charts

#### Change Chart Type

Replace doughnut with pie chart:

```javascript
// In chart initialization
const trafficChart = new Chart(ctx, {
    type: 'pie', // Changed from 'doughnut'
    // ... rest of config
});
```

#### Add New Dataset

Add a third line to revenue chart:

```javascript
revenue: {
    // ... existing config
    profitData: {
        label: 'Profit',
        data: [4000, 7000, 4000, 10000, 8000, 12000, 12000, 15000, 14000, 18000],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.08)'
    }
}
```

Then add to chart initialization:

```javascript
datasets: [
    THEME_CONFIG.charts.revenue.revenueData,
    THEME_CONFIG.charts.revenue.expensesData,
    THEME_CONFIG.charts.revenue.profitData // New dataset
]
```

#### Change Chart Colors

Update all chart colors to match brand:

```javascript
charts: {
    revenue: {
        revenueData: {
            borderColor: '#your-brand-color',
            backgroundColor: 'rgba(your, rgb, values, 0.08)'
        }
    },
    traffic: {
        colors: [
            '#color1',
            '#color2',
            '#color3',
            '#color4',
            '#color5'
        ]
    }
}
```

### Task 4: Modifying Layouts

#### Change Sidebar Width

```css
/* In styles.css */
:root {
    --sidebar-width: 280px; /* Increased from 260px */
}

/* Update content margin */
#content {
    margin-left: 280px;
}
```

#### Adjust Stat Card Grid

```html
<!-- Change from 4 columns to 3 -->
<div class="col-xl-4 col-md-6"> <!-- Changed from col-xl-3 -->
    <article class="card stat-card">
        <!-- ... -->
    </article>
</div>
```

#### Reorder Chart Layout

```html
<!-- Swap chart positions -->
<div class="row g-4">
    <div class="col-lg-4"> <!-- Traffic chart first, changed from col-lg-8 -->
        <div class="card">
            <canvas id="trafficChart"></canvas>
        </div>
    </div>
    <div class="col-lg-8"> <!-- Revenue chart second, changed from col-lg-4 -->
        <div class="card">
            <canvas id="revenueChart"></canvas>
        </div>
    </div>
</div>
```

### Task 5: Adding New Sections

#### Step 1: Create section HTML

```html
<!-- Add after orders section -->
<section aria-labelledby="tasks-heading">
    <div class="row">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-white">
                    <h2 id="tasks-heading" class="h5 mb-0">Recent Tasks</h2>
                </div>
                <div class="card-body">
                    <!-- Task content -->
                </div>
            </div>
        </div>
    </div>
</section>
```

#### Step 2: Add configuration to THEME_CONFIG

```javascript
tasks: {
    items: [
        {
            id: 1,
            title: 'Update user documentation',
            status: 'in-progress',
            priority: 'high',
            assignee: 'John Doe',
            dueDate: '2025-10-20'
        }
        // ... more tasks
    ]
}
```

#### Step 3: Create initialization function

```javascript
function initTasks() {
    const tasksContainer = document.getElementById('tasks-list');
    THEME_CONFIG.tasks.items.forEach(task => {
        // Create and append task elements
    });
}
```

## Advanced Customization

### Framework Integration

#### React Integration

##### Create Dashboard Component

```jsx
import React, { useEffect } from 'react';

const AdminDashboard = () => {
    useEffect(() => {
        // Initialize dashboard
        const initDashboard = async () => {
            const { default: THEME_CONFIG } = await import('./assets/js/app.js');
            // Dashboard initialization logic
        };

        initDashboard();
    }, []);

    return (
        <div className="dashboard-container">
            {/* Dashboard HTML */}
        </div>
    );
};

export default AdminDashboard;
```

##### Custom Hook for Theme

```jsx
import { useState, useEffect } from 'react';

const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'auto';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
    }, [theme]);

    return [theme, setTheme];
};
```

#### Vue.js Integration

##### Dashboard Component

```vue
<template>
    <div id="dashboard-app">
        <!-- Dashboard template -->
    </div>
</template>

<script>
import THEME_CONFIG from '@/assets/js/app.js';

export default {
    name: 'AdminDashboard',
    data() {
        return {
            config: THEME_CONFIG,
            stats: THEME_CONFIG.stats.cards,
            charts: THEME_CONFIG.charts
        };
    },
    mounted() {
        this.initCharts();
        this.initTheme();
    },
    methods: {
        initCharts() {
            // Chart initialization
        },
        initTheme() {
            // Theme initialization
        }
    }
};
</script>
```

#### Angular Integration

##### Dashboard Module

```typescript
import { Component, OnInit } from '@angular/core';
import * as THEME_CONFIG from '../assets/js/app.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    config = THEME_CONFIG;
    stats = THEME_CONFIG.stats.cards;

    ngOnInit(): void {
        this.initCharts();
    }

    initCharts(): void {
        // Chart initialization
    }
}
```

### Dynamic Data Loading

#### Fetch Stats from API

```javascript
async function loadDashboardData() {
    try {
        // Fetch stats
        const statsResponse = await fetch('/api/dashboard/stats');
        const statsData = await statsResponse.json();
        THEME_CONFIG.stats.cards = statsData;

        // Fetch chart data
        const chartResponse = await fetch('/api/dashboard/charts');
        const chartData = await chartResponse.json();
        THEME_CONFIG.charts.revenue.labels = chartData.labels;
        THEME_CONFIG.charts.revenue.revenueData.data = chartData.revenue;

        // Re-render components
        updateStatsCards();
        updateCharts();
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}
```

#### Real-time Updates with WebSocket

```javascript
const ws = new WebSocket('ws://your-server/dashboard');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'stats-update') {
        updateStatCard(data.cardId, data.value);
    }

    if (data.type === 'chart-update') {
        updateChartData(data.chartId, data.newData);
    }
};
```

### Custom Components

#### Create Reusable Card Component

```javascript
class DashboardCard {
    constructor(config) {
        this.title = config.title;
        this.content = config.content;
        this.footer = config.footer;
    }

    render() {
        return `
            <div class="card shadow-sm">
                <div class="card-header bg-white">
                    <h3 class="h5 mb-0">${this.title}</h3>
                </div>
                <div class="card-body">
                    ${this.content}
                </div>
                ${this.footer ? `<div class="card-footer">${this.footer}</div>` : ''}
            </div>
        `;
    }
}

// Usage
const customCard = new DashboardCard({
    title: 'Custom Metrics',
    content: '<p>Your custom content here</p>',
    footer: '<a href="#">View Details</a>'
});
```

## Examples

### Example 1: Finance Dashboard

```javascript
const THEME_CONFIG = {
    brand: {
        name: 'FinanceHub',
        logoIcon: 'bi-currency-dollar'
    },
    navigation: {
        items: [
            { id: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard', href: '#', active: true },
            { id: 'accounts', icon: 'bi-wallet2', label: 'Accounts', href: '#accounts', active: false },
            { id: 'transactions', icon: 'bi-receipt', label: 'Transactions', href: '#tx', active: false },
            { id: 'investments', icon: 'bi-graph-up-arrow', label: 'Investments', href: '#invest', active: false },
            { id: 'reports', icon: 'bi-file-earmark-text', label: 'Reports', href: '#reports', active: false }
        ]
    },
    stats: {
        cards: [
            { title: 'Total Balance', value: '$125,450', change: '15.2%', trend: 'up', icon: 'bi-wallet2', colorClass: 'icon-success' },
            { title: 'Monthly Income', value: '$8,234', change: '5.1%', trend: 'up', icon: 'bi-arrow-down-circle', colorClass: 'icon-primary' },
            { title: 'Expenses', value: '$3,421', change: '2.3%', trend: 'down', icon: 'bi-arrow-up-circle', colorClass: 'icon-warning' },
            { title: 'Savings Rate', value: '32.5%', change: '8.7%', trend: 'up', icon: 'bi-piggy-bank', colorClass: 'icon-info' }
        ]
    }
    // ... rest of config
};
```

### Example 2: E-commerce Dashboard

```javascript
const THEME_CONFIG = {
    brand: {
        name: 'ShopAdmin',
        logoIcon: 'bi-shop'
    },
    navigation: {
        items: [
            { id: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard', href: '#', active: true },
            { id: 'products', icon: 'bi-box-seam', label: 'Products', href: '#products', active: false },
            { id: 'orders', icon: 'bi-cart-check', label: 'Orders', href: '#orders', active: false },
            { id: 'customers', icon: 'bi-people', label: 'Customers', href: '#customers', active: false },
            { id: 'inventory', icon: 'bi-boxes', label: 'Inventory', href: '#inventory', active: false }
        ]
    },
    stats: {
        cards: [
            { title: 'Total Sales', value: '$52,345', change: '18.2%', trend: 'up', icon: 'bi-currency-dollar', colorClass: 'icon-success' },
            { title: 'Orders', value: '1,245', change: '12.5%', trend: 'up', icon: 'bi-cart3', colorClass: 'icon-primary' },
            { title: 'Products', value: '842', change: '5.3%', trend: 'up', icon: 'bi-box-seam', colorClass: 'icon-info' },
            { title: 'Customers', value: '3,721', change: '24.8%', trend: 'up', icon: 'bi-people', colorClass: 'icon-warning' }
        ]
    }
    // ... rest of config
};
```

### Example 3: Project Management Dashboard

```javascript
const THEME_CONFIG = {
    brand: {
        name: 'ProjectHub',
        logoIcon: 'bi-kanban'
    },
    navigation: {
        items: [
            { id: 'dashboard', icon: 'bi-speedometer2', label: 'Dashboard', href: '#', active: true },
            { id: 'projects', icon: 'bi-folder', label: 'Projects', href: '#projects', active: false },
            { id: 'tasks', icon: 'bi-check2-square', label: 'Tasks', href: '#tasks', active: false },
            { id: 'team', icon: 'bi-people', label: 'Team', href: '#team', active: false },
            { id: 'calendar', icon: 'bi-calendar3', label: 'Calendar', href: '#calendar', active: false }
        ]
    },
    stats: {
        cards: [
            { title: 'Active Projects', value: '24', change: '3 new', trend: 'up', icon: 'bi-folder', colorClass: 'icon-primary' },
            { title: 'Tasks Completed', value: '186', change: '12 today', trend: 'up', icon: 'bi-check-circle', colorClass: 'icon-success' },
            { title: 'Team Members', value: '45', change: '2 new', trend: 'up', icon: 'bi-people', colorClass: 'icon-info' },
            { title: 'On Time %', value: '94.5%', change: '2.1%', trend: 'up', icon: 'bi-clock', colorClass: 'icon-warning' }
        ]
    }
    // ... rest of config
};
```

## Troubleshooting

### Charts Not Displaying

**Symptom**: Empty chart containers with no visualization

**Solutions**:

1. Verify Chart.js is loaded

   ```javascript
   console.log(typeof Chart); // Should output "function"
   ```

1. Check canvas elements exist

   ```javascript
   console.log(document.getElementById('revenueChart')); // Should not be null
   ```

1. Verify data format

   ```javascript
   console.log(THEME_CONFIG.charts.revenue.revenueData.data); // Should be array of numbers
   ```

1. Check for JavaScript errors

   ```javascript
   // Open browser console (F12) and look for errors
   ```

### Theme Not Persisting

**Symptom**: Theme resets to default on page reload

**Solutions**:

1. Check localStorage is enabled

   ```javascript
   try {
       localStorage.setItem('test', 'test');
       localStorage.removeItem('test');
       console.log('LocalStorage working');
   } catch (e) {
       console.error('LocalStorage not available:', e);
   }
   ```

1. Verify theme is being saved

   ```javascript
   console.log(localStorage.getItem('theme')); // Should show current theme
   ```

1. Check for browser privacy mode

   - Disable private/incognito mode
   - Check browser localStorage settings

### Sidebar Not Responsive

**Symptom**: Sidebar doesn't collapse on mobile or toggle button doesn't work

**Solutions**:

1. Verify Bootstrap JS is loaded

   ```javascript
   console.log(typeof bootstrap); // Should output "object"
   ```

1. Check toggle button click handler

   ```javascript
   document.getElementById('sidebarToggle').addEventListener('click', () => {
       console.log('Toggle clicked'); // Should log on click
   });
   ```

1. Verify CSS media queries

   ```css
   @media (max-width: 768px) {
       #sidebar {
           margin-left: -260px; /* Should hide sidebar */
       }
   }
   ```

### Icons Missing

**Symptom**: Icons show as squares or not at all

**Solutions**:

1. Verify Bootstrap Icons CSS is loaded

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
   ```

1. Check network tab for 404 errors

   - Open DevTools Network tab
   - Look for failed icon font requests

1. Verify icon class names

   ```html
   <!-- Correct -->
   <i class="bi bi-speedometer2"></i>

   <!-- Incorrect -->
   <i class="bi-speedometer2"></i> <!-- Missing 'bi' class -->
   ```

### Custom Colors Not Applying

**Symptom**: Color changes in CSS not visible

**Solutions**:

1. Clear browser cache (Ctrl+Shift+Delete)

1. Check CSS specificity

   ```css
   /* Less specific - might be overridden */
   .icon-primary { color: red; }

   /* More specific - higher priority */
   .stat-card .icon-primary { color: red; }
   ```

1. Use !important as last resort

   ```css
   .icon-primary {
       background: #7c3aed !important;
   }
   ```

1. Verify CSS file is loaded after Bootstrap

   ```html
   <!-- Correct order -->
   <link href="bootstrap.min.css" rel="stylesheet">
   <link href="assets/css/styles.css" rel="stylesheet"> <!-- After Bootstrap -->
   ```

### Performance Issues

**Symptom**: Dashboard loads slowly or feels sluggish

**Solutions**:

1. Minimize chart updates

   ```javascript
   // Update without animation
   chart.update('none');
   ```

1. Debounce resize events

   ```javascript
   let resizeTimeout;
   window.addEventListener('resize', () => {
       clearTimeout(resizeTimeout);
       resizeTimeout = setTimeout(() => {
           // Resize logic
       }, 250);
   });
   ```

1. Use CDN with caching headers

   ```html
   <!-- Ensure CDN links include version numbers for caching -->
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
   ```

1. Defer non-critical JavaScript

   ```html
   <script src="assets/js/app.js" defer></script>
   ```

## Best Practices

### Configuration Management

#### Do's

- Keep THEME_CONFIG as single source of truth
- Document custom configurations
- Use meaningful property names
- Validate data before use
- Version control your customizations

#### Don'ts

- Don't hardcode values in multiple places
- Don't mix configuration with logic
- Don't skip data validation
- Don't commit sensitive data to THEME_CONFIG

### Code Organization

#### Maintain Structure

```javascript
// Good: Grouped by feature
const THEME_CONFIG = {
    brand: { /* ... */ },
    navigation: { /* ... */ },
    stats: { /* ... */ },
    charts: { /* ... */ }
};

// Bad: Flat, unorganized
const brandName = 'MyApp';
const navItems = [];
const statCards = [];
```

#### Use Constants

```javascript
// Good: Named constants
const CHART_COLORS = {
    primary: '#2563eb',
    success: '#059669',
    warning: '#d97706'
};

// Bad: Magic numbers
borderColor: '#2563eb', // What is this color?
```

### Performance

#### Optimize Assets

- Minify CSS and JavaScript for production
- Use CDN versions with integrity hashes
- Implement lazy loading for charts
- Cache API responses appropriately

#### Minimize Reflows

```javascript
// Good: Batch DOM updates
const fragment = document.createDocumentFragment();
items.forEach(item => {
    fragment.appendChild(createItemElement(item));
});
container.appendChild(fragment);

// Bad: Multiple reflows
items.forEach(item => {
    container.appendChild(createItemElement(item)); // Reflows on each iteration
});
```

### Accessibility

#### Always Include

- ARIA labels for interactive elements
- Semantic HTML elements
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Skip navigation links

#### Test With

- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- Color contrast validators
- Accessibility checkers (axe, Lighthouse)

### Maintainability

#### Document Changes

```javascript
/**
 * Custom modification: 2025-10-17
 * Added profit tracking to revenue chart
 * Author: Your Name
 */
THEME_CONFIG.charts.revenue.profitData = { /* ... */ };
```

#### Use Version Control

```bash
# Tag your customizations
git tag -a v1.0.0-custom -m "Finance dashboard customization"

# Create feature branches
git checkout -b feature/add-calendar-widget
```

#### Test Thoroughly

- Test in multiple browsers
- Test responsive breakpoints
- Test with real data volumes
- Test accessibility features
- Test theme switching

### Security

#### Never Expose

- API keys in client-side code
- Authentication tokens in THEME_CONFIG
- Database credentials
- User personal information

#### Always Sanitize

```javascript
// Good: Sanitize user input
const sanitizedValue = DOMPurify.sanitize(userInput);

// Bad: Direct HTML insertion
element.innerHTML = userInput; // XSS vulnerability
```

#### Validate Data

```javascript
// Good: Validate before use
if (Array.isArray(data) && data.length > 0) {
    updateChart(data);
}

// Bad: Assume data is valid
updateChart(data); // Might cause errors
```

---

**Last Updated**: October 2025
**Template Version**: 1.0.0
