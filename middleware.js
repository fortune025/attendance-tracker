import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const { isAuthenticated } = getKindeServerSession()
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
        // Redirect to Kinde's login endpoint with the proper return URL
        return NextResponse.redirect(
            `${process.env.KINDE_SITE_URL}/api/auth/login?post_login_redirect_url=/dashboard`
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/dashboard/:path*'
    ]
}