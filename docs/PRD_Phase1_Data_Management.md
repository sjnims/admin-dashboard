# Product Requirements Document: Phase 1 - Data Management

**Project**: Admin Dashboard Enhancement
**Phase**: 1 - Data Management (Users Table)
**Version**: 1.0
**Date**: 2025-10-29
**Status**: Ready for Implementation
**Dependencies**: Phase 0 (Component Showcases) - Optional but recommended

---

## Executive Summary

Create an advanced, production-ready user management table page with sorting, filtering, pagination, row selection, and bulk actions. This page will serve as a reference implementation for data table patterns and demonstrate best practices for handling large datasets in a browser-based admin dashboard.

**Goal**: Production-ready data table with advanced interactions
**Scope**: 1 comprehensive HTML page (`pages/users-table.html`)
**Timeline**: 1-2 weeks
**Dependencies**: Bootstrap 5.3.8, Bootstrap Icons 1.13.1 (already loaded)

---

## 1. Project Context

### 1.1 Current State
- Production-ready admin dashboard (v1.0)
- Basic orders table exists in main dashboard (read-only, no interactions)
- Bootstrap table component available but not fully utilized
- No advanced table features (sorting, filtering, pagination)

### 1.2 Problem Statement
Current dashboard has a simple read-only table. Real-world admin dashboards need:
- **Sortable columns** - Click headers to sort asc/desc
- **Search/filtering** - Find specific users quickly
- **Pagination** - Handle 100s or 1000s of records
- **Row selection** - Bulk actions on multiple users
- **CRUD operations** - View, edit, delete users
- **Status management** - Activate/deactivate accounts
- **Export functionality** - Download data as CSV/Excel

Without these features, managing user data becomes cumbersome and inefficient.

### 1.3 Success Metrics
- ✅ Table handles 1,000+ users without performance degradation
- ✅ Sorting executes <50ms for 1,000 rows
- ✅ Search filters results in real-time (<100ms)
- ✅ Pagination renders instantly (<50ms page change)
- ✅ Row selection works with keyboard (Shift+Click for range)
- ✅ Bulk actions complete with confirmation
- ✅ Export to CSV functional
- ✅ Mobile responsive (card view on <768px)
- ✅ WCAG 2.1 AA compliant
- ✅ Zero console errors

---

## 2. Technical Architecture

### 2.1 Technology Stack

**Core Dependencies** (already loaded):
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

