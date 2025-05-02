import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'http://81.70.202.189:3000' 
      : 'http://localhost:3000',
  }
};

export default nextConfig;
