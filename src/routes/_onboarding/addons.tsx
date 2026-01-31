import { createFileRoute, redirect } from '@tanstack/react-router'
import type { AddOnSchema, AddonsStepSchema } from '@/lib/schema'
import { Button } from '@/components/Button'
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
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none lg:mr-25 lg:ml-21 lg:pr-0 lg:pl-0">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Pick add-ons
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            Add-ons help enhance your gaming experience.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            id="select-addons"
            className="mt-6 md:mt-8 lg:mt-10"
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
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:bg-transparent md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
        <Button
          variant="additional"
          type="button"
          className="mr-auto"
          onClick={() => navigate({ to: plansRoute.to })}
        >
          Go Back
        </Button>
        <form.AppForm>
          <form.SubmitButton
            form="select-addons"
            variant="primary"
            type="submit"
            className="ml-auto"
          >
            Next Step
          </form.SubmitButton>
        </form.AppForm>
      </div>
    </>
  )
}