<!-- Bootstrap JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
```

**Existing Assets** (reuse):
- `assets/css/styles.css` - Theme system
- `assets/js/app.js` - Theme manager
- Google Fonts Inter

**New JavaScript Requirements**:
- Array sorting algorithms (multi-column, stable sort)
- String matching for search/filter
- Pagination logic (page calculation, range display)
- Row selection state management
- CSV export generation
- Modal management for confirmations
- LocalStorage for table preferences (sort, page size)

### 2.2 Data Model

**User Object Structure**:
```javascript
{
  id: 1,                           // Unique identifier
  name: "John Doe",                // Full name
  email: "john.doe@example.com",   // Email address
  role: "Admin",                   // Role: Admin, Editor, Viewer
  status: "active",                // Status: active, inactive, suspended
  avatar: "https://...",           // Avatar URL or generated
  department: "Engineering",       // Department
  joinDate: "2024-01-15",         // ISO date string
  lastLogin: "2025-10-28T14:30:00Z", // ISO datetime string
  actions: ["view", "edit", "delete"] // Available actions
}
```

**Sample Data Set** (100 users for testing):
- Mix of roles (30% Admin, 50% Editor, 20% Viewer)
- Mix of statuses (80% active, 15% inactive, 5% suspended)
- Varied departments (Engineering, Marketing, Sales, Support, HR)
- Realistic names, emails, dates

### 2.3 File Structure

```
admin-dashboard/
├── pages/                        # NEW
│   └── users-table.html         # ~1,200-1,500 lines
├── assets/
│   ├── css/
│   │   └── styles.css           # EXISTING - reuse
│   ├── js/
│   │   ├── app.js               # EXISTING - reuse theme
│   │   └── users-table.js       # NEW - table functionality (optional separate file)
│   └── data/                    # NEW (optional)
│       └── sample-users.json    # Sample data for demo
└── admin-dashboard.html         # UPDATE - add navigation link
```

### 2.4 Architecture Pattern

**Module Pattern** (similar to existing `app.js`):
```javascript
const UsersTable = (() => {
  'use strict';

  // Private state
  let allUsers = [];              // Complete dataset
  let filteredUsers = [];         // After search/filter
  let displayedUsers = [];        // Current page
  let selectedRows = new Set();   // Selected user IDs
  let sortConfig = {              // Current sort state
    column: 'name',
    direction: 'asc'
  };
  let pagination = {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0
  };

  // Public API
  return {
    init,
    loadUsers,
    sortColumn,
    searchUsers,
    changePage,
    toggleRowSelection,
    bulkDelete,
    exportCSV
  };
})();
```

---

## 3. Feature Specifications

### 3.1 Feature: Column Sorting

#### 3.1.1 Requirements
- Click any column header to sort
- First click: ascending order
- Second click: descending order
- Third click: reset to default (name ascending)
- Visual indicator: arrow icon (↑ ascending, ↓ descending)
- Sortable columns: Name, Email, Role, Department, Join Date, Last Login, Status
- Sort persists across page navigation
- Keyboard accessible (Enter on header)

#### 3.1.2 UI Design

**Table Header**:
```html
<thead class="table-light">
  <tr>
    <th scope="col" class="col-checkbox">
      <div class="form-check">
        <input class="form-check-input" type="checkbox"
               id="selectAll"
               aria-label="Select all users">
      </div>
    </th>
    <th scope="col" class="sortable" data-sort="name" tabindex="0"
        role="button" aria-sort="ascending">
      Name
      <i class="bi bi-arrow-up sort-icon" aria-hidden="true"></i>
    </th>
    <th scope="col" class="sortable" data-sort="email" tabindex="0"
        role="button" aria-sort="none">
      Email
      <i class="bi bi-arrow-up-down sort-icon text-muted" aria-hidden="true"></i>
    </th>
    <th scope="col" class="sortable" data-sort="role" tabindex="0"
        role="button" aria-sort="none">
      Role
      <i class="bi bi-arrow-up-down sort-icon text-muted" aria-hidden="true"></i>
    </th>
    <th scope="col" class="sortable" data-sort="department" tabindex="0"
        role="button" aria-sort="none">
      Department
      <i class="bi bi-arrow-up-down sort-icon text-muted" aria-hidden="true"></i>
    </th>
    <th scope="col" class="sortable" data-sort="joinDate" tabindex="0"
        role="button" aria-sort="none">
      Join Date
      <i class="bi bi-arrow-up-down sort-icon text-muted" aria-hidden="true"></i>
    </th>
    <th scope="col" class="sortable" data-sort="status" tabindex="0"
        role="button" aria-sort="none">
      Status
      <i class="bi bi-arrow-up-down sort-icon text-muted" aria-hidden="true"></i>
    </th>
    <th scope="col">Actions</th>
  </tr>
</thead>
```

**Sort Icons**:
- Not sorted: `bi-arrow-up-down` (muted color)
- Ascending: `bi-arrow-up` (primary color)
- Descending: `bi-arrow-down` (primary color)

#### 3.1.3 Implementation

**Sort Algorithm**:
```javascript
function sortUsers(column, direction) {
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];

    // Handle dates
    if (column === 'joinDate' || column === 'lastLogin') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    // Handle strings (case-insensitive)
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    // Compare
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  filteredUsers = sortedUsers;
  renderTable();
  updateSortIcons(column, direction);
}
```

**Persistence**:
```javascript
// Save sort preference to localStorage
function saveSortPreference(column, direction) {
  localStorage.setItem('users-table-sort', JSON.stringify({ column, direction }));
}

