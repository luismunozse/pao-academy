import nextConfig from 'eslint-config-next';

const customRules = {
  'react-hooks/set-state-in-effect': 'off',
  'react-hooks/immutability': 'off',
};

const config = [
  {
    ignores: ['.next/**'],
  },
  ...nextConfig.map((config) => ({
    ...config,
    rules: {
      ...(config.rules ?? {}),
      ...customRules,
    },
  })),
];

export default config;
