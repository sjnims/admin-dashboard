# Phase 3: Forms & User Management - Product Requirements Document (PRD)

## Document Control

| Property | Value |
|----------|-------|
| **Phase** | 3 of 4 |
| **Version** | 1.0.0 |
| **Status** | Ready for Implementation |
| **Author** | Admin Dashboard Team |
| **Date** | 2025-10-29 |
| **Parent Document** | [ENHANCEMENT_PLAN.md](./ENHANCEMENT_PLAN.md) |

---

## Executive Summary

Phase 3 delivers two production-ready pages for comprehensive form handling and user profile management: a CRUD form demonstrating all Bootstrap 5 input types with validation, and a user profile page with editable sections and activity tracking. Both pages follow the existing dashboard architecture and theming system.

**Key Deliverables:**
- `pages/user-form.html` - Comprehensive CRUD form with all input types
- `pages/user-profile.html` - User profile with editable sections and timeline

**Timeline:** 1-2 development sessions per page (2-4 sessions total)

---

## 1. Project Context

### 1.1 Architecture Alignment

**Template Structure** (Must Follow):
```
pages/
├── user-form.html          # New: Comprehensive form page
└── user-profile.html       # New: User profile page

Both pages use:
├── assets/css/styles.css   # Existing: Shared stylesheet (575 lines)
├── assets/js/app.js        # Existing: Shared JavaScript (853 lines)
└── assets/images/          # Existing: Shared images/icons
```

### 1.2 Tech Stack Requirements

**Mandatory Dependencies:**
- Bootstrap 5.3.8 (CSS + JS Bundle with SRI)
- Bootstrap Icons 1.13.1 (with SRI)
- Google Fonts: Inter (weights 300-700)
- Vanilla JavaScript ES6+ (NO TypeScript, NO build process)

**Development Constraints:**
- Browser-ready HTML files (no compilation)
- CSS: Use existing variables from `styles.css`
- JavaScript: Modular functions following `app.js` patterns
- LocalStorage: Form drafts and user preferences

### 1.3 Design System Compliance

**Theme System:**
- CSS Custom Properties (30+ variables in `styles.css`)
- Auto dark mode via `[data-bs-theme="dark"]`
- Theme-aware colors for all components

**Accessibility:**
- WCAG 2.1 AA minimum (AAA contrast ratios)
- Semantic HTML5 with ARIA labels
- Keyboard navigation support
- Screen reader friendly

**Responsive Design:**
- Mobile-first approach
- Single breakpoint: `@media (max-width: 768px)`
- Bootstrap grid system (12 columns)

---

## 2. Page Specifications

### 2.1 `pages/user-form.html` - Comprehensive CRUD Form

#### 2.1.1 Overview

A complete form demonstrating all Bootstrap 5 input types with validation, draft auto-save, and accessibility features. Serves as both a functional CRUD form and a reference implementation for developers.

#### 2.1.2 Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Standard meta tags (security, SEO, OG, Twitter) -->
    <!-- Bootstrap CSS with SRI -->
    <!-- Bootstrap Icons with SRI -->
    <!-- Google Fonts (Inter) -->
    <!-- Theme flicker prevention script -->
    <!-- Custom styles.css -->
    <title>User Form - Admin Dashboard</title>
</head>
<body>
    <!-- Skip navigation link -->

    <!-- Sidebar Navigation (same as admin-dashboard.html) -->
    <nav id="sidebar">...</nav>

    <!-- Main Content -->
    <div id="content">
        <!-- Top Navbar (same as admin-dashboard.html) -->
        <nav class="top-navbar">...</nav>

        <!-- Page Content -->
        <main id="main-content">
            <div class="container-fluid">
                <!-- Page Header -->
                <div class="page-header">
                    <h1>User Form</h1>
                    <p class="text-muted">Comprehensive form with all input types and validation</p>
                </div>

                <!-- Form Card -->
                <div class="card">
                    <form id="userForm" novalidate>
                        <!-- Form sections detailed below -->
                    </form>
                </div>

                <!-- Draft Status Toast (Bootstrap toast component) -->
                <div class="toast-container">...</div>
            </div>
        </main>
    </div>

    <!-- Bootstrap JS Bundle with SRI -->
    <!-- Custom app.js (deferred) -->
    <!-- Form-specific JavaScript (inline or separate module) -->