// Load on page init
function loadSortPreference() {
  const saved = localStorage.getItem('users-table-sort');
  return saved ? JSON.parse(saved) : { column: 'name', direction: 'asc' };
}
```

#### 3.1.4 Acceptance Criteria
- [ ] Clicking column header sorts table
- [ ] Sort cycles: asc → desc → default
- [ ] Sort icon updates correctly
- [ ] ARIA `aria-sort` attribute updates
- [ ] Keyboard accessible (Enter/Space)
- [ ] Sort persists in localStorage
- [ ] Performance: <50ms for 1,000 rows

---

### 3.2 Feature: Search & Filtering

#### 3.2.1 Requirements
- Global search box above table
- Searches: Name, Email, Department
- Real-time filtering (debounced 300ms)
- Clear search button (X icon)
- Show results count: "Showing X of Y users"
- Role filter dropdown (All, Admin, Editor, Viewer)
- Status filter dropdown (All, Active, Inactive, Suspended)
- Multiple filters combine (AND logic)
- Keyboard shortcut: Cmd/Ctrl+K to focus search

#### 3.2.2 UI Design

**Search & Filter Bar**:
```html
<div class="row g-3 mb-4">
  <!-- Global search -->
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-text">
        <i class="bi bi-search"></i>
      </span>
      <input type="search"
             id="globalSearch"
             class="form-control"
             placeholder="Search users... (Ctrl+K)"
             aria-label="Search users by name, email, or department">
      <button class="btn btn-outline-secondary"
              id="clearSearch"
              aria-label="Clear search"
              style="display: none;">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </div>

  <!-- Role filter -->
  <div class="col-md-3">
    <select class="form-select" id="roleFilter" aria-label="Filter by role">
      <option value="">All Roles</option>
      <option value="Admin">Admin</option>
      <option value="Editor">Editor</option>
      <option value="Viewer">Viewer</option>
    </select>
  </div>

  <!-- Status filter -->
  <div class="col-md-3">
    <select class="form-select" id="statusFilter" aria-label="Filter by status">
      <option value="">All Statuses</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="suspended">Suspended</option>
    </select>
  </div>

  <!-- Results count -->
  <div class="col-md-2">
    <div class="d-flex align-items-center h-100">
      <span class="text-muted" id="resultsCount">
        Showing <strong>100</strong> of <strong>100</strong> users
      </span>
    </div>
  </div>
</div>
```

#### 3.2.3 Implementation

**Search Algorithm**:
```javascript
function searchUsers(query) {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) {
    filteredUsers = [...allUsers];
  } else {
    filteredUsers = allUsers.filter(user =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.department.toLowerCase().includes(lowerQuery)
    );
  }

  applyFilters();
  resetPagination();
  renderTable();
  updateResultsCount();
}

// Debounce to avoid excessive filtering
const debouncedSearch = debounce(searchUsers, 300);
document.getElementById('globalSearch').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
  toggleClearButton(e.target.value);
});
```

**Filter Logic**:
```javascript
function applyFilters() {
  const roleFilter = document.getElementById('roleFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;

  filteredUsers = filteredUsers.filter(user => {
    const roleMatch = !roleFilter || user.role === roleFilter;
    const statusMatch = !statusFilter || user.status === statusFilter;
    return roleMatch && statusMatch;
  });
}
```

**Keyboard Shortcut**:
```javascript
// Focus search on Cmd/Ctrl+K
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch').focus();
  }
});
```

#### 3.2.4 Acceptance Criteria
- [ ] Search filters in real-time (<300ms debounce)
- [ ] Searches name, email, department
- [ ] Clear button appears when text entered
- [ ] Role and status filters work independently
- [ ] Multiple filters combine correctly (AND logic)
- [ ] Results count updates accurately
- [ ] Keyboard shortcut Cmd/Ctrl+K works
- [ ] Screen reader announces results count

---

### 3.3 Feature: Pagination

#### 3.3.1 Requirements
- Default page size: 10 rows
- Page size options: 10, 25, 50, 100
- "Previous" and "Next" buttons
- Page number buttons (max 7 visible: [1] [2] [3] ... [98] [99] [100])
- Jump to first/last page buttons
- Keyboard navigation (arrow keys)
- Page size persists in localStorage
- URL parameter for deep linking: `?page=5&size=25`
- Smooth scroll to top on page change

#### 3.3.2 UI Design

**Pagination Controls**:
```html
<nav aria-label="Table pagination">
  <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
    <!-- Page size selector -->
    <div class="d-flex align-items-center gap-2">
      <label for="pageSize" class="mb-0 text-muted">Show:</label>
      <select class="form-select form-select-sm" id="pageSize"
              style="width: auto;" aria-label="Rows per page">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="text-muted">per page</span>
    </div>

    <!-- Page info -->
    <div class="text-muted">
      Showing <strong id="pageRangeStart">1</strong> to
      <strong id="pageRangeEnd">10</strong> of
      <strong id="totalRecords">100</strong> users
    </div>

    <!-- Pagination buttons -->
    <ul class="pagination pagination-sm mb-0">
      <li class="page-item disabled" id="firstPageBtn">
        <a class="page-link" href="#" tabindex="-1"
           aria-label="First page">
          <i class="bi bi-chevron-double-left"></i>
        </a>
      </li>
      <li class="page-item disabled" id="prevPageBtn">
        <a class="page-link" href="#" tabindex="-1"
           aria-label="Previous page">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>

      <!-- Page numbers (generated dynamically) -->
      <li class="page-item active">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item disabled">
        <span class="page-link">...</span>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">10</a>
      </li>

      <li class="page-item" id="nextPageBtn">
        <a class="page-link" href="#" aria-label="Next page">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
      <li class="page-item" id="lastPageBtn">
        <a class="page-link" href="#" aria-label="Last page">
          <i class="bi bi-chevron-double-right"></i>
        </a>
      </li>
    </ul>
  </div>
