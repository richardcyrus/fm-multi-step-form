import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'

export const Route = createFileRoute('/_onboarding/summary')({
  component: SummaryComponent,
})

function SummaryComponent() {
  return (
    <>
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none lg:mr-25 lg:ml-21 lg:pr-0 lg:pl-0">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Finishing up
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            Double-check everything looks OK before confirming.
          </p>
          <div className="mt-6 rounded-lg bg-blue-50 p-4 md:mt-8 lg:mt-10 lg:px-6 lg:py-4">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
              <div className="flex flex-col md:gap-2">
                <span className="text-sm font-medium text-blue-950 md:text-base">
                  Arcade (Yearly)
                </span>
                <span className="text-sm font-normal text-grey-500">
                  <Link to="/select-plans" className="hover:text-purple-600">
                    Change
                  </Link>
                </span>
              </div>
              <div className="text-sm font-bold tracking-widest text-blue-950 md:text-base lg:tracking-normal">
                $90/yr
              </div>
            </div>
            <hr className="my-4 border-0 border-t border-grey-500/20" />
            <div className="flex items-center justify-between md:gap-2">
              <span className="text-sm text-grey-500">Online service</span>
              <span className="text-sm text-blue-950">+$10/yr</span>
            </div>
            <div className="mt-4 flex items-center justify-between md:gap-2">
              <span className="text-sm text-grey-500">Larger storage</span>
              <span className="text-sm text-blue-950">+$20/yr</span>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between px-4 md:mt-8 lg:px-6">
            <span className="text-sm text-grey-500">Total (per month)</span>
            <span className="text-base font-bold text-purple-600 md:text-xl">
              +120/yr
            </span>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
        <Button variant="additional" type="button" className="mr-auto">
          Go Back
        </Button>
        <Button variant="secondary" type="submit" className="ml-auto">
          Confirm
        </Button>
      </div>
    </>
  )
}
