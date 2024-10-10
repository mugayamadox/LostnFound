# Frontend Project README

Welcome to the frontend of LostnFound project! This README will guide you
through the project structure, technologies used, and conventions to follow.

## Project Overview

This project is built using React with Vite and TypeScript. We use a
component-based architecture with a focus on reusability and maintainability.

## Technologies and Libraries

- React
- Vite
- TypeScript
- Tailwind CSS (for styling)
- Zod (for validation)
- shadcn-ui (component library)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── primary/
│   │   ├── secondary/
│   │   └── ui/
│   ├── layouts/
│   ├── hooks/
│   ├── lib/
│   └── ...
├── ...
```

### Key Directories

- `components/`: Contains all React components
  - `primary/`: Major screen components used throughout the app
  - `secondary/`: Other reusable components
  - `ui/`: Components from shadcn-ui library
- `layouts/`: Contains layout components for different screens
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and validation schemas

## Styling

We use Tailwind CSS for styling. CSS variables are used for theming.

## Validation

Zod is used for form validation and data schema definitions.

## Routing

Note: This project does not use routing.

## Development Guidelines

1. Component Creation:

   - Place major screen components in `components/primary/`
   - Put reusable components in `components/secondary/`
   - Use components from shadcn-ui in `components/ui/` when possible

2. Layouts:

   - Create new layout components in the `layouts/` directory

3. Custom Hooks:

   - Place all custom hooks in the `hooks/` directory

4. Utility Functions and Schemas:

   - Add utility functions and Zod schemas to the `lib/` directory

5. Styling:

   - Use Tailwind classes for styling
   - Define theme variables using CSS variables

6. TypeScript:

   - Utilize TypeScript for type safety
   - Define interfaces and types as needed

7. Code Style:

   - Follow the established code style in the project
   - Use meaningful variable and function names

8. Performance:

   - Be mindful of component re-renders
   - Utilize React.memo and useCallback when appropriate

9. Testing:
   - Write unit tests for components and utility functions
   - Ensure all tests pass before submitting a pull request

## Getting Started

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Contributing

1. Create a new branch for your feature or bug fix
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request with a clear description of your changes
