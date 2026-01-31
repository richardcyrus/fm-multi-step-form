import { createFileRoute } from '@tanstack/react-router'
import type { YourInfoStepSchema } from '@/lib/schema'
import { useAppForm } from '@/hooks/form'
import { yourInfoStepSchema } from '@/lib/schema'
import { useGamingPlanStore, usePersonalInfo } from '@/store/store'
import { Route as plansRoute } from '@/routes/_onboarding/select-plan'
import { StepActions, StepLayout } from '@/components/StepLayout'

export const Route = createFileRoute('/_onboarding/your-info')({
  component: YourInfoComponent,
})

function YourInfoComponent() {
  const navigate = Route.useNavigate()

  const setData = useGamingPlanStore((state) => state.setData)

  const { full_name, email_address, phone_number } = usePersonalInfo()

  const form = useAppForm({
    defaultValues: {
      full_name: full_name,
      email_address: email_address,
      phone_number: phone_number,
    },
    validators: {
      onChange: yourInfoStepSchema,
    },
    onSubmit: ({ value }: { value: YourInfoStepSchema }) => {
      setData(value)
      navigate({ to: plansRoute.to })
    },
  })

  return (
    <>
      <StepLayout
        title="Personal info"
        description="Please provide your name, email address, and phone number."
        actions={<StepActions formId="your-info" />}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          id="your-info"
        >
          <div className="space-y-4 md:space-y-6">
            <form.AppField name="full_name">
              {(field) => (
                <field.TextField
                  label="Name"
                  fieldType="text"
                  placeholder="e.g. Stephen King"
                />
              )}
            </form.AppField>
            <form.AppField name="email_address">
              {(field) => (
                <field.TextField
                  label="Email Address"
                  fieldType="email"
                  placeholder="e.g. stephenking@lorem.com"
                />
              )}
            </form.AppField>
            <form.AppField name="phone_number">
              {(field) => (
                <field.TextField
                  label="Phone Number"
                  fieldType="tel"
                  placeholder="e.g. +1 234 567 890"
                />
              )}
            </form.AppField>
          </div>
        </form>
      </StepLayout>
    </>
  )
}
