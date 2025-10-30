# PRD: Phase 2 - Authentication Pages

**Version**: 1.0
**Date**: 2025-10-29
**Status**: Design Specification
**Phase**: 2 of 5

---

## Table of Contents

1. [Overview](#overview)
2. [Objectives](#objectives)
3. [Deliverables](#deliverables)
4. [Technical Architecture](#technical-architecture)
5. [Feature Specifications](#feature-specifications)
6. [UI/UX Design](#uiux-design)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [Implementation Guide](#implementation-guide)
10. [Testing Strategy](#testing-strategy)
11. [Success Criteria](#success-criteria)

---

## Overview

Phase 2 delivers professional, production-ready authentication pages for the admin dashboard template. Both login and registration pages follow Bootstrap 5 design patterns, integrate with the existing theme system, and provide complete form validation with realistic user feedback.

### Context

- **Follows**: Phase 0 (Showcases), Phase 1 (Data Management)
- **Precedes**: Phase 3 (Forms & User Management), Phase 4 (Notifications & Settings)
- **Dependencies**: Existing theme system, Bootstrap 5.3.8, Bootstrap Icons 1.13.1
- **Architecture**: Zero build process, browser-ready execution

### Scope

**In Scope**:
- Professional login page with validation
- Registration page with password strength indicator
- Form validation states and error messaging
- Loading states and success feedback
- LocalStorage demo (no real backend)
- Full theme support (light/dark mode)
- Responsive design (mobile/tablet/desktop)
- WCAG 2.1 AA accessibility

**Out of Scope**:
- Real authentication backend integration
- OAuth/Social login (future enhancement)
- Password reset flow (Phase 4)
- Email verification workflow
- Session management implementation
- Rate limiting or CAPTCHA

---

## Objectives

### Primary Goals

1. **Professional Authentication UI** - Enterprise-grade login and registration interfaces
2. **Complete Form Validation** - Client-side validation with clear error messaging
3. **User Experience** - Loading states, success feedback, keyboard shortcuts
4. **Theme Integration** - Seamless light/dark mode support
5. **Accessibility** - WCAG 2.1 AA compliant forms with keyboard navigation

### Business Value

- **Template Completeness** - Essential pages for any SaaS admin dashboard
- **Learning Resource** - Reference implementation for form validation patterns
- **Time Savings** - Production-ready authentication UI reduces development time
- **Best Practices** - Demonstrates Bootstrap form patterns and validation

### User Stories

**As a developer**, I want:
- Professional authentication pages I can customize for my projects
- Complete form validation examples with Bootstrap components
- Copy-paste ready code that follows best practices
- Responsive layouts that work on all devices

**As an end user**, I expect:
- Clear, intuitive login and registration forms
- Helpful validation messages when I make mistakes
- Visual feedback for loading and success states
- Accessible forms that work with keyboard and screen readers

---

## Deliverables

### 2.1: Login Page (`pages/login.html`)

**File**: `pages/login.html`
**Estimated Size**: ~300 lines (HTML + CSS + JS)
**Timeline**: 1-2 days

**Features**:
- Email and password input fields
- Remember me checkbox (Bootstrap switch)
- Form validation (client-side)
- Loading state with spinner
- Success/error feedback
- Forgot password link
- Link to registration page
- Keyboard shortcuts (Enter to submit)

**Components Used**:
- Bootstrap Card for container
- Bootstrap Form Controls (floating labels)
- Bootstrap Buttons (primary, link)
- Bootstrap Spinner for loading state
- Bootstrap Alert for error messages
- Bootstrap Switch for remember me

### 2.2: Registration Page (`pages/register.html`)

**File**: `pages/register.html`
**Estimated Size**: ~400 lines (HTML + CSS + JS)
**Timeline**: 2-3 days

**Features**:
- Multi-field registration form (name, email, password, confirm password)
- Real-time password strength indicator
- Form validation with custom rules
- Password visibility toggle
- Terms & conditions acceptance
- Success state with confirmation
- Link to login page
- Auto-focus on first field

**Components Used**:
- Bootstrap Card for container
- Bootstrap Form Controls (floating labels, input groups)
- Bootstrap Progress Bar (password strength)
- Bootstrap Buttons
- Bootstrap Alert for messages
- Bootstrap Icons (eye, check, x)

---

## Technical Architecture

### File Structure

```
admin-dashboard/
├── pages/
│   ├── login.html           # NEW - Login page
│   └── register.html        # NEW - Registration page
├── assets/
│   ├── css/
│   │   └── styles.css      # REUSE - Existing theme
│   └── js/
│       └── app.js          # REUSE - Existing utilities
└── docs/
    └── PRD_Phase2_Authentication.md  # This document
```

### Technology Stack

**Frontend Framework**:
- Bootstrap 5.3.8 (UI components, grid system)
- Bootstrap Icons 1.13.1 (visual indicators)

**Languages**:
- HTML5 (semantic markup)
- CSS3 (via existing styles.css)
- JavaScript ES6+ (vanilla, no frameworks)

**Architecture Pattern**:
- Self-contained HTML pages
- Module pattern (IIFE) for JavaScript
- CSS variables for theming
- LocalStorage for demo persistence

### Theme Integration

Both pages will:
- Link to existing `assets/css/styles.css`
- Use CSS custom properties (defined in styles.css)
- Include theme flicker prevention script
- Support automatic theme switching
- Maintain consistent visual appearance with main dashboard

**Theme Variables Used**:
```css
/* From existing styles.css */
--primary-color
--primary-dark
--primary-light
--success-color
--danger-color
--warning-color
--gray-100 through --gray-900
--page-bg
--card-bg
--border-color
--text-primary
--text-secondary
```

### JavaScript Architecture

**Module Pattern (IIFE)**:
```javascript
const LoginPage = (() => {
  'use strict';

  // Private state
  let isSubmitting = false;

  // Private functions
  function validateEmail(email) { }
  function validatePassword(password) { }
  function handleSubmit(e) { }

  // Public API
  return {
    init
  };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  LoginPage.init();
});
```

### Data Persistence

**LocalStorage Strategy**:
- `auth_demo_user` - Demo user credentials for validation
- `auth_remember_email` - Remember me functionality
- `theme` - Existing theme preference (reuse)

**Demo Credentials** (for testing):
```javascript
const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'Demo123!'
};
```

---

## Feature Specifications

### 2.1: Login Page Features

#### 2.1.1: Email Input Field

**Requirements**:
- Floating label with Bootstrap styling
- Email validation (HTML5 + custom)
- Real-time validation on blur
- Clear error messages
- Disabled during submission
- Auto-focus on page load

**Validation Rules**:
- Required field
- Valid email format (RFC 5322 simplified)
- Max length 254 characters
- Trim whitespace

**Error Messages**:
- Empty: "Email is required"
- Invalid format: "Please enter a valid email address"
- Example: "e.g., user@example.com"

**Bootstrap Components**:
```html
<div class="mb-3">
  <div class="form-floating">
    <input type="email"
           class="form-control"
           id="email"
           placeholder="name@example.com"
           required
           autocomplete="email"
           autofocus>
    <label for="email">
      <i class="bi bi-envelope me-2"></i>Email address
    </label>
  </div>
  <div class="invalid-feedback">
    Please enter a valid email address
  </div>
</div>
```

**States**:
- Default (neutral)
- Valid (green border, check icon)
- Invalid (red border, error message)
- Disabled (gray, loading cursor)

#### 2.1.2: Password Input Field

**Requirements**:
- Floating label with icon
- Password visibility toggle
- Min length validation
- Disabled during submission
- Autocomplete attribute

**Validation Rules**:
- Required field
- Min length 8 characters
- Max length 128 characters

**Error Messages**:
- Empty: "Password is required"
- Too short: "Password must be at least 8 characters"

**Bootstrap Components**:
```html
<div class="mb-3">
  <div class="form-floating position-relative">
    <input type="password"
           class="form-control pe-5"
           id="password"
           placeholder="Password"
           required
           autocomplete="current-password"
           minlength="8">
    <label for="password">
      <i class="bi bi-lock me-2"></i>Password
    </label>
    <button type="button"
            class="btn btn-link position-absolute end-0 top-50 translate-middle-y"
            id="togglePassword"
            aria-label="Toggle password visibility">
      <i class="bi bi-eye"></i>
    </button>
  </div>
  <div class="invalid-feedback">
    Password must be at least 8 characters
  </div>
</div>
```

**Toggle Behavior**:
- Click button to show/hide password
- Icon changes: `bi-eye` ↔ `bi-eye-slash`
- Input type changes: `password` ↔ `text`
- Maintains focus on input field

#### 2.1.3: Remember Me Checkbox

**Requirements**:
- Bootstrap switch component
- Saves email to LocalStorage
- Checked by default if email saved
- Accessible label
- Disabled during submission

**Bootstrap Component**:
```html
<div class="mb-3 form-check form-switch">
  <input class="form-check-input"
         type="checkbox"
         id="rememberMe"
         checked>
  <label class="form-check-label" for="rememberMe">
    Remember me
  </label>
</div>
```

**Behavior**:
- **Checked**: Save email to `auth_remember_email` on successful login
- **Unchecked**: Clear `auth_remember_email` on successful login
- **Page Load**: Pre-fill email if `auth_remember_email` exists

#### 2.1.4: Form Submission

**Requirements**:
- Validate all fields before submission
- Show loading state with spinner
- Disable form during submission
- Show success or error feedback
- Simulate API delay (500-1000ms)
- Redirect on success (to admin-dashboard.html)

**Loading State**:
```html
<button type="submit"
        class="btn btn-primary w-100"
        id="submitBtn">
  <span class="spinner-border spinner-border-sm me-2 d-none"
        id="loginSpinner"></span>
  <span id="submitText">Sign In</span>
</button>
```

**States**:
- **Default**: "Sign In" button enabled
- **Validating**: Check all fields, show inline errors
- **Submitting**: Spinner visible, button disabled, text "Signing in..."
- **Success**: Alert "Success! Redirecting...", redirect after 1s
- **Error**: Alert "Invalid email or password", button re-enabled

**Demo Validation**:
```javascript
function authenticateUser(email, password) {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_CREDENTIALS.email &&
          password === DEMO_CREDENTIALS.password) {
        resolve({ success: true, user: { email } });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800); // Simulate network delay
  });
}
```

#### 2.1.5: Error Feedback

**Requirements**:
- Bootstrap Alert component for global errors
- Inline validation feedback per field
- Clear, actionable error messages
- Dismissible alerts
- Auto-hide after 5 seconds

**Alert Component**:
```html
<div class="alert alert-danger alert-dismissible fade show d-none"
     id="errorAlert"
     role="alert">
  <i class="bi bi-exclamation-circle me-2"></i>
  <span id="errorMessage"></span>
  <button type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"></button>
</div>
```

**Error Types**:
- **Validation Errors**: Inline per field (red border, message below)
- **Authentication Error**: Global alert "Invalid email or password"
- **Network Error**: Global alert "Connection failed. Please try again."

#### 2.1.6: Additional Links

**Requirements**:
- Forgot password link (disabled, styled as text)
- Link to registration page
- Proper semantic markup
- Accessible focus states

**Links Section**:
```html
<div class="d-flex justify-content-between align-items-center mb-3">
  <a href="#" class="text-decoration-none text-muted"
     style="cursor: not-allowed;"
     tabindex="-1"
     title="Coming in Phase 4">
    Forgot password?
  </a>
</div>

<div class="text-center mt-4">
  <p class="text-muted mb-0">
    Don't have an account?
    <a href="register.html" class="text-decoration-none">
      Sign up
    </a>
  </p>
</div>
```

#### 2.1.7: Keyboard Shortcuts

**Requirements**:
- Enter key submits form from any field
- Tab navigation through all fields
- Escape key clears error alerts
- Accessible focus indicators

**Implementation**:
```javascript
// Enter key submission
document.getElementById('loginForm').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSubmit();
  }
});

// Escape key to clear alerts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideErrorAlert();
  }
});
```

### 2.2: Registration Page Features

#### 2.2.1: Full Name Input Field

**Requirements**:
- Floating label with icon
- Name validation (letters, spaces, hyphens)
- Min/max length constraints
- Real-time validation on blur
- Trim and capitalize

**Validation Rules**:
- Required field
- Min length 2 characters
- Max length 50 characters
- Only letters, spaces, hyphens, apostrophes
- No leading/trailing spaces

**Error Messages**:
- Empty: "Name is required"
- Too short: "Name must be at least 2 characters"
- Invalid characters: "Name can only contain letters, spaces, and hyphens"

**Bootstrap Component**:
```html
<div class="mb-3">
  <div class="form-floating">
    <input type="text"
           class="form-control"
           id="fullName"
           placeholder="John Doe"
           required
           autocomplete="name"
           autofocus
           minlength="2"
           maxlength="50"
           pattern="^[a-zA-Z\s\-']+$">
    <label for="fullName">
      <i class="bi bi-person me-2"></i>Full Name
    </label>
  </div>
  <div class="invalid-feedback">
    Please enter your full name (2-50 characters, letters only)
  </div>
</div>
```

#### 2.2.2: Email Input Field

**Requirements**:
- Same as login page email field
- Additional check for existing email (demo)
- Async validation simulation

**Validation Rules**:
- All rules from login page
- Check against demo "existing users"
- Debounced validation (500ms)

**Error Messages**:
- All messages from login page
- "This email is already registered"

**Demo Check**:
```javascript
const DEMO_EXISTING_EMAILS = [
  'admin@example.com',
  'user@example.com',
  'test@example.com'
];

async function checkEmailAvailability(email) {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(!DEMO_EXISTING_EMAILS.includes(email.toLowerCase()));
    }, 300);
  });
}
```

#### 2.2.3: Password Input Field

**Requirements**:
- Floating label with icon
- Password visibility toggle
- Real-time strength indicator
- Complexity validation
- Confirmation matching

**Validation Rules**:
- Required field
- Min length 8 characters
- Max length 128 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (optional for better UX)

**Error Messages**:
- Empty: "Password is required"
- Too short: "Password must be at least 8 characters"
- Weak: "Password must include uppercase, lowercase, and numbers"

**Bootstrap Component**:
```html
<div class="mb-3">
  <div class="form-floating position-relative">
    <input type="password"
           class="form-control pe-5"
           id="password"
           placeholder="Password"
           required
           autocomplete="new-password"
           minlength="8">
    <label for="password">
      <i class="bi bi-lock me-2"></i>Password
    </label>
    <button type="button"
            class="btn btn-link position-absolute end-0 top-50 translate-middle-y"
            id="togglePassword"
            aria-label="Toggle password visibility">
      <i class="bi bi-eye"></i>
    </button>
  </div>

  <!-- Password Strength Indicator -->
  <div class="mt-2">
    <div class="d-flex justify-content-between align-items-center mb-1">
      <small class="text-muted">Password strength:</small>
      <small id="strengthText" class="fw-medium">-</small>
    </div>
    <div class="progress" style="height: 4px;">
      <div class="progress-bar"
           id="strengthBar"
           role="progressbar"
           style="width: 0%"
           aria-valuenow="0"
           aria-valuemin="0"
           aria-valuemax="100"></div>
    </div>
  </div>

  <!-- Password Requirements -->
  <div class="mt-2">
    <small class="text-muted d-block">Password must contain:</small>
    <ul class="list-unstyled mb-0 small">
      <li id="req-length" class="text-muted">
        <i class="bi bi-circle me-1"></i> At least 8 characters
      </li>
      <li id="req-uppercase" class="text-muted">
        <i class="bi bi-circle me-1"></i> One uppercase letter
      </li>
      <li id="req-lowercase" class="text-muted">
        <i class="bi bi-circle me-1"></i> One lowercase letter
      </li>
      <li id="req-number" class="text-muted">
        <i class="bi bi-circle me-1"></i> One number
      </li>
    </ul>
  </div>
</div>
```

#### 2.2.4: Password Strength Indicator

**Requirements**:
- Real-time strength calculation
- Visual progress bar with color coding
- Text label (Weak, Fair, Good, Strong)
- Updates on every keystroke (debounced 200ms)
- Accessible ARIA attributes

**Strength Levels**:
```javascript
const STRENGTH_LEVELS = {
  WEAK: {
    score: 0-25,
    text: 'Weak',
    color: 'danger',
    class: 'bg-danger'
  },
  FAIR: {
    score: 26-50,
    text: 'Fair',
    color: 'warning',
    class: 'bg-warning'
  },
  GOOD: {
    score: 51-75,
    text: 'Good',
    color: 'info',
    class: 'bg-info'
  },
  STRONG: {
    score: 76-100,
    text: 'Strong',
    color: 'success',
    class: 'bg-success'
  }
};
```

**Calculation Algorithm**:
```javascript
function calculatePasswordStrength(password) {
  let score = 0;

  // Length scoring (max 30 points)
  if (password.length >= 8) score += 15;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 5;

  // Character variety (max 40 points)
  if (/[a-z]/.test(password)) score += 10; // lowercase
  if (/[A-Z]/.test(password)) score += 10; // uppercase
  if (/[0-9]/.test(password)) score += 10; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) score += 10; // special chars

  // Pattern complexity (max 30 points)
  const patterns = [
    /(.)\1{2,}/, // repeated characters
    /^[a-zA-Z]+$/, // only letters
    /^[0-9]+$/, // only numbers
    /^(123|abc|qwerty|password)/i // common patterns
  ];

  let penaltyCount = 0;
  patterns.forEach(pattern => {
    if (pattern.test(password)) penaltyCount++;
  });

  score += Math.max(0, 30 - (penaltyCount * 10));

  return Math.min(100, Math.max(0, score));
}
```

**Visual Updates**:
```javascript
function updateStrengthIndicator(password) {
  const score = calculatePasswordStrength(password);
  const level = getStrengthLevel(score);

  // Update progress bar
  const bar = document.getElementById('strengthBar');
  bar.style.width = `${score}%`;
  bar.className = `progress-bar ${level.class}`;
  bar.setAttribute('aria-valuenow', score);

  // Update text label
  const text = document.getElementById('strengthText');
  text.textContent = level.text;
  text.className = `fw-medium text-${level.color}`;
}
```

**Requirements Checklist**:
```javascript
function updateRequirementsChecklist(password) {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password)
  };

  Object.keys(requirements).forEach(req => {
    const element = document.getElementById(`req-${req}`);
    if (requirements[req]) {
      element.className = 'text-success';
      element.querySelector('i').className = 'bi bi-check-circle-fill me-1';
    } else {
      element.className = 'text-muted';
      element.querySelector('i').className = 'bi bi-circle me-1';
    }
  });
}
```

#### 2.2.5: Confirm Password Field

**Requirements**:
- Floating label with icon
- Must match password field
- Real-time validation on input
- Visual feedback (checkmark when matched)
- Disabled until password meets minimum requirements

**Validation Rules**:
- Required field
- Must exactly match password field
- Same length constraints as password

**Error Messages**:
- Empty: "Please confirm your password"
- Mismatch: "Passwords do not match"

**Bootstrap Component**:
```html
<div class="mb-3">
  <div class="form-floating position-relative">
    <input type="password"
           class="form-control pe-5"
           id="confirmPassword"
           placeholder="Confirm Password"
           required
           autocomplete="new-password"
           disabled>
    <label for="confirmPassword">
      <i class="bi bi-lock-fill me-2"></i>Confirm Password
    </label>
    <span class="position-absolute end-0 top-50 translate-middle-y me-3 d-none"
          id="matchIndicator">
      <i class="bi bi-check-circle-fill text-success"></i>
    </span>
  </div>
  <div class="invalid-feedback">
    Passwords do not match
  </div>
</div>
```

**Match Validation**:
```javascript
function validatePasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const matchIndicator = document.getElementById('matchIndicator');
  const confirmInput = document.getElementById('confirmPassword');

  if (confirmPassword.length === 0) {
    matchIndicator.classList.add('d-none');
    confirmInput.classList.remove('is-valid', 'is-invalid');
    return false;
  }

  if (password === confirmPassword && password.length >= 8) {
    matchIndicator.classList.remove('d-none');
    confirmInput.classList.add('is-valid');
    confirmInput.classList.remove('is-invalid');
    return true;
  } else {
    matchIndicator.classList.add('d-none');
    confirmInput.classList.add('is-invalid');
    confirmInput.classList.remove('is-valid');
    return false;
  }
}
```

**Enable/Disable Logic**:
```javascript
function updateConfirmPasswordState() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword');
  const strengthScore = calculatePasswordStrength(password);

  // Enable confirm password only when password meets minimum requirements
  if (strengthScore >= 50) { // Fair or better
    confirmPassword.disabled = false;
  } else {
    confirmPassword.disabled = true;
    confirmPassword.value = '';
  }
}
```

#### 2.2.6: Terms & Conditions Checkbox

**Requirements**:
- Bootstrap checkbox component
- Required for form submission
- Link to terms (opens in new tab)
- Accessible label
- Custom validation message

**Bootstrap Component**:
```html
<div class="mb-3 form-check">
  <input class="form-check-input"
         type="checkbox"
         id="termsAccepted"
         required>
  <label class="form-check-label" for="termsAccepted">
    I agree to the
    <a href="#" target="_blank" rel="noopener noreferrer"
       onclick="alert('Terms page coming soon!'); return false;">
      Terms of Service
    </a>
    and
    <a href="#" target="_blank" rel="noopener noreferrer"
       onclick="alert('Privacy page coming soon!'); return false;">
      Privacy Policy
    </a>
  </label>
  <div class="invalid-feedback">
    You must accept the terms and conditions
  </div>
</div>
```

**Validation**:
```javascript
function validateTerms() {
  const termsCheckbox = document.getElementById('termsAccepted');

  if (!termsCheckbox.checked) {
    termsCheckbox.classList.add('is-invalid');
    return false;
  }

  termsCheckbox.classList.remove('is-invalid');
  return true;
}
```

#### 2.2.7: Form Submission

**Requirements**:
- Validate all fields before submission
- Show loading state with spinner
- Disable form during submission
- Show success confirmation
- Simulate API delay (1000-1500ms)
- Redirect to login page on success

**Loading State**:
```html
<button type="submit"
        class="btn btn-primary w-100"
        id="submitBtn"
        disabled>
  <span class="spinner-border spinner-border-sm me-2 d-none"
        id="registerSpinner"></span>
  <span id="submitText">Create Account</span>
</button>
```

**Button State Logic**:
```javascript
function updateSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  const allValid = validateAllFields(); // Returns true if all fields valid

  if (allValid && !isSubmitting) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}
```

**Submission Flow**:
```javascript
async function handleSubmit(e) {
  e.preventDefault();

  // 1. Validate all fields
  if (!validateAllFields()) {
    showErrorAlert('Please fix the errors in the form');
    return;
  }

  // 2. Show loading state
  isSubmitting = true;
  showLoadingState();

  try {
    // 3. Simulate API call
    await registerUser({
      name: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    });

    // 4. Show success
    showSuccessState();

    // 5. Redirect after delay
    setTimeout(() => {
      window.location.href = 'login.html?registered=true';
    }, 2000);

  } catch (error) {
    // 6. Handle errors
    showErrorAlert(error.message);
    hideLoadingState();
    isSubmitting = false;
  }
}
```

**Demo Registration**:
```javascript
function registerUser(userData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Store demo user in LocalStorage
      const users = JSON.parse(localStorage.getItem('auth_demo_users') || '[]');

      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        reject(new Error('This email is already registered'));
        return;
      }

      // Add new user
      users.push({
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In real app, never store plain passwords!
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('auth_demo_users', JSON.stringify(users));
      resolve({ success: true, user: { name: userData.name, email: userData.email } });

    }, 1200); // Simulate network delay
  });
}
```

#### 2.2.8: Success Confirmation

**Requirements**:
- Bootstrap Alert component
- Success icon and message
- Auto-redirect countdown
- Dismissible (in case user wants to stay)

**Success Alert**:
```html
<div class="alert alert-success alert-dismissible fade show d-none"
     id="successAlert"
     role="alert">
  <i class="bi bi-check-circle-fill me-2"></i>
  <strong>Account created successfully!</strong>
  <br>
  <small>Redirecting to login page in <span id="countdown">3</span> seconds...</small>
  <button type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onclick="clearTimeout(redirectTimer)"></button>
</div>
```

**Countdown Timer**:
```javascript
let redirectTimer;

function showSuccessState() {
  const alert = document.getElementById('successAlert');
  alert.classList.remove('d-none');

  let countdown = 3;
  const countdownEl = document.getElementById('countdown');

  redirectTimer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;

    if (countdown === 0) {
      clearInterval(redirectTimer);
    }
  }, 1000);
}
```

#### 2.2.9: Additional Links

**Requirements**:
- Link to login page
- Proper semantic markup
- Accessible focus states

**Links Section**:
```html
<div class="text-center mt-4">
  <p class="text-muted mb-0">
    Already have an account?
    <a href="login.html" class="text-decoration-none">
      Sign in
    </a>
  </p>
</div>
```

---

## UI/UX Design

### Layout Structure

Both pages use a centered card layout with consistent styling:

```
┌─────────────────────────────────────────┐
│         Full Page Background            │
│  ┌───────────────────────────────┐     │
│  │         Card Container        │     │
│  │  ┌─────────────────────────┐ │     │
│  │  │   Logo / Brand Name     │ │     │
│  │  └─────────────────────────┘ │     │
│  │  ┌─────────────────────────┐ │     │
│  │  │   Form Title            │ │     │
│  │  └─────────────────────────┘ │     │
│  │  ┌─────────────────────────┐ │     │
│  │  │   Alert Messages        │ │     │
│  │  └─────────────────────────┘ │     │
│  │  ┌─────────────────────────┐ │     │
│  │  │   Form Fields           │ │     │
│  │  │   (with validation)     │ │     │
│  │  └─────────────────────────┘ │     │
│  │  ┌─────────────────────────┐ │     │
│  │  │   Submit Button         │ │     │
│  │  └─────────────────────────┘ │     │
│  │  ┌─────────────────────────┐ │     │
│  │  │   Additional Links      │ │     │
│  │  └─────────────────────────┘ │     │
│  └───────────────────────────────┘     │
└─────────────────────────────────────────┘
```

### Page Layout Template

**Common Structure**:
```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
  <!-- Meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Admin Dashboard</title>

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-..."
        crossorigin="anonymous">

  <!-- Bootstrap Icons -->
  <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css">

  <!-- Custom Styles -->
  <link rel="stylesheet" href="../assets/css/styles.css">

  <!-- Theme flicker prevention (inline, required) -->
  <script>
    (() => {
      'use strict';
      const getStoredTheme = () => localStorage.getItem('theme');
      const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) return storedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };
      document.documentElement.setAttribute('data-bs-theme', getPreferredTheme());
    })();
  </script>
</head>
<body class="d-flex align-items-center min-vh-100">

  <!-- Main Container -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">

        <!-- Card -->
        <div class="card shadow-sm">
          <div class="card-body p-4 p-md-5">

            <!-- Form Content Here -->

          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-..."
          crossorigin="anonymous"></script>

  <!-- Page-specific JS (inline or external) -->
  <script>
    // Page logic here
  </script>

</body>
</html>
```

### Responsive Design

**Breakpoints** (Bootstrap defaults):
- **Mobile**: < 576px
- **Tablet**: 576px - 767px
- **Desktop**: ≥ 768px

**Layout Adjustments**:

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Card Width | 100% (no margins) | 90% (small margins) | 500px max-width |
| Card Padding | 1.5rem (p-4) | 2rem (p-4) | 2.5rem (p-5) |
| Form Labels | Normal size | Normal size | Normal size |
| Button Height | 48px (touch-friendly) | 44px | 40px |
| Input Height | 56px (floating labels) | 56px | 56px |
| Spacing | Compact (mb-3) | Standard (mb-3) | Standard (mb-3) |

**Mobile Optimizations**:
- Larger touch targets (min 44x44px)
- Simplified password strength indicator
- Stacked layout for all elements
- Auto-zoom disabled on input focus

**CSS Adjustments**:
```css
/* Mobile-specific adjustments */
@media (max-width: 575.98px) {
  .card {
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none !important;
  }

  .card-body {
    padding: 1.5rem !important;
  }

  /* Prevent zoom on input focus (iOS) */
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    font-size: 16px;
  }

  /* Larger touch targets */
  .btn {
    min-height: 48px;
    font-size: 1rem;
  }
}

/* Tablet adjustments */
@media (min-width: 576px) and (max-width: 767.98px) {
  .col-md-6 {
    max-width: 90%;
  }
}
```

### Visual Design System

**Color Palette** (from existing theme):
```css
/* Light Mode */
--primary-color: #2563eb;      /* Primary actions (buttons) */
--primary-dark: #1d4ed8;       /* Hover states */
--primary-light: #3b82f6;      /* Active states */
--success-color: #10b981;      /* Success states */
--danger-color: #ef4444;       /* Error states */
--warning-color: #f59e0b;      /* Warning states */
--info-color: #3b82f6;         /* Info states */

/* Dark Mode (automatic via [data-bs-theme="dark"]) */
--primary-color: #3b82f6;
--primary-dark: #2563eb;
--primary-light: #60a5fa;
--success-color: #10b981;
--danger-color: #f87171;
--warning-color: #fbbf24;
--info-color: #60a5fa;
```

**Typography**:
```css
/* Font Family: Inter (from existing theme) */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Font Sizes */
--fs-small: 0.75rem;    /* 12px - Helper text */
--fs-body: 0.875rem;    /* 14px - Body text */
--fs-base: 1rem;        /* 16px - Input text */
--fs-h6: 1.125rem;      /* 18px - Card title */
--fs-h5: 1.25rem;       /* 20px - Page title */

/* Font Weights */
--fw-normal: 400;
--fw-medium: 500;
--fw-semibold: 600;
--fw-bold: 700;
```

**Spacing Scale**:
```css
/* Bootstrap spacing utilities */
.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: 0.25rem; }  /* 4px */
.mb-2 { margin-bottom: 0.5rem; }   /* 8px */
.mb-3 { margin-bottom: 1rem; }     /* 16px - Standard */
.mb-4 { margin-bottom: 1.5rem; }   /* 24px */
.mb-5 { margin-bottom: 3rem; }     /* 48px */
```

**Shadow System**:
```css
/* From existing theme */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);

/* Card shadow */
.card {
  box-shadow: var(--shadow-sm);
}

.card:hover {
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s ease;
}
```

**Border Radius**:
```css
/* Bootstrap defaults (can override) */
--bs-border-radius: 0.375rem;      /* 6px - Standard */
--bs-border-radius-sm: 0.25rem;    /* 4px - Small */
--bs-border-radius-lg: 0.5rem;     /* 8px - Large */

/* Card border radius */
.card {
  border-radius: var(--bs-border-radius);
}

/* Button border radius */
.btn {
  border-radius: var(--bs-border-radius);
}
```

### Form States & Feedback

**Visual States**:

1. **Default State**:
   - Gray border (`--border-color`)
   - No icon
   - Neutral appearance

2. **Focus State**:
   - Primary color border (`--primary-color`)
   - Blue glow shadow
   - Cursor in field

3. **Valid State**:
   - Green border (`--success-color`)
   - Check icon (bi-check-circle-fill)
   - Positive feedback

4. **Invalid State**:
   - Red border (`--danger-color`)
   - X icon (bi-x-circle-fill)
   - Error message below field

5. **Disabled State**:
   - Gray background
   - Reduced opacity (0.6)
   - Not-allowed cursor

**CSS for States**:
```css
/* Default input styling */
.form-control {
  border: 1px solid var(--border-color);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* Focus state */
.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.25);
}

/* Valid state */
.form-control.is-valid {
  border-color: var(--success-color);
  background-image: url("data:image/svg+xml,..."); /* Check icon */
}

.form-control.is-valid:focus {
  border-color: var(--success-color);
  box-shadow: 0 0 0 0.25rem rgba(16, 185, 129, 0.25);
}

/* Invalid state */
.form-control.is-invalid {
  border-color: var(--danger-color);
  background-image: url("data:image/svg+xml,..."); /* X icon */
}

.form-control.is-invalid:focus {
  border-color: var(--danger-color);
  box-shadow: 0 0 0 0.25rem rgba(239, 68, 68, 0.25);
}

/* Disabled state */
.form-control:disabled {
  background-color: var(--gray-100);
  opacity: 0.6;
  cursor: not-allowed;
}
```

**Validation Feedback**:
```css
/* Error message (below input) */
.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--danger-color);
}

.form-control.is-invalid ~ .invalid-feedback {
  display: block;
}

/* Valid message (below input) */
.valid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--success-color);
}

.form-control.is-valid ~ .valid-feedback {
  display: block;
}
```

### Animation & Transitions

**Smooth Transitions**:
```css
/* All interactive elements */
.btn,
.form-control,
.form-check-input,
.alert {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
}

/* Loading spinner animation */
@keyframes spinner-border {
  to { transform: rotate(360deg); }
}

.spinner-border {
  animation: spinner-border 0.75s linear infinite;
}

/* Fade in/out for alerts */
.fade {
  transition: opacity 0.15s linear;
}

.fade.show {
  opacity: 1;
}
```

**Micro-interactions**:
- Button press effect (translateY)
- Input focus glow (box-shadow)
- Password strength bar smooth fill (transition width)
- Checkbox check animation (Bootstrap default)
- Alert slide-in (Bootstrap default)

### Brand Customization

**Brand Header** (optional, for template users):
```html
<div class="text-center mb-4">
  <!-- Logo (if available) -->
  <div class="mb-3">
    <i class="bi bi-shield-lock-fill text-primary" style="font-size: 3rem;"></i>
  </div>

  <!-- Brand Name -->
  <h1 class="h4 fw-bold mb-1">Admin Dashboard</h1>
  <p class="text-muted small mb-0">Secure Access Portal</p>
</div>
```

**Customization Points**:
- Replace icon with logo image
- Customize brand name via THEME_CONFIG
- Adjust colors via CSS variables
- Modify spacing/sizing

---

## Accessibility

### WCAG 2.1 Compliance

**Level AA Requirements** (minimum):
- ✅ Perceivable: Text alternatives, adaptable content, distinguishable elements
- ✅ Operable: Keyboard accessible, enough time, seizure prevention, navigable
- ✅ Understandable: Readable, predictable, input assistance
- ✅ Robust: Compatible with assistive technologies

### Semantic HTML

**Proper Structure**:
```html
<!-- Document structure -->
<html lang="en">
<head>
  <title>Login - Admin Dashboard</title>
  <meta name="description" content="Secure login to admin dashboard">
</head>
<body>

  <!-- Main landmark -->
  <main role="main">

    <!-- Form with proper labels -->
    <form aria-labelledby="formTitle">
      <h1 id="formTitle">Sign In</h1>

      <!-- Label-input association -->
      <label for="email">Email address</label>
      <input type="email"
             id="email"
             aria-describedby="emailHelp"
             aria-required="true">
      <div id="emailHelp">We'll never share your email</div>

      <!-- Error association -->
      <div class="invalid-feedback" id="emailError">
        Please enter a valid email address
      </div>

    </form>

  </main>

</body>
</html>
```

### ARIA Attributes

**Required ARIA Labels**:
```html
<!-- Button with icon only -->
<button type="button"
        id="togglePassword"
        aria-label="Toggle password visibility"
        aria-pressed="false">
  <i class="bi bi-eye" aria-hidden="true"></i>
</button>

<!-- Form with title -->
<form aria-labelledby="loginFormTitle">
  <h1 id="loginFormTitle">Sign In</h1>
</form>

<!-- Alert with role -->
<div class="alert alert-danger"
     role="alert"
     aria-live="polite"
     aria-atomic="true">
  <span>Invalid credentials</span>
</div>

<!-- Progress bar for password strength -->
<div class="progress" role="progressbar"
     aria-label="Password strength"
     aria-valuenow="75"
     aria-valuemin="0"
     aria-valuemax="100">
  <div class="progress-bar" style="width: 75%"></div>
</div>

<!-- Loading button -->
<button type="submit"
        aria-busy="true"
        aria-live="polite">
  <span class="spinner-border" role="status" aria-hidden="true"></span>
  <span class="visually-hidden">Loading...</span>
  <span>Signing in...</span>
</button>
```

### Keyboard Navigation

**Tab Order** (login page):
1. Email input
2. Password input
3. Toggle password visibility button
4. Remember me checkbox
5. Forgot password link (disabled, skipped)
6. Submit button
7. Sign up link

**Keyboard Shortcuts**:
- **Tab**: Move to next field
- **Shift + Tab**: Move to previous field
- **Enter**: Submit form (from any field)
- **Space**: Toggle checkbox/button
- **Escape**: Dismiss alerts

**Focus Management**:
```javascript
// Auto-focus first field on page load
window.addEventListener('load', () => {
  document.getElementById('email').focus();
});

// Move focus to error field on validation failure
function focusFirstError() {
  const firstInvalid = document.querySelector('.is-invalid');
  if (firstInvalid) {
    firstInvalid.focus();
  }
}

// Trap focus in modal (if using modal)
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

### Focus Indicators

**Visible Focus States**:
```css
/* All focusable elements */
*:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Custom focus for form controls */
.form-control:focus,
.form-check-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.25);
  outline: none; /* Browser default removed */
}

/* Button focus */
.btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(37, 99, 235, 0.5);
}

/* Link focus */
a:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Screen Reader Support

**Announcements**:
```html
<!-- Live region for dynamic messages -->
<div class="visually-hidden"
     role="status"
     aria-live="polite"
     aria-atomic="true"
     id="srAnnouncements">
</div>

<script>
// Announce validation errors
function announceError(message) {
  const announcer = document.getElementById('srAnnouncements');
  announcer.textContent = message;

  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

// Example usage
announceError('Email field: Please enter a valid email address');
</script>
```

**Descriptive Labels**:
```html
<!-- Good: Descriptive label -->
<label for="password">
  Password (minimum 8 characters)
</label>
<input type="password"
       id="password"
       aria-describedby="passwordRequirements">
<div id="passwordRequirements" class="form-text">
  Must contain uppercase, lowercase, and numbers
</div>

<!-- Bad: Vague label -->
<label for="password">Password</label>
<input type="password" id="password">
```

### Color Contrast

**WCAG AA Requirements** (minimum 4.5:1 for normal text, 3:1 for large text):

| Element | Light Mode | Dark Mode | Contrast Ratio |
|---------|------------|-----------|----------------|
| Body Text | #1f2937 on #ffffff | #f9fafb on #111827 | 16:1 (AAA) |
| Input Text | #111827 on #ffffff | #f9fafb on #1f2937 | 16:1 (AAA) |
| Button Text | #ffffff on #2563eb | #ffffff on #3b82f6 | 8.6:1 (AAA) |
| Error Text | #b91c1c on #ffffff | #f87171 on #111827 | 5.9:1 (AA) |
| Success Text | #047857 on #ffffff | #10b981 on #111827 | 4.8:1 (AA) |
| Link Text | #2563eb on #ffffff | #60a5fa on #111827 | 8.6:1 (AAA) |

**Verification**:
```javascript
// Automated contrast checking (development only)
function checkContrast(foreground, background) {
  // Calculate relative luminance
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g).map(Number);
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio: ratio.toFixed(2),
    passAA: ratio >= 4.5,
    passAAA: ratio >= 7
  };
}
```

### Error Prevention

**Strategies**:

1. **Inline Validation**: Check fields on blur, not on every keystroke
2. **Clear Requirements**: Show password requirements before user types
3. **Confirmation Fields**: Require password confirmation for registration
4. **Undo Capability**: Allow form reset without page reload
5. **Auto-save**: Save form state to LocalStorage (optional)

**Implementation**:
```javascript
// Auto-save form state (optional)
function autoSaveForm() {
  const formData = {
    email: document.getElementById('email').value,
    rememberMe: document.getElementById('rememberMe').checked
  };

  localStorage.setItem('auth_form_draft', JSON.stringify(formData));
}

// Restore form state on load
function restoreFormState() {
  const savedData = localStorage.getItem('auth_form_draft');
  if (savedData) {
    const data = JSON.parse(savedData);
    document.getElementById('email').value = data.email || '';
    document.getElementById('rememberMe').checked = data.rememberMe || false;
  }
}

// Clear draft on successful submission
function clearFormDraft() {
  localStorage.removeItem('auth_form_draft');
}
```

---

## Performance

### Performance Targets

**Page Load** (Lighthouse scores):
- Performance: ≥ 90
- Accessibility: 100
- Best Practices: ≥ 90
- SEO: ≥ 90

**Core Web Vitals**:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Functional Performance**:
- Page load to interactive: < 2s
- Form validation: < 50ms per field
- Password strength calculation: < 100ms
- Form submission: < 50ms (excluding network)

### Optimization Strategies

#### 1. HTML Optimization

**Minimize DOM Size**:
- Target: < 1500 DOM nodes
- Login page: ~150 nodes
- Registration page: ~200 nodes

**Semantic Structure**:
```html
<!-- Efficient markup -->
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <input class="form-control" type="email" required>
    <div class="invalid-feedback">Error message</div>
  </div>
</form>

<!-- Avoid unnecessary divs -->
<!-- Bad -->
<div class="wrapper">
  <div class="container">
    <div class="inner">
      <input>
    </div>
  </div>
</div>

<!-- Good -->
<input class="form-control">
```

#### 2. CSS Optimization

**Reuse Existing Styles**:
- Link to `assets/css/styles.css` (35KB, cached)
- Minimal inline styles
- No additional CSS files

**Critical CSS** (inline):
```html
<style>
/* Only theme prevention script CSS (minimal) */
html[data-bs-theme="dark"] body {
  background-color: #111827;
}
</style>
```

**Reduce Specificity**:
```css
/* Good: Low specificity */
.btn-primary { }

/* Bad: High specificity */
div.container form.login-form button.btn.btn-primary { }
```

#### 3. JavaScript Optimization

**Defer Non-Critical Scripts**:
```html
<!-- Bootstrap JS (defer) -->
<script src="..." defer></script>

<!-- Page logic (defer or at end of body) -->
<script src="login.js" defer></script>
```

**Debounce Expensive Operations**:
```javascript
// Password strength calculation (debounced)
let strengthDebounceTimer;
function debouncedPasswordStrength(password) {
  clearTimeout(strengthDebounceTimer);
  strengthDebounceTimer = setTimeout(() => {
    const score = calculatePasswordStrength(password);
    updateStrengthIndicator(score);
  }, 200); // 200ms debounce
}

// Email availability check (debounced)
let emailCheckTimer;
function debouncedEmailCheck(email) {
  clearTimeout(emailCheckTimer);
  emailCheckTimer = setTimeout(async () => {
    const available = await checkEmailAvailability(email);
    updateEmailFeedback(available);
  }, 500); // 500ms debounce
}
```

**Minimize Re-renders**:
```javascript
// Batch DOM updates
function updateFormState(isValid, isSubmitting) {
  // Bad: Multiple reflows
  submitBtn.disabled = !isValid;
  submitBtn.textContent = isSubmitting ? 'Submitting...' : 'Submit';
  spinner.style.display = isSubmitting ? 'inline-block' : 'none';

  // Good: Single reflow with DocumentFragment or classList
  const updates = () => {
    submitBtn.disabled = !isValid;
    submitText.textContent = isSubmitting ? 'Submitting...' : 'Submit';
    spinner.classList.toggle('d-none', !isSubmitting);
  };
  requestAnimationFrame(updates);
}
```

**Efficient Event Listeners**:
```javascript
// Use passive listeners for scroll events (if needed)
document.addEventListener('scroll', handleScroll, { passive: true });

// Remove listeners when not needed
function cleanup() {
  document.removeEventListener('scroll', handleScroll);
}

// Use event delegation for multiple elements
form.addEventListener('blur', (e) => {
  if (e.target.classList.contains('form-control')) {
    validateField(e.target);
  }
}, true); // Capture phase for blur events
```

#### 4. Network Optimization

**CDN Resources** (cached):
- Bootstrap CSS: 27KB (gzipped)
- Bootstrap JS: 59KB (gzipped)
- Bootstrap Icons: 117KB (cached from main dashboard)

**Resource Hints**:
```html
<!-- Preconnect to CDNs -->
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">

<!-- Preload critical resources -->
<link rel="preload" href="../assets/css/styles.css" as="style">
```

**Compression**:
- Enable gzip/brotli on server
- CDN resources already compressed
- Inline scripts minified (production)

#### 5. LocalStorage Efficiency

**Minimize Storage Operations**:
```javascript
// Batch writes
function saveAuthState(userData, preferences) {
  const authState = {
    user: userData,
    prefs: preferences,
    timestamp: Date.now()
  };
  localStorage.setItem('auth_state', JSON.stringify(authState));
}

// Lazy read (only when needed)
let cachedAuthState = null;
function getAuthState() {
  if (!cachedAuthState) {
    const stored = localStorage.getItem('auth_state');
    cachedAuthState = stored ? JSON.parse(stored) : null;
  }
  return cachedAuthState;
}
```

### Performance Monitoring

**Lighthouse CI** (development):
```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:8000/pages/login.html --output html --output-path ./report.html

# Expected scores:
# Performance: 95+
# Accessibility: 100
# Best Practices: 95+
# SEO: 90+
```

**Performance Metrics** (in-browser):
```javascript
// Measure page load performance
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log(`Page load time: ${pageLoadTime}ms`);

  // Should be < 2000ms for login/register pages
  if (pageLoadTime > 2000) {
    console.warn('Page load exceeds target (<2s)');
  }
});

// Measure function performance
function measurePerformance(fn, label) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(2)}ms`);
}

// Example usage
measurePerformance(() => {
  calculatePasswordStrength('ComplexP@ssw0rd123');
}, 'Password strength calculation');
// Expected: < 5ms
```

**Core Web Vitals** (RUM):
```javascript
// Real User Monitoring
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric.name, metric.value);
  // In production: send to analytics service
}

getCLS(sendToAnalytics);  // Target: < 0.1
getFID(sendToAnalytics);  // Target: < 100ms
getLCP(sendToAnalytics);  // Target: < 2.5s
```

---

## Implementation Guide

### Phase 2 Roadmap

**Total Timeline**: 3-5 days

#### Day 1-2: Login Page

1. **Setup** (30 min)
   - Create `pages/login.html`
   - Set up HTML structure
   - Link to existing assets
   - Theme integration

2. **Form Structure** (1 hour)
   - Email input field
   - Password input field
   - Remember me checkbox
   - Submit button
   - Additional links

3. **Validation Logic** (2 hours)
   - Email validation
   - Password validation
   - Form submission handling
   - Error display

4. **Loading States** (1 hour)
   - Spinner integration
   - Button states
   - Form disabling

5. **Demo Authentication** (1 hour)
   - LocalStorage demo user
   - Credential checking
   - Success/error handling

6. **Testing & Polish** (2 hours)
   - Cross-browser testing
   - Responsive testing
   - Accessibility audit
   - Performance check

#### Day 3-5: Registration Page

1. **Setup** (30 min)
   - Create `pages/register.html`
   - HTML structure (similar to login)
   - Asset linking

2. **Form Structure** (1 hour)
   - Full name field
   - Email field
   - Password field
   - Confirm password field
   - Terms checkbox
   - Submit button

3. **Password Strength** (2-3 hours)
   - Strength calculation algorithm
   - Progress bar implementation
   - Requirements checklist
   - Real-time updates

4. **Validation Logic** (2 hours)
   - All field validations
   - Password confirmation
   - Email availability check
   - Terms acceptance

5. **Registration Flow** (1 hour)
   - Form submission
   - Demo user creation
   - Success confirmation
   - Redirect logic

6. **Testing & Polish** (2-3 hours)
   - All validations working
   - Responsive design
   - Accessibility audit
   - Performance optimization
   - Cross-browser testing

### Development Workflow

**Setup**:
```bash
# 1. Create directory structure (if not exists)
mkdir -p pages

# 2. Start local server
# Option A: Python
python3 -m http.server 8000

# Option B: Node.js
npx serve .

# Option C: PHP
php -S localhost:8000

# 3. Open in browser
# http://localhost:8000/pages/login.html
# http://localhost:8000/pages/register.html
```

**Development Process**:

1. **HTML First**: Structure with proper semantics
2. **Visual Styling**: Apply Bootstrap classes, verify theme
3. **JavaScript**: Add interactivity and validation
4. **Testing**: Test all scenarios and edge cases
5. **Refinement**: Polish animations, fix bugs, optimize

**Testing Checklist**:
- [ ] All fields validate correctly
- [ ] Error messages display properly
- [ ] Loading states work
- [ ] Success flow completes
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works in light and dark mode
- [ ] Cross-browser compatible (Chrome, Firefox, Safari, Edge)
- [ ] No console errors
- [ ] Performance meets targets

### Code Organization

**Login Page Structure**:
```javascript
const LoginPage = (() => {
  'use strict';

  // Configuration
  const CONFIG = {
    DEMO_CREDENTIALS: {
      email: 'admin@example.com',
      password: 'Demo123!'
    },
    VALIDATION: {
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      minPasswordLength: 8
    }
  };

  // State
  let isSubmitting = false;

  // DOM Elements (cached)
  const elements = {
    form: null,
    email: null,
    password: null,
    rememberMe: null,
    submitBtn: null,
    spinner: null,
    errorAlert: null
  };

  // Validation Functions
  function validateEmail(email) { }
  function validatePassword(password) { }
  function validateForm() { }

  // UI Functions
  function showError(message) { }
  function hideError() { }
  function showLoadingState() { }
  function hideLoadingState() { }

  // Business Logic
  async function authenticateUser(email, password) { }
  function saveRememberMe(email) { }
  function loadRememberMe() { }

  // Event Handlers
  function handleSubmit(e) { }
  function handleEmailBlur(e) { }
  function handlePasswordToggle(e) { }

  // Initialization
  function cacheElements() { }
  function attachEventListeners() { }
  function init() {
    cacheElements();
    attachEventListeners();
    loadRememberMe();
  }

  // Public API
  return { init };
})();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  LoginPage.init();
});
```

**Registration Page Structure** (similar pattern with additional features):
```javascript
const RegisterPage = (() => {
  'use strict';

  // Configuration
  const CONFIG = {
    DEMO_EXISTING_EMAILS: ['admin@example.com', 'user@example.com'],
    VALIDATION: {
      nameRegex: /^[a-zA-Z\s\-']+$/,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      passwordMinLength: 8,
      passwordRequirements: {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /[0-9]/
      }
    },
    STRENGTH: {
      WEAK: { min: 0, max: 25, text: 'Weak', color: 'danger' },
      FAIR: { min: 26, max: 50, text: 'Fair', color: 'warning' },
      GOOD: { min: 51, max: 75, text: 'Good', color: 'info' },
      STRONG: { min: 76, max: 100, text: 'Strong', color: 'success' }
    }
  };

  // State
  let isSubmitting = false;
  let passwordStrengthScore = 0;

  // DOM Elements
  const elements = { };

  // Validation Functions
  function validateName(name) { }
  function validateEmail(email) { }
  function validatePassword(password) { }
  function validatePasswordMatch() { }
  function validateTerms() { }
  function validateForm() { }

  // Password Strength
  function calculatePasswordStrength(password) { }
  function updateStrengthIndicator(score) { }
  function updateRequirementsChecklist(password) { }

  // UI Functions
  function showError(message) { }
  function showSuccess(message) { }
  function showLoadingState() { }
  function hideLoadingState() { }

  // Business Logic
  async function checkEmailAvailability(email) { }
  async function registerUser(userData) { }

  // Event Handlers
  function handleSubmit(e) { }
  function handlePasswordInput(e) { }
  function handleConfirmPasswordInput(e) { }

  // Initialization
  function init() { }

  // Public API
  return { init };
})();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  RegisterPage.init();
});
```

### Helper Utilities

**Create shared utilities** (optional, inline or separate file):

```javascript
// utils/validation.js (if extracted)
const ValidationUtils = {

  // Email validation (RFC 5322 simplified)
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  },

  // Password strength
  isStrongPassword(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
  },

  // Name validation
  isValidName(name) {
    const regex = /^[a-zA-Z\s\-']+$/;
    return name.length >= 2 &&
           name.length <= 50 &&
           regex.test(name);
  },

  // Sanitize input
  sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
  },

  // Format error messages
  formatError(fieldName, errorType) {
    const messages = {
      required: `${fieldName} is required`,
      invalid: `Please enter a valid ${fieldName}`,
      tooShort: `${fieldName} is too short`,
      tooLong: `${fieldName} is too long`,
      mismatch: `${fieldName} do not match`
    };
    return messages[errorType] || 'Invalid input';
  }

};

