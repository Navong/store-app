### Project Introduction
### Features
 - Scrape items from Fakeshop API and store in local DB
 - Listing scrapped items
 - Implement sync between state using Redux
 - Popup notification using Toast
 - Custom hooks for Database fetching
 - React's State Management
 - Filtering System
 - Debounded Operations (Prevents unneccessary rerenders)

    ```js
    useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
        setDebouncedSearchQuery(searchQuery);
        setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
    }, [searchQuery]);
    ```

### Tech Stack
 - Next.js
 - Tailwind
 - shadcn/ui
 - Redux (React State)
 - prisma
 - postgres
 - vercel
 - typescript
### Project Demonstrate
### Deployment
