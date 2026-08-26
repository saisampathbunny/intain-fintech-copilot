import app from '../server/app.js'

// This catch-all Vercel Function preserves the request URL, so Express continues
// to receive the existing /api/health, /api/loans, and other API paths unchanged.
export default app