</body>
</html>
```

#### 2.1.3 Form Sections

**Section 1: Personal Information**
```html
<div class="mb-4">
    <h3 class="h5 mb-3">Personal Information</h3>

    <!-- Text Input with Floating Label -->
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="fullName"
               placeholder="Full Name" required>
        <label for="fullName">Full Name</label>
        <div class="invalid-feedback">Please provide your full name.</div>
    </div>

    <!-- Email Input with Prepend Icon -->
    <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-envelope"></i></span>
        <div class="form-floating">
            <input type="email" class="form-control" id="email"
                   placeholder="Email" required>
            <label for="email">Email Address</label>
            <div class="invalid-feedback">Please provide a valid email.</div>
        </div>
    </div>

    <!-- Phone Input with Prepend Icon -->
    <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-telephone"></i></span>
        <div class="form-floating">
            <input type="tel" class="form-control" id="phone"
                   placeholder="Phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
            <label for="phone">Phone Number</label>
            <div class="form-text">Format: 123-456-7890</div>
        </div>
    </div>

    <!-- Date Input -->
    <div class="form-floating mb-3">
        <input type="date" class="form-control" id="birthdate">
        <label for="birthdate">Date of Birth</label>
    </div>
</div>
```

**Section 2: Account Details**
```html
<div class="mb-4">
    <h3 class="h5 mb-3">Account Details</h3>

    <!-- Select Dropdown -->
    <div class="form-floating mb-3">
        <select class="form-select" id="role" required>
            <option value="">Choose role...</option>
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
        </select>
        <label for="role">User Role</label>
        <div class="invalid-feedback">Please select a role.</div>
    </div>

    <!-- Number Input with Min/Max -->
    <div class="form-floating mb-3">
        <input type="number" class="form-control" id="experience"
               min="0" max="50" value="0">
        <label for="experience">Years of Experience</label>
        <div class="form-text">Enter value between 0 and 50</div>
    </div>

    <!-- Range Input with Value Display -->
    <div class="mb-3">
        <label for="accessLevel" class="form-label">
            Access Level: <span id="accessLevelValue">5</span>
        </label>
        <input type="range" class="form-range" id="accessLevel"
               min="1" max="10" value="5" step="1">
        <div class="d-flex justify-content-between">
            <small class="text-muted">Restricted</small>
            <small class="text-muted">Full Access</small>
        </div>
    </div>
</div>
```

**Section 3: Preferences**
```html
<div class="mb-4">
    <h3 class="h5 mb-3">Preferences</h3>

    <!-- Checkboxes -->
    <div class="mb-3">
        <label class="form-label">Notification Preferences</label>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="emailNotif" checked>
            <label class="form-check-label" for="emailNotif">
                Email Notifications
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="smsNotif">
            <label class="form-check-label" for="smsNotif">
                SMS Notifications
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="pushNotif">
            <label class="form-check-label" for="pushNotif">
                Push Notifications
            </label>
        </div>
    </div>

    <!-- Radio Buttons -->
    <div class="mb-3">
        <label class="form-label">Newsletter Frequency</label>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="newsletter"
                   id="daily" value="daily">
            <label class="form-check-label" for="daily">Daily</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="newsletter"
                   id="weekly" value="weekly" checked>
            <label class="form-check-label" for="weekly">Weekly</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="newsletter"
                   id="monthly" value="monthly">
            <label class="form-check-label" for="monthly">Monthly</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="newsletter"
                   id="never" value="never">
            <label class="form-check-label" for="never">Never</label>
        </div>
    </div>

    <!-- Switch Toggles -->
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="twoFactor">
        <label class="form-check-label" for="twoFactor">
            Enable Two-Factor Authentication
        </label>
    </div>
    <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="autoSave" checked>
        <label class="form-check-label" for="autoSave">
            Auto-save drafts
        </label>
    </div>
</div>
```

**Section 4: Additional Information**
```html
<div class="mb-4">
    <h3 class="h5 mb-3">Additional Information</h3>

    <!-- Textarea -->
    <div class="form-floating mb-3">
        <textarea class="form-control" id="bio"
                  placeholder="Bio" style="height: 120px"></textarea>
        <label for="bio">Biography</label>
        <div class="form-text">
            Tell us about yourself (optional, max 500 characters)
        </div>
    </div>

    <!-- File Input -->
    <div class="mb-3">
        <label for="avatar" class="form-label">Profile Picture</label>
        <input class="form-control" type="file" id="avatar"
               accept="image/png, image/jpeg, image/jpg">
        <div class="form-text">
            Accepted formats: JPG, PNG (max 5MB)
        </div>
        <!-- File Preview (JavaScript-generated) -->
        <div id="avatarPreview" class="mt-2" style="display: none;">
            <img src="" alt="Avatar preview"
                 style="max-width: 150px; border-radius: 8px;">
        </div>
    </div>

    <!-- Multiple Select (with Ctrl/Cmd) -->
    <div class="mb-3">
        <label for="skills" class="form-label">Skills</label>
        <select class="form-select" id="skills" multiple size="5">
            <option value="html">HTML/CSS</option>
            <option value="js">JavaScript</option>
            <option value="react">React</option>
            <option value="vue">Vue.js</option>
            <option value="angular">Angular</option>
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
        </select>
        <div class="form-text">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple
        </div>
    </div>

    <!-- Color Input -->
    <div class="mb-3">
        <label for="themeColor" class="form-label">
            Theme Color Preference
        </label>
        <input type="color" class="form-control form-control-color"
               id="themeColor" value="#2563eb" title="Choose your color">
    </div>
