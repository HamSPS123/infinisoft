# shadcn/ui Setup Guide

## Problem
When installing shadcn/ui, you encountered this error:
```
No import alias found in your tsconfig.json file.
Visit https://ui.shadcn.com/docs/installation/vite to learn how to set an import alias.
```

## Root Cause
shadcn/ui requires **path aliases** to be configured in your TypeScript and Vite configuration files. This allows you to import components using `@/` instead of relative paths like `../../`.

## Solution

### 1. Install Required Dependencies
```bash
npm install --save-dev @types/node
```

### 2. Update `tsconfig.app.json`
Added path alias configuration:

```json
{
  "compilerOptions": {
    // ... existing config
    
    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    
    // ... rest of config
  }
}
```

### 3. Update `vite.config.ts`
Added path resolution:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 4. Update `tsconfig.node.json`
Added Node.js types:

```json
{
  "compilerOptions": {
    // ... existing config
    "types": ["node"],
    // ... rest of config
  }
}
```

## Now You Can Install shadcn/ui

Run the shadcn/ui init command:
```bash
npx shadcn@latest init
```

Follow the prompts to configure:
- TypeScript: Yes
- Style: Default or New York
- Base color: Your choice
- CSS variables: Yes (recommended)
- Import alias: `@/*` (already configured)

## Usage

After installation, you can add components:

```bash
# Add a button component
npx shadcn@latest add button

# Add a card component
npx shadcn@latest add card

# Add multiple components
npx shadcn@latest add button card dialog
```

## Import Examples

With the `@/` alias configured, you can now import like this:

```typescript
// Before (relative paths)
import { Button } from '../../components/ui/button'
import { Card } from '../../../components/ui/card'

// After (with alias)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

## Benefits

1. **Cleaner Imports**: No more `../../` paths
2. **Easier Refactoring**: Moving files doesn't break imports
3. **Better IDE Support**: Autocomplete works better
4. **shadcn/ui Compatible**: Required for shadcn/ui components

## Troubleshooting

### If you still get errors:

1. **Restart TypeScript Server**
   - VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
   - Other IDEs: Restart the IDE

2. **Clear Cache**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Verify Installation**
   ```bash
   # Check if @types/node is installed
   npm list @types/node
   ```

4. **Check tsconfig Files**
   - Ensure `tsconfig.app.json` has `baseUrl` and `paths`
   - Ensure `tsconfig.node.json` has `types: ["node"]`
   - Ensure `vite.config.ts` has the `resolve.alias` configuration

## Next Steps

1. Initialize shadcn/ui: `npx shadcn@latest init`
2. Add components as needed
3. Start building your UI!

## References

- [shadcn/ui Installation Guide](https://ui.shadcn.com/docs/installation/vite)
- [Vite Path Aliases](https://vitejs.dev/config/shared-options.html#resolve-alias)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
