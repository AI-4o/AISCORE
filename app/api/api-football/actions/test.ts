import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: 'https://social-mastiff-50243.upstash.io',
    token: 'AcRDAAIjcDE0Y2U3NTM1MTU1MmE0ZDlkOGM0MzRkMGU4ZjI2YjcyYXAxMA',
  })

export const testRedis = async () => {
    await redis.set('foo', 'bar');
    const data = await redis.get('foo');
    console.log(data);
  }