</div>
```

**Section 5: Terms & Actions**
```html
<div class="mb-4">
    <!-- Terms Checkbox (Required) -->
    <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="terms" required>
        <label class="form-check-label" for="terms">
            I agree to the <a href="#">Terms & Conditions</a> and
            <a href="#">Privacy Policy</a>
        </label>
        <div class="invalid-feedback">
            You must agree before submitting.
        </div>
    </div>
</div>

<!-- Form Actions -->
<div class="d-flex gap-2 justify-content-end">
    <button type="button" class="btn btn-outline-secondary" id="clearBtn">
        <i class="bi bi-x-circle"></i> Clear Form
    </button>
    <button type="button" class="btn btn-outline-primary" id="saveDraftBtn">
        <i class="bi bi-cloud-arrow-up"></i> Save Draft
    </button>
    <button type="submit" class="btn btn-primary">
        <i class="bi bi-check-circle"></i> Submit
    </button>
</div>
```

#### 2.1.4 JavaScript Requirements

**Core Functionality:**

1. **Form Validation** (Bootstrap 5 native validation)
```javascript
// Validation on submit
document.getElementById('userForm').addEventListener('submit', function(event) {
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        event.preventDefault();
        handleFormSubmit();
    }
    this.classList.add('was-validated');
});
```

2. **Auto-save to LocalStorage**
```javascript
// Auto-save every 30 seconds if enabled
let autoSaveInterval;
const enableAutoSave = () => {
    autoSaveInterval = setInterval(() => {
        if (document.getElementById('autoSave').checked) {
            saveDraft();
        }
    }, 30000);
};

const saveDraft = () => {
    const formData = new FormData(document.getElementById('userForm'));
    const data = Object.fromEntries(formData.entries());
    localStorage.setItem('userFormDraft', JSON.stringify(data));
    showToast('Draft saved', 'success');
};
```

3. **Load Draft on Page Load**
```javascript
const loadDraft = () => {
    const draft = localStorage.getItem('userFormDraft');
    if (draft) {
        const data = JSON.parse(draft);
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = data[key];
            }
        });
        showToast('Draft loaded', 'info');
    }
};
```

4. **Range Input Value Display**
```javascript
const accessLevel = document.getElementById('accessLevel');
const accessLevelValue = document.getElementById('accessLevelValue');
accessLevel.addEventListener('input', (e) => {
    accessLevelValue.textContent = e.target.value;
});
```

5. **File Preview**
```javascript
document.getElementById('avatar').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('avatarPreview');
            preview.querySelector('img').src = event.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
