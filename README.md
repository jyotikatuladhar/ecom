# E-Commerce Search & Catalog Dashboard

A frontend-focused, production-style e-commerce catalog and search experience built with React, TypeScript, and Redux Toolkit.
This project is designed to demonstrate real-world frontend engineering practices, including state management, async data handling, performance optimization, and scalable architecture.

⚠️ This project is actively under development and being built incrementally using sprint-based delivery.

## Project Goals

The goal of this project is to showcase how a senior frontend engineer would design and implement:

A scalable product catalog

Search, filtering, sorting, and pagination

Predictable global state management

Clean separation of concerns

Performance-conscious UI updates

Realistic API integration without over-engineering a backend

This is intentionally frontend-centric — the focus is on architecture, state, and UX, not backend complexity.

## Key Features (Planned & In Progress)
Product Discovery

Product listing with pagination

Search by product name

Category filtering

Sorting (price, rating)

URL-synced state (search, filters, page)

State Management

Global catalog state (search, filters, pagination)

Cart state with quantity management

Derived state via memoized selectors

Clear split between local UI state and global domain state

Cart

Add / remove products

Update quantity

Derived totals

Cart persistence using localStorage

UX & Performance

Debounced search input

Loading, error, and empty states

Optimized re-renders using memoization

Accessible and keyboard-friendly UI (baseline)

## Architecture Overview

The project follows a feature-based architecture with clear domain ownership.

src/
 ├── app/                # Store setup, typed hooks
 ├── features/           # Redux slices & RTK Query APIs
 │    ├── catalog/
 │    ├── cart/
 │    ├── ui/
 ├── components/         # Reusable UI components
 ├── pages/              # Page-level components
 ├── types/              # Shared TypeScript models

State Strategy

Redux Toolkit for predictable global state

RTK Query for server state (products API)

Selectors for derived data (totals, filtered results)

Local state only for ephemeral UI concerns

This approach minimizes unnecessary re-renders while keeping the data flow explicit and debuggable.

## Tech Stack

React 18

TypeScript

Redux Toolkit

RTK Query

Vite

DummyJSON API (mock backend)

Vitest (basic test coverage planned)

## API Strategy

This project uses the public DummyJSON API to simulate a real backend with:

Pagination

Search

Categories

Realistic response structures

This allows the frontend to model:

Async data fetching

Error handling

Caching and refetching

Query parameter management

The API is intentionally mocked to keep the project frontend-focused.

##  Development Approach

The project is being built incrementally using short sprints, similar to how production teams operate:

Sprint 1: Catalog foundation & API integration

Sprint 2: Search, filters, pagination, URL sync

Sprint 3: Cart, performance optimizations

Sprint 4: Refactoring, documentation, and polish

Each sprint focuses on delivering usable functionality, followed by cleanup and refinement.

## Testing Strategy

Testing is intentionally lightweight and focused on:

Core logic (reducers/selectors)

Critical UI interactions

The goal is to demonstrate pragmatic testing, not exhaustive coverage.

## Tradeoffs & Design Decisions

Some intentional decisions made in this project:

Client-side filtering using a mock API to prioritize frontend architecture

Redux only where shared state is truly beneficial

Minimal styling to focus on behavior and structure

No backend or authentication to avoid diluting frontend signal

These tradeoffs are documented and can be discussed during interviews.

🚧 Project Status

Status: 🚀 In active development
Current focus: Catalog, search, and state architecture
Next steps: Cart flow, performance tuning, documentation polish

Commits are made incrementally to reflect real development progress.

## Author

Jyotika Tara Tuladhar
Senior Frontend Engineer — React & TypeScript
Focused on building scalable, user-centric web applications.

## License

MIT