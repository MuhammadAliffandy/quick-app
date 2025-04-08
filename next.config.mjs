/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        NEXT_PUBLIC_BASE_URL:process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_BASE_URL_DEV:process.env.NEXT_PUBLIC_BASE_URL_DEV
    },
}
export default nextConfig