// utils/storage.js (if extracted)
const StorageUtils = {

  // Set item with error handling
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  },

  // Get item with error handling
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return defaultValue;
    }
  },

  // Remove item
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  },

  // Clear all auth-related storage
  clearAuthStorage() {
    const authKeys = ['auth_demo_user', 'auth_remember_email', 'auth_form_draft'];
    authKeys.forEach(key => this.removeItem(key));
  }

};
```

### File Templates

**Complete file templates will be provided in separate documents**:
- `pages/login.html` - Full implementation
- `pages/register.html` - Full implementation

---

## Testing Strategy

### Testing Levels

#### 1. Unit Testing (Manual)

**Validation Functions**:
```javascript
// Test cases for email validation
const emailTests = [
  { input: 'user@example.com', expected: true },
  { input: 'user.name+tag@example.co.uk', expected: true },
  { input: 'invalid', expected: false },
  { input: 'user@', expected: false },
  { input: '@example.com', expected: false },
  { input: '', expected: false }
];

emailTests.forEach(test => {
  const result = validateEmail(test.input);
  console.assert(
    result === test.expected,
    `Email validation failed for "${test.input}". Expected ${test.expected}, got ${result}`
  );
});

// Test cases for password strength
const strengthTests = [
  { input: '12345678', expectedMin: 0, expectedMax: 30 }, // Weak
  { input: 'Password1', expectedMin: 40, expectedMax: 60 }, // Fair
  { input: 'P@ssw0rd123', expectedMin: 70, expectedMax: 90 }, // Good
  { input: 'C0mplex!P@ssw0rd#2024', expectedMin: 85, expectedMax: 100 } // Strong
];

