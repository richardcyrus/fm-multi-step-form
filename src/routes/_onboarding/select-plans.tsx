import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form-start'
import type { z } from 'zod'
import { Button } from '@/components/Button'
import { useAppForm } from '@/hooks/form'
import { gamingPlanSchema } from '@/lib/schema'
import { useGamingPlanStore } from '@/store/store'
import { Route as addonsRoute } from '@/routes/_onboarding/addons'
import { Route as yourInfoRoute } from '@/routes/_onboarding/your-info'

import arcadeIcon from '@/assets/icon-arcade.svg'
import advancedIcon from '@/assets/icon-advanced.svg'
import proIcon from '@/assets/icon-pro.svg'

export const Route = createFileRoute('/_onboarding/select-plans')({
  component: SelectPlansComponent,
})

const selectPlanSchema = gamingPlanSchema.pick({
  plan: true,
  plan_monthly_price: true,
  plan_yearly_price: true,
  show_yearly: true,
})

type SelectPlanSchema = z.infer<typeof selectPlanSchema>

function SelectPlansComponent() {
  const navigate = Route.useNavigate()
  const setData = useGamingPlanStore((state) => state.setData)

  const plan = useGamingPlanStore((state) => state.plan)
  const plan_monthly_price = useGamingPlanStore(
    (state) => state.plan_monthly_price,
  )
  const plan_yearly_price = useGamingPlanStore(
    (state) => state.plan_yearly_price,
  )
  const show_yearly = useGamingPlanStore((state) => state.show_yearly)

  const form = useAppForm({
    defaultValues: {
      plan: plan,
      plan_monthly_price: plan_monthly_price,
      plan_yearly_price: plan_yearly_price,
      show_yearly: show_yearly,
    },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        switch (fieldApi.state.value) {
          case 'Arcade': {
            formApi.setFieldValue('plan_monthly_price', 9)
            formApi.setFieldValue('plan_yearly_price', 90)
            break
          }
          case 'Advanced': {
            formApi.setFieldValue('plan_monthly_price', 12)
            formApi.setFieldValue('plan_yearly_price', 120)
            break
          }
          case 'Pro': {
            formApi.setFieldValue('plan_monthly_price', 15)
            formApi.setFieldValue('plan_yearly_price', 150)
            break
          }
        }
      },
    },
    onSubmit: ({ value }: { value: SelectPlanSchema }) => {
      setData(value)
      navigate({ to: addonsRoute.to })
    },
  })

  const showYearly = useStore(form.store, (state) => state.values.show_yearly)

  return (
    <>
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none lg:mr-25 lg:ml-21 lg:pr-0 lg:pl-0">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Select your plan
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            You have the option of monthly or yearly billing.
          </p>
          <form
            className="mt-6 md:mt-8 lg:mt-10"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            id="select-plans"
          >
            <fieldset className="flex flex-col gap-2 lg:flex-row lg:gap-4.5">
              <legend className="sr-only">Select your plan</legend>
              <form.AppField name="plan">
                {(field) => (
                  <field.RadioCard
                    label="Arcade"
                    icon={arcadeIcon}
                    price={9}
                    yearlyPrice={90}
                    showYearly={showYearly}
                  />
                )}
              </form.AppField>
              <form.AppField name="plan">
                {(field) => (
                  <field.RadioCard
                    label="Advanced"
                    icon={advancedIcon}
                    price={12}
                    yearlyPrice={120}
                    showYearly={showYearly}
                  />
                )}
              </form.AppField>
              <form.AppField name="plan">
                {(field) => (
                  <field.RadioCard
                    label="Pro"
                    icon={proIcon}
                    price={15}
                    yearlyPrice={150}
                    showYearly={showYearly}
                  />
                )}
              </form.AppField>
            </fieldset>
            <div className="mt-6 lg:mt-8">
              <form.AppField name="show_yearly">
                {(field) => (
                  <field.ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />
                )}
              </form.AppField>
            </div>
          </form>
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:bg-transparent md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
        <Button
          variant="additional"
          type="button"
          className="mr-auto"
          onClick={() => navigate({ to: yourInfoRoute.to })}
        >
          Go Back
        </Button>
        <form.AppForm>
          <form.SubmitButton
            form="select-plans"
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
