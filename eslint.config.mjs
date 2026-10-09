import coreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'] },
  ...coreWebVitals,
];

export default config;