```

6. **Toast Notifications**
```javascript
const showToast = (message, type = 'info') => {
    const toastHTML = `
        <div class="toast align-items-center text-bg-${type}" role="alert">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close me-2 m-auto"
                        data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    // Append and show toast
};
```

#### 2.1.5 Validation Rules

| Field | Type | Validation |
|-------|------|------------|
| Full Name | text | Required, min 2 chars |
| Email | email | Required, valid email format |
| Phone | tel | Optional, pattern: `[0-9]{3}-[0-9]{3}-[0-9]{4}` |
| Role | select | Required |
| Experience | number | Range: 0-50 |
| Terms | checkbox | Required (must be checked) |

**Custom Validation Messages:**
- Use Bootstrap's `.invalid-feedback` class
- Display inline below each field
- Highlight invalid fields with red border (Bootstrap `.is-invalid`)

#### 2.1.6 Accessibility Requirements

- **Keyboard Navigation:** Tab order follows visual layout
- **ARIA Labels:** All inputs have associated labels (for, id)
- **Error Announcements:** `aria-describedby` on invalid fields
- **Focus Management:** Auto-focus first invalid field on submit
- **Screen Reader:** Form sections announced with `<h3>` headings

---

### 2.2 `pages/user-profile.html` - User Profile Page

#### 2.2.1 Overview

A comprehensive user profile page with editable sections, account statistics, activity timeline, and settings integration. Demonstrates card layouts, badges, buttons, and Bootstrap grid system.

#### 2.2.2 Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Standard meta tags, Bootstrap CSS, Icons, Fonts, Theme script -->
    <title>User Profile - Admin Dashboard</title>
</head>
<body>
    <!-- Skip navigation link -->

    <!-- Sidebar Navigation -->
    <nav id="sidebar">...</nav>

    <!-- Main Content -->
    <div id="content">
        <!-- Top Navbar -->
        <nav class="top-navbar">...</nav>

        <!-- Page Content -->
        <main id="main-content">
            <div class="container-fluid">
                <!-- Profile Header Section -->
                <section class="profile-header">...</section>

                <!-- Two-Column Layout -->
                <div class="row g-4">
                    <!-- Left Column: Profile Info & Settings -->
                    <div class="col-lg-4">...</div>

                    <!-- Right Column: Stats & Activity -->
                    <div class="col-lg-8">...</div>
                </div>
            </div>
        </main>
    </div>

    <!-- Bootstrap JS Bundle, app.js, profile-specific JS -->
</body>
</html>
```

#### 2.2.3 Component Sections

**Profile Header Section**
```html
<section class="profile-header mb-4">
    <div class="card">
        <div class="card-body">
            <div class="row align-items-center">
                <!-- Avatar Column -->
                <div class="col-auto">
                    <div class="profile-avatar-large">
                        <img src="https://ui-avatars.com/api/?name=John+Doe&size=120&background=2563eb&color=fff"
                             alt="John Doe" class="rounded-circle">
                        <button class="btn btn-sm btn-primary avatar-edit-btn"
                                title="Change avatar">
                            <i class="bi bi-camera"></i>
                        </button>
                    </div>
                </div>

                <!-- Info Column -->
                <div class="col">
                    <h1 class="h3 mb-1">John Doe</h1>
                    <p class="text-muted mb-2">
                        <i class="bi bi-briefcase"></i> Senior Developer
                    </p>
                    <div class="d-flex gap-3 mb-2">
                        <span class="text-muted">
                            <i class="bi bi-envelope"></i> john.doe@example.com
                        </span>
                        <span class="text-muted">
                            <i class="bi bi-geo-alt"></i> San Francisco, CA
                        </span>
                    </div>
                    <div class="d-flex gap-2">
                        <span class="badge bg-primary">Full-time</span>
                        <span class="badge bg-success">Active</span>
                        <span class="badge bg-info">Verified</span>
                    </div>
                </div>

                <!-- Actions Column -->
                <div class="col-auto">
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary" id="editProfileBtn">
                            <i class="bi bi-pencil"></i> Edit Profile
                        </button>
                        <button class="btn btn-outline-secondary">
                            <i class="bi bi-share"></i> Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Left Column: Profile Information**
```html
<div class="col-lg-4">
    <!-- About Card -->
    <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">About</h5>
            <button class="btn btn-sm btn-link p-0" id="editAboutBtn">
                <i class="bi bi-pencil"></i>
            </button>
        </div>
        <div class="card-body">
            <p id="bioText">
                Passionate developer with 8+ years of experience building
                scalable web applications. Specializing in React, Node.js,
                and cloud architecture.
            </p>

            <!-- Editable Bio Form (hidden by default) -->
            <div id="bioForm" style="display: none;">
                <textarea class="form-control mb-2" rows="4"
                          id="bioInput"></textarea>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-primary" id="saveBioBtn">
                        Save
                    </button>
                    <button class="btn btn-sm btn-outline-secondary"
                            id="cancelBioBtn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Contact Information Card -->
    <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Contact Information</h5>
            <button class="btn btn-sm btn-link p-0" id="editContactBtn">
                <i class="bi bi-pencil"></i>
            </button>
        </div>
        <div class="card-body">
            <div class="contact-item mb-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-envelope me-3 text-primary"></i>
                    <div>
                        <small class="text-muted d-block">Email</small>
                        <span>john.doe@example.com</span>
                    </div>
                </div>
            </div>
            <div class="contact-item mb-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-telephone me-3 text-primary"></i>
                    <div>
                        <small class="text-muted d-block">Phone</small>
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
            </div>
            <div class="contact-item mb-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-geo-alt me-3 text-primary"></i>
                    <div>
                        <small class="text-muted d-block">Location</small>
                        <span>San Francisco, CA</span>
                    </div>
                </div>
            </div>
            <div class="contact-item">
                <div class="d-flex align-items-center">
                    <i class="bi bi-calendar me-3 text-primary"></i>
                    <div>
                        <small class="text-muted d-block">Joined</small>
                        <span>January 2022</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Skills Card -->
    <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Skills</h5>
            <button class="btn btn-sm btn-link p-0" id="editSkillsBtn">
                <i class="bi bi-pencil"></i>
            </button>
        </div>
        <div class="card-body">
            <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary">JavaScript</span>
                <span class="badge bg-primary">React</span>
                <span class="badge bg-primary">Node.js</span>
                <span class="badge bg-primary">TypeScript</span>
                <span class="badge bg-primary">Python</span>
                <span class="badge bg-primary">AWS</span>
                <span class="badge bg-primary">Docker</span>
                <span class="badge bg-primary">SQL</span>
            </div>
        </div>
    </div>
</div>
```

**Right Column: Statistics & Activity**
```html
<div class="col-lg-8">
    <!-- Statistics Cards Row -->
    <div class="row g-3 mb-4">
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon bg-primary">
                    <i class="bi bi-folder"></i>
                </div>
                <div class="stat-info">
                    <h3 class="stat-value">48</h3>
                    <p class="stat-label">Projects</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon bg-success">
                    <i class="bi bi-check-circle"></i>
                </div>
                <div class="stat-info">
                    <h3 class="stat-value">156</h3>
                    <p class="stat-label">Tasks Done</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon bg-warning">
                    <i class="bi bi-star"></i>
                </div>
                <div class="stat-info">
                    <h3 class="stat-value">4.9</h3>
                    <p class="stat-label">Rating</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon bg-info">
                    <i class="bi bi-people"></i>
                </div>
                <div class="stat-info">
                    <h3 class="stat-value">23</h3>
                    <p class="stat-label">Team Size</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Activity Timeline Card -->
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="mb-0">Recent Activity</h5>
        </div>
        <div class="card-body">
            <div class="timeline">
                <!-- Timeline Item 1 -->
                <div class="timeline-item">
                    <div class="timeline-marker bg-primary">
                        <i class="bi bi-check-circle"></i>
                    </div>
                    <div class="timeline-content">
                        <h6 class="mb-1">Completed project milestone</h6>
                        <p class="text-muted mb-1">
                            Finished implementation of user authentication system
                        </p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> 2 hours ago
                        </small>
                    </div>
                </div>

                <!-- Timeline Item 2 -->
                <div class="timeline-item">
                    <div class="timeline-marker bg-success">
                        <i class="bi bi-file-earmark"></i>
                    </div>
                    <div class="timeline-content">
                        <h6 class="mb-1">Updated documentation</h6>
                        <p class="text-muted mb-1">
                            Added API documentation for payment gateway
                        </p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> 5 hours ago
                        </small>
                    </div>
                </div>

                <!-- Timeline Item 3 -->
                <div class="timeline-item">
                    <div class="timeline-marker bg-info">
                        <i class="bi bi-chat-dots"></i>
                    </div>
                    <div class="timeline-content">
                        <h6 class="mb-1">Team meeting</h6>
                        <p class="text-muted mb-1">
                            Weekly sprint planning and retrospective
                        </p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> Yesterday
                        </small>
                    </div>
                </div>

                <!-- Timeline Item 4 -->
                <div class="timeline-item">
                    <div class="timeline-marker bg-warning">
                        <i class="bi bi-star"></i>
                    </div>
                    <div class="timeline-content">
                        <h6 class="mb-1">Received recognition</h6>
                        <p class="text-muted mb-1">
                            Employee of the month award
                        </p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> 3 days ago
                        </small>
                    </div>
                </div>

                <!-- Timeline Item 5 -->
                <div class="timeline-item">
                    <div class="timeline-marker bg-secondary">
                        <i class="bi bi-code-square"></i>
                    </div>
                    <div class="timeline-content">
                        <h6 class="mb-1">Code review</h6>
                        <p class="text-muted mb-1">
                            Reviewed 8 pull requests
                        </p>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> 1 week ago
                        </small>
                    </div>
                </div>
            </div>

            <div class="text-center mt-3">
                <button class="btn btn-outline-primary btn-sm">
                    Load More Activity
                </button>
            </div>
        </div>
    </div>

    <!-- Settings Section (optional) -->
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Quick Settings</h5>
        </div>
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox"
                               id="profilePublic" checked>
                        <label class="form-check-label" for="profilePublic">
                            Public Profile
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox"
                               id="showEmail">
                        <label class="form-check-label" for="showEmail">
                            Show Email
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox"
                               id="emailNotifications" checked>
                        <label class="form-check-label" for="emailNotifications">
                            Email Notifications
                        </label>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox"
                               id="twoFactorAuth" checked>
                        <label class="form-check-label" for="twoFactorAuth">
                            Two-Factor Auth
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### 2.2.4 CSS Requirements

**Additional Styles** (to be added to `styles.css` or inline `<style>`):

```css
/* Profile Header Styles */
.profile-header .profile-avatar-large {
    position: relative;
    display: inline-block;
}

.profile-header .profile-avatar-large img {
    width: 120px;
    height: 120px;
    object-fit: cover;
}

.profile-header .avatar-edit-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Timeline Styles */
.timeline {
    position: relative;
    padding-left: 40px;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
}

.timeline-item {
    position: relative;
    padding-bottom: 24px;
}

.timeline-item:last-child {
    padding-bottom: 0;
}

.timeline-marker {
    position: absolute;
    left: -40px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 14px;
}

.timeline-content {
    padding: 12px 16px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
}

.timeline-content h6 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
}

