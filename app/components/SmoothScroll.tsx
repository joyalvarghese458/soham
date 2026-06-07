'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    })

    lenisRef.current = lenis
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    // GSAP ticker time is in seconds; Lenis raf expects ms
    const rafFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafFn)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).lenis = undefined
    }
  }, [])

  return <>{children}</>
}
