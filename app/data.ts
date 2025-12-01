type Project = {
  name: string
  description: string
  link?: string
  video?: string
  image?: string
  showForm?: boolean
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'High On Product',
    description:
      'A limited no-nonsense initiative to help crack entry level product interviews',
    link: 'https://highonproduct.com',
    image: '/highonproduct.svg',
    id: 'project1',
  },
  {
    name: 'Case Portfolio',
    description: '(Request Access) Some of my best work',
    image: '/casestudies.png',
    showForm: true,
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Media.net',
    title: 'Senior Product Analyst, ML Team',
    start: 'Jul 2024',
    end: 'Present',
    link: 'https://www.linkedin.com/in/advaithkrishnaa/',
    id: 'work1',
  },
  {
    company: 'MarianaAI',
    title: 'Founder\'s Associate',
    start: 'Oct 2023',
    end: 'Jul 2024',
    link: 'https://www.linkedin.com/in/advaithkrishnaa/',
    id: 'work2',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/ibelick',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/ibelick',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ibelick',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/ibelick',
  },
]

export const EMAIL = 'your@email.com'
