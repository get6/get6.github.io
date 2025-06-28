import { NextResponse } from 'next/server'

export async function GET() {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV,
  }

  return NextResponse.json(healthcheck, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
}
