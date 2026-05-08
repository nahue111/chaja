import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    // Disable smooth scroll temporarily so the jump is instant
    document.documentElement.style.scrollBehavior = 'auto'
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // Re-enable smooth scroll for in-page anchor links
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = ''
    })
  }, [pathname])

  return null
}
