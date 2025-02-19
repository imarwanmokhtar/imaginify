import { clerkMiddleware } from "@clerk/nextjs/server";

// Middleware function
export default clerkMiddleware();

// Configuration for middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API routes except for /api/webhooks/clerk
    '/(api|trpc)(.*)',

    // Exclude /api/webhooks/clerk from Clerk middleware
    '!/api/webhooks/clerk',
  ],
};