strengthTests.forEach(test => {
  const score = calculatePasswordStrength(test.input);
  console.assert(
    score >= test.expectedMin && score <= test.expectedMax,
    `Password strength failed for "${test.input}". Expected ${test.expectedMin}-${test.expectedMax}, got ${score}`
  );
});
```

#### 2. Integration Testing (Manual)

**Form Submission Flow**:
```
Test Case: Successful Login
1. Navigate to /pages/login.html
2. Enter valid email: admin@example.com
3. Enter valid password: Demo123!
4. Check "Remember me"
5. Click "Sign In"
6. VERIFY: Loading spinner appears
7. VERIFY: Form is disabled
8. VERIFY: Success message appears after ~1s
9. VERIFY: Redirect to admin-dashboard.html
10. VERIFY: Email saved in LocalStorage

Test Case: Invalid Credentials
1. Navigate to /pages/login.html
2. Enter email: wrong@example.com
3. Enter password: WrongPass123
4. Click "Sign In"
5. VERIFY: Error alert appears
6. VERIFY: Form is re-enabled
7. VERIFY: Focus moves to email field

Test Case: Registration Success
1. Navigate to /pages/register.html
2. Enter name: Test User
3. Enter email: test@example.com
4. Enter password: Test123!
5. VERIFY: Password strength indicator updates
6. VERIFY: Confirm password field enables
7. Enter confirm password: Test123!
8. VERIFY: Match indicator appears
9. Check terms checkbox
10. Click "Create Account"
11. VERIFY: Loading state
12. VERIFY: Success message
13. VERIFY: Redirect to login after 3s
14. VERIFY: User stored in LocalStorage
```

#### 3. Accessibility Testing

**Screen Reader Testing** (NVDA, JAWS, VoiceOver):
```
Test Case: Form Announcement
1. Navigate to /pages/login.html
2. Tab through form
3. VERIFY: Each label is announced
4. VERIFY: Field type is announced (email, password)
5. VERIFY: Required status is announced
6. VERIFY: Error messages are announced
7. VERIFY: Loading state is announced

