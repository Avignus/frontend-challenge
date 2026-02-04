# Movie Search Application

A production-grade movie search application built with Next.js, TypeScript, and TanStack Query, utilizing the OMDb API for movie data.

## 🚀 Features

- **Real-time Search**: Debounced search with instant results
- **Advanced Caching**: Intelligent caching with TanStack Query
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **URL State Management**: Shareable URLs with search parameters
- **Error Handling**: Comprehensive error boundaries and graceful fallbacks
- **Accessibility**: ARIA labels and semantic HTML
- **Type Safety**: Full TypeScript implementation

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query v5
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **API**: OMDb API

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with QueryProvider
│   ├── page.tsx             # Search page
│   └── movie/
│       └── [id]/
│           └── page.tsx     # Movie details page
├── components/
│   ├── ui/                   # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Skeleton.tsx
│   │   └── ErrorMessage.tsx
│   ├── search/
│   │   ├── SearchInput.tsx
│   │   ├── SearchResults.tsx
│   │   └── MovieCard.tsx
│   ├── movie/
│   │   └── MovieDetails.tsx
│   ├── pagination/
│   │   └── Pagination.tsx
│   └── ErrorBoundary.tsx
├── hooks/
│   ├── useMovieSearch.ts
│   ├── useMovieDetails.ts
│   ├── useDebounce.ts
│   └── useRecentSearches.ts
├── lib/
│   ├── api/
│   │   ├── client.ts         # API client configuration
│   │   └── movies.ts         # Movie API functions
│   └── utils.ts
├── types/
│   └── movie.ts
├── providers/
│   └── QueryProvider.tsx
└── __tests__/
    ├── utils.test.ts
    └── components/
        └── SearchInput.test.tsx
```

## 🏗️ Architecture

### State Management Strategy

The application implements a clear separation of state concerns:

1. **Server State (TanStack Query)**
   - Movie search results
   - Movie details
   - Handles caching, deduplication, background refetching

2. **URL State (searchParams)**
   - Search query (`q`)
   - Current page (`page`)
   - Enables shareable URLs and browser navigation

3. **Local UI State (useState)**
   - Input field value (before submission)
   - Modal open/close states
   - Form validation errors

4. **Persisted Local State (localStorage)**
   - Recent searches (optional enhancement)

### Caching Strategy

**Technology**: TanStack Query v5

| Data Type | staleTime | gcTime | Rationale |
|-----------|-----------|--------|-----------|
| Search Results | 5 min | 30 min | Results may update but don't need real-time freshness |
| Movie Details | 10 min | 1 hour | Movie metadata rarely changes |

**Observable Behaviors**:
- **Back Navigation**: Results appear instantly from cache without loading state
- **Pagination**: Using `placeholderData` prevents content flash during page transitions
- **Shared Queries**: Multiple components share one request for same movie details
- **Background Updates**: Data refetched in background after `staleTime`

### Error Handling

- **API Level**: Axios interceptors handle OMDb API error responses
- **Component Level**: Error boundaries catch React rendering errors
- **User Level**: Graceful error messages with retry functionality
- **Network Level**: Request cancellation on component unmount

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- OMDb API key (free at https://www.omdbapi.com/)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create `.env.local` and add your OMDb API key:
   ```
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Testing

Run tests with:
```bash
npm run test
```

## 🎯 Senior-Level Implementation

### Debounced Search
- 500ms debounce delay prevents excessive API calls
- Auto-search functionality for seamless UX
- Manual search button for immediate results

### Error Resilience
- Error boundaries prevent app crashes
- Graceful fallbacks for missing data ("N/A" poster handling)
- Network error recovery with retry functionality

### Performance Optimizations
- Image optimization with Next.js Image component
- Lazy loading for movie posters
- Efficient re-render prevention with proper React patterns
- Request deduplication with TanStack Query

### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `NEXT_PUBLIC_OMDB_API_KEY` | OMDb API key | Yes |

### TanStack Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000,   // 30 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
```

## 📱 Usage

1. **Search Movies**: Type in the search bar for real-time results
2. **View Details**: Click any movie card to see detailed information
3. **Navigate**: Use pagination controls or browser back/forward buttons
4. **Share URLs**: Copy the URL to share specific search results

## 🧪 Testing

The application includes comprehensive tests:

- **Unit Tests**: Utility functions and custom hooks
- **Component Tests**: React component behavior
- **Integration Tests**: User flows and API interactions

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

Ensure the `NEXT_PUBLIC_OMDB_API_KEY` environment variable is set in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [OMDb API Documentation](https://www.omdbapi.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