.timeline-content p {
    font-size: 13px;
    margin-bottom: 4px;
}

.timeline-content small {
    font-size: 12px;
}

/* Contact Item Styles */
.contact-item {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
}

.contact-item:last-child {
    padding-bottom: 0;
    border-bottom: none;
}

/* Dark Mode Timeline Adjustments */
[data-bs-theme="dark"] .timeline::before {
    background: #475569;
}

[data-bs-theme="dark"] .timeline-content {
    background: #1e293b;
    border-color: #334155;
}
```

#### 2.2.5 JavaScript Requirements

**Core Functionality:**

1. **Edit Profile Toggle**
```javascript
// Toggle bio edit mode
document.getElementById('editAboutBtn').addEventListener('click', () => {
    const bioText = document.getElementById('bioText');
    const bioForm = document.getElementById('bioForm');
    const bioInput = document.getElementById('bioInput');

    bioText.style.display = 'none';
    bioForm.style.display = 'block';
    bioInput.value = bioText.textContent.trim();
    bioInput.focus();
});

// Save bio
document.getElementById('saveBioBtn').addEventListener('click', () => {
    const bioText = document.getElementById('bioText');
    const bioForm = document.getElementById('bioForm');
    const bioInput = document.getElementById('bioInput');

    bioText.textContent = bioInput.value;
    bioText.style.display = 'block';
    bioForm.style.display = 'none';

    // Save to LocalStorage or send to API
    localStorage.setItem('userBio', bioInput.value);
    showToast('Profile updated successfully', 'success');
});