</nav>
```

#### 3.3.3 Implementation

**Pagination Logic**:
```javascript
function paginate(page, pageSize) {
  pagination.currentPage = page;
  pagination.pageSize = pageSize;
  pagination.totalPages = Math.ceil(filteredUsers.length / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  displayedUsers = filteredUsers.slice(startIndex, endIndex);

  renderTable();
  updatePaginationUI();
  savePagePreferences();
  scrollToTop();
}

function updatePaginationUI() {
  const { currentPage, totalPages, pageSize } = pagination;

  // Update page range display
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredUsers.length);
  document.getElementById('pageRangeStart').textContent = start;
  document.getElementById('pageRangeEnd').textContent = end;
  document.getElementById('totalRecords').textContent = filteredUsers.length;

  // Generate page number buttons (smart truncation)
  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  renderPageButtons(pageNumbers);

  // Enable/disable prev/next buttons
  document.getElementById('firstPageBtn').classList.toggle('disabled', currentPage === 1);
  document.getElementById('prevPageBtn').classList.toggle('disabled', currentPage === 1);
  document.getElementById('nextPageBtn').classList.toggle('disabled', currentPage === totalPages);
  document.getElementById('lastPageBtn').classList.toggle('disabled', currentPage === totalPages);
}

function generatePageNumbers(current, total) {
  // Show max 7 buttons: [1] [2] [3] ... [98] [99] [100]
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
}
```

**URL Parameter Handling**:
```javascript
function loadPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('page')) || 1;
  const size = parseInt(params.get('size')) || 10;

  document.getElementById('pageSize').value = size;
  paginate(page, size);
}

function updateURL(page, size) {
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  url.searchParams.set('size', size);
  window.history.pushState({}, '', url);
}
```

#### 3.3.4 Acceptance Criteria
- [ ] Pagination controls render correctly
- [ ] Page size changes update table immediately
- [ ] Previous/Next buttons work correctly
- [ ] First/Last buttons jump to correct pages
- [ ] Page number buttons navigate correctly
- [ ] Smart truncation shows max 7 page buttons
- [ ] URL parameters update on page change
- [ ] Page preferences persist in localStorage
- [ ] Keyboard navigation works (arrow keys)
- [ ] Smooth scroll to top on page change

---

### 3.4 Feature: Row Selection & Bulk Actions

#### 3.4.1 Requirements
- Checkbox in each row for selection
- "Select All" checkbox in header (all visible rows)
- Shift+Click for range selection
- Bulk action toolbar appears when rows selected
- Bulk actions: Delete, Export Selected, Change Status
- Confirmation modal before destructive actions
- Selection count display: "X users selected"
- Clear selection button
- Selected rows highlighted (background color)
- Selection persists across pages (optional enhancement)

#### 3.4.2 UI Design

**Bulk Action Toolbar** (appears when rows selected):
```html
<div class="card mb-3" id="bulkActionBar" style="display: none;">
  <div class="card-body py-2">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-3">
        <span class="fw-semibold">
          <strong id="selectedCount">0</strong> users selected
        </span>
        <button class="btn btn-sm btn-link text-decoration-none"
                id="clearSelection">
          Clear Selection
        </button>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-primary"
                id="bulkExport">
          <i class="bi bi-download"></i>
          Export Selected
        </button>
        <div class="btn-group" role="group">
          <button type="button"
                  class="btn btn-sm btn-outline-secondary dropdown-toggle"
                  data-bs-toggle="dropdown">
            <i class="bi bi-pencil"></i>
            Change Status
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" data-status="active">
              <i class="bi bi-check-circle text-success"></i> Activate
            </a></li>
            <li><a class="dropdown-item" href="#" data-status="inactive">
              <i class="bi bi-x-circle text-muted"></i> Deactivate
            </a></li>
            <li><a class="dropdown-item" href="#" data-status="suspended">
              <i class="bi bi-slash-circle text-warning"></i> Suspend
            </a></li>
          </ul>
        </div>
        <button class="btn btn-sm btn-outline-danger"
                id="bulkDelete">
          <i class="bi bi-trash"></i>
          Delete Selected
        </button>
      </div>
    </div>
  </div>
