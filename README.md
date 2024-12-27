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

https://github.com/user-attachments/assets/9e884210-1d11-4575-9cd1-f9c21f130a69

### Deployment
![Website Deploy](https://deploy-badge.vercel.app/?url=https://store-app-git-main-navongs-projects.vercel.app/&name=MyStore)
