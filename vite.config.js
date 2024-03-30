import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        mimeTypes: {
            '.js': 'application/javascript',
            '.jsx': 'application/javascript',
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': {},
    },
});
