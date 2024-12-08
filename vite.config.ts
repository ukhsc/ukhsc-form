import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: {
    // host: 'auth.lyhsca.local',
    port: 3000,
  },
  plugins: [react()],
});