// Cancel edit
document.getElementById('cancelBioBtn').addEventListener('click', () => {
    const bioText = document.getElementById('bioText');
    const bioForm = document.getElementById('bioForm');

    bioText.style.display = 'block';
    bioForm.style.display = 'none';
});
```

2. **Settings Persistence**
```javascript
// Save settings to LocalStorage
document.querySelectorAll('.form-check-input').forEach(input => {
    input.addEventListener('change', (e) => {
        const settings = {
            profilePublic: document.getElementById('profilePublic').checked,
            showEmail: document.getElementById('showEmail').checked,
            emailNotifications: document.getElementById('emailNotifications').checked,
            twoFactorAuth: document.getElementById('twoFactorAuth').checked
        };
        localStorage.setItem('profileSettings', JSON.stringify(settings));
        showToast('Settings saved', 'success');
    });
});

// Load settings on page load
const loadSettings = () => {
    const settings = JSON.parse(localStorage.getItem('profileSettings'));
    if (settings) {
        Object.keys(settings).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.checked = settings[key];
            }
        });
    }
};
```

3. **Avatar Change (File Upload)**
```javascript
document.querySelector('.avatar-edit-btn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.querySelector('.profile-avatar-large img').src = event.target.result;
                showToast('Avatar updated', 'success');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});
```

#### 2.2.6 Data Management

**LocalStorage Schema:**
```javascript
// Profile data structure
const profileData = {
    bio: "User biography text",
    contact: {
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA"
    },
    skills: ["JavaScript", "React", "Node.js", ...],
    settings: {
        profilePublic: true,
        showEmail: false,
        emailNotifications: true,
        twoFactorAuth: true
    },
    avatar: "data:image/png;base64,..."
};

localStorage.setItem('userProfile', JSON.stringify(profileData));
```

---

## 3. Technical Specifications

### 3.1 File Dependencies

**Both Pages Must Load:**
```html
<!-- Bootstrap CSS 5.3.8 with SRI -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous">

<!-- Bootstrap Icons 1.13.1 with SRI -->
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
      integrity="sha384-CK2SzKma4jA5H/MXDUU7i1TqZlCFaD4T01vtyDFvPlD97JQyS+IsSh1nI2EFbpyk"
      crossorigin="anonymous">

<!-- Google Fonts: Inter -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet">

<!-- Custom Styles -->
<link rel="stylesheet" href="../assets/css/styles.css">

<!-- Bootstrap JS Bundle (before closing </body>) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

