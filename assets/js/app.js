/**
 * Admin Dashboard - Main Application JavaScript
 *
 * This file contains all client-side JavaScript functionality for the admin dashboard,
 * including sidebar navigation, chart rendering, theme switching, and interactive features.
 *
 * Dependencies:
 * - Bootstrap 5.3.8 (bootstrap.bundle.min.js)
 * - Chart.js 4.5.1 (chart.umd.js)
 *
 * @author AdminPanel
 * @version 1.0.0
 * @license MIT
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Magic numbers extracted to named constants for better maintainability
 */
const CONSTANTS = {
    // Chart styling
    CHART_LINE_TENSION: 0.4,
    CHART_BORDER_WIDTH: 2.5,
    CHART_POINT_RADIUS: 4,
    CHART_POINT_HOVER_RADIUS: 6,
    CHART_POINT_BORDER_WIDTH: 2,
    CHART_DOUGHNUT_BORDER_WIDTH: 3,
    CHART_DOUGHNUT_HOVER_OFFSET: 8,

    // Tooltip configuration
    TOOLTIP_PADDING: 12,
    TOOLTIP_CORNER_RADIUS: 8,

    // Font sizes
    FONT_SIZE_LEGEND: 13,
    FONT_SIZE_AXIS: 12,

    // Legend spacing
    LEGEND_PADDING: 16,

    // Animation
    ANIMATION_MODE_NONE: 'none',

    // Theme storage
    STORAGE_KEY_THEME: 'theme',

    // CSS selectors
    SELECTOR_SIDEBAR: '#sidebar',
    SELECTOR_CONTENT: '#content',
    SELECTOR_SIDEBAR_TOGGLE: '#sidebarToggle',
    SELECTOR_THEME_SWITCHER: '#bd-theme',
    SELECTOR_THEME_ICON: '.theme-icon-active',
    SELECTOR_NAV_LINKS: '#sidebar .nav-link',
    SELECTOR_REVENUE_CHART: '#revenueChart',
    SELECTOR_TRAFFIC_CHART: '#trafficChart',

    // ARIA attributes
    ARIA_EXPANDED: 'aria-expanded',
    ARIA_CURRENT: 'aria-current',
    ARIA_PRESSED: 'aria-pressed',

    // Bootstrap data attributes
    DATA_BS_THEME: 'data-bs-theme',
    DATA_BS_THEME_VALUE: 'data-bs-theme-value',

    // Theme values
    THEME_LIGHT: 'light',
    THEME_DARK: 'dark',
    THEME_AUTO: 'auto',

    // CSS classes
    CLASS_COLLAPSED: 'collapsed',
    CLASS_EXPANDED: 'expanded',
    CLASS_ACTIVE: 'active'
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format a number as currency with proper locale formatting
 * @param {number} value - The numeric value to format
 * @param {string} currency - The currency symbol (default: '$')
 * @returns {string} Formatted currency string
 * @example formatCurrency(1234.56) => "$1,234.56"
 */
const formatCurrency = (value, currency = '$') => {
    if (typeof value !== 'number' || isNaN(value)) {
        console.warn('formatCurrency: Invalid value provided', value);
        return currency + '0';
    }
    return currency + value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
};

/**
 * Format a date string for display
 * @param {string|Date} date - The date to format
 * @param {string} format - Format type ('short' | 'long')
 * @returns {string} Formatted date string
 * @example formatDate('2025-10-17') => "Oct 17, 2025"
 */
const formatDate = (date, format = 'short') => {
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date');
        }

        const options = format === 'long'
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'short', day: 'numeric' };

        return dateObj.toLocaleDateString('en-US', options);
    } catch (error) {
        console.error('formatDate: Error formatting date', error);
        return String(date);
    }
};

/**
 * Format percentage with consistent decimal places
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 * @example formatPercentage(23.456) => "23.5%"
 */
const formatPercentage = (value, decimals = 1) => {
    if (typeof value !== 'number' || isNaN(value)) {
        console.warn('formatPercentage: Invalid value provided', value);
        return '0%';
    }
    return value.toFixed(decimals) + '%';
};

/**
 * Safely get an element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} The element or null if not found
 */
const getElementSafely = (id) => {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id "${id}" not found`);
    }
    return element;
};

/**
 * Safely query selector with error handling
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} The element or null if not found
 */
const querySelectorSafely = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element with selector "${selector}" not found`);
    }
    return element;
};

// ============================================================================
// THEME CONFIGURATION
// ============================================================================

/**
 * THEME_CONFIG - Centralized Configuration Object
 *
 * This object contains all customizable settings for the admin dashboard.
 * Modify these values to customize the dashboard for your SaaS product.
 */
