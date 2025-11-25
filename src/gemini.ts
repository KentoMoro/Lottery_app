// Vercel serverless function (TypeScript)
// 注意: 実際の Gemini エンドポイントは利用するAPI仕様に合わせて置き換えてください。
// 簡易サンプル: POST { prompt: "..." } を受け取り、外部 API に代理リクエストして結果を返す

import type { VercelRequest, VercelResponse } from '@vercel/node'

const ALLOWED_ORIGINS = [
  // GitHub Pages の URL やフロントのドメインをここに追加すると安全です
  // 'https://kentomoro.github.io',
  // 'https://your-custom-domain.com'
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS: 必要に応じて調整してください
  const origin = req.headers.origin
  if (origin && (ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    // 開発や一時的な確認で許可するなら '*' を使う（本番では推奨しない）
    res.setHeader('Access-Control-Allow-Origin', '*')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, use POST' })
    return
  }

  const body = req.body ?? {}
  const prompt = body.prompt ?? body.input ?? ''

  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt in request body' })
    return
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const GEMINI_API_URL = process.env.GEMINI_API_URL ?? 'https://api.example.com/v1/generate' // 実際のエンドポイントに変える

  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'Server is not configured with GEMINI_API_KEY' })
    return
  }

  try {
    // 外部 API へのリクエスト例。実際の Gemini の API 仕様に合わせて調整してください。
    const apiRes = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        // ここは Gemini API の期待フォーマットに合わせる
        prompt,
        // 例: model, temperature など
      })
    })

    const data = await apiRes.json()
    // status をそのまま返すか、適合させて返す
    res.status(apiRes.status).json(data)
  } catch (err: any) {
    console.error('Proxy error:', err)
    res.status(500).json({ error: 'Proxy request failed', detail: String(err) })
  }
}