import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), "add-react-displayname"],
  // plugins: [reactRefresh()],
  // configureWebpack: {
  //   resolve: {
  //     extensions: ['.js', '.jsx'],
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(js|jsx)$/,
  //         exclude: /node_modules/,
  //         use: {
  //           loader: 'babel-loader',
  //           options: {
  //             presets: ['@babel/preset-env', '@babel/preset-react'],
  //           },
  //         },
  //       },
  //     ],
  //   },
  // },
});