Test Case: Error Recovery
1. Submit form with errors
2. VERIFY: Error summary is announced
3. VERIFY: Focus moves to first error
4. VERIFY: Error message is associated with field
```

**Keyboard Navigation**:
```
Test Case: Full Keyboard Flow
1. Load page
2. VERIFY: Auto-focus on first field
3. Press Tab repeatedly
4. VERIFY: Tab order is logical
5. VERIFY: Focus indicators visible
6. Press Enter on submit button
7. VERIFY: Form submits
8. Press Escape
9. VERIFY: Alerts dismiss
```

**Color Contrast** (automated tools):
- Use WAVE browser extension
- Use axe DevTools
- Use Chrome Lighthouse
- Verify all text meets WCAG AA (4.5:1)

#### 4. Responsive Testing

**Devices**:
- Mobile: iPhone SE, iPhone 14, Samsung Galaxy S21
- Tablet: iPad Mini, iPad Pro
- Desktop: 1920x1080, 2560x1440

**Test Matrix**:

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Layout | Card full-width | Card 90% width | Card 500px max |
| Touch targets | ≥ 48px | ≥ 44px | ≥ 40px |
| Font size | 16px (inputs) | 16px | 14-16px |
| Spacing | Compact | Standard | Standard |
| Keyboard | Virtual | Virtual | Physical |

**Breakpoints**:
```css
/* Mobile first (default) */
.card { width: 100%; }

