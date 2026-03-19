# AI Development Rules - ScriptGen

## Tech Stack
*   **Frontend Framework**: React 19 with Vite for fast development and optimized builds.
*   **Routing**: React Router 7 for client-side navigation and layout management.
*   **Styling**: Tailwind CSS for utility-first styling and responsive design.
*   **UI Components**: shadcn/ui (Radix UI based) for accessible and customizable interface elements.
*   **Icons**: Lucide React for a consistent and scalable iconography system.
*   **Backend & Database**: Supabase for real-time database, authentication, and storage.
*   **AI Integration**: Google Generative AI (Gemini 1.5 Flash) for intelligent content analysis and script generation.
*   **Mobile Integration**: Capacitor for wrapping the web app into a native Android application.
*   **PWA**: Vite PWA Plugin for offline capabilities and "Add to Home Screen" functionality.

## Development Rules

### 1. Component Architecture
*   **Small Components**: Keep components focused and under 100 lines of code. Refactor into smaller sub-components if they grow too large.
*   **File Structure**: Place pages in `src/pages/` and reusable UI elements in `src/components/`.
*   **New Files**: Always create a new file for every new component or hook.

### 2. Styling & UI
*   **Tailwind First**: Use Tailwind CSS classes for all layout, spacing, and styling. Avoid raw CSS or large inline style objects.
*   **shadcn/ui**: Prioritize using pre-built shadcn/ui components for buttons, inputs, cards, and dialogs.
*   **Responsiveness**: Every UI change must be mobile-friendly by default using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`).
*   **Icons**: Use `lucide-react` icons instead of emojis or custom SVG strings for better maintainability.

### 3. State & Data
*   **Supabase**: Use the existing `supabaseClient.js` for all database interactions.
*   **Environment Variables**: Always use `import.meta.env.VITE_...` for API keys and configuration. Never hardcode secrets.
*   **Error Handling**: Let errors bubble up to the UI for better debugging unless specific recovery logic is required.

### 4. AI & Logic
*   **Prompts**: Keep AI prompts descriptive and structured. Use clear delimiters (like `**SECTION**`) in the output format.
*   **TypeScript**: Use TypeScript for all new files to ensure type safety and better developer experience.