const THEME_CONFIG = {
    // ========================================================================
    // BRAND CONFIGURATION
    // ========================================================================
    brand: {
        // Brand name displayed in the sidebar header
        name: 'AdminPanel',

        // Bootstrap icon class for logo (https://icons.getbootstrap.com/)
        // Examples: 'bi-bar-chart-fill', 'bi-speedometer', 'bi-lightning-fill'
        logoIcon: 'bi-bar-chart-fill'
    },

    // ========================================================================
    // NAVIGATION CONFIGURATION
    // ========================================================================
    navigation: {
        // Navigation menu items
        // Add, remove, or reorder items to customize your menu
        items: [
            {
                id: 'dashboard',
                icon: 'bi-speedometer2',
                label: 'Dashboard',
                href: '#',
                active: true  // Set to true for the default active page
            },
            {
                id: 'users',
                icon: 'bi-people',
                label: 'Users',
                href: '#',
                active: false
            },
            {
                id: 'products',
                icon: 'bi-box-seam',
                label: 'Products',
                href: '#',
                active: false
            },
            {
                id: 'orders',
                icon: 'bi-cart3',
                label: 'Orders',
                href: '#',
                active: false
            },
            {
                id: 'analytics',
                icon: 'bi-graph-up',
                label: 'Analytics',
                href: '#',
                active: false
            },
            {
                id: 'payments',
                icon: 'bi-wallet2',
                label: 'Payments',
                href: '#',
                active: false
            },
            {
                id: 'settings',
                icon: 'bi-gear',
                label: 'Settings',
                href: '#',
                active: false
            }
        ]
    },

    // ========================================================================
    // STATISTICS CONFIGURATION
    // ========================================================================
    stats: {
        // Dashboard stat cards
        // Customize the metric cards shown at the top of the dashboard
        cards: [
            {
                title: 'Total Users',
                value: '8,462',
                change: '12.5%',
                trend: 'up',  // 'up' or 'down'
                icon: 'bi-people',
                colorClass: 'icon-primary'  // icon-primary, icon-success, icon-warning, icon-info
            },
            {
                title: 'Revenue',
                value: '$52,345',
                change: '8.2%',
                trend: 'up',
                icon: 'bi-currency-dollar',
                colorClass: 'icon-success'
            },
            {
                title: 'Orders',
                value: '1,245',
                change: '3.1%',
                trend: 'down',
                icon: 'bi-cart3',
                colorClass: 'icon-warning'
            },
            {
                title: 'Growth',
                value: '23.5%',
                change: '5.3%',
                trend: 'up',
                icon: 'bi-graph-up',
                colorClass: 'icon-info'
            }
        ]
    },

    // ========================================================================
    // CHART CONFIGURATION
    // ========================================================================
    charts: {
        // Revenue Chart (Line Chart) Configuration
        revenue: {
            // Chart title
            title: 'Revenue Overview',

            // X-axis labels (months, weeks, etc.)
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],

            // Revenue dataset
            revenueData: {
                label: 'Revenue',
                data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.08)'
            },

            // Expenses dataset
            expensesData: {
                label: 'Expenses',
                data: [8000, 12000, 10000, 15000, 14000, 18000, 17000, 20000, 19000, 22000],
                borderColor: '#64748b',
                backgroundColor: 'rgba(100, 116, 139, 0.08)'
            },

            // Chart styling
            style: {
                tension: 0.4,          // Line curve smoothness (0 = straight, 1 = very curved)
                borderWidth: 2.5,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        },

        // Traffic Sources Chart (Doughnut Chart) Configuration
        traffic: {
            // Chart title
            title: 'Traffic Sources',

            // Traffic source labels
            labels: ['Direct', 'Organic Search', 'Social Media', 'Referral', 'Email'],

            // Traffic source percentages (should add up to 100)
            data: [30, 25, 20, 15, 10],

            // Colors for each traffic source
            colors: [
                '#2563eb',  // Direct - Blue
                '#059669',  // Organic Search - Green
                '#d97706',  // Social Media - Orange
                '#0891b2',  // Referral - Cyan
                '#64748b'   // Email - Gray
            ],

            // Chart styling
            style: {
                borderWidth: 3,
                hoverOffset: 8
            }
        },

        // Common chart settings
        common: {
            // Font family used across all charts
            fontFamily: 'Inter',

            // Grid colors (updated dynamically based on theme)
            gridColor: {
                light: '#f1f5f9',
                dark: '#475569'
            },

            // Tooltip styling
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                cornerRadius: 8
            }
        }
    },

    // ========================================================================
    // FEATURE FLAGS
    // ========================================================================
    features: {
        // Enable/disable major features
        enableCharts: true,           // Show charts section
        enableStats: true,            // Show statistics cards
        enableRecentOrders: true,     // Show recent orders table
        enableThemeSwitcher: true,    // Show theme toggle in navbar
        enableNotifications: true,    // Show notification bell
        enableUserMenu: true          // Show user dropdown menu
    },

    // ========================================================================
    // THEME SETTINGS
    // ========================================================================
    theme: {
        // Default theme preference
        // Options: 'light', 'dark', 'auto'
        // 'auto' follows system preference
        default: 'auto',

        // Available theme options
        availableThemes: ['light', 'dark', 'auto'],

        // Theme icon mappings (Bootstrap Icons)
        icons: {
            light: 'bi-sun-fill',
            dark: 'bi-moon-stars-fill',
            auto: 'bi-circle-half'
        }
    }
};