/* Tablet (576px+) */
@media (min-width: 576px) {
  .card { width: 90%; max-width: 500px; }
}

/* Desktop (768px+) */
@media (min-width: 768px) {
  .card { max-width: 500px; }
}
```

#### 5. Cross-Browser Testing

**Browsers**:
- Chrome 120+ (primary)
- Firefox 120+
- Safari 17+
- Edge 120+

**Features to Test**:
- [ ] Form validation works
- [ ] CSS variables applied correctly (theme)
- [ ] JavaScript features (ES6+) work
- [ ] LocalStorage accessible
- [ ] Animations smooth
- [ ] No console errors

**Known Issues**:
- Safari: May need `-webkit-` prefixes for some CSS
- Firefox: May have different autofill styling
- Edge: Should match Chrome behavior

#### 6. Performance Testing

**Lighthouse Audit**:
```bash
# Run Lighthouse
lighthouse http://localhost:8000/pages/login.html \
  --output html \
  --output-path ./lighthouse-login.html \
  --only-categories=performance,accessibility,best-practices,seo

# Expected scores:
# Performance: 95+
# Accessibility: 100
# Best Practices: 95+
# SEO: 90+
```

**Manual Performance Checks**:
```javascript
// Check page load time
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log(`Page load: ${pageLoadTime}ms (target: <2000ms)`);
});

