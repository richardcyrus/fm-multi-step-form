import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { CheckboxCard } from '@/components/CheckboxCard'

export const Route = createFileRoute('/_onboarding/addons')({
  component: AddonsComponent,
})

const addonOptions = [
  {
    name: 'addons',
    label: 'Online Service',
    subLabel: 'Access to multiplayer games',
    price: 1,
    yearlyPrice: 10,
    showYearly: false,
  },
  {
    name: 'addons',
    label: 'Larger storage',
    subLabel: 'Extra 1TB of cloud save',
    price: 2,
    yearlyPrice: 20,
    showYearly: false,
  },
  {
    name: 'addons',
    label: 'Customizable profile',
    subLabel: 'Custom theme on your profile',
    price: 2,
    yearlyPrice: 20,
    showYearly: false,
  },
]

function AddonsComponent() {
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
          <form className="mt-6 md:mt-8 lg:mt-10" action="">
            <fieldset className="flex flex-col gap-2 md:gap-4">
              <legend className="sr-only">Pick your add-ons</legend>
              {addonOptions.map((addon, i) => (
                <CheckboxCard key={i} {...addon} />
              ))}
            </fieldset>
          </form>
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
        <Button variant="additional" type="button" className="mr-auto">
          Go Back
        </Button>
        <Button variant="primary" type="submit" className="ml-auto">
          Next Step
        </Button>
      </div>
    </>
  )
}
