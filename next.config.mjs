/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/resume.html",
        destination: "/resume",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
