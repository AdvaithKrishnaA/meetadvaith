import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/ima`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/engineer-game`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/blog/the-psychology-of-coupon-use`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${WEBSITE_URL}/blog/bad-arguments-and-bogus-logic-navigating-logical-fallacies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${WEBSITE_URL}/blog/the-behavioral-economics-of-love`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}