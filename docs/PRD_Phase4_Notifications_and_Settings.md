# PRD: Phase 4 - System Pages (Notifications & Settings)

**Version**: 1.0
**Date**: 2025-10-29
**Status**: Design Specification
**Phase**: 4 of 5
**Author**: Claude Code
**Parent Document**: `docs/ENHANCEMENT_PLAN.md`

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Context](#project-context)
3. [Page Specifications](#page-specifications)
   - 4.1: Notifications Page
   - 4.2: Settings Page
4. [Technical Specifications](#technical-specifications)
5. [Testing Requirements](#testing-requirements)
6. [Documentation Requirements](#documentation-requirements)
7. [Implementation Checklist](#implementation-checklist)
8. [Success Criteria](#success-criteria)
9. [Future Enhancements](#future-enhancements)
10. [Appendices](#appendices)

---

## Executive Summary

Phase 4 delivers essential system pages for the admin dashboard: a comprehensive notification center and a multi-section settings/preferences page. These pages complete the core administrative functionality suite with professional UI patterns for system-level user interactions.

### Key Deliverables

**4.1: Notifications Page** (`pages/notifications.html`)
- Notification center with categorized message list
- Filter/category system (All, Alerts, Updates, Messages)
- Read/unread state management
- Mark as read/unread and delete actions
- Bootstrap toast integration for real-time demo
- Responsive list view with mobile optimization

**4.2: Settings Page** (`pages/settings.html`)
- Multi-section preferences interface
- Account settings (profile, email, password)
- Appearance preferences (theme, display options)
- Notification preferences (email, push, categories)
- Security settings (2FA, sessions, privacy)
- Tab-based or accordion-based organization
- Form validation and success feedback

### Timeline

- **Notifications Page**: 2-3 days
- **Settings Page**: 3-4 days
- **Total Phase 4**: 5-7 days

### Dependencies

- Bootstrap 5.3.8 (tabs, accordion, list groups, toasts, switches)
- Bootstrap Icons 1.13.1 (bell, gear, check, trash, etc.)
- Existing theme system (`assets/css/styles.css`)
- LocalStorage for demo persistence

---

## Project Context

### Architecture Alignment

**Project Structure**:
```
admin-dashboard/
├── pages/
│   ├── notifications.html    # NEW - Notification center
│   └── settings.html          # NEW - Settings/preferences
├── assets/
│   ├── css/styles.css        # Existing theme (reused)
│   └── js/app.js             # Theme utilities (reused)
├── admin-dashboard.html       # Main dashboard (navigation update needed)
└── docs/
    └── PRD_Phase4_Notifications_and_Settings.md  # This document
```

**Integration Points**:
- Notification badge in top navbar (admin-dashboard.html)
- Settings link in user dropdown menu
- Theme system CSS variables for consistent styling
- LocalStorage for notification and settings persistence

### Tech Stack

**Core Technologies**:
- HTML5 with semantic structure
- CSS3 using existing custom properties
- Vanilla JavaScript (ES6+, module pattern)
- No build process required

**Bootstrap Components**:
- **Notifications**: List groups, badges, buttons, toasts, offcanvas (mobile)
- **Settings**: Nav tabs/accordion, form controls, switches, alerts, toasts

**External Dependencies**:
- Bootstrap 5.3.8 (already loaded via CDN with SRI)
- Bootstrap Icons 1.13.1 (already loaded via CDN with SRI)
- Chart.js NOT required for these pages

### Design System

**Visual Consistency**:
- Follows existing dashboard design patterns
- Uses CSS custom properties from `assets/css/styles.css`
- Automatic light/dark mode support
- Maintains established spacing, typography, and color system

**Key CSS Variables** (from existing theme):
```css
/* Colors */
--primary-color: #2563eb (light) / #3b82f6 (dark)
--success-color: #10b981
--danger-color: #ef4444 (light) / #f87171 (dark)
--warning-color: #f59e0b (light) / #fbbf24 (dark)
--info-color: #3b82f6 (light) / #60a5fa (dark)

/* Backgrounds */
--page-bg: #f8fafc (light) / #0f172a (dark)
--card-bg: #ffffff (light) / #1e293b (dark)

/* Text */
--text-primary: #1e293b (light) / #f1f5f9 (dark)
--text-secondary: #64748b (light) / #cbd5e1 (dark)

/* Borders */
--border-color: #e2e8f0 (light) / #334155 (dark)
```

---

## Page Specifications

## 4.1: Notifications Page

### Overview

**File**: `pages/notifications.html`
**Estimated Size**: ~400 lines (HTML + CSS + JavaScript)
**Timeline**: 2-3 days
**Purpose**: Centralized notification management interface with filtering and actions

### Features

#### 4.1.1: Page Layout

**Header Section**:
- Page title: "Notifications"
- Notification count badge (e.g., "12 unread")
- Filter buttons (All, Alerts, Updates, Messages)
- Mark all as read button
- Responsive design (stacks on mobile)

**Main Section**:
- Scrollable notification list (Bootstrap list group)
- Each notification displays:
  - Icon (category-specific: bell, warning, info, envelope)
  - Title/message
  - Timestamp (relative: "5m ago", "2h ago", "3 days ago")
  - Read/unread indicator (visual + accessibility)
  - Action buttons (mark read/unread, delete)
- Empty state when no notifications
- Loading state indicator

**Mobile Considerations**:
- Touch-friendly tap targets (≥48px)
- Swipe actions optional (Phase 5 enhancement)
- Collapsible filter bar
- Bottom-anchored toast notifications

#### 4.1.2: Notification Categories

**Category Types**:
1. **Alerts** (red/warning icon): System alerts, critical updates, errors
2. **Updates** (blue/info icon): Feature updates, system changes, announcements
3. **Messages** (envelope icon): User messages, comments, mentions

**Category Filtering**:
- "All" shows all notifications (default)
- Category buttons filter by type
- Active filter visually highlighted
- Count badges per category

#### 4.1.3: Notification States

**Read/Unread**:
- Unread: Bold title, background highlight, blue dot indicator
- Read: Normal weight, standard background, no dot
- Toggle state with "Mark as read/unread" button

**Visual Indicators**:
```html
<!-- Unread notification -->
<li class="list-group-item notification-item unread" data-notification-id="1">
  <span class="notification-dot" aria-label="Unread"></span>
  <i class="bi bi-exclamation-triangle-fill text-warning"></i>
  <div class="notification-content">
    <strong class="notification-title">System Alert</strong>
    <p class="notification-message">Database backup completed successfully</p>
    <small class="notification-time text-muted">5 minutes ago</small>
  </div>
  <div class="notification-actions">
    <button class="btn btn-sm btn-outline-primary" aria-label="Mark as read">
      <i class="bi bi-check"></i>
    </button>
    <button class="btn btn-sm btn-outline-danger" aria-label="Delete">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</li>

<!-- Read notification -->
<li class="list-group-item notification-item" data-notification-id="2">
  <i class="bi bi-info-circle-fill text-info"></i>
  <div class="notification-content">
    <span class="notification-title">System Update</span>
    <p class="notification-message">New features available in version 2.1</p>
    <small class="notification-time text-muted">2 hours ago</small>
  </div>
  <div class="notification-actions">
    <button class="btn btn-sm btn-outline-secondary" aria-label="Mark as unread">
      <i class="bi bi-x"></i>
    </button>
    <button class="btn btn-sm btn-outline-danger" aria-label="Delete">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</li>
```

#### 4.1.4: Actions

**Individual Actions**:
- **Mark as read/unread**: Toggle button, updates state immediately
- **Delete**: Confirmation prompt (Bootstrap modal), removes notification

**Bulk Actions**:
- **Mark all as read**: Button in header, applies to filtered view
- **Clear all read**: Optional button to remove all read notifications

**Toast Notifications** (Demo Feature):
- Real-time demo using Bootstrap toasts
- Simulated notifications appear every 30 seconds
- Auto-dismiss after 5 seconds or manual close
- Positioned top-right corner (desktop) or top-center (mobile)

```javascript
// Toast notification example
function showToast(category, title, message) {
  const toastHTML = `
    <div class="toast align-items-center text-bg-${category}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <strong>${title}</strong><br>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  const toastContainer = document.getElementById('toast-container');
  toastContainer.insertAdjacentHTML('beforeend', toastHTML);

  const toastElement = toastContainer.lastElementChild;
  const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
  toast.show();

  // Add to notification list
  addNotificationToList(category, title, message);
}
```

#### 4.1.5: Data Structure

**Notification Object**:
```javascript
{
  id: 'unique-id',              // UUID or timestamp-based
  category: 'alert|update|message',
  title: 'Notification title',
  message: 'Detailed message',
  timestamp: 1730000000000,     // Unix timestamp
  read: false,                  // Boolean
  icon: 'bi-exclamation-triangle-fill',
  iconColor: 'text-warning'
}
```

**LocalStorage Schema**:
```javascript
// Key: 'notifications_data'
{
  notifications: [
    { id: '1', category: 'alert', title: '...', message: '...', timestamp: 1730000000000, read: false },
    { id: '2', category: 'update', title: '...', message: '...', timestamp: 1729990000000, read: true },
    // ... more notifications
  ],
  lastNotificationId: 50,
  settings: {
    enableToasts: true,
    toastInterval: 30000        // 30 seconds
  }
}
```

#### 4.1.6: Responsive Design

**Breakpoints**:
- **Mobile** (<576px):
  - Filter buttons stack vertically or use dropdown
  - Action buttons always visible (no hover)
  - Larger touch targets (48px minimum)
  - Toast notifications full-width, top of screen

- **Tablet** (576-767px):
  - Filter buttons in horizontal row
  - Notification list full-width
  - Standard action button sizes

- **Desktop** (≥768px):
  - Header with inline filter buttons
  - Two-column potential (future: sidebar for details)
  - Hover effects on notification items
  - Toast notifications top-right corner

#### 4.1.7: Accessibility

**WCAG 2.1 AA Requirements**:
- Semantic HTML5 structure (`<main>`, `<section>`, `<ul>`, `<li>`)
- All buttons have accessible labels (aria-label or visible text)
- Notification count announced to screen readers (aria-live region)
- Read/unread state conveyed without color alone (icon + bold + dot)
- Keyboard navigation:
  - Tab through filter buttons and notification actions
  - Enter/Space to activate buttons
  - Escape to dismiss toasts
- Focus indicators on all interactive elements
- Color contrast: 4.5:1 minimum for text, 3:1 for UI components

**ARIA Attributes**:
```html
<main id="notifications-page" role="main">
  <div class="notifications-header">
    <h1>Notifications</h1>
    <span class="badge bg-primary" aria-live="polite">12 unread</span>
  </div>

  <div class="filter-buttons" role="group" aria-label="Notification filters">
    <button class="btn btn-primary active" aria-pressed="true">All</button>
    <button class="btn btn-outline-primary" aria-pressed="false">Alerts</button>
    <!-- ... -->
  </div>

  <ul class="list-group notification-list" role="list">
    <!-- Notifications with proper list item roles -->
  </ul>
</main>
```

#### 4.1.8: Performance

**Targets**:
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s
- Total page size: <300KB (mostly CDN resources)
- JavaScript execution: <150ms

**Optimization Strategies**:
- Virtual scrolling for >100 notifications (optional, Phase 5)
- Lazy load older notifications (pagination)
- Debounce filter actions (200ms)
- Efficient DOM updates (DocumentFragment for bulk adds)
- LocalStorage batch reads/writes

---

## 4.2: Settings Page

### Overview

**File**: `pages/settings.html`
**Estimated Size**: ~600 lines (HTML + CSS + JavaScript)
**Timeline**: 3-4 days
**Purpose**: Comprehensive user preferences and system configuration interface

### Features

#### 4.2.1: Page Layout

**Organization Options**:

**Option A: Tab-Based** (Recommended for Desktop):
```html
<ul class="nav nav-tabs mb-4" role="tablist">
  <li class="nav-item">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#account">
      <i class="bi bi-person-circle me-2"></i>Account
    </button>
  </li>
  <li class="nav-item">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#appearance">
      <i class="bi bi-palette me-2"></i>Appearance
    </button>
  </li>
  <li class="nav-item">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#notifications">
      <i class="bi bi-bell me-2"></i>Notifications
    </button>
  </li>
  <li class="nav-item">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#security">
      <i class="bi bi-shield-lock me-2"></i>Security
    </button>
  </li>
</ul>

<div class="tab-content">
  <div class="tab-pane fade show active" id="account">
    <!-- Account settings -->
  </div>
  <!-- Other tabs -->
</div>
```

**Option B: Accordion-Based** (Better for Mobile):
```html
<div class="accordion" id="settings-accordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#account">
        <i class="bi bi-person-circle me-2"></i>Account Settings
      </button>
    </h2>
    <div id="account" class="accordion-collapse collapse show">
      <div class="accordion-body">
        <!-- Account settings -->
      </div>
    </div>
  </div>
  <!-- Other sections -->
</div>
```

**Recommendation**: Use **tabs for desktop, accordion for mobile** with responsive switching at 768px breakpoint.

#### 4.2.2: Section 1 - Account Settings

**Features**:
1. **Profile Information**:
   - Full name (text input)
   - Email address (email input, with "Change Email" button)
   - Phone number (tel input, optional)
   - Bio/About (textarea, character limit: 500)
   - Profile picture upload (future: Phase 5)

2. **Email Settings**:
   - Primary email (display only or editable with verification)
   - Email notifications preference (switch)
   - Email digest frequency (select: daily, weekly, never)

3. **Password Management**:
   - Current password (password input)
   - New password (password input with strength indicator)
   - Confirm new password (password input with match validation)
   - "Change Password" button
   - "Last changed: X days ago" indicator

**HTML Structure**:
```html
<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-person-circle me-2"></i>Profile Information</h5>

    <form id="profile-form">
      <div class="mb-3">
        <label for="full-name" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="full-name" value="John Doe" required>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <div class="input-group">
          <input type="email" class="form-control" id="email" value="john@example.com" required>
          <button class="btn btn-outline-primary" type="button">Change</button>
        </div>
        <small class="form-text text-muted">Email changes require verification</small>
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number <span class="text-muted">(optional)</span></label>
        <input type="tel" class="form-control" id="phone" placeholder="+1 (555) 123-4567">
      </div>

      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea class="form-control" id="bio" rows="4" maxlength="500"></textarea>
        <small class="form-text text-muted">
          <span id="bio-count">0</span> / 500 characters
        </small>
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
      <button type="button" class="btn btn-outline-secondary">Cancel</button>
    </form>
  </div>
</div>

<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-lock me-2"></i>Change Password</h5>

    <form id="password-form">
      <div class="mb-3">
        <label for="current-password" class="form-label">Current Password</label>
        <input type="password" class="form-control" id="current-password" required>
      </div>

      <div class="mb-3">
        <label for="new-password" class="form-label">New Password</label>
        <input type="password" class="form-control" id="new-password" required>
        <div class="password-strength mt-2">
          <div class="progress" style="height: 6px;">
            <div class="progress-bar" id="password-strength-bar" role="progressbar" style="width: 0%"></div>
          </div>
          <small class="form-text" id="password-strength-text">Enter a password</small>
        </div>
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm New Password</label>
        <input type="password" class="form-control" id="confirm-password" required>
        <div class="invalid-feedback">Passwords do not match</div>
      </div>

      <button type="submit" class="btn btn-primary">Update Password</button>
      <small class="form-text text-muted d-block mt-2">
        Last changed: <strong>30 days ago</strong>
      </small>
    </form>
  </div>
</div>
```

#### 4.2.3: Section 2 - Appearance Settings

**Features**:
1. **Theme Selection**:
   - Light mode (radio button or visual card)
   - Dark mode (radio button or visual card)
   - Auto (system preference, radio button or visual card)
   - Live preview on change

2. **Display Options**:
   - Sidebar collapsed by default (switch)
   - Compact mode (reduced spacing, switch)
   - Font size (select: Small, Medium, Large)

3. **Color Scheme** (Future Enhancement):
   - Primary color picker
   - Accent color picker
   - Custom theme builder (Phase 5)

**HTML Structure**:
```html
<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-palette me-2"></i>Theme</h5>

    <div class="row g-3">
      <div class="col-md-4">
        <div class="theme-option">
          <input type="radio" class="btn-check" name="theme" id="theme-light" value="light">
          <label class="btn btn-outline-primary w-100" for="theme-light">
            <i class="bi bi-sun-fill d-block mb-2" style="font-size: 2rem;"></i>
            Light
          </label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="theme-option">
          <input type="radio" class="btn-check" name="theme" id="theme-dark" value="dark">
          <label class="btn btn-outline-primary w-100" for="theme-dark">
            <i class="bi bi-moon-stars-fill d-block mb-2" style="font-size: 2rem;"></i>
            Dark
          </label>
        </div>
      </div>

      <div class="col-md-4">
        <div class="theme-option">
          <input type="radio" class="btn-check" name="theme" id="theme-auto" value="auto" checked>
          <label class="btn btn-outline-primary w-100" for="theme-auto">
            <i class="bi bi-circle-half d-block mb-2" style="font-size: 2rem;"></i>
            Auto
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-sliders me-2"></i>Display Options</h5>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="sidebar-collapsed">
      <label class="form-check-label" for="sidebar-collapsed">
        Collapse sidebar by default
      </label>
    </div>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="compact-mode">
      <label class="form-check-label" for="compact-mode">
        Compact mode (reduce spacing)
      </label>
    </div>

    <div class="mb-3">
      <label for="font-size" class="form-label">Font Size</label>
      <select class="form-select" id="font-size">
        <option value="small">Small</option>
        <option value="medium" selected>Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  </div>
</div>
```

#### 4.2.4: Section 3 - Notification Preferences

**Features**:
1. **Email Notifications**:
   - Enable/disable email notifications (master switch)
   - Notification types (checkboxes):
     - New messages
     - System alerts
     - Updates and announcements
     - Weekly digest
   - Email frequency (select: immediate, hourly, daily, weekly)

2. **Push Notifications** (Browser):
   - Enable/disable browser notifications (switch)
   - Request permission button (if not granted)
   - Notification types (checkboxes, same as email)

3. **In-App Notifications**:
   - Enable notification sounds (switch)
   - Show desktop notifications (switch)
   - Notification position (select: top-right, top-center, bottom-right)

**HTML Structure**:
```html
<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-envelope me-2"></i>Email Notifications</h5>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="email-notifications-enabled" checked>
      <label class="form-check-label" for="email-notifications-enabled">
        Enable email notifications
      </label>
    </div>

    <div id="email-notification-types">
      <label class="form-label">Send me emails for:</label>

      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="email-messages" checked>
        <label class="form-check-label" for="email-messages">
          New messages and mentions
        </label>
      </div>

      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="email-alerts" checked>
        <label class="form-check-label" for="email-alerts">
          System alerts and important updates
        </label>
      </div>

      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="email-updates">
        <label class="form-check-label" for="email-updates">
          Product updates and announcements
        </label>
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="email-digest">
        <label class="form-check-label" for="email-digest">
          Weekly activity digest
        </label>
      </div>

      <div class="mb-3">
        <label for="email-frequency" class="form-label">Email Frequency</label>
        <select class="form-select" id="email-frequency">
          <option value="immediate">Immediate</option>
          <option value="hourly">Hourly digest</option>
          <option value="daily" selected>Daily digest</option>
          <option value="weekly">Weekly digest</option>
        </select>
      </div>
    </div>
  </div>
</div>

<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-bell me-2"></i>Push Notifications</h5>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="push-notifications-enabled">
      <label class="form-check-label" for="push-notifications-enabled">
        Enable browser push notifications
      </label>
    </div>

    <div class="alert alert-info" id="push-permission-alert" style="display: none;">
      <i class="bi bi-info-circle me-2"></i>
      Push notifications require browser permission.
      <button class="btn btn-sm btn-primary ms-2" id="request-push-permission">
        Grant Permission
      </button>
    </div>

    <div id="push-notification-types">
      <!-- Similar checkboxes as email -->
    </div>
  </div>
</div>
```

#### 4.2.5: Section 4 - Security Settings

**Features**:
1. **Two-Factor Authentication**:
   - Enable/disable 2FA (switch)
   - Setup instructions (when enabling)
   - Recovery codes display (when enabled)
   - "Regenerate codes" button

2. **Active Sessions**:
   - List of active sessions with:
     - Device/browser info
     - Location (IP-based, demo data)
     - Last active timestamp
     - "Current session" indicator
     - "Revoke" button for other sessions
   - "Sign out all other sessions" button

3. **Privacy Settings**:
   - Profile visibility (select: public, private, friends)
   - Activity status (switch: show when online)
   - Search engine indexing (switch)

4. **Account Actions**:
   - Export data (button)
   - Delete account (button with confirmation modal)

**HTML Structure**:
```html
<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-shield-check me-2"></i>Two-Factor Authentication</h5>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="2fa-enabled">
      <label class="form-check-label" for="2fa-enabled">
        Enable two-factor authentication (2FA)
      </label>
    </div>

    <div class="alert alert-warning" id="2fa-setup" style="display: none;">
      <h6 class="alert-heading">Setup Required</h6>
      <p>Scan the QR code with your authenticator app:</p>
      <div class="text-center mb-3">
        <!-- QR code placeholder (demo) -->
        <div class="bg-light p-3 d-inline-block" style="width: 200px; height: 200px;">
          <span class="text-muted">QR Code Placeholder</span>
        </div>
      </div>
      <p class="mb-2">Or enter this code manually:</p>
      <code>ABCD EFGH IJKL MNOP</code>
      <hr>
      <label for="2fa-verify-code" class="form-label">Enter verification code:</label>
      <div class="input-group mb-3">
        <input type="text" class="form-control" id="2fa-verify-code" placeholder="000000" maxlength="6">
        <button class="btn btn-primary">Verify & Enable</button>
      </div>
    </div>

    <div id="2fa-active" style="display: none;">
      <div class="alert alert-success">
        <i class="bi bi-check-circle me-2"></i>
        Two-factor authentication is active
      </div>
      <button class="btn btn-outline-secondary btn-sm">View Recovery Codes</button>
      <button class="btn btn-outline-danger btn-sm">Disable 2FA</button>
    </div>
  </div>
</div>

<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-device-ssd me-2"></i>Active Sessions</h5>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Device</th>
            <th>Location</th>
            <th>Last Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-primary">
            <td>
              <i class="bi bi-laptop me-2"></i>
              Chrome on MacBook Pro
              <span class="badge bg-primary ms-2">Current</span>
            </td>
            <td>San Francisco, CA</td>
            <td>Just now</td>
            <td>—</td>
          </tr>
          <tr>
            <td>
              <i class="bi bi-phone me-2"></i>
              Safari on iPhone
            </td>
            <td>San Francisco, CA</td>
            <td>2 hours ago</td>
            <td>
              <button class="btn btn-sm btn-outline-danger">Revoke</button>
            </td>
          </tr>
          <tr>
            <td>
              <i class="bi bi-laptop me-2"></i>
              Firefox on Windows PC
            </td>
            <td>New York, NY</td>
            <td>3 days ago</td>
            <td>
              <button class="btn btn-sm btn-outline-danger">Revoke</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="btn btn-outline-danger">Sign Out All Other Sessions</button>
  </div>
</div>

<div class="card mb-4">
  <div class="card-body">
    <h5 class="card-title"><i class="bi bi-eye-slash me-2"></i>Privacy</h5>

    <div class="mb-3">
      <label for="profile-visibility" class="form-label">Profile Visibility</label>
      <select class="form-select" id="profile-visibility">
        <option value="public">Public</option>
        <option value="private" selected>Private</option>
        <option value="friends">Friends Only</option>
      </select>
    </div>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="activity-status" checked>
      <label class="form-check-label" for="activity-status">
        Show when I'm online
      </label>
    </div>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="search-indexing">
      <label class="form-check-label" for="search-indexing">
        Allow search engines to index my profile
      </label>
    </div>
  </div>
</div>

<div class="card border-danger mb-4">
  <div class="card-body">
    <h5 class="card-title text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Danger Zone</h5>

    <div class="d-grid gap-2 d-md-block">
      <button class="btn btn-outline-secondary">
        <i class="bi bi-download me-2"></i>Export My Data
      </button>
      <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#delete-account-modal">
        <i class="bi bi-trash me-2"></i>Delete Account
      </button>
    </div>
  </div>
</div>

<!-- Delete Account Confirmation Modal -->
<div class="modal fade" id="delete-account-modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="text-danger">
          <strong>Warning:</strong> This action cannot be undone.
        </p>
        <p>
          All your data, including profile, settings, and activity history will be permanently deleted.
        </p>
        <label for="delete-confirm-text" class="form-label">
          Type <strong>DELETE</strong> to confirm:
        </label>
        <input type="text" class="form-control" id="delete-confirm-text" placeholder="DELETE">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" id="confirm-delete-account" disabled>
          Delete My Account
        </button>
      </div>
    </div>
  </div>
</div>
```

#### 4.2.6: Form Validation & Feedback

**Validation Rules**:
- **Email**: Valid email format, required
- **Phone**: Optional, valid format if provided
- **Bio**: Max 500 characters
- **Current password**: Required for password change, min 8 characters
- **New password**: Min 8 characters, strength indicator
- **Confirm password**: Must match new password
- **Delete confirmation**: Must type "DELETE" exactly

**Success Feedback**:
- Bootstrap toast notification (top-right corner)
- Success message: "Settings saved successfully"
- Auto-dismiss after 3 seconds
- Visual confirmation (green checkmark icon)

**Error Feedback**:
- Inline validation messages (Bootstrap invalid-feedback)
- Toast notification for server-side errors (demo)
- Error message: "Failed to save settings. Please try again."
- Keep form data on error

```javascript
// Success toast example
function showSuccessToast(message) {
  const toastHTML = `
    <div class="toast align-items-center text-bg-success" role="alert">
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle me-2"></i>${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
  // Show toast logic...
}

// Form submission example
document.getElementById('profile-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate form
  if (!this.checkValidity()) {
    this.classList.add('was-validated');
    return;
  }

  // Collect form data
  const formData = {
    fullName: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    bio: document.getElementById('bio').value
  };

  // Save to LocalStorage (demo)
  localStorage.setItem('user_profile', JSON.stringify(formData));

  // Show success feedback
  showSuccessToast('Profile settings saved successfully');

  // Remove validation classes
  this.classList.remove('was-validated');
});
```

#### 4.2.7: LocalStorage Schema

**Settings Data Structure**:
```javascript
// Key: 'user_settings'
{
  account: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Software developer...',
    lastPasswordChange: 1729000000000
  },
  appearance: {
    theme: 'auto',               // 'light' | 'dark' | 'auto'
    sidebarCollapsed: false,
    compactMode: false,
    fontSize: 'medium'           // 'small' | 'medium' | 'large'
  },
  notifications: {
    email: {
      enabled: true,
      types: {
        messages: true,
        alerts: true,
        updates: false,
        digest: true
      },
      frequency: 'daily'         // 'immediate' | 'hourly' | 'daily' | 'weekly'
    },
    push: {
      enabled: false,
      permission: 'default',     // 'default' | 'granted' | 'denied'
      types: {
        messages: true,
        alerts: true,
        updates: false
      }
    },
    inApp: {
      sounds: true,
      desktop: true,
      position: 'top-right'      // 'top-right' | 'top-center' | 'bottom-right'
    }
  },
  security: {
    twoFactorEnabled: false,
    recoveryCodes: [],
    sessions: [
      {
        id: 'session-1',
        device: 'Chrome on MacBook Pro',
        location: 'San Francisco, CA',
        lastActive: 1730000000000,
        current: true
      }
    ],
    privacy: {
      profileVisibility: 'private',
      activityStatus: true,
      searchIndexing: false
    }
  },
  lastModified: 1730000000000
}
```

#### 4.2.8: Responsive Design

**Breakpoints**:
- **Mobile** (<768px):
  - Use accordion instead of tabs
  - Stack form elements vertically
  - Full-width buttons
  - Larger touch targets (48px)
  - Simplified session table (list view)

- **Tablet** (768-991px):
  - Tabs with icons
  - Two-column form layouts where appropriate
  - Standard button sizes

- **Desktop** (≥992px):
  - Horizontal tabs with icons and labels
  - Multi-column layouts for forms
  - Sidebar + content layout option (future)
  - Hover effects on interactive elements

**Responsive Switching** (Tab ↔ Accordion):
```javascript
function updateSettingsLayout() {
  const isMobile = window.innerWidth < 768;
  const tabsContainer = document.getElementById('settings-tabs');
  const accordionContainer = document.getElementById('settings-accordion');

  if (isMobile) {
    tabsContainer.style.display = 'none';
    accordionContainer.style.display = 'block';
  } else {
    tabsContainer.style.display = 'block';
    accordionContainer.style.display = 'none';
  }
}

// Update on load and resize
window.addEventListener('resize', updateSettingsLayout);
updateSettingsLayout();
```

#### 4.2.9: Accessibility

**WCAG 2.1 AA Requirements**:
- Semantic HTML5 structure
- Proper form labels associated with inputs
- Fieldsets and legends for grouped controls
- ARIA attributes for tabs/accordion
- Keyboard navigation:
  - Arrow keys for tab navigation
  - Enter/Space to toggle switches and checkboxes
  - Tab to move between form controls
- Focus management when switching tabs
- Color contrast: 4.5:1 minimum
- Error messages associated with form fields (aria-describedby)

**ARIA for Tabs**:
```html
<ul class="nav nav-tabs" role="tablist" aria-label="Settings sections">
  <li class="nav-item" role="presentation">
    <button class="nav-link active"
            id="account-tab"
            data-bs-toggle="tab"
            data-bs-target="#account"
            type="button"
            role="tab"
            aria-controls="account"
            aria-selected="true">
      Account
    </button>
  </li>
  <!-- More tabs -->
</ul>

<div class="tab-content">
  <div class="tab-pane fade show active"
       id="account"
       role="tabpanel"
       aria-labelledby="account-tab"
       tabindex="0">
    <!-- Content -->
  </div>
</div>
```

#### 4.2.10: Performance

**Targets**:
- First Contentful Paint: <1.5s
- Time to Interactive: <3.0s
- Total page size: <400KB
- JavaScript execution: <200ms

**Optimization Strategies**:
- Lazy load tab content (only active tab rendered initially)
- Debounce form autosave (500ms)
- Batch LocalStorage writes
- Efficient form validation (on blur, not on input)
- Minimize DOM manipulation during theme changes

---

## Technical Specifications

### Dependencies

**Required (Already Loaded)**:
- Bootstrap 5.3.8 CSS and JS bundle (with SRI)
- Bootstrap Icons 1.13.1 (with SRI)
- Existing theme system (`assets/css/styles.css`)

**No Additional Dependencies**: All functionality uses vanilla JavaScript and existing resources.

### Browser Compatibility

**Target Browsers**:
- Chrome/Edge 90+ (latest 2 years)
- Firefox 88+ (latest 2 years)
- Safari 14+ (latest 2 years)

**Feature Support Required**:
- LocalStorage API (universal support)
- ES6+ JavaScript (const/let, arrow functions, template literals)
- CSS Grid and Flexbox (universal support)
- CSS Custom Properties (universal support)

**Graceful Degradation**:
- Push notifications: Check browser support, show fallback message
- LocalStorage: Check availability, show warning if disabled

### Performance Metrics

**Page Load Targets**:
- **Notifications Page**:
  - First Contentful Paint: <1.5s
  - Time to Interactive: <2.5s
  - Total page size: <300KB
  - Lighthouse Performance: ≥90

- **Settings Page**:
  - First Contentful Paint: <1.5s
  - Time to Interactive: <3.0s
  - Total page size: <400KB
  - Lighthouse Performance: ≥90

**Runtime Performance**:
- Form validation: <50ms per field
- Tab/accordion switching: <100ms
- Toast notifications: <50ms to display
- LocalStorage operations: <20ms per read/write

### Security Considerations

**Client-Side Only** (Demo):
- No real authentication backend
- Passwords stored in plaintext (demo only, with warnings in code)
- LocalStorage not encrypted (note in documentation)

**Production Recommendations** (in comments):
```javascript
/**
 * IMPORTANT: This is a demo implementation using LocalStorage.
 *
 * For production use:
 * 1. Replace LocalStorage with secure backend API calls
 * 2. Never store passwords client-side (use secure backend auth)
 * 3. Implement proper session management (JWT, cookies, etc.)
 * 4. Add CSRF protection for form submissions
 * 5. Implement rate limiting on sensitive actions
 * 6. Use HTTPS in production
 * 7. Sanitize all user inputs before storage/display
 */
```

---

## Testing Requirements

### Functional Testing

#### Notifications Page
- [ ] Page loads without errors
- [ ] Notifications display correctly (read/unread states)
- [ ] Filter buttons work (All, Alerts, Updates, Messages)
- [ ] Active filter is visually highlighted
- [ ] Notification count badge updates correctly
- [ ] Mark as read/unread toggles state
- [ ] Delete notification removes item from list
- [ ] Delete confirmation modal appears and works
- [ ] Mark all as read works for filtered view
- [ ] Toast notifications appear on demo interval
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Toast can be manually closed
- [ ] New notification added to list when toast shows
- [ ] Relative timestamps display correctly ("5m ago", "2h ago")
- [ ] Empty state shows when no notifications
- [ ] LocalStorage persists notification state
- [ ] Page reload restores notification state

#### Settings Page
- [ ] Page loads without errors
- [ ] Tab navigation works (desktop)
- [ ] Accordion navigation works (mobile)
- [ ] Profile form validates correctly
- [ ] Profile form saves to LocalStorage
- [ ] Bio character counter updates in real-time
- [ ] Password form validates current password
- [ ] New password strength indicator works
- [ ] Confirm password match validation works
- [ ] Theme selection updates immediately (live preview)
- [ ] Display options (sidebar, compact, font size) work
- [ ] Email notification preferences save correctly
- [ ] Push notification permission request works (where supported)
- [ ] Security settings (2FA, sessions) display correctly
- [ ] Active sessions list displays demo data
- [ ] Revoke session button works (removes from list)
- [ ] Delete account modal requires exact "DELETE" text
- [ ] Success toast shows on save
- [ ] Form validation errors display inline
- [ ] All settings persist in LocalStorage
- [ ] Page reload restores all settings

### Accessibility Testing

**Screen Reader Testing** (NVDA/JAWS):
- [ ] Page title and structure announced correctly
- [ ] All form labels read properly
- [ ] Notification read/unread state conveyed
- [ ] Tab/accordion navigation accessible
- [ ] Button purposes announced
- [ ] Error messages announced
- [ ] Success feedback announced (toast + aria-live)

**Keyboard Navigation**:
- [ ] Tab order is logical
- [ ] All interactive elements focusable
- [ ] Focus indicators visible (3px outline, 2px offset)
- [ ] Enter/Space activate buttons and checkboxes
- [ ] Arrow keys navigate tabs (desktop)
- [ ] Escape closes toasts and modals
- [ ] No keyboard traps

**Color Contrast** (WCAG AA/AAA):
- [ ] All text meets 4.5:1 contrast ratio (AA)
- [ ] UI components meet 3:1 contrast ratio
- [ ] Link text distinguishable from body text
- [ ] Focus indicators have 3:1 contrast
- [ ] Test both light and dark themes

### Responsive Testing

**Breakpoints to Test**:
- [ ] Mobile (375px - iPhone SE)
- [ ] Mobile (414px - iPhone 13 Pro Max)
- [ ] Tablet (768px - iPad)
- [ ] Tablet (1024px - iPad Pro)
- [ ] Desktop (1280px - standard laptop)
- [ ] Desktop (1920px - full HD)

**Layout Checks**:
- [ ] Notifications list readable at all sizes
- [ ] Settings switch from tabs to accordion at 768px
- [ ] Forms stack properly on mobile
- [ ] No horizontal scrolling
- [ ] Touch targets ≥48px on mobile
- [ ] Text readable without zooming
- [ ] Images/icons scale appropriately

### Browser Testing

**Browsers & Versions**:
- [ ] Chrome (latest stable)
- [ ] Firefox (latest stable)
- [ ] Safari (latest stable - macOS/iOS)
- [ ] Edge (latest stable)

**Feature Checks**:
- [ ] LocalStorage works in all browsers
- [ ] CSS Grid layout displays correctly
- [ ] Bootstrap components function properly
- [ ] JavaScript (ES6+) executes without errors
- [ ] Push notification API available (or fallback shown)

### Performance Testing

**Lighthouse Audits** (Chrome DevTools):
- [ ] Performance: ≥90
- [ ] Accessibility: 100
- [ ] Best Practices: ≥90
- [ ] SEO: ≥90

**Core Web Vitals**:
- [ ] Largest Contentful Paint (LCP): <2.5s
- [ ] First Input Delay (FID): <100ms
- [ ] Cumulative Layout Shift (CLS): <0.1

**Runtime Performance**:
- [ ] No console errors or warnings
- [ ] Smooth animations (60fps)
- [ ] Fast tab/accordion switching (<100ms)
- [ ] No memory leaks (check DevTools Memory profiler)

---

## Documentation Requirements

### Code Documentation

**HTML Comments**:
```html
<!-- ============================================
     NOTIFICATIONS PAGE

     Purpose: Centralized notification management
     Features: Filter, read/unread, delete, toasts
     Dependencies: Bootstrap 5, Bootstrap Icons
     LocalStorage: 'notifications_data'
     ============================================ -->

<!-- HEADER SECTION: Page title and filters -->
<!-- NOTIFICATION LIST: Scrollable list of notifications -->
<!-- TOAST CONTAINER: Real-time notification toasts -->
<!-- MODALS: Confirmation dialogs -->
```

**JavaScript Comments**:
```javascript
/**
 * Notifications Page
 *
 * Manages notification list, filtering, actions, and toast notifications.
 * Data persisted in LocalStorage for demo purposes.
 *
 * @dependencies Bootstrap 5.3.8, Bootstrap Icons 1.13.1
 * @storage localStorage: 'notifications_data'
 */

/**
 * Show a toast notification
 * @param {string} category - Notification category ('alert', 'update', 'message')
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 */
function showToast(category, title, message) {
  // Implementation...
}
```

### User Documentation

**In-Page Help Text**:
- Brief descriptions under each setting
- Examples for form fields (e.g., phone number format)
- Warnings for destructive actions (delete account)
- Info alerts for features requiring permissions

**Inline Tooltips** (Bootstrap popovers):
```html
<button class="btn btn-sm btn-link"
        data-bs-toggle="popover"
        data-bs-content="2FA adds an extra layer of security by requiring a code from your phone in addition to your password.">
  <i class="bi bi-info-circle"></i>
</button>
```

### Integration Guide

**Navigation Updates** (`admin-dashboard.html`):

**Sidebar Navigation** (add to existing menu):
```html
<li class="nav-item">
  <a class="nav-link" href="pages/notifications.html">
    <i class="bi bi-bell"></i>
    <span>Notifications</span>
    <span class="badge bg-danger ms-2">12</span>
  </a>
</li>
```

**Top Navbar** (notification icon with badge):
```html
<button class="btn btn-link position-relative me-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#notifications-offcanvas"
        aria-label="Notifications">
  <i class="bi bi-bell" style="font-size: 1.25rem;"></i>
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    12
    <span class="visually-hidden">unread notifications</span>
  </span>
</button>

<!-- Quick notification preview (offcanvas) -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="notifications-offcanvas">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Notifications</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <!-- Last 5 notifications -->
    <a href="pages/notifications.html" class="btn btn-primary w-100">
      View All Notifications
    </a>
  </div>
</div>
```

**User Dropdown Menu** (add settings link):
```html
<li><a class="dropdown-item" href="pages/settings.html">
  <i class="bi bi-gear me-2"></i>Settings
</a></li>
```

---

## Implementation Checklist

### Phase 4.1: Notifications Page (Days 1-3)

#### Day 1: Structure & Layout
- [ ] Create `pages/notifications.html` file
- [ ] Add HTML boilerplate with proper head section
- [ ] Link existing `assets/css/styles.css` and theme script
- [ ] Create page header with title and filter buttons
- [ ] Create notification list container (Bootstrap list group)
- [ ] Add toast container for real-time notifications
- [ ] Test responsive layout (mobile/tablet/desktop)

#### Day 2: Functionality
- [ ] Implement notification data structure
- [ ] Create sample notification data (10-15 items)
- [ ] Implement filter functionality (All, Alerts, Updates, Messages)
- [ ] Add active filter highlighting
- [ ] Implement read/unread state toggle
- [ ] Add delete notification with confirmation
- [ ] Implement "Mark all as read" button
- [ ] Create LocalStorage save/load functions
- [ ] Test all interactive features

#### Day 3: Toasts & Polish
- [ ] Implement Bootstrap toast notifications
- [ ] Create toast generation function
- [ ] Add simulated real-time notifications (30s interval)
- [ ] Link toast to notification list (add to list when toast shows)
- [ ] Implement relative timestamp formatting
- [ ] Add empty state message
- [ ] Test toast auto-dismiss and manual close
- [ ] Accessibility audit (keyboard, screen reader, contrast)
- [ ] Cross-browser testing
- [ ] Performance testing (Lighthouse)

### Phase 4.2: Settings Page (Days 4-7)

#### Day 4: Structure & Account Section
- [ ] Create `pages/settings.html` file
- [ ] Add HTML boilerplate with proper head section
- [ ] Implement tab navigation (desktop) and accordion (mobile)
- [ ] Add responsive switching logic (tabs ↔ accordion)
- [ ] Create Account section structure
- [ ] Add profile information form (name, email, phone, bio)
- [ ] Implement bio character counter
- [ ] Create password change form with strength indicator
- [ ] Add form validation
- [ ] Test Account section functionality

#### Day 5: Appearance & Notification Preferences
- [ ] Create Appearance section
- [ ] Add theme selection (light, dark, auto) with visual cards
- [ ] Implement live theme preview
- [ ] Add display options (sidebar, compact, font size)
- [ ] Create Notification Preferences section
- [ ] Add email notification settings with checkboxes
- [ ] Implement notification type toggles
- [ ] Add push notification settings
- [ ] Create push permission request logic
- [ ] Test Appearance and Notification sections

#### Day 6: Security & Danger Zone
- [ ] Create Security section
- [ ] Add 2FA toggle and setup flow (demo)
- [ ] Create active sessions table with demo data
- [ ] Implement session revoke functionality
- [ ] Add privacy settings (visibility, activity, indexing)
- [ ] Create "Danger Zone" section
- [ ] Add delete account button and confirmation modal
- [ ] Implement "DELETE" text confirmation
- [ ] Test Security section functionality

#### Day 7: Integration & Final Testing
- [ ] Implement LocalStorage for all settings
- [ ] Create success toast feedback
- [ ] Add error handling and validation messages
- [ ] Test form autosave (optional feature)
- [ ] Integrate settings with dashboard navigation
- [ ] Update navbar with notification badge
- [ ] Update user dropdown with settings link
- [ ] Comprehensive accessibility audit
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsive testing (all breakpoints)
- [ ] Performance testing (Lighthouse)
- [ ] Final code cleanup and documentation review

### Phase 4.3: Final Integration
- [ ] Update `admin-dashboard.html` sidebar navigation
- [ ] Add notification badge with count to navbar
- [ ] Create notification offcanvas preview (optional)
- [ ] Add settings link to user dropdown menu
- [ ] Test navigation from dashboard to new pages
- [ ] Test theme consistency across all pages
- [ ] Verify LocalStorage data persistence
- [ ] Final documentation review
- [ ] Create demo data reset function (optional)

---

## Success Criteria

### Functional Requirements

#### Notifications Page (10 requirements)
1. ✅ Displays list of notifications with category icons
2. ✅ Filter buttons work (All, Alerts, Updates, Messages)
3. ✅ Read/unread state toggles correctly
4. ✅ Delete notification removes item with confirmation
5. ✅ Mark all as read works for filtered view
6. ✅ Toast notifications appear and auto-dismiss
7. ✅ New notifications added to list when toast shows
8. ✅ Relative timestamps display correctly
9. ✅ Empty state shows when no notifications
10. ✅ LocalStorage persists all notification data

#### Settings Page (15 requirements)
1. ✅ Tab navigation works on desktop, accordion on mobile
2. ✅ Profile form validates and saves correctly
3. ✅ Bio character counter updates in real-time
4. ✅ Password change includes strength indicator
5. ✅ Theme selection updates immediately (live preview)
6. ✅ Display options work (sidebar, compact, font size)
7. ✅ Email notification preferences save correctly
8. ✅ Push notification permission request works
9. ✅ 2FA toggle and setup flow work (demo)
10. ✅ Active sessions display and revoke works
11. ✅ Privacy settings save correctly
12. ✅ Delete account requires exact "DELETE" confirmation
13. ✅ Success toast shows on save
14. ✅ All settings persist in LocalStorage
15. ✅ Page reload restores all settings

### Non-Functional Requirements

#### Theme Integration (6 requirements)
1. ✅ Uses CSS custom properties from existing theme
2. ✅ Automatic light/dark mode support
3. ✅ No additional CSS files needed
4. ✅ Consistent with dashboard appearance
5. ✅ Theme changes apply immediately
6. ✅ No theme flicker on page load

#### Accessibility (8 requirements)
1. ✅ WCAG 2.1 AA compliant minimum
2. ✅ Lighthouse Accessibility score: 100
3. ✅ All interactive elements keyboard accessible
4. ✅ Screen reader tested (NVDA or JAWS)
5. ✅ Focus indicators visible (3px outline, 2px offset)
6. ✅ Color contrast: 4.5:1 for text, 3:1 for UI components
7. ✅ Semantic HTML5 structure throughout
8. ✅ ARIA attributes used correctly

#### Performance (7 requirements)
1. ✅ Lighthouse Performance score: ≥90
2. ✅ First Contentful Paint: <1.5s
3. ✅ Time to Interactive: <3.0s (notifications), <3.5s (settings)
4. ✅ Total page size: <300KB (notifications), <400KB (settings)
5. ✅ No console errors or warnings
6. ✅ Smooth animations (60fps)
7. ✅ Fast tab/accordion switching (<100ms)

#### Responsive Design (6 requirements)
1. ✅ Works on mobile (375px and up)
2. ✅ Works on tablet (768px and up)
3. ✅ Works on desktop (1280px and up)
4. ✅ Touch targets ≥48px on mobile
5. ✅ No horizontal scrolling at any breakpoint
6. ✅ Text readable without zooming (font-size: 16px mobile)

#### Browser Compatibility (5 requirements)
1. ✅ Chrome (latest stable) works perfectly
2. ✅ Firefox (latest stable) works perfectly
3. ✅ Safari (latest stable) works perfectly
4. ✅ Edge (latest stable) works perfectly
5. ✅ No browser-specific bugs or issues

#### Code Quality (7 requirements)
1. ✅ HTML validates (W3C validator)
2. ✅ JavaScript follows ES6+ standards
3. ✅ Code is well-commented and documented
4. ✅ Follows existing project conventions
5. ✅ No duplicate code (DRY principle)
6. ✅ LocalStorage schema well-defined
7. ✅ Production warnings in comments

### Quality Gates

**Before Marking Complete**:
- [ ] All functional requirements met (25/25)
- [ ] All non-functional requirements met (39/39)
- [ ] No console errors or warnings
- [ ] Lighthouse audits passed (Performance ≥90, Accessibility 100)
- [ ] Cross-browser testing completed
- [ ] Responsive testing completed
- [ ] Accessibility testing completed
- [ ] Code documented and clean
- [ ] Integration with dashboard working
- [ ] LocalStorage persistence working
- [ ] Demo data realistic and useful

---

## Future Enhancements

### Phase 5 Additions (Post-Phase 4)

**Notifications Page**:
1. **Real Backend Integration**:
   - WebSocket connection for real-time notifications
   - Server-side notification storage and retrieval
   - Push notification service worker

2. **Advanced Features**:
   - Notification snooze/reminder
   - Notification groups/threads
   - Rich notifications (images, actions buttons)
   - Notification preferences per category
   - Export notification history

3. **Mobile Enhancements**:
   - Swipe-to-delete gesture
   - Pull-to-refresh
   - Infinite scroll pagination
   - Notification summary view

**Settings Page**:
1. **Profile Enhancements**:
   - Avatar upload and cropping
   - Cover photo
   - Social media links
   - Custom fields

2. **Advanced Security**:
   - Biometric authentication (WebAuthn)
   - Security key support
   - Login history with map
   - Security recommendations

3. **Customization**:
   - Custom theme builder (color picker)
   - Layout preferences (sidebar position, density)
   - Dashboard widget configuration
   - Keyboard shortcuts editor

4. **Data Management**:
   - Import/export settings
   - Backup and restore
   - Account activity log
   - Data portability (GDPR)

5. **Integrations**:
   - OAuth providers (Google, GitHub, etc.)
   - API key management
   - Webhook configuration
   - Third-party service connections

---

## Appendices

### Appendix A: Bootstrap Components Used

**Notifications Page**:
- List group (`list-group`, `list-group-item`)
- Badges (`badge`)
- Buttons (`btn`, `btn-primary`, `btn-outline-*`)
- Button group (`btn-group`)
- Icons (Bootstrap Icons)
- Toasts (`toast`, `toast-container`)
- Offcanvas (optional mobile preview)
- Modal (delete confirmation)

**Settings Page**:
- Nav tabs (`nav`, `nav-tabs`, `nav-link`, `tab-content`, `tab-pane`)
- Accordion (`accordion`, `accordion-item`, `accordion-button`, `accordion-collapse`)
- Cards (`card`, `card-body`, `card-title`)
- Forms (`form-label`, `form-control`, `form-select`, `form-check`, `form-switch`)
- Input groups (`input-group`)
- Buttons (`btn`)
- Alerts (`alert`)
- Progress bars (`progress`, `progress-bar`)
- Modal (`modal`)
- Toasts (`toast`)
- Table (`table`, `table-responsive`)

### Appendix B: Bootstrap Icons Used

**Notifications**:
- `bi-bell` (notification icon)
- `bi-bell-fill` (filled notification)
- `bi-exclamation-triangle-fill` (alert icon)
- `bi-info-circle-fill` (update icon)
- `bi-envelope-fill` (message icon)
- `bi-check` (mark as read)
- `bi-x` (mark as unread, close)
- `bi-trash` (delete)
- `bi-filter` (filter icon)

**Settings**:
- `bi-person-circle` (account/profile)
- `bi-palette` (appearance/theme)
- `bi-bell` (notifications)
- `bi-shield-lock` (security)
- `bi-gear` (settings icon)
- `bi-lock` (password)
- `bi-envelope` (email)
- `bi-phone` (phone)
- `bi-sun-fill` (light mode)
- `bi-moon-stars-fill` (dark mode)
- `bi-circle-half` (auto mode)
- `bi-sliders` (display options)
- `bi-shield-check` (2FA)
- `bi-device-ssd` (sessions)
- `bi-laptop` (device icon)
- `bi-phone` (mobile device)
- `bi-eye-slash` (privacy)
- `bi-download` (export)
- `bi-trash` (delete account)
- `bi-exclamation-triangle` (warning)
- `bi-check-circle` (success)
- `bi-info-circle` (info)

### Appendix C: CSS Custom Properties Reference

**From `assets/css/styles.css`**:

```css
/* Primary Colors */
--primary-color: #2563eb (light) / #3b82f6 (dark)
--primary-dark: #1e40af (light) / #2563eb (dark)
--primary-light: #3b82f6 (light) / #60a5fa (dark)

/* Semantic Colors */
--success-color: #10b981 / #34d399 (dark)
--danger-color: #ef4444 (light) / #f87171 (dark)
--warning-color: #f59e0b (light) / #fbbf24 (dark)
--info-color: #3b82f6 (light) / #60a5fa (dark)

/* Grays (50-900 scale) */
--gray-50: #f8fafc (light) / #0f172a (dark inverted)
--gray-100: #f1f5f9 (light) / #1e293b (dark inverted)
--gray-200: #e2e8f0 (light) / #334155 (dark inverted)
--gray-300: #cbd5e1 (light) / #475569 (dark inverted)
--gray-400: #94a3b8 (light) / #64748b (dark inverted)
--gray-500: #64748b (same in both)
--gray-600: #475569 (light) / #94a3b8 (dark inverted)
--gray-700: #334155 (light) / #cbd5e1 (dark inverted)
--gray-800: #1e293b (light) / #e2e8f0 (dark inverted)
--gray-900: #0f172a (light) / #f1f5f9 (dark inverted)

/* Component Colors */
--page-bg: var(--gray-50)
--card-bg: #ffffff (light) / var(--gray-800) (dark)
--sidebar-bg: #ffffff (light) / var(--gray-800) (dark)
--sidebar-text: var(--gray-700)
--sidebar-hover-bg: var(--gray-100)
--border-color: var(--gray-200)

/* Text Colors */
--text-primary: var(--gray-900)
--text-secondary: var(--gray-600)
--text-muted: var(--gray-500)

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)

/* Spacing (used with rem) */
--sidebar-width: 260px
--navbar-height: 60px
```

### Appendix D: LocalStorage Schema Summary

**Notifications** (`notifications_data`):
```javascript
{
  notifications: [
    {
      id: string,
      category: 'alert' | 'update' | 'message',
      title: string,
      message: string,
      timestamp: number,
      read: boolean,
      icon: string,
      iconColor: string
    }
  ],
  lastNotificationId: number,
  settings: {
    enableToasts: boolean,
    toastInterval: number
  }
}
```

**Settings** (`user_settings`):
```javascript
{
  account: {
    fullName: string,
    email: string,
    phone: string,
    bio: string,
    lastPasswordChange: number
  },
  appearance: {
    theme: 'light' | 'dark' | 'auto',
    sidebarCollapsed: boolean,
    compactMode: boolean,
    fontSize: 'small' | 'medium' | 'large'
  },
  notifications: {
    email: {
      enabled: boolean,
      types: {
        messages: boolean,
        alerts: boolean,
        updates: boolean,
        digest: boolean
      },
      frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
    },
    push: {
      enabled: boolean,
      permission: 'default' | 'granted' | 'denied',
      types: object
    },
    inApp: {
      sounds: boolean,
      desktop: boolean,
      position: string
    }
  },
  security: {
    twoFactorEnabled: boolean,
    recoveryCodes: string[],
    sessions: array,
    privacy: object
  },
  lastModified: number
}
```

### Appendix E: File Size Estimates

**Notifications Page** (`pages/notifications.html`):
- HTML: ~150 lines
- CSS (inline or separate): ~100 lines
- JavaScript: ~150 lines
- **Total**: ~400 lines, ~15 KB

**Settings Page** (`pages/settings.html`):
- HTML: ~300 lines
- CSS (inline or separate): ~150 lines
- JavaScript: ~150 lines
- **Total**: ~600 lines, ~25 KB

**Phase 4 Total**: ~1,000 lines, ~40 KB (excluding CDN dependencies)

---

**End of Document**

**Review & Approval**:
- [ ] Technical specifications reviewed
- [ ] Code examples validated
- [ ] Testing requirements comprehensive
- [ ] Success criteria measurable
- [ ] Ready for implementation

**Next Steps**: Begin Phase 4 implementation following the checklist.
