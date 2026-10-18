import type { CSSProperties } from 'react'
import './feedback.css'

export type SkeletonSize = 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | 80 | 88 | 96

type SkeletonProps = {
  className?: string
  height?: number | string
  size?: SkeletonSize
  type?: 'block' | 'circle'
  width?: number | string
}

export function Skeleton({ className = '', height, size = 44, type = 'block', width }: SkeletonProps) {
  const style = { width: width ?? size, height: height ?? size } as CSSProperties
  return <span className={`collapse-skeleton collapse-skeleton--${type} ${className}`} style={style} aria-hidden="true" />
}
