import * as React from 'react'
import { Button } from '@/components/Button'

interface StepActionsProps {
  onBack?: () => void
  backLabel?: string
  nextLabel?: string
  formId?: string
  children?: React.ReactNode
}

export function StepActions({
  onBack,
  backLabel = 'Go Back',
  nextLabel = 'Next Step',
  formId,
  children,
}: StepActionsProps) {
  return (
    <>
      {onBack && (
        <Button
          variant="additional"
          type="button"
          className="mr-auto"
          onClick={onBack}
        >
          {backLabel}
        </Button>
      )}
      {children || (
        <Button
          variant="primary"
          type="submit"
          form={formId}
          className="ml-auto"
        >
          {nextLabel}
        </Button>
      )}
    </>
  )
}
