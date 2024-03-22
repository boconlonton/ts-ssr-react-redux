# My SSR App

This is a server-side rendering React application using Node 18 with Express.js and React 18, written in TypeScript. The application consists of both server-side and client-side code.

## Project Structure

```
my-ssr-app
├── src
│   ├── server
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   └── api.ts
│   │   └── routes
│   │       └── index.ts
│   ├── client
│   │   ├── index.tsx
│   │   ├── components
│   │   │   ├── JobListOnly.tsx
│   │   │   ├── JobSearch.tsx
│   │   │   ├── JobPagination.tsx
│   │   │   └── JobFilter.tsx
│   │   └── redux
│   │       ├── store.ts
│   │       ├── slices
│   │       │   └── jobSlice.ts
│   │       └── thunks
│   │           └── jobThunks.ts
│   └── shared
│       └── types
│           └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Server-side Code

### `src/server/app.ts`

This file is the entry point of the server-side rendering application. It creates an instance of the Express app, sets up middleware, and defines the API routes.

### `src/server/controllers/api.ts`

This file exports a class `ApiController` which handles the API requests. It contains methods for fetching and updating job data asynchronously.

### `src/server/routes/index.ts`

This file exports a function `setRoutes` which sets up the routes for the server-side rendering application. It uses the `ApiController` to handle the API requests.

## Client-side Code

### `src/client/index.tsx`

This file is the entry point of the client-side React application. It renders the root component and injects it into the HTML document dynamically.

### `src/client/components/JobListOnly.tsx`

This file exports a React component `JobListOnly` which displays a list of jobs.

### `src/client/components/JobSearch.tsx`

This file exports a React component `JobSearch` which allows users to search for jobs.

### `src/client/components/JobPagination.tsx`

This file exports a React component `JobPagination` which provides pagination functionality with page size selection for the job list.

### `src/client/components/JobFilter.tsx`

This file exports a React component `JobFilter` which contains the facets for filtering jobs.

### `src/client/redux/store.ts`

This file exports the Redux store configuration. It sets up the global state management using Redux Toolkit.

### `src/client/redux/slices/jobSlice.ts`

This file exports a Redux slice `jobSlice` which contains the reducer and actions for managing the job state.

### `src/client/redux/thunks/jobThunks.ts`

This file exports Redux thunks `jobThunks` which are used for asynchronously updating the job state.

## Shared Code

### `src/shared/types/index.ts`

This file exports shared types and interfaces used by both the server and client code.

## Configuration Files

### `tsconfig.json`

This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.

### `package.json`

This file is the configuration file for npm. It lists the dependencies and scripts for the project.

## Documentation

For more information on how to set up and run the project, please refer to the [documentation](./docs/README.md).