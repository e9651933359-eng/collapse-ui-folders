import type { ImgHTMLAttributes } from 'react'

type FederationIconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  size?: 'xs' | 's' | 'm'
}

export function FederationIcon({ alt = '', className = '', size = 'm', ...props }: FederationIconProps) {
  return (
    <img
      className={`collapse-federation-icon collapse-federation-icon--${size} ${className}`}
      src="assets/figma/ic-federation-outline.svg"
      alt={alt}
      aria-hidden={props['aria-label'] || alt ? undefined : true}
      {...props}
    />
  )
}
