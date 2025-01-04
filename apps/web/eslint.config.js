import { eslint } from '@siberiacancode/eslint';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import pluginTanstackRouter from '@tanstack/eslint-plugin-router';

export default eslint(
  {
    typescript: true,
    react: true,
    jsx: true
  },
  {
    name: 'poketinder/tanstack-query',
    plugins: {
      '@tanstack/query': pluginTanstackQuery
    },
    rules: {
      ...pluginTanstackQuery.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'warn'
    }
  },
  {
    name: 'poketinder/tanstack-router',
    plugins: {
      '@tanstack/router': pluginTanstackRouter
    },
    rules: {
      ...pluginTanstackRouter.configs.recommended.rules
    }
  },
  {
    name: 'poketinder/generated',
    ignores: ['generated']
  }
);
