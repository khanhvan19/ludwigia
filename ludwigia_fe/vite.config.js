import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '~', replacement: '/src' }
        ]
    },
    optimizeDeps: {
        include: ['ckeditor5-custom-build']
    },
    build: {
        commonjsOptions: { exclude: ['ckeditor5-custom-build'], include: [] },
    }
    // base: './'
})