</div>
```

**Table Row with Selection**:
```html
<tr data-user-id="1">
  <td>
    <div class="form-check">
      <input class="form-check-input row-checkbox"
             type="checkbox"
             value="1"
             aria-label="Select user John Doe">
    </div>
  </td>
  <td>
    <div class="d-flex align-items-center">
      <img src="https://ui-avatars.com/api/?name=John+Doe"
           class="rounded-circle me-2"
           width="32" height="32"
           alt="John Doe">
      <span>John Doe</span>
    </div>
  </td>
  <!-- ... other columns ... -->
</tr>
```

#### 3.4.3 Implementation

**Selection Management**:
```javascript
const selectedRows = new Set();

// Toggle single row
function toggleRowSelection(userId, checkbox) {
  if (checkbox.checked) {
    selectedRows.add(userId);
  } else {
    selectedRows.delete(userId);
  }

  updateSelectionUI();
  highlightSelectedRows();
}

// Select all visible rows
function selectAllRows(checked) {
  const checkboxes = document.querySelectorAll('.row-checkbox');

  checkboxes.forEach(checkbox => {
    checkbox.checked = checked;
    const userId = parseInt(checkbox.value);

    if (checked) {
      selectedRows.add(userId);
    } else {
      selectedRows.delete(userId);
    }
  });

  updateSelectionUI();
  highlightSelectedRows();
}

// Shift+Click range selection
let lastCheckedIndex = null;

function handleRowClick(event, index) {
  if (event.shiftKey && lastCheckedIndex !== null) {
    const start = Math.min(lastCheckedIndex, index);
    const end = Math.max(lastCheckedIndex, index);

    const checkboxes = document.querySelectorAll('.row-checkbox');
    for (let i = start; i <= end; i++) {
      checkboxes[i].checked = true;
      selectedRows.add(parseInt(checkboxes[i].value));
    }

    updateSelectionUI();
    highlightSelectedRows();
  }

  lastCheckedIndex = index;
}
```

**Bulk Delete with Confirmation**:
```javascript
function bulkDelete() {
  const count = selectedRows.size;

  // Show confirmation modal
  const modalHtml = `
    <div class="modal-body">
      <h5>Confirm Deletion</h5>
      <p>Are you sure you want to delete <strong>${count}</strong> selected user(s)?</p>
      <p class="text-danger">
        <i class="bi bi-exclamation-triangle"></i>
        This action cannot be undone.
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Cancel
      </button>
      <button type="button" class="btn btn-danger" id="confirmDelete">
        Delete ${count} User(s)
      </button>
    </div>
  `;

  showModal('Delete Users', modalHtml);

  document.getElementById('confirmDelete').addEventListener('click', () => {
    // Perform deletion
    selectedRows.forEach(id => {
      allUsers = allUsers.filter(user => user.id !== id);
    });

    selectedRows.clear();
    applyFiltersAndSearch();
    renderTable();
    hideModal();
    showToast(`${count} user(s) deleted successfully`, 'success');
  });
}
```

#### 3.4.4 Acceptance Criteria
- [ ] Row checkboxes toggle selection
- [ ] Select All checkbox works correctly
- [ ] Shift+Click selects range
- [ ] Bulk action toolbar appears when rows selected
- [ ] Selected count displays accurately
- [ ] Selected rows highlighted visually
- [ ] Bulk delete shows confirmation modal
- [ ] Bulk export downloads CSV of selected
- [ ] Bulk status change updates all selected
- [ ] Clear selection works
- [ ] Keyboard accessible (Space to toggle)

---

### 3.5 Feature: CRUD Operations

#### 3.5.1 Requirements
- **View**: Click user row or "View" button → opens modal with full details
- **Edit**: "Edit" button → opens modal with editable form
- **Delete**: "Delete" button → shows confirmation modal
- **Create**: "+ New User" button → opens modal with blank form
- Form validation for all fields
- Success/error toast notifications
- Modal closes on successful save
- Table updates immediately after CRUD operation

#### 3.5.2 UI Design

**Action Buttons in Table**:
```html
<td>
  <div class="btn-group btn-group-sm" role="group" aria-label="User actions">
    <button class="btn btn-outline-primary view-btn"
            data-user-id="1"
            aria-label="View user John Doe">
      <i class="bi bi-eye"></i>
    </button>
    <button class="btn btn-outline-secondary edit-btn"
            data-user-id="1"
            aria-label="Edit user John Doe">
      <i class="bi bi-pencil"></i>
    </button>
    <button class="btn btn-outline-danger delete-btn"
            data-user-id="1"
            aria-label="Delete user John Doe">
      <i class="bi bi-trash"></i>
    </button>
  </div>