// ============================================================================
// THEME MANAGEMENT MODULE
// ============================================================================

/**
 * ThemeManager - Unified theme management system
 *
 * This module handles all theme-related functionality including:
 * - Theme persistence (localStorage)
 * - Theme application
 * - System preference detection
 * - Chart updates on theme change
 *
 * Note: This works in conjunction with the inline theme script in the HTML head
 * to prevent flash of unstyled content (FOUC)
 *
 * @returns {Object} Public API methods
 */
const ThemeManager = (() => {
    'use strict';

    // Private methods
    const getStoredTheme = () => localStorage.getItem(CONSTANTS.STORAGE_KEY_THEME);
    const setStoredTheme = theme => localStorage.setItem(CONSTANTS.STORAGE_KEY_THEME, theme);

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? CONSTANTS.THEME_DARK
            : CONSTANTS.THEME_LIGHT;
    };

    const setTheme = theme => {
        if (theme === CONSTANTS.THEME_AUTO) {
            document.documentElement.setAttribute(
                CONSTANTS.DATA_BS_THEME,
                window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? CONSTANTS.THEME_DARK
                    : CONSTANTS.THEME_LIGHT
            );
        } else {
            document.documentElement.setAttribute(CONSTANTS.DATA_BS_THEME, theme);
        }

        // Update charts when theme changes
        updateChartsForTheme();
    };

    const updateChartsForTheme = () => {
        const isDark = document.documentElement.getAttribute(CONSTANTS.DATA_BS_THEME) === CONSTANTS.THEME_DARK;
        const gridColor = isDark
            ? THEME_CONFIG.charts.common.gridColor.dark
            : THEME_CONFIG.charts.common.gridColor.light;

        // Update revenue chart grid color if it exists
        if (typeof revenueChart !== 'undefined' && revenueChart !== null) {
            revenueChart.options.scales.y.grid.color = gridColor;
            revenueChart.update(CONSTANTS.ANIMATION_MODE_NONE); // 'none' prevents animation for smoother transition
        }
    };

    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = querySelectorSafely(CONSTANTS.SELECTOR_THEME_SWITCHER);
        if (!themeSwitcher) {
            return;
        }

        const activeThemeIcon = querySelectorSafely(CONSTANTS.SELECTOR_THEME_ICON);
        const btnToActive = document.querySelector(`[${CONSTANTS.DATA_BS_THEME_VALUE}="${theme}"]`);

        if (!activeThemeIcon || !btnToActive) {
            return;
        }

        // Update icon using THEME_CONFIG
        const iconMap = THEME_CONFIG.theme.icons;

        // Remove all icon classes
        Object.values(iconMap).forEach(iconClass => {
            activeThemeIcon.classList.remove(iconClass);
        });

        // Add the new icon class
        activeThemeIcon.classList.add(iconMap[theme]);

        // Update active state on buttons
        document.querySelectorAll(`[${CONSTANTS.DATA_BS_THEME_VALUE}]`).forEach(element => {
            element.classList.remove(CONSTANTS.CLASS_ACTIVE);
            element.setAttribute(CONSTANTS.ARIA_PRESSED, 'false');
        });

        btnToActive.classList.add(CONSTANTS.CLASS_ACTIVE);
        btnToActive.setAttribute(CONSTANTS.ARIA_PRESSED, 'true');

        if (focus) {
            themeSwitcher.focus();
        }
    };

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== CONSTANTS.THEME_LIGHT && storedTheme !== CONSTANTS.THEME_DARK) {
            setTheme(getPreferredTheme());
        }
    });

    // Public API
    return {
        /**
         * Initialize theme manager
         * Sets up event listeners and applies saved theme
         */
        init: () => {
            showActiveTheme(getPreferredTheme());
            updateChartsForTheme();

            // Attach event listeners to theme toggle buttons
            document.querySelectorAll(`[${CONSTANTS.DATA_BS_THEME_VALUE}]`).forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute(CONSTANTS.DATA_BS_THEME_VALUE);
                    setStoredTheme(theme);
                    setTheme(theme);
                    showActiveTheme(theme, true);
                });
            });
        },

        /**
         * Update chart colors based on current theme
         * Useful when charts are created after theme is set
         */
        updateCharts: updateChartsForTheme
    };
})();

