# Server Actions vs Client API Requests

Decision guide for when to use Next.js server actions vs direct client-side API calls in a project with its own backend API.

## Server Actions — advantages

1. **No CORS, no auth token juggling on the client** — action runs on Next.js server, credentials forwarded via httpOnly cookies automatically.
2. **Automatic revalidation** — `revalidatePath()` / `revalidateTag()` inside an action instantly invalidates the Next.js cache.
3. **Progressive enhancement** — forms work without JS enabled (native `<form action>`).
4. **Less client JS** — mutation logic stays on the server, client only ships a thin RPC stub.
5. **Simpler data flow** — RSC renders fresh data -> user mutates via action -> `revalidatePath` -> RSC re-renders. No client state to sync.
6. **Type safety end-to-end** — input/output types inferred from function signature, no generated API client needed for mutations.

## When regular client-side API calls are better

1. **Real-time / streaming responses** — WebSockets, SSE, long-polling.
2. **Optimistic UI with complex rollback** — React Query / SWR give more control than `useOptimistic`.
3. **Parallel / batched mutations** — server actions are sequential per form.
4. **Third-party / cross-origin consumers** — if mobile app or CLI also hits the API.
5. **File uploads with progress** — `fetch` with `ReadableStream` gives upload progress, server actions don't.

## Decision guide

| Operation                              | Approach                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Mutations** (create, update, delete) | Server actions — call API server-side, then `revalidatePath`. Client stays thin.                             |
| **Reads from RSC**                     | Plain `async` functions (not server actions) in `src/actions/`.                                              |
| **Reads from client components**       | Generated API client (`@hey-api/openapi-ts`) only when needed: polling, infinite scroll, search-as-you-type. |