// Check function performance
console.time('passwordStrength');
calculatePasswordStrength('ComplexP@ssw0rd123');
console.timeEnd('passwordStrength');
// Target: < 5ms
```

**Network Performance**:
- Total page size: < 200KB (including CDN resources)
- Number of requests: < 10
- Time to interactive: < 2s

### Test Scenarios

#### Login Page Scenarios

**Happy Path**:
1. ✅ Valid email and password → Success
2. ✅ Remember me checked → Email saved
3. ✅ Pre-filled email from remember me → Works

**Error Paths**:
1. ❌ Empty email → "Email is required"
2. ❌ Invalid email format → "Invalid email"
3. ❌ Empty password → "Password is required"
4. ❌ Short password → "Too short"
5. ❌ Wrong credentials → "Invalid credentials"

**Edge Cases**:
- Very long email (254 chars) → Should work
- Email with special characters → Should work
- Password with spaces → Should work
- Multiple rapid submissions → Should be prevented
- Network error → Show friendly message

#### Registration Page Scenarios

**Happy Path**:
1. ✅ All fields valid → Success
2. ✅ New email → Registration succeeds
3. ✅ Strong password → High strength score
4. ✅ Passwords match → Validation passes
5. ✅ Terms accepted → Form submits

**Error Paths**:
1. ❌ Empty name → "Name is required"
2. ❌ Name with numbers → "Invalid name"
3. ❌ Existing email → "Email already registered"
4. ❌ Weak password → Strength indicator shows weak
5. ❌ Passwords don't match → "Passwords don't match"
6. ❌ Terms not accepted → "Must accept terms"

**Edge Cases**:
- Name with hyphens/apostrophes → Should work
- Email availability check delay → Show loading indicator
- Password visibility toggle during typing → Maintains cursor position
- Confirm password enabled/disabled logic → Works correctly
- Strength indicator with empty password → Shows neutral state

### Automated Testing (Optional)

**Playwright E2E Tests** (if implemented):
```javascript
// tests/auth.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/pages/login.html');

    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'Demo123!');
    await page.click('#submitBtn');

    await expect(page).toHaveURL(/admin-dashboard.html/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/pages/login.html');

    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'Wrong123');
    await page.click('#submitBtn');

    await expect(page.locator('#errorAlert')).toBeVisible();
    await expect(page.locator('#errorAlert')).toContainText('Invalid');
  });

});

