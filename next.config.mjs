/** @type {import('next').NextConfig} */
const nextConfig = {
//  cấu hình để có thể sử dụng ảnh từ 1 trang web bên ngoài
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pexels.com',
                port: '',
                pathname: '/photo/**',
            },
        ],
    },
};

export default nextConfig;
