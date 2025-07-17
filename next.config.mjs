/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "asset.kompas.com",
      "tribratanews.ntb.polri.go.id",
      "res.cloudinary.com",
    ], //tambahkan domain dari imageUrl jika dibutuhkan
  },
};

export default nextConfig;
