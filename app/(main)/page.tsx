'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
} from '../data'
import { useEffect, useRef } from 'react'
import { getCalApi } from '@calcom/embed-react'
import posthog from 'posthog-js'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function TallyForm() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const loadTally = () => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        ;(window as any).Tally.loadEmbeds()
      } else {
        const iframes = document.querySelectorAll(
          'iframe[data-tally-src]:not([src])'
        )
        iframes.forEach((iframe: any) => {
          iframe.src = iframe.dataset.tallySrc
        })
      }
    }

    // Small delay to ensure the iframe is in the DOM
    const timer = setTimeout(loadTally, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      data-tally-src="https://tally.so/embed/319Z01?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
      loading="lazy"
      width="100%"
      height="276"
      title="Request Access to Case Studies"
      className="rounded-xl border-0"
    />
  )
}

type ProjectMediaProps = {
  video?: string
  image?: string
  name: string
  description: string
  link?: string
  showForm?: boolean
}

function ProjectMedia({
  video,
  image,
  name,
  description,
  link,
  showForm,
}: ProjectMediaProps) {
  const handleProjectDetailsViewed = () => {
    posthog.capture('project_details_viewed', {
      project_name: name,
      project_description: description,
      has_form: showForm || false,
    })
    if (showForm) {
      posthog.capture('case_study_access_requested', {
        project_name: name,
      })
    }
  }

  const handleProjectLinkClick = () => {
    posthog.capture('project_clicked', {
      project_name: name,
      project_link: link,
    })
  }

  if (image) {
    return (
      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.3,
        }}
      >
        <MorphingDialogTrigger className="group">
          <div onClick={handleProjectDetailsViewed}>
            <img
              src={image}
              alt="Project preview"
              className="aspect-video w-full cursor-zoom-in rounded-xl object-cover grayscale transition-all duration-300 md:group-hover:grayscale-0"
            />
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative max-w-4xl">
            <div
              className={`flex flex-col gap-4 rounded-2xl p-4 ring-1 ring-inset ${
                showForm
                  ? 'bg-white ring-zinc-200/50'
                  : 'bg-zinc-50 ring-zinc-200/50 dark:bg-zinc-950 dark:ring-zinc-800/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-medium ${
                      showForm ? 'text-zinc-900' : 'text-zinc-900 dark:text-zinc-50'
                    }`}
                  >
                    {name}
                  </h3>
                  <p
                    className={`text-sm ${
                      showForm ? 'text-zinc-600' : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {description}
                  </p>
                </div>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleProjectLinkClick}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                  >
                    Visit
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                )}
              </div>
              {showForm ? (
                <TallyForm />
              ) : (
                <img
                  src={image}
                  alt="Project preview"
                  className="aspect-video h-[50vh] w-full rounded-xl object-cover md:h-[60vh]"
                />
              )}
            </div>
          </MorphingDialogContent>
          <MorphingDialogClose
            className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          >
            <XIcon className="h-5 w-5 text-zinc-500" />
          </MorphingDialogClose>
        </MorphingDialogContainer>
      </MorphingDialog>
    )
  }

  if (video) {
    return (
      <MorphingDialog
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.3,
        }}
      >
        <MorphingDialogTrigger className="group">
          <div onClick={handleProjectDetailsViewed}>
            <video
              src={video}
              autoPlay
              loop
              muted
              className="aspect-video w-full cursor-zoom-in rounded-xl grayscale transition-all duration-300 md:group-hover:grayscale-0"
            />
          </div>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative max-w-4xl">
            <div className="flex flex-col gap-4 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    {name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleProjectLinkClick}
                  className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  Visit
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                  >
                    <path
                      d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
              <video
                src={video}
                autoPlay
                loop
                muted
                className="aspect-video h-[50vh] w-full rounded-xl md:h-[60vh]"
              />
            </div>
          </MorphingDialogContent>
          <MorphingDialogClose
            className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
            variants={{
              initial: { opacity: 0 },
              animate: {
                opacity: 1,
                transition: { delay: 0.3, duration: 0.1 },
              },
              exit: { opacity: 0, transition: { duration: 0 } },
            }}
          >
            <XIcon className="h-5 w-5 text-zinc-500" />
          </MorphingDialogClose>
        </MorphingDialogContainer>
      </MorphingDialog>
    )
  }

  return null
}

function MagneticSocialLink({
  children,
  link,
  label,
}: {
  children: React.ReactNode
  link: string
  label: string
}) {
  const handleClick = () => {
    posthog.capture('social_link_clicked', {
      link_label: label,
      link_url: link,
    })
  }

  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        onClick={handleClick}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'secret' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <motion.main
      className="space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        {/* Social Links */}
        <div className="flex items-center justify-start space-x-3 mb-8">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link} label={link.label}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
        
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Former quizzer. Documentary lover. Serial vibe-coder. Product person by choice. You can reach me at{' '}
            <a
              href="mailto:meetadvaith@duck.com"
              className="underline hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              onClick={() => posthog.capture('email_link_clicked', { email: 'meetadvaith@duck.com' })}
            >
              meetadvaith@duck.com
            </a>
            {' '}or block my calendar{' '}
            <button
              data-cal-namespace="secret"
              data-cal-link="meetadvaith/secret"
              data-cal-config='{"layout":"month_view"}'
              className="underline transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              onClick={() => posthog.capture('calendar_booking_clicked', { calendar_link: 'meetadvaith/secret' })}
            >
            here
            </button>.
          </p>
        </div>
        <h3 className="mt-6 mb-3 text-lg font-medium">More About Me</h3>
        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span>Graduated from IIT Guwahati (Class of '24)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span>Building AI/ML Products for Ad-Tech at Media.net</span>
          </li>
          <li className="flex gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span>Currently based in Mumbai; grew up in Kerala</span>
          </li>
          <li className="flex gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span>Curious about consumer psychology; socially an ambivert who appreciates the right kind of interactions</span>
          </li>
        </ul>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Ideas in Motion</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectMedia
                  video={project.video}
                  image={project.image}
                  name={project.name}
                  description={project.description}
                  link={project.link}
                  showForm={project.showForm}
                />
              </div>
              <div className="px-1">
                {project.link ? (
                  <a
                    className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                    href={project.link}
                    target="_blank"
                    onClick={() => posthog.capture('project_clicked', { project_name: project.name, project_link: project.link })}
                  >
                    {project.name}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                  </a>
                ) : (
                  <span className="font-base font-[450] text-zinc-900 dark:text-zinc-50">
                    {project.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="blog"
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
                onClick={() => posthog.capture('blog_post_clicked', { post_title: post.title, post_link: post.link, post_uid: post.uid })}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>


    </motion.main>
  )
}
