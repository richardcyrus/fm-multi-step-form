import { createFileRoute } from '@tanstack/react-router'
import type { YourInfoStepSchema } from '@/lib/schema'
import { useAppForm } from '@/hooks/form'
import { yourInfoStepSchema } from '@/lib/schema'
import { useGamingPlanStore, usePersonalInfo } from '@/store/store'
import { Route as plansRoute } from '@/routes/_onboarding/select-plan'

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
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none lg:mr-25 lg:ml-21 lg:pr-0 lg:pl-0">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Personal info
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            Please provide your name, email address, and phone number.
          </p>
          <form
            className="mt-6 md:mt-8 lg:mt-10"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
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
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:bg-transparent md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
        <form.AppForm>
          <form.SubmitButton
            form="your-info"
            variant="primary"
            className="ml-auto"
          >
            Next Step
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </>
  )
}
