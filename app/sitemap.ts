import type { MetadataRoute } from 'next'
import { siteUrl } from './config/site'
import { featuredProjects } from './data/featuredProjects'
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/services', '/hire-me', '/enquiry', '/privacy', ...featuredProjects.map(project => '/projects/' + project.id)].map(route => ({ url: siteUrl + route }))
}
