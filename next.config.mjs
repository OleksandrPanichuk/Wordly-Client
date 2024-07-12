const API_URL = process.env.NEXT_PUBLIC_API_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/api/:path*`
			}
		]
	},
	experimental: {
		reactCompiler: true
	}
}

export default nextConfig