// ============================================================================
// SIDEBAR TOGGLE
// ============================================================================

/**
 * Initialize sidebar toggle functionality
 *
 * Handles the collapse/expand functionality of the sidebar navigation
 * with proper ARIA support for accessibility
 */
const initSidebarToggle = () => {
    const sidebarToggle = getElementSafely('sidebarToggle');
    const sidebar = querySelectorSafely(CONSTANTS.SELECTOR_SIDEBAR);
    const content = querySelectorSafely(CONSTANTS.SELECTOR_CONTENT);

    if (!sidebarToggle || !sidebar || !content) {
        console.warn('Sidebar elements not found - toggle functionality disabled');
        return;
    }

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle(CONSTANTS.CLASS_COLLAPSED);
        content.classList.toggle(CONSTANTS.CLASS_EXPANDED);

        // Update ARIA attribute for screen readers
        const isExpanded = !sidebar.classList.contains(CONSTANTS.CLASS_COLLAPSED);
        sidebarToggle.setAttribute(CONSTANTS.ARIA_EXPANDED, isExpanded);
    });
};

// ============================================================================
// CHART CONFIGURATION & RENDERING
// ============================================================================

/**
 * Initialize Charts
 *
 * Creates and configures Chart.js instances based on THEME_CONFIG.
 * Charts include revenue trends (line chart) and traffic sources (doughnut chart).
 *
 * @function initCharts
 * @returns {void}
 */
let revenueChart, trafficChart;

