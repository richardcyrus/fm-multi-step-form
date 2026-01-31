import { useStore } from '@tanstack/react-form-start'
import { createFileRoute, redirect } from '@tanstack/react-router'
import type { SelectPlanStepSchema } from '@/lib/schema'
import { useAppForm } from '@/hooks/form'
import { validatePersonalInfo } from '@/lib/routeValidation'
import { selectPlanStepSchema } from '@/lib/schema'
import { Route as addonsRoute } from '@/routes/_onboarding/addons'
import { Route as yourInfoRoute } from '@/routes/_onboarding/your-info'
import { useGamingPlanStore, usePlanSelection } from '@/store/store'
import { PLAN_OPTIONS } from '@/data/gamingData'
import { StepActions, StepLayout } from '@/components/StepLayout'

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
      <StepLayout
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
        actions={
          <StepActions
            formId="select-plan"
            onBack={() => navigate({ to: yourInfoRoute.to })}
          />
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
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
            {PLAN_OPTIONS.map((planOpt) => (
              <form.AppField
                key={planOpt.label}
                name="plan"
                listeners={{
                  onChange: () => {
                    form.setFieldValue(
                      'plan_monthly_price',
                      planOpt.monthly_price,
                    )
                    form.setFieldValue(
                      'plan_yearly_price',
                      planOpt.yearly_price,
                    )
                  },
                }}
              >
                {(field) => (
                  <field.RadioCard
                    label={planOpt.label}
                    icon={planOpt.icon}
                    price={planOpt.monthly_price}
                    yearlyPrice={planOpt.yearly_price}
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
      </StepLayout>
    </>
  )
}