<!-- Custom App JS (deferred) -->
<script src="../assets/js/app.js" defer></script>
```

### 3.2 Browser Compatibility

**Minimum Requirements:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Feature Dependencies:**
- ES6+ JavaScript (const/let, arrow functions, template literals)
- CSS Grid/Flexbox
- CSS Custom Properties (CSS Variables)
- LocalStorage API
- FileReader API (for file uploads)
- FormData API

### 3.3 Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Time to Interactive (TTI) | < 3.0s |
| Total Page Size | < 500KB (excluding images) |
| JavaScript Execution | < 200ms |
| Lighthouse Score (Performance) | > 90 |
| Lighthouse Score (Accessibility) | 100 |

**Optimization Strategies:**
- Defer non-critical JavaScript
- Preconnect to CDN domains
- Minimize DOM operations
- Debounce auto-save operations
- Use CSS transforms for animations
- Compress images (avatars)

### 3.4 Security Considerations

**Client-Side Security:**
- Input sanitization (prevent XSS)
- File upload validation (type, size)
- LocalStorage encryption (sensitive data)
- CSP headers (Content Security Policy)
- SRI hashes on all CDN resources

**Validation:**
- Never trust client-side validation alone
- Validate on server-side (future API integration)
- Sanitize user input before display
- Limit file upload sizes (5MB max)

---

## 4. Testing Requirements

### 4.1 Functional Testing

**user-form.html:**
- [ ] All input types render correctly
- [ ] Form validation triggers on submit
- [ ] Invalid fields display error messages
- [ ] Auto-save works every 30 seconds
- [ ] Draft loads on page refresh
- [ ] Clear form button resets all fields
- [ ] File preview displays selected image
- [ ] Range slider updates value display
- [ ] Submit button is disabled until valid
- [ ] Toast notifications appear on actions

**user-profile.html:**
- [ ] Profile header displays correctly
- [ ] Edit mode toggles for bio section
- [ ] Bio saves to LocalStorage
- [ ] Avatar upload previews image
- [ ] Settings switches persist state
- [ ] Timeline displays with proper styling
- [ ] Statistics cards show correct icons
- [ ] All badges render with proper colors
- [ ] Responsive layout works on mobile

### 4.2 Accessibility Testing

**WCAG 2.1 AA Compliance:**
- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Focus indicators visible on all interactive elements
- [ ] Color contrast meets AA standards (4.5:1 for text)
- [ ] Keyboard navigation works without mouse
- [ ] Screen reader announces form errors
- [ ] Skip navigation link works
- [ ] ARIA labels on all icons and buttons

**Testing Tools:**
- Lighthouse (Chrome DevTools)
- axe DevTools (browser extension)
- NVDA/JAWS (screen readers)
- Keyboard-only navigation testing

### 4.3 Responsive Testing

**Breakpoints to Test:**
- Mobile: 375px, 414px, 768px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

**Layout Checks:**
- [ ] Sidebar collapses on mobile
- [ ] Forms stack vertically on mobile
- [ ] Profile layout switches to single column
- [ ] Statistics cards stack on mobile (2x2 grid)
- [ ] All text remains readable at all sizes
- [ ] Touch targets >= 44x44px on mobile

### 4.4 Browser Testing

**Cross-Browser Validation:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Feature Checks:**
- [ ] CSS Grid layout works
- [ ] CSS Variables apply correctly
- [ ] LocalStorage persists data
- [ ] File upload previews
- [ ] Form validation displays

---

## 5. Documentation Requirements

### 5.1 Code Documentation

**HTML Comments:**
```html
<!-- Profile Header: User avatar, name, and quick actions -->
<section class="profile-header">
    ...
</section>
```

**JavaScript Comments:**
```javascript
/**
 * Save form draft to LocalStorage
 * Triggered by auto-save interval or manual save button
 * @returns {void}
 */
const saveDraft = () => {
    // Implementation
};
```

**CSS Comments:**
```css
/* Timeline component styles - vertical activity feed */
.timeline { ... }
```

### 5.2 User Documentation

**Comments in HTML (for developers):**
```html
<!--
CUSTOMIZATION GUIDE:
- To change form fields: Edit sections 1-5 below
- To modify validation: Update JavaScript validation rules
- To adjust auto-save interval: Change value in enableAutoSave() function
-->
```

### 5.3 Integration Guide

**Navigation Menu Updates** (for `admin-dashboard.html`):
```html
<!-- Add to sidebar navigation -->
<li class="nav-item">
    <a class="nav-link" href="pages/user-form.html">
        <i class="bi bi-file-earmark-text"></i><span>User Form</span>
    </a>
</li>
<li class="nav-item">
    <a class="nav-link" href="pages/user-profile.html">
        <i class="bi bi-person"></i><span>User Profile</span>
    </a>
</li>
```

---

## 6. Implementation Checklist

### 6.1 user-form.html Implementation

- [ ] Create HTML file with proper structure
- [ ] Add all form sections (1-5)
- [ ] Implement Bootstrap form components
- [ ] Add validation markup (required, patterns)
- [ ] Create form submission handler
- [ ] Implement auto-save functionality
- [ ] Add draft load on page load
- [ ] Create toast notification system
- [ ] Implement file preview
- [ ] Add range slider value display
- [ ] Test all validation rules
- [ ] Add accessibility attributes
- [ ] Test keyboard navigation
- [ ] Verify responsive layout
- [ ] Cross-browser testing

### 6.2 user-profile.html Implementation

- [ ] Create HTML file with proper structure
- [ ] Build profile header component
- [ ] Create two-column layout
- [ ] Add profile information cards
- [ ] Build statistics cards row
- [ ] Implement activity timeline
- [ ] Add quick settings section
- [ ] Create edit mode functionality
- [ ] Implement bio save/cancel
- [ ] Add avatar upload handler
- [ ] Save settings to LocalStorage
- [ ] Load settings on page load
- [ ] Add custom timeline CSS
- [ ] Test responsive layout
- [ ] Accessibility validation
- [ ] Cross-browser testing

### 6.3 Integration Tasks

- [ ] Update sidebar navigation in `admin-dashboard.html`
- [ ] Test navigation links work
- [ ] Verify theme switching works on both pages
- [ ] Confirm sidebar toggle works
- [ ] Test active state on navigation
- [ ] Verify all pages use consistent styling
- [ ] Test dark mode on both pages
- [ ] Validate LocalStorage doesn't conflict

---

## 7. Success Criteria

### 7.1 Functional Completeness

✅ **user-form.html:**
- Demonstrates all Bootstrap 5 input types
- Form validation works correctly
- Auto-save and draft loading functional
- All interactive features work (file upload, range slider)
- Toast notifications display properly

✅ **user-profile.html:**
- Profile displays with all sections
- Edit mode works for bio and contact
- Statistics and timeline render correctly
- Settings persist to LocalStorage
- Avatar upload works

### 7.2 Quality Standards

✅ **Code Quality:**
- Clean, readable HTML structure
- Well-commented JavaScript
- Modular CSS following existing patterns
- No console errors or warnings
- Follows project conventions

✅ **Accessibility:**
- WCAG 2.1 AA compliant
- Lighthouse Accessibility score: 100
- Keyboard navigation works
- Screen reader compatible

✅ **Performance:**
- Page load time < 3 seconds
- Smooth interactions (60fps)
- Optimized images and assets
- Lighthouse Performance score > 90

✅ **Responsive:**
- Works on mobile (375px+)
- Works on tablet (768px+)
- Works on desktop (1280px+)
- No horizontal scrolling

---

## 8. Future Enhancements

### 8.1 Potential Additions

**user-form.html:**
- Multi-step form wizard
- Progress indicator
- Advanced file upload (drag-and-drop)
- API integration for real submissions
- Data persistence to backend

**user-profile.html:**
- Social media links section
- Work experience timeline
- Education history
- Achievements/certifications
- Export profile as PDF

### 8.2 API Integration Points

**Future Backend Endpoints:**
```javascript
// Form submission
POST /api/users
Body: { formData }

