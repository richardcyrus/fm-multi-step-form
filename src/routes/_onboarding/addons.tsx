import { createFileRoute, redirect } from '@tanstack/react-router'
import type { AddOnSchema, AddonsStepSchema } from '@/lib/schema'
import { useAppForm } from '@/hooks/form'
import {
  validatePersonalInfo,
  validatePlanSelection,
} from '@/lib/routeValidation'
import { addonsStepSchema } from '@/lib/schema'
import { Route as plansRoute } from '@/routes/_onboarding/select-plan'
import { Route as summaryRoute } from '@/routes/_onboarding/summary'
import { useAddons, useGamingPlanStore } from '@/store/store'
import { addonOptions } from '@/data/gamingData'
import { StepActions, StepLayout } from '@/components/StepLayout'

export const Route = createFileRoute('/_onboarding/addons')({
  beforeLoad: ({ context }) => {
    const storeState = context.getStoreState()

    // First validate personal info
    const personalInfoValidation = validatePersonalInfo(storeState)
    if (!personalInfoValidation.isValid) {
      throw redirect({
        to: personalInfoValidation.redirectTo!,
      })
    }

    // Then validate plan selection
    const planValidation = validatePlanSelection(storeState)
    if (!planValidation.isValid) {
      throw redirect({
        to: planValidation.redirectTo!,
      })
    }
  },
  component: AddonsComponent,
})

function AddonsComponent() {
  const navigate = Route.useNavigate()
  const setData = useGamingPlanStore((state) => state.setData)

  const { addons, chosen_addons, show_yearly } = useAddons()

  const form = useAppForm({
    defaultValues: {
      show_yearly: show_yearly,
      addons: addons,
      chosen_addons: chosen_addons,
    },
    validators: {
      onChange: addonsStepSchema,
    },
    listeners: {
      onSubmit: ({ formApi }) => {
        const addons_list = formApi.getFieldValue('addons')

        const addons_chosen = addonOptions.reduce<Array<AddOnSchema>>(
          (accumulator, option) => {
            const item = addons_list.find((addon) => addon === option.name)
            if (item) {
              accumulator.push(option)
            }

            return accumulator
          },
          [],
        )

        formApi.setFieldValue('chosen_addons', addons_chosen)
      },
    },
    onSubmit: ({ value }: { value: AddonsStepSchema }) => {
      setData(value)
      navigate({ to: summaryRoute.to })
    },
  })

  return (
    <>
      <StepLayout
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
        actions={
          <StepActions
            formId="select-addons"
            onBack={() => navigate({ to: plansRoute.to })}
          />
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          id="select-addons"
        >
          <fieldset className="flex flex-col gap-2 md:gap-4">
            <legend className="sr-only">Pick your add-ons</legend>
            {addonOptions.map((option, i) => (
              <form.AppField key={i} name="addons">
                {(field) => (
                  <field.CheckboxCard
                    label={option.label}
                    subLabel={option.description}
                    price={option.monthly_price}
                    yearlyPrice={option.yearly_price}
                    showYearly={show_yearly}
                    isArray={true}
                    value={option.name}
                  />
                )}
              </form.AppField>
            ))}
          </fieldset>
        </form>
      </StepLayout>
    </>
  )
}
