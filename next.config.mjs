/** @type {import('next').NextConfig} */
import withSvgr from '@svgr/webpack'

const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false, // desactiva svgo para evitar alteraciones en la estructura del SVG
            },
          },]
      });
  
      return config;
    },
  };
  

export default nextConfig;