test.describe('Registration Page', () => {

  test('should register new user', async ({ page }) => {
    await page.goto('http://localhost:8000/pages/register.html');

    await page.fill('#fullName', 'Test User');
    await page.fill('#email', 'newuser@example.com');
    await page.fill('#password', 'Test123!');
    await page.fill('#confirmPassword', 'Test123!');
    await page.check('#termsAccepted');
    await page.click('#submitBtn');

    await expect(page.locator('#successAlert')).toBeVisible();
    await page.waitForURL(/login.html/);
  });

  test('should show password strength indicator', async ({ page }) => {
    await page.goto('http://localhost:8000/pages/register.html');

    await page.fill('#password', 'weak');
    await expect(page.locator('#strengthText')).toContainText('Weak');

    await page.fill('#password', 'StrongP@ss123');
    await expect(page.locator('#strengthText')).toContainText('Strong');
  });

});
```

---

## Success Criteria

### Functional Requirements

**Login Page** (`pages/login.html`):
- ✅ Professional card-based layout
- ✅ Email input with validation
- ✅ Password input with visibility toggle
- ✅ Remember me functionality
- ✅ Form validation with error messages
- ✅ Loading state during submission
- ✅ Success/error feedback
- ✅ Redirect on successful login
- ✅ Demo authentication working
- ✅ Link to registration page

**Registration Page** (`pages/register.html`):
- ✅ Full name input with validation
- ✅ Email input with availability check
- ✅ Password input with strength indicator
- ✅ Confirm password with match validation
- ✅ Terms & conditions acceptance
- ✅ All form validations working
- ✅ Success confirmation with countdown
- ✅ Demo user creation in LocalStorage
- ✅ Redirect to login page
- ✅ Link to login page

### Non-Functional Requirements

**Theme Integration**:
- ✅ Uses existing `assets/css/styles.css`
- ✅ CSS variables applied correctly
- ✅ Light mode looks professional
- ✅ Dark mode looks professional
- ✅ Theme switching works without reload
- ✅ No theme flicker on load

**Accessibility**:
- ✅ WCAG 2.1 Level AA compliance
- ✅ All form fields have labels
- ✅ All interactive elements are keyboard accessible
- ✅ Focus indicators visible
- ✅ Screen reader announces correctly
- ✅ Error messages associated with fields
- ✅ Color contrast meets standards
- ✅ Semantic HTML structure

**Performance**:
- ✅ Page load < 2 seconds
- ✅ Lighthouse performance score ≥ 90
- ✅ Form validation < 50ms per field
- ✅ Password strength < 100ms
- ✅ Total page size < 200KB
- ✅ No render-blocking resources
- ✅ Smooth animations (60fps)

**Responsive Design**:
- ✅ Mobile (< 576px) - Full-width, optimized
- ✅ Tablet (576px - 767px) - Comfortable layout
- ✅ Desktop (≥ 768px) - Centered card, max 500px
- ✅ Touch targets ≥ 44px on mobile
- ✅ Virtual keyboard doesn't break layout
- ✅ Horizontal scrolling never needed

**Browser Compatibility**:
- ✅ Chrome 120+ - Full support
- ✅ Firefox 120+ - Full support
- ✅ Safari 17+ - Full support
- ✅ Edge 120+ - Full support
- ✅ No console errors in any browser
- ✅ Consistent appearance across browsers

**Code Quality**:
- ✅ Clean, readable code
- ✅ Comprehensive inline comments
- ✅ Modular JavaScript (IIFE pattern)
- ✅ Follows existing code conventions
- ✅ No hardcoded values (use constants)
- ✅ Proper error handling
- ✅ No TODOs or placeholder code

### Acceptance Criteria

**Definition of Done**:
1. All functional requirements implemented
2. All non-functional requirements met
3. All test scenarios pass
4. Accessibility audit passes (axe, WAVE, Lighthouse)
5. Performance targets achieved (Lighthouse ≥ 90)
6. Cross-browser testing complete
7. Responsive design verified on real devices
8. Code reviewed and documented
9. No critical or high-priority bugs
10. Files committed to repository

**Quality Gates**:
- **Code**: No console errors, follows style guide
- **UI**: Matches design, responsive, themed
- **UX**: Intuitive, clear feedback, fast
- **A11y**: WCAG AA, screen reader tested
- **Perf**: Lighthouse ≥ 90, load < 2s
- **Compat**: Works in all target browsers

### Deliverable Checklist

**Files Created**:
- [ ] `pages/login.html` (~300 lines)
- [ ] `pages/register.html` (~400 lines)

**Documentation Updated**:
- [ ] This PRD (Phase 2)
- [ ] `docs/ENHANCEMENT_PLAN.md` (status updated)
- [ ] Session memory updated (if using Serena)

**Testing Completed**:
- [ ] Unit tests (validation functions)
- [ ] Integration tests (form flows)
- [ ] Accessibility audit
- [ ] Performance audit
- [ ] Cross-browser testing
- [ ] Responsive testing
- [ ] Edge case testing

**Quality Verified**:
- [ ] Code reviewed
- [ ] Lighthouse score ≥ 90
- [ ] No console errors
- [ ] WCAG AA compliance
- [ ] Smooth animations
- [ ] Works in all browsers

**Integration Ready**:
- [ ] Navigation links working
- [ ] Theme integration seamless
- [ ] LocalStorage demo working
- [ ] Redirect flows working
- [ ] No conflicts with existing code

---

## Appendix

### A. Demo Credentials

**Login Page**:
```javascript
const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'Demo123!'
};
```

**Registration Page**:
```javascript
const DEMO_EXISTING_EMAILS = [
  'admin@example.com',
  'user@example.com',
  'test@example.com'
];
```

**Usage**:
- Login with demo credentials above
- Register with any email NOT in existing list
- Registered users stored in LocalStorage: `auth_demo_users`

### B. LocalStorage Schema

**Keys**:
- `theme` - User's theme preference (light/dark/auto)
- `auth_demo_user` - Currently logged-in demo user
- `auth_remember_email` - Saved email (if remember me checked)
- `auth_demo_users` - Array of registered demo users
- `auth_form_draft` - Auto-saved form state (optional)

**Data Structures**:
```javascript
// auth_demo_user
{
  id: 123456789,
  name: "John Doe",
  email: "john@example.com",
  loginTime: "2024-10-29T10:30:00Z"
}

