/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'storage.googleapis.com',
},
{
protocol: 'https',
hostname: 'tradly-paas-sandbox.s3.amazonaws.com',
},
{
protocol: 'https',
hostname: 'tradly-paas.s3.amazonaws.com',
},
{
protocol: 'https',
hostname: 'media.tradly.app',
},
{
protocol: 'https',
hostname: 'media-sandbox.tradly.app',
},
{
protocol: 'https',
hostname: 'via.placeholder.com',
},
],
},
env: {
ENVIRONMENT: process.env.ENVIRONMENT,
BASE_URL: process.env.BASE_URL,
API_KEY: process.env.API_KEY,
SITE_URL: process.env.SITE_URL,
},
eslint: {
ignoreDuringBuilds: true,
},
swcMinify: true,
reactStrictMode: true,
};

module.exports = nextConfig;