// Profile update
PATCH /api/users/:id
Body: { bio, contact, skills, settings }

// Avatar upload
POST /api/users/:id/avatar
Body: FormData with file

// Activity feed
GET /api/users/:id/activity
Response: { activities: [...] }
```

---

## 9. Appendices

### 9.1 Bootstrap 5 Components Used

**user-form.html:**
- Form controls (input, select, textarea)
- Input groups (with icons)
- Floating labels
- Checkboxes, radios, switches
- File input
- Range slider
- Buttons (primary, outline)
- Toast notifications
- Form validation

**user-profile.html:**
- Cards (with headers)
- Badges
- Buttons
- Grid system (rows, columns)
- Custom timeline (CSS)
- Form switches
- List groups (implicit)

### 9.2 Bootstrap Icons Used

**Common Icons:**
- `bi-envelope` - Email
- `bi-telephone` - Phone
- `bi-geo-alt` - Location
- `bi-calendar` - Date
- `bi-pencil` - Edit
- `bi-check-circle` - Success
- `bi-x-circle` - Clear/Close
- `bi-cloud-arrow-up` - Save
- `bi-camera` - Avatar change
- `bi-folder` - Projects
- `bi-star` - Rating
- `bi-people` - Team
- `bi-clock` - Time

### 9.3 CSS Variables to Use

```css
/* From existing styles.css */
--primary-color: #2563eb;
--primary-dark: #1e40af;
--primary-light: #3b82f6;
--success-color: #059669;
--warning-color: #d97706;
--danger-color: #dc2626;
--info-color: #0891b2;
--text-color: #1e293b;
--text-muted: #64748b;
--border-color: #e2e8f0;
--card-bg: #ffffff;
--page-bg: #f8fafc;

/* Dark mode overrides */
[data-bs-theme="dark"] {
    --text-color: #f1f5f9;
    --text-muted: #94a3b8;
    --border-color: #334155;
    --card-bg: #1e293b;
    --page-bg: #0f172a;
}
```

### 9.4 LocalStorage Keys

```javascript
// Form data
'userFormDraft'         // Auto-saved form draft
'userFormLastSaved'     // Timestamp of last save

// Profile data
'userProfile'           // Complete profile object
'userBio'               // Biography text
'profileSettings'       // Quick settings object
'userAvatar'            // Base64 image data
```

---

## 10. Review & Approval

### 10.1 Sign-off Requirements

**Technical Review:**
- [ ] Architecture aligns with existing system
- [ ] Code follows project conventions
- [ ] Dependencies properly documented
- [ ] Performance targets achievable

**Design Review:**
- [ ] UI/UX follows Bootstrap patterns
- [ ] Accessibility requirements clear
- [ ] Responsive design specified
- [ ] Theme system integrated

**Documentation Review:**
- [ ] All sections complete
- [ ] Code examples accurate
- [ ] Testing requirements clear
- [ ] Success criteria measurable

### 10.2 Implementation Ready

**Pre-Implementation Checklist:**
- [x] PRD approved by stakeholders
- [x] Dependencies verified available
- [x] Design patterns documented
- [x] Testing strategy defined
- [ ] Development environment ready
- [ ] Ready to begin implementation

---

**Document Status:** ✅ Ready for Implementation
**Next Step:** Begin implementation of `user-form.html`

---

*This PRD is a living document and may be updated during implementation based on technical discoveries or requirement changes.*
