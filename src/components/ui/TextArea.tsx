import { useId } from 'react'
import type { ReactNode, TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  supportingText?: string
  counter?: string
  leadingElement?: ReactNode
  trailingElement?: ReactNode
  error?: boolean
}

export function TextArea({ label, supportingText, counter, leadingElement, trailingElement, error = false, className = '', id, ...props }: TextAreaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const hintId = supportingText ? `${fieldId}-hint` : undefined

  return (
    <label className={`collapse-field collapse-text-area ${error ? 'is-error' : ''} ${props.disabled ? 'is-disabled' : ''} ${className}`} htmlFor={fieldId}>
      <span className="collapse-field__content">
        {leadingElement && <span className="collapse-field__leading" aria-hidden="true">{leadingElement}</span>}
        <span className="collapse-field__input-wrap">
          <span className="collapse-field__label">{label}</span>
          <textarea id={fieldId} aria-invalid={error || undefined} aria-describedby={hintId} {...props} />
        </span>
        {trailingElement && <span className="collapse-field__trailing">{trailingElement}</span>}
      </span>
      {(supportingText || counter) && (
        <span className="collapse-field__support" id={hintId}>
          <span>{supportingText}</span>
          {counter && <span>{counter}</span>}
        </span>
      )}
    </label>
  )
}
