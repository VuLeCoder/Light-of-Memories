// A Redis set makes repeat and concurrent requests for the same browser idempotent.
const recordVisitor = `
redis.call('SADD', KEYS[1], ARGV[1])
return redis.call('SCARD', KEYS[1])
`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) {
    return res.status(415).json({ error: 'Expected JSON' });
  }
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  const id = body?.visitorId;
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return res.status(400).json({ error: 'Invalid visitor ID' });
  }
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return res.status(503).json({ error: 'Counter unavailable' });
  const environment = process.env.VERCEL_ENV === 'production' ? 'production' : 'development';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', recordVisitor, '1', `cuoi:${environment}:visitors:v1`, id]),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Redis request failed');
    const data = await response.json();
    if (data.error || !Number.isSafeInteger(data.result) || data.result < 0) throw new Error('Invalid count');
    return res.status(200).json({ total: data.result });
  } catch {
    return res.status(503).json({ error: 'Counter unavailable' });
  }
}
