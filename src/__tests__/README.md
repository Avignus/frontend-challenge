# Test Coverage Summary

This directory contains comprehensive unit tests for the Movie Search application.

## Test Structure

### 🧪 Hooks Tests
- **`useMovieList.test.ts`** - Tests for traditional pagination hook
  - Initial loading states
  - API parameter validation for POPULAR, TOP_RATED, UPCOMING
  - Error handling (API errors, network errors)
  - Page navigation and data fetching
  - Empty response handling

- **`useInfiniteMovieList.test.ts`** - Tests for infinite scroll pagination hook
  - Initial loading and data fetching
  - Load more functionality
  - Page token management
  - Type switching behavior
  - Error handling for both initial and subsequent loads

- **`useMovieSearch.test.ts`** - Tests for movie search functionality
  - Popular movies loading on mount
  - Search query execution
  - Search result handling
  - Clear search functionality
  - Error handling and empty states

### 🎨 Component Tests
- **`MovieCard.test.tsx`** - Tests for individual movie card component
  - Movie information rendering
  - Link generation and navigation
  - Image handling (poster, fallback, error states)
  - Title fallbacks (primary, original, untitled)
  - Accessibility attributes
  - Styling and hover effects

- **`MovieGrid.test.tsx`** - Tests for movie grid container
  - Grid layout rendering
  - Loading states (skeleton loading)
  - Error states display
  - Empty states handling
  - Movie count validation
  - Title and styling verification

- **`Pagination.test.tsx`** - Tests for pagination component
  - Page navigation (Previous/Next buttons)
  - Button state management (enabled/disabled)
  - Loading state handling
  - Page indicator display
  - Callback function execution
  - Styling and accessibility

- **`LoadingSpinner.test.tsx`** - Tests for loading spinner component
  - Spinner rendering and structure
  - Animation classes verification
  - Accessibility attributes
  - Container styling

### 🔧 Utility Tests
- **`api.test.ts`** - Tests for API utility functions
  - `mapToMovie` function with various edge cases
  - `searchMovies` function with response handling
  - `getPopularMovies` function
  - Pagination calculation
  - Error handling and fallbacks

- **`utils.test.ts`** - Existing utility function tests
  - Runtime formatting function

## Test Coverage Areas

### ✅ Core Functionality
- [x] Movie data fetching and mapping
- [x] Search functionality
- [x] Pagination (traditional and infinite scroll)
- [x] Error handling and loading states
- [x] Component rendering and interaction

### ✅ Edge Cases
- [x] Missing data (titles, images, ratings)
- [x] Network and API errors
- [x] Empty search results
- [x] Pagination boundaries
- [x] Component prop validation

### ✅ Accessibility
- [x] ARIA attributes
- [x] Screen reader support
- [x] Keyboard navigation
- [x] Focus management

### ✅ Performance
- [x] Component re-rendering
- [x] Hook dependency arrays
- [x] Memory leak prevention

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Statistics

- **Total Test Files**: 9
- **Test Cases**: 80+
- **Coverage Areas**: Hooks, Components, Utilities
- **Testing Framework**: Vitest + React Testing Library
- **Environment**: jsdom

## Mock Strategy

- **API Calls**: Mocked using `vi.fn()`
- **Fetch**: Global fetch mocking
- **Dependencies**: Mocked at module level
- **Timer Functions**: Mocked for async operations

## Best Practices Followed

1. **Isolation**: Each test is independent
2. **Descriptive**: Clear test descriptions
3. **Comprehensive**: Cover happy paths and edge cases
4. **Maintainable**: Easy to understand and modify
5. **Realistic**: Mock real-world scenarios
6. **Accessible**: Test accessibility features
