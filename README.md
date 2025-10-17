# SaaS Admin Dashboard Template

A professional, production-ready admin dashboard template built with Bootstrap 5 and Chart.js. Features a centralized configuration system for easy customization and a modern, accessible design suitable for SaaS applications.

## Features

### Centralized Configuration System

- Single `THEME_CONFIG` object for complete customization
- Easy brand, navigation, charts, and stats modification
- No code diving required for common changes

### Modern Design

- Clean, professional interface with responsive layout
- Light/Dark/Auto theme switching with persistence
- Smooth animations and transitions
- Mobile-friendly sidebar navigation

### Data Visualization

- Interactive Chart.js charts (line, doughnut)
- Dynamic theme-aware chart styling
- Configurable datasets and colors
- Responsive chart containers

### Professional Components

- Statistics cards with trend indicators
- Recent orders table with action buttons
- User menu with avatar integration
- Notification system ready

### Accessibility First

- WCAG 2.1 AA compliant
- Semantic HTML5 structure
- ARIA labels and landmarks
- Keyboard navigation support
- Skip navigation links

### Developer Friendly

- Modular JavaScript architecture
- Well-documented configuration
- Clean separation of concerns
- Easy framework integration

## Quick Start

### 1. Clone or Download

```bash
git clone <repository-url>
cd admin-dashboard
```

### 2. Open in Browser

Simply open `admin-dashboard.html` in a modern web browser. No build process required.

### 3. Customize

Edit the `THEME_CONFIG` object in `assets/js/app.js` to customize:

- Brand name and logo
- Navigation menu items
- Statistics cards
- Chart data and styling
- Feature toggles
- Theme preferences

### 4. Deploy

Upload all files to your web server maintaining the directory structure.

## File Structure

```text
admin-dashboard/
├── admin-dashboard.html       # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css         # Custom styles and CSS variables
│   └── js/
│       └── app.js             # THEME_CONFIG and application logic
├── README.md                  # This file
├── CUSTOMIZATION.md           # Detailed customization guide
└── THEME_CONFIG_SUMMARY.md    # Technical implementation details
```

### Key Files

#### admin-dashboard.html

- Semantic HTML5 structure
- Bootstrap 5.3.8 components
- CDN-loaded dependencies
- Accessibility features

#### assets/css/styles.css

- Custom CSS variables for theming
- Component-specific styles
- Responsive breakpoints
- Dark mode support

#### assets/js/app.js

- THEME_CONFIG configuration object
- ThemeManager module
- Chart initialization
- Event handlers

## Basic Customization

### Change Brand Identity

```javascript
// In assets/js/app.js - THEME_CONFIG
brand: {
    name: 'MyCompany',           // Your company name
    logoIcon: 'bi-lightning-fill' // Bootstrap icon class
}
```

### Modify Navigation Menu

```javascript
navigation: {
    items: [
        {
            id: 'dashboard',
            icon: 'bi-speedometer2',
            label: 'Dashboard',
            href: '#',
            active: true
        },
        // Add more items or remove unwanted ones
    ]
}
```

### Update Statistics

```javascript
stats: {
    cards: [
        {
            title: 'Total Users',
            value: '8,462',
            change: '12.5%',
            trend: 'up',
            icon: 'bi-people',
            colorClass: 'icon-primary'
        },
        // Customize or add more cards
    ]
}
```

### Toggle Features

```javascript
features: {
    enableCharts: true,           // Show/hide charts
    enableStats: true,            // Show/hide stat cards
    enableThemeSwitcher: true,    // Enable theme toggle
    enableNotifications: true,    // Show notification bell
    enableUserMenu: true          // Show user menu
}
```

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed customization options.

## Dependencies

All dependencies are loaded via CDN for ease of use:

### Bootstrap 5.3.8

- CSS: <https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css>
- JS: <https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js>

### Bootstrap Icons 1.13.1

- <https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css>

### Chart.js 4.5.1

- <https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.js>

### Google Fonts (Inter)

- <https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap>

### Using Local Dependencies

To use local copies instead of CDN:

1. Download the dependencies
2. Place them in appropriate directories
3. Update `<link>` and `<script>` tags in `admin-dashboard.html`

## Browser Support

### Modern Browsers (Recommended)

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features Used

- ES6+ JavaScript (arrow functions, template literals, modules)
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- LocalStorage API
- Media Queries (prefers-color-scheme)

### Internet Explorer

Not supported due to modern JavaScript and CSS features.

## Integration Notes

### Framework Integration

#### React

```jsx
// Wrap in useEffect
useEffect(() => {
  // Initialize dashboard components
  const script = document.createElement('script');
  script.src = '/assets/js/app.js';
  document.body.appendChild(script);
}, []);
```

#### Vue.js

```vue
<template>
  <div v-html="dashboardHTML"></div>
</template>

<script>
export default {
  mounted() {
    // Load and initialize app.js
    import('@/assets/js/app.js');
  }
}
</script>
```

**Angular**
Add to `angular.json`:

```json
"styles": [
  "src/assets/css/styles.css"
],
"scripts": [
  "src/assets/js/app.js"
]
```

### API Integration

Replace static data in `THEME_CONFIG` with API calls:

```javascript
// Example: Fetch stats from API
async function loadStats() {
    const response = await fetch('/api/stats');
    const data = await response.json();

    THEME_CONFIG.stats.cards = data.stats;
    // Re-render stats cards
}
```

### Backend Templates

Use as template in server-side frameworks:

#### Django

```python
def dashboard(request):
    context = {
        'stats': get_dashboard_stats(),
        'charts': get_chart_data(),
    }
    return render(request, 'admin-dashboard.html', context)
```

#### Express.js

```javascript
app.get('/dashboard', (req, res) => {
    res.render('admin-dashboard', {
        stats: getDashboardStats(),
        charts: getChartData()
    });
});
```

## Performance Optimization

### Implemented Optimizations

- CSS/JS loaded via CDN with caching
- Deferred JavaScript loading
- Minimal DOM manipulation
- Efficient event delegation
- Chart updates without animation

### Additional Optimizations

- Minify CSS and JavaScript for production
- Implement lazy loading for charts
- Use image optimization for avatars
- Enable gzip compression on server
- Implement service worker for offline support

## Accessibility Features

### WCAG 2.1 AA Compliance

- Semantic HTML5 elements
- ARIA labels and landmarks
- Keyboard navigation support
- Focus indicators
- Color contrast ratios
- Screen reader compatibility

### Testing

- Tested with NVDA and JAWS screen readers
- Keyboard-only navigation verified
- Color contrast validated
- Focus management confirmed

## License

This template is provided as-is for commercial and personal use. Feel free to:

- Use in commercial SaaS applications
- Modify and customize as needed
- Integrate with your frameworks
- Rebrand for your projects

**Attribution**
Not required but appreciated.

**No Warranty**
Provided without warranty. Use at your own risk.

## Support and Resources

### Documentation

- [CUSTOMIZATION.md](CUSTOMIZATION.md) - Detailed customization guide
- [THEME_CONFIG_SUMMARY.md](THEME_CONFIG_SUMMARY.md) - Technical implementation

### External Resources

- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

### Common Issues

- Charts not displaying: Ensure Chart.js is loaded
- Theme not persisting: Check localStorage is enabled
- Sidebar not responsive: Verify Bootstrap JS is loaded
- Icons missing: Confirm Bootstrap Icons CSS is loaded

## Version History

**v1.0.0** (October 2025)

- Initial release
- THEME_CONFIG system
- Bootstrap 5.3.8 integration
- Chart.js 4.5.1 support
- Full accessibility compliance
- Theme switching functionality

## Contributing

Suggestions and improvements welcome. This is a template designed for easy customization and modification to fit your specific needs.

## Roadmap

### Potential Enhancements

- Additional chart types (bar, radar, scatter)
- More dashboard layouts
- Calendar integration
- Task management components
- Real-time notification system
- Advanced table features (sorting, filtering, pagination)
- Profile management pages
- Settings panel

---

**Built with**: Bootstrap 5, Chart.js, Modern JavaScript
**Status**: Production Ready
**Last Updated**: October 2025
