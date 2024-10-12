/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: 'https', // Add this line
      hostname: "res.cloudinary.com", // Add this line
      }
    ]
   
    },
};
export default nextConfig;
