import { useStore } from '@tanstack/react-form-start'
import { createFileRoute, redirect } from '@tanstack/react-router'
import type { SelectPlanStepSchema } from '@/lib/schema'
import { Button } from '@/components/Button'
import { useAppForm } from '@/hooks/form'
import { validatePersonalInfo } from '@/lib/routeValidation'
import { selectPlanStepSchema } from '@/lib/schema'
import { Route as addonsRoute } from '@/routes/_onboarding/addons'
import { Route as yourInfoRoute } from '@/routes/_onboarding/your-info'
import { useGamingPlanStore, usePlanSelection } from '@/store/store'
import { planOptions } from '@/data/plans'

export const Route = createFileRoute('/_onboarding/select-plan')({
  beforeLoad: ({ context }) => {
    const storeState = context.getStoreState()
    const validation = validatePersonalInfo(storeState)

    if (!validation.isValid) {
      throw redirect({
        to: validation.redirectTo!,
      })
    }
  },
  component: SelectPlansComponent,
})

function SelectPlansComponent() {
  const navigate = Route.useNavigate()

  const setData = useGamingPlanStore((state) => state.setData)

  const { plan, plan_monthly_price, plan_yearly_price, show_yearly } =
    usePlanSelection()

  const form = useAppForm({
    defaultValues: {
      plan: plan,
      plan_monthly_price: plan_monthly_price,
      plan_yearly_price: plan_yearly_price,
      show_yearly: show_yearly,
    },
    validators: {
      onChange: selectPlanStepSchema,
    },
    onSubmit: ({ value }: { value: SelectPlanStepSchema }) => {
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
            id="select-plan"
          >
            <form.AppField name="plan_monthly_price">
              {(field) => (
                <input
                  type="hidden"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
              )}
            </form.AppField>
            <form.AppField name="plan_yearly_price">
              {(field) => (
                <input
                  type="hidden"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
              )}
            </form.AppField>
            <fieldset className="flex flex-col gap-2 lg:flex-row lg:gap-4.5">
              <legend className="sr-only">Select your plan</legend>
              {planOptions.map((planOpt) => (
                <form.AppField
                  key={planOpt.label}
                  name="plan"
                  listeners={{
                    onChange: () => {
                      form.setFieldValue('plan_monthly_price', planOpt.price)
                      form.setFieldValue(
                        'plan_yearly_price',
                        planOpt.yearlyPrice,
                      )
                    },
                  }}
                >
                  {(field) => (
                    <field.RadioCard
                      label={planOpt.label}
                      icon={planOpt.icon}
                      price={planOpt.price}
                      yearlyPrice={planOpt.yearlyPrice}
                      showYearly={showYearly}
                    />
                  )}
                </form.AppField>
              ))}
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
            form="select-plan"
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
