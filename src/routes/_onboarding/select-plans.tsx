import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { RadioCard } from '@/components/RadioCard'
import { ToggleSwitch } from '@/components/ToggleSwitch'

import arcadeIcon from '@/assets/icon-arcade.svg'
import advancedIcon from '@/assets/icon-advanced.svg'
import proIcon from '@/assets/icon-pro.svg'

const planOptions = [
  {
    name: 'plan',
    label: 'Arcade',
    icon: arcadeIcon,
    price: 9,
    yearlyPrice: 90,
    showYearly: false,
  },
  {
    name: 'plan',
    label: 'Advanced',
    icon: advancedIcon,
    price: 12,
    yearlyPrice: 120,
    showYearly: false,
  },
  {
    name: 'plan',
    label: 'Pro',
    icon: proIcon,
    price: 15,
    yearlyPrice: 150,
    showYearly: false,
  },
]

export const Route = createFileRoute('/_onboarding/select-plans')({
  component: SelectPlansComponent,
})

function SelectPlansComponent() {
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
          <form className="mt-6 md:mt-8 lg:mt-10" action="">
            <fieldset className="flex flex-col gap-2 lg:flex-row lg:gap-4.5">
              <legend className="sr-only">Select your plan</legend>
              {planOptions.map((plan, i) => (
                <RadioCard key={i} {...plan} />
              ))}
            </fieldset>
            <div className="mt-6 lg:mt-8">
              <ToggleSwitch leftLabel="Monthly" rightLabel="Yearly" />
            </div>
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
