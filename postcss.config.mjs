/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for GitHub Pages
  images: {
    unoptimized: true, // Required because Next.js Image Optimization doesn't work with static export
  },
  // If your repository is not at yourname.github.io (a project site), 
  // you must add the repository name as a prefix:
  // basePath: '/your-repo-name', 
};

export default nextConfig;