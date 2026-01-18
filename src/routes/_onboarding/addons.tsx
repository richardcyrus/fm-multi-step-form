import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { useGamingPlanStore } from '@/store/store'
import { useAppForm } from '@/hooks/form'
import { Route as summaryRoute } from '@/routes/_onboarding/summary'
import { Route as plansRoute } from '@/routes/_onboarding/select-plans'

export const Route = createFileRoute('/_onboarding/addons')({
  component: AddonsComponent,
})

function AddonsComponent() {
  const navigate = Route.useNavigate()
  const setData = useGamingPlanStore((state) => state.setData)

  const show_yearly = useGamingPlanStore((state) => state.show_yearly)
  const addons = useGamingPlanStore((state) => state.addons)
  const chosen_addons = useGamingPlanStore((state) => state.chosen_addons)

  const form = useAppForm({
    defaultValues: {
      show_yearly: show_yearly,
      addons: addons,
      chosen_addons: chosen_addons,
    },
    listeners: {
      onSubmit: ({ formApi }) => {
        const addons_list = formApi.getFieldValue('addons')
        const addons_chosen = []

        if (addons_list.includes('online_service')) {
          addons_chosen.push({
            id: 'online_service',
            label: 'Online Service',
            monthly_price: 1,
            yearly_price: 10,
          })
        }
        if (addons_list.includes('larger_storage')) {
          addons_chosen.push({
            id: 'larger_storage',
            label: 'Larger storage',
            monthly_price: 2,
            yearly_price: 20,
          })
        }
        if (addons_list.includes('custom_profile')) {
          addons_chosen.push({
            id: 'custom_profile',
            label: 'Customizable profile',
            monthly_price: 2,
            yearly_price: 20,
          })
        }

        formApi.setFieldValue('chosen_addons', addons_chosen)
      },
    },
    onSubmit: ({ value }) => {
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
              <form.AppField name="addons">
                {(field) => (
                  <field.CheckboxCard
                    label="Online Service"
                    subLabel="Access to multiplayer games"
                    price={1}
                    yearlyPrice={10}
                    showYearly={show_yearly}
                    isArray={true}
                    value="online_service"
                  />
                )}
              </form.AppField>
              <form.AppField name="addons">
                {(field) => (
                  <field.CheckboxCard
                    label="Larger storage"
                    subLabel="Extra 1TB of cloud save"
                    price={2}
                    yearlyPrice={20}
                    showYearly={show_yearly}
                    isArray={true}
                    value="larger_storage"
                  />
                )}
              </form.AppField>
              <form.AppField name="addons">
                {(field) => (
                  <field.CheckboxCard
                    label="Customizable profile"
                    subLabel="Custom theme on your profile"
                    price={2}
                    yearlyPrice={20}
                    showYearly={show_yearly}
                    isArray={true}
                    value="custom_profile"
                  />
                )}
              </form.AppField>
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
