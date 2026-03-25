import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:8080/swagger-json',
  output: 'src/api/generated',
  plugins: [
    {
      enums: false,
      name: '@hey-api/typescript',
    },
  ],
});
