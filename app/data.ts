type Project = {
  name: string
  description: string
  link?: string
  video?: string
  image?: string
  showForm?: boolean
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
    name: 'Burn',
    description: 'Burn helps you release negative thoughts - write them down, watch them disappear, and get back to better vibes.',
    link: '/burn',
    image: '/burn.svg',
    id: 'project-burn',
  },
  {
    name: 'Ima',
    description: 'A quiet macOS menu bar app where tasks exist only for the time you decide they deserve',
    link: '/ima',
    image: '/ima-logo.svg',
    id: 'project0',
  },
  {
    name: 'Engineer #099',
    description: 'A pixel-style endless runner game but for engineers in tech',
    link: '/engineer-game',
    image: '/engineer-game.webp',
    id: 'project3',
  },
  {
    name: 'Case Portfolio',
    description: '(Request Access) Some of my best work',
    image: '/casestudies.webp',
    showForm: true,
    id: 'project2',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'The Behavioral Economics of Love',
    description: 'Spoiler: our choices in love aren\'t always rational!',
    link: '/blog/the-behavioral-economics-of-love',
    uid: 'blog-1',
  },
  {
    title: 'The Behavioral Economics of Holiday Decision Making',
    description: 'Everything from gift waste to secret-santas to sale-induced overspending.',
    link: '/blog/the-behavioral-economics-of-christmas',
    uid: 'blog-2',
  },
  {
    title: 'Anchored Down: Psychology of Coupon Use',
    description: 'The psychology behind why coupons hook us runs deeper than saving money.',
    link: '/blog/the-psychology-of-coupon-use',
    uid: 'blog-3',
  },
  {
    title: 'Bad Arguments and Bogus Logic: Navigating Logical Fallacies',
    description: 'Understanding common logical fallacies and how they shape our reasoning and decision-making.',
    link: '/blog/bad-arguments-and-bogus-logic-navigating-logical-fallacies',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Calendar',
    link: 'https://cal.com/meetadvaith/secret',
  },
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