</td>
```

**New User Button** (above table):
```html
<div class="d-flex justify-content-between align-items-center mb-4">
  <h1 class="h3 mb-0">User Management</h1>
  <button class="btn btn-primary" id="newUserBtn">
    <i class="bi bi-plus-lg"></i>
    New User
  </button>
</div>
```

**Edit/Create User Modal**:
```html
<div class="modal fade" id="userModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">Edit User</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="userForm">
          <!-- Name -->
          <div class="mb-3">
            <label for="userName" class="form-label">
              Full Name <span class="text-danger">*</span>
            </label>
            <input type="text"
                   class="form-control"
                   id="userName"
                   required
                   aria-describedby="nameHelp">
            <div class="invalid-feedback">Please enter a full name</div>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="userEmail" class="form-label">
              Email Address <span class="text-danger">*</span>
            </label>
            <input type="email"
                   class="form-control"
                   id="userEmail"
                   required>
            <div class="invalid-feedback">Please enter a valid email</div>
          </div>

          <!-- Role -->
          <div class="mb-3">
            <label for="userRole" class="form-label">
              Role <span class="text-danger">*</span>
            </label>
            <select class="form-select" id="userRole" required>
              <option value="">Select role...</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            <div class="invalid-feedback">Please select a role</div>
          </div>

          <!-- Department -->
          <div class="mb-3">
            <label for="userDepartment" class="form-label">Department</label>
            <select class="form-select" id="userDepartment">
              <option value="">Select department...</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="HR">Human Resources</option>
            </select>
          </div>

          <!-- Status -->
          <div class="mb-3">
            <label for="userStatus" class="form-label">Status</label>
            <select class="form-select" id="userStatus">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" id="saveUserBtn">
          <i class="bi bi-check-lg"></i>
          Save User
        </button>
      </div>
    </div>
  </div>
</div>
```

**View User Modal**:
```html
<div class="modal fade" id="viewUserModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">User Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <div class="text-center mb-3">
          <img id="viewAvatar"
               src=""
               class="rounded-circle mb-2"
               width="80" height="80"
               alt="User avatar">
          <h5 id="viewName" class="mb-0"></h5>
          <p class="text-muted" id="viewEmail"></p>
          <span id="viewStatusBadge" class="badge"></span>
        </div>

        <hr>

        <dl class="row mb-0">
          <dt class="col-sm-4">Role:</dt>
          <dd class="col-sm-8" id="viewRole"></dd>

          <dt class="col-sm-4">Department:</dt>
          <dd class="col-sm-8" id="viewDepartment"></dd>

          <dt class="col-sm-4">Join Date:</dt>
          <dd class="col-sm-8" id="viewJoinDate"></dd>

          <dt class="col-sm-4">Last Login:</dt>
          <dd class="col-sm-8" id="viewLastLogin"></dd>
        </dl>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary" id="editFromView">
          <i class="bi bi-pencil"></i>
          Edit User
        </button>
      </div>
    </div>
  </div>