// auth_demo_users (array)
[
  {
    id: 123456789,
    name: "John Doe",
    email: "john@example.com",
    password: "Demo123!", // In real app, NEVER store plaintext!
    createdAt: "2024-10-29T10:30:00Z"
  }
]

// auth_remember_email (string)
"john@example.com"

// auth_form_draft (optional)
{
  email: "john@example.com",
  rememberMe: true
}
```

### C. Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge | Notes |
|---------|--------|---------|--------|------|-------|
| ES6+ | ✅ | ✅ | ✅ | ✅ | Arrow functions, const/let |
| CSS Variables | ✅ | ✅ | ✅ | ✅ | Theme system |
| LocalStorage | ✅ | ✅ | ✅ | ✅ | Demo persistence |
| Flexbox | ✅ | ✅ | ✅ | ✅ | Layout system |
| Grid | ✅ | ✅ | ✅ | ✅ | Optional, not critical |
| Fetch API | ✅ | ✅ | ✅ | ✅ | For future real auth |
| Async/Await | ✅ | ✅ | ✅ | ✅ | Demo auth simulation |
| Bootstrap 5 | ✅ | ✅ | ✅ | ✅ | UI framework |

**Minimum Versions**:
- Chrome: 90+ (released April 2021)
- Firefox: 88+ (released April 2021)
- Safari: 14+ (released September 2020)
- Edge: 90+ (released April 2021)

**Fallbacks**:
- No polyfills needed for target browsers
- Graceful degradation for older browsers (basic functionality)

### D. References

**Bootstrap 5 Documentation**:
- Forms: https://getbootstrap.com/docs/5.3/forms/overview/
- Validation: https://getbootstrap.com/docs/5.3/forms/validation/
- Components: https://getbootstrap.com/docs/5.3/components/alerts/

**WCAG 2.1 Guidelines**:
- Overview: https://www.w3.org/WAI/WCAG21/quickref/
- Forms: https://www.w3.org/WAI/tutorials/forms/

**Best Practices**:
- MDN Web Docs: https://developer.mozilla.org/
- Web.dev: https://web.dev/learn/forms/

### E. Future Enhancements

**Phase 2+** (out of scope for current PRD):
- Password reset flow (forgot password)
- Email verification workflow
- Social login (OAuth providers)
- Two-factor authentication (2FA)
- Account lockout after failed attempts
- CAPTCHA integration
- Session management (JWT tokens)
- Real backend API integration
- Password change flow
- Account deletion
- Profile picture upload (registration)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-29 | Claude | Initial PRD creation for Phase 2: Authentication |

---

## Sign-off

**Ready for Implementation**: ✅

**Estimated Effort**: 3-5 days (login 1-2 days, registration 2-3 days)

**Dependencies**:
- ✅ Existing theme system (`assets/css/styles.css`)
- ✅ Bootstrap 5.3.8 (already loaded)
- ✅ Bootstrap Icons 1.13.1 (already loaded)

**Risks**:
- Low risk - well-defined scope, proven patterns
- All dependencies already in place
- Self-contained pages, minimal integration complexity

**Next Steps**:
1. Review and approve this PRD
2. Create `pages/` directory
3. Implement login page (Day 1-2)
4. Implement registration page (Day 3-5)
5. Test and refine
6. Update navigation in `admin-dashboard.html`
7. Update `docs/ENHANCEMENT_PLAN.md` status

---

*This PRD provides comprehensive specifications for Phase 2: Authentication. All implementation details, code examples, and acceptance criteria are defined to enable efficient development of production-ready login and registration pages.*