const initCharts = () => {
    if (!THEME_CONFIG.features.enableCharts) {
        console.info('Charts feature is disabled in THEME_CONFIG');
        return;
    }

    // Revenue Chart (Line Chart)
    const revenueCtx = getElementSafely('revenueChart');
    if (revenueCtx) {
        const config = THEME_CONFIG.charts.revenue;
        const commonConfig = THEME_CONFIG.charts.common;

        revenueChart = new Chart(revenueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: config.labels,
                datasets: [
                    {
                        label: config.revenueData.label,
                        data: config.revenueData.data,
                        borderColor: config.revenueData.borderColor,
                        backgroundColor: config.revenueData.backgroundColor,
                        tension: CONSTANTS.CHART_LINE_TENSION,
                        fill: true,
                        borderWidth: CONSTANTS.CHART_BORDER_WIDTH,
                        pointRadius: CONSTANTS.CHART_POINT_RADIUS,
                        pointHoverRadius: CONSTANTS.CHART_POINT_HOVER_RADIUS,
                        pointBackgroundColor: config.revenueData.borderColor,
                        pointBorderColor: '#fff',
                        pointBorderWidth: CONSTANTS.CHART_POINT_BORDER_WIDTH
                    },
                    {
                        label: config.expensesData.label,
                        data: config.expensesData.data,
                        borderColor: config.expensesData.borderColor,
                        backgroundColor: config.expensesData.backgroundColor,
                        tension: CONSTANTS.CHART_LINE_TENSION,
                        fill: true,
                        borderWidth: CONSTANTS.CHART_BORDER_WIDTH,
                        pointRadius: CONSTANTS.CHART_POINT_RADIUS,
                        pointHoverRadius: CONSTANTS.CHART_POINT_HOVER_RADIUS,
                        pointBackgroundColor: config.expensesData.borderColor,
                        pointBorderColor: '#fff',
                        pointBorderWidth: CONSTANTS.CHART_POINT_BORDER_WIDTH
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            padding: CONSTANTS.LEGEND_PADDING,
                            font: {
                                size: CONSTANTS.FONT_SIZE_LEGEND,
                                family: commonConfig.fontFamily,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: commonConfig.tooltip.backgroundColor,
                        padding: CONSTANTS.TOOLTIP_PADDING,
                        cornerRadius: CONSTANTS.TOOLTIP_CORNER_RADIUS,
                        titleFont: {
                            size: CONSTANTS.FONT_SIZE_LEGEND,
                            family: commonConfig.fontFamily,
                            weight: '600'
                        },
                        bodyFont: {
                            size: CONSTANTS.FONT_SIZE_LEGEND,
                            family: commonConfig.fontFamily
                        },
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatCurrency(context.parsed.y);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        border: {
                            display: false
                        },
                        grid: {
                            color: document.documentElement.getAttribute('data-bs-theme') === 'dark'
                                ? commonConfig.gridColor.dark
                                : commonConfig.gridColor.light
                        },
                        ticks: {
                            font: {
                                size: CONSTANTS.FONT_SIZE_AXIS,
                                family: commonConfig.fontFamily
                            },
                            color: '#64748b',
                            callback: function (value) {
                                return formatCurrency(value);
                            }
                        }
                    },
                    x: {
                        border: {
                            display: false
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: CONSTANTS.FONT_SIZE_AXIS,
                                family: commonConfig.fontFamily
                            },
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }

    // Traffic Sources Chart (Doughnut Chart)
    const trafficCtx = getElementSafely('trafficChart');
    if (trafficCtx) {
        const config = THEME_CONFIG.charts.traffic;
        const commonConfig = THEME_CONFIG.charts.common;

        trafficChart = new Chart(trafficCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: config.labels,
                datasets: [{
                    data: config.data,
                    backgroundColor: config.colors,
                    borderWidth: CONSTANTS.CHART_DOUGHNUT_BORDER_WIDTH,
                    borderColor: '#fff',
                    hoverOffset: CONSTANTS.CHART_DOUGHNUT_HOVER_OFFSET
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: CONSTANTS.LEGEND_PADDING,
                            font: {
                                size: CONSTANTS.FONT_SIZE_LEGEND,
                                family: commonConfig.fontFamily,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: commonConfig.tooltip.backgroundColor,
                        padding: CONSTANTS.TOOLTIP_PADDING,
                        cornerRadius: CONSTANTS.TOOLTIP_CORNER_RADIUS,
                        titleFont: {
                            size: CONSTANTS.FONT_SIZE_LEGEND,
                            family: commonConfig.fontFamily,
                            weight: '600'
                        },
                        bodyFont: {
                            size: CONSTANTS.FONT_SIZE_LEGEND,
                            family: commonConfig.fontFamily
                        },
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatPercentage(context.parsed, 0);
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
};

// ============================================================================
// NAVIGATION ACTIVE STATES
// ============================================================================

/**
 * Initialize Navigation
 *
 * Handles active state management for navigation links with proper
 * ARIA attributes for accessibility
 *
 * @function initNavigation
 * @returns {void}
 */
const initNavigation = () => {
    const navLinks = document.querySelectorAll(CONSTANTS.SELECTOR_NAV_LINKS);

    if (navLinks.length === 0) {
        console.warn('No navigation links found');
        return;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active state from all links
            navLinks.forEach(l => {
                l.classList.remove(CONSTANTS.CLASS_ACTIVE);
                l.removeAttribute(CONSTANTS.ARIA_CURRENT);
            });

            // Add active state to clicked link
            this.classList.add(CONSTANTS.CLASS_ACTIVE);
            this.setAttribute(CONSTANTS.ARIA_CURRENT, 'page');
        });
    });
};

// ============================================================================
// BRAND CONFIGURATION
// ============================================================================

/**
 * Initialize Brand
 *
 * Applies brand configuration from THEME_CONFIG to the sidebar header.
 * Updates the logo icon and brand name dynamically.
 *
 * @function initBrand
 * @returns {void}
 */
const initBrand = () => {
    const sidebarHeader = querySelectorSafely('#sidebar .sidebar-header h4');

    if (!sidebarHeader) {
        console.warn('Sidebar header not found - brand configuration not applied');
        return;
    }

    const brandConfig = THEME_CONFIG.brand;

    // Update icon
    const iconElement = sidebarHeader.querySelector('i');
    if (iconElement) {
        // Remove all bi-* classes
        iconElement.className = iconElement.className
            .split(' ')
            .filter(cls => !cls.startsWith('bi-'))
            .join(' ');

        // Add new icon class
        iconElement.classList.add(brandConfig.logoIcon);
    }

    // Update brand name in span element
    const textSpan = sidebarHeader.querySelector('span');
    if (textSpan) {
        textSpan.textContent = brandConfig.name;
    }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize Application
 *
 * Main initialization function called when DOM is ready.
 * Initializes all dashboard features in the correct order.
 *
 * @function
 * @returns {void}
 */
window.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all modules
        initBrand();
        initSidebarToggle();
        initCharts();
        initNavigation();
        ThemeManager.init();

        console.info('Admin Dashboard initialized successfully');
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});