</div>
```

#### 3.5.3 Implementation

**Create User**:
```javascript
function createUser(userData) {
  // Generate new ID
  const newId = Math.max(...allUsers.map(u => u.id)) + 1;

  const newUser = {
    id: newId,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    department: userData.department || 'Unassigned',
    status: userData.status || 'active',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`,
    joinDate: new Date().toISOString().split('T')[0],
    lastLogin: null,
    actions: ['view', 'edit', 'delete']
  };

  allUsers.push(newUser);
  applyFiltersAndSearch();
  renderTable();

  showToast('User created successfully', 'success');
  closeModal('userModal');
}
```

**Update User**:
```javascript
function updateUser(userId, userData) {
  const userIndex = allUsers.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      ...userData
    };

    applyFiltersAndSearch();
    renderTable();

    showToast('User updated successfully', 'success');
    closeModal('userModal');
  } else {
    showToast('User not found', 'error');
  }
}
```

**Delete User with Confirmation**:
```javascript
function deleteUser(userId) {
  const user = allUsers.find(u => u.id === userId);

  if (!user) return;

  // Show confirmation modal
  showConfirmModal(
    'Delete User',
    `Are you sure you want to delete <strong>${user.name}</strong>?`,
    'danger',
    () => {
      allUsers = allUsers.filter(u => u.id !== userId);
      applyFiltersAndSearch();
      renderTable();
      showToast('User deleted successfully', 'success');
    }
  );
}
```

**Form Validation**:
```javascript
function validateUserForm() {
  const form = document.getElementById('userForm');

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return false;
  }

  // Custom validation
  const email = document.getElementById('userEmail').value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    document.getElementById('userEmail').setCustomValidity('Invalid email format');
    form.classList.add('was-validated');
    return false;
  }

  return true;
}
```

#### 3.5.4 Acceptance Criteria
- [ ] "New User" button opens blank form modal
- [ ] "Edit" button opens form with user data pre-filled
- [ ] "View" button opens read-only details modal
- [ ] "Delete" button shows confirmation before deletion
- [ ] Form validation prevents invalid submissions
- [ ] Required fields marked with asterisk
- [ ] Email validation works correctly
- [ ] Save button creates/updates user
- [ ] Table updates immediately after CRUD operation
- [ ] Success toast shown on save/delete
- [ ] Modal closes after successful operation
- [ ] Keyboard accessible (Esc closes modal)

---

### 3.6 Feature: CSV Export

#### 3.6.1 Requirements
- Export all users or selected users
- CSV format with headers
- Columns: Name, Email, Role, Department, Status, Join Date, Last Login
- Filename: `users-export-YYYY-MM-DD.csv`
- Downloads immediately (no server required)
- Handles special characters (quotes, commas)
- Export button in toolbar

#### 3.6.2 UI Design

**Export Button**:
```html
<button class="btn btn-outline-success" id="exportBtn">
  <i class="bi bi-download"></i>
  Export to CSV
</button>
```

#### 3.6.3 Implementation

**CSV Generation**:
```javascript
function exportToCSV(users = allUsers) {
  // CSV headers
  const headers = ['Name', 'Email', 'Role', 'Department', 'Status', 'Join Date', 'Last Login'];

  // Convert users to CSV rows
  const rows = users.map(user => [
    escapeCsvValue(user.name),
    escapeCsvValue(user.email),
    escapeCsvValue(user.role),
    escapeCsvValue(user.department),
    escapeCsvValue(user.status),
    escapeCsvValue(user.joinDate),
    escapeCsvValue(user.lastLogin || 'Never')
  ]);

  // Combine headers and rows
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create download
  downloadFile(csv, `users-export-${getDateString()}.csv`, 'text/csv');
}

function escapeCsvValue(value) {
  if (value === null || value === undefined) return '';

  const stringValue = String(value);

  // Escape if contains comma, quote, or newline
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);

  showToast('Export successful', 'success');
}

function getDateString() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
}
```

#### 3.6.4 Acceptance Criteria
- [ ] Export button generates CSV file
- [ ] CSV includes all visible/selected users
- [ ] CSV has proper headers
- [ ] Special characters escaped correctly
- [ ] Filename includes current date
- [ ] Download happens immediately
- [ ] No page reload required
- [ ] Success toast shown after export

---

## 4. Responsive Design

### 4.1 Desktop (≥992px)
- Full table layout with all columns
- Horizontal scroll if needed (`.table-responsive`)
- Sidebar filters visible
- Bulk actions in single row

### 4.2 Tablet (768px-991px)
- Condensed table (hide less important columns)
- Horizontal scroll enabled
- Filters collapse to accordion
- Pagination stacks vertically

### 4.3 Mobile (<768px)
- **Card view** instead of table
- Each user displayed as card
- Swipe actions (edit, delete)
- Search and filters in collapsible panel
- Pagination simplified (Prev/Next only)

**Mobile Card Layout**:
```html
<div class="user-card card mb-3">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <div class="d-flex align-items-center">
        <input type="checkbox" class="form-check-input me-2" value="1">
        <img src="https://ui-avatars.com/api/?name=John+Doe"
             class="rounded-circle me-2" width="40" height="40">
        <div>
          <h6 class="mb-0">John Doe</h6>
          <small class="text-muted">john.doe@example.com</small>
        </div>
      </div>
      <span class="badge bg-success">Active</span>
    </div>

    <div class="row g-2 text-muted small">
      <div class="col-6">
        <strong>Role:</strong> Admin
      </div>
      <div class="col-6">
        <strong>Dept:</strong> Engineering
      </div>
      <div class="col-6">
        <strong>Joined:</strong> Jan 15, 2024
      </div>
      <div class="col-6">
        <strong>Login:</strong> 2 days ago
      </div>
    </div>

    <div class="d-flex gap-2 mt-3">
      <button class="btn btn-sm btn-outline-primary flex-fill">
        <i class="bi bi-eye"></i> View
      </button>
      <button class="btn btn-sm btn-outline-secondary flex-fill">
        <i class="bi bi-pencil"></i> Edit
      </button>
      <button class="btn btn-sm btn-outline-danger">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</div>
```

---

## 5. Accessibility Requirements

### 5.1 WCAG 2.1 AA Compliance
- [ ] Keyboard navigation (Tab, Enter, Space, Arrow keys)
- [ ] Focus indicators visible (2px outline)
- [ ] ARIA labels on all interactive elements
- [ ] ARIA live regions for dynamic content
- [ ] Semantic HTML (table, th, td, thead, tbody)
- [ ] Proper table headers with scope
- [ ] Color contrast 4.5:1 minimum
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)

### 5.2 Keyboard Shortcuts
- **Cmd/Ctrl+K**: Focus search
- **Tab**: Navigate through table cells
- **Enter/Space**: Activate buttons, toggle checkboxes
- **Arrow keys**: Navigate pagination
- **Shift+Click**: Range select
- **Esc**: Close modals

### 5.3 Screen Reader Announcements
- Sort changes: "Table sorted by Name, ascending"
- Filter changes: "Showing 25 of 100 users"
- Row selection: "5 users selected"
- Page change: "Page 2 of 10"
- CRUD operations: "User John Doe created successfully"

---

## 6. Performance Requirements

### 6.1 Targets
- Initial render: <100ms for 100 rows
- Sort operation: <50ms for 1,000 rows
- Search filter: <100ms with debounce
- Pagination: <50ms page change
- Export CSV: <500ms for 1,000 rows

### 6.2 Optimization Techniques
- Debounce search input (300ms)
- Virtual scrolling for large datasets (optional)
- Efficient DOM updates (DocumentFragment)
- Event delegation for row actions
- LocalStorage for preferences

---

## 7. Implementation Timeline

**Week 1**:
- Day 1-2: Page structure, sample data, basic table render
- Day 3-4: Column sorting, search/filtering
- Day 5: Pagination

**Week 2** (optional if extended):
- Day 1-2: Row selection, bulk actions
- Day 3-4: CRUD modals, form validation
- Day 5: CSV export, responsive design
- Day 6-7: Testing, accessibility, polish

---

## 8. Testing Requirements

### 8.1 Functional Testing
- [ ] All sorting combinations work
- [ ] Search filters correctly
- [ ] Pagination navigates properly
- [ ] Row selection (single, range, all) works
- [ ] Bulk actions execute correctly
- [ ] CRUD operations save/delete
- [ ] CSV export generates valid file
- [ ] Responsive layouts work on all breakpoints

### 8.2 Accessibility Testing
- [ ] Keyboard navigation complete
- [ ] Screen reader announces all changes
- [ ] Focus management in modals
- [ ] No keyboard traps
- [ ] axe DevTools 0 violations

### 8.3 Performance Testing
- [ ] Lighthouse Performance >90
- [ ] Sort 1,000 rows <50ms
- [ ] Search 1,000 rows <100ms
- [ ] No memory leaks (check DevTools)

---

## 9. Success Criteria

Phase 1 is complete when:
- [ ] All features implemented and functional
- [ ] Browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit passes (WCAG 2.1 AA)
- [ ] Performance benchmarks met
- [ ] Mobile responsive (card view <768px)
- [ ] Navigation link added to dashboard
- [ ] Documentation updated
- [ ] Code reviewed and merged

---

## 10. Related Documents

- `docs/ENHANCEMENT_PLAN.md` - Overall project plan
- `docs/PRD_Phase0_Showcases.md` - Component reference library
- `README.md` - Project documentation
- `assets/js/app.js` - Existing utilities to reuse

---

**Next Steps**: Implement Phase 1 - Users Table Page