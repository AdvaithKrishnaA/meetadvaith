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
    title: 'The Behavioral Economics of Love',
    description: 'Spoiler: our choices in love aren\'t always rational!',
    link: '/blog/behavioral-economics-of-love',
    uid: 'blog-1',
  },
  {
    title: 'Anchored Down: Psychology of Coupon Use',
    description: 'The psychology behind why coupons hook us runs deeper than saving money.',
    link: '/blog/anchored-down-psychology-of-coupon-use',
    uid: 'blog-2',
  },
  {
    title: 'Bad Arguments and Bogus Logic: Navigating Logical Fallacies',
    description: 'Understanding common logical fallacies and how they shape our reasoning and decision-making.',
    link: '/blog/bad-arguments-and-bogus-logic-navigating-logical-fallacies',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Calendar',
    link: 'https://cal.com/meetadvaith/secret',
  },
  // {
  //   label: 'X',
  //   link: 'https://twitter.com/advaithkrishnaa',
  // },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/advaithkrishnaa',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/meetadvaith',
  },
]

export const EMAIL = 'meetadvaith@duck.com'
