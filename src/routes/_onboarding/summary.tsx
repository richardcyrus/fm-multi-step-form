import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { Route as addonsRoute } from '@/routes/_onboarding/addons'
import { useGamingPlanStore } from '@/store/store'
import { Route as plansRoute } from '@/routes/_onboarding/select-plans'
import { Route as thankYouRoute } from '@/routes/_onboarding/thank-you'

export const Route = createFileRoute('/_onboarding/summary')({
  component: SummaryComponent,
})

function SummaryComponent() {
  const navigate = Route.useNavigate()

  const plan = useGamingPlanStore((state) => state.plan)
  const plan_monthly_price = useGamingPlanStore(
    (state) => state.plan_monthly_price,
  )
  const plan_yearly_price = useGamingPlanStore(
    (state) => state.plan_yearly_price,
  )
  const show_yearly = useGamingPlanStore((state) => state.show_yearly)
  const chosen_addons = useGamingPlanStore((state) => state.chosen_addons)
  const monthly_total = useGamingPlanStore(
    (state) =>
      state.plan_monthly_price +
      state.chosen_addons.reduce((sum, addon) => sum + addon.monthly_price, 0),
  )
  const yearly_total = useGamingPlanStore(
    (state) =>
      state.plan_yearly_price +
      state.chosen_addons.reduce((sum, addon) => sum + addon.yearly_price, 0),
  )

  const { reset } = useGamingPlanStore()

  const confirmPlan = () => {
    reset()
    navigate({ to: thankYouRoute.to })
  }

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
                  {plan} ({show_yearly ? 'Yearly' : 'Monthly'})
                </span>
                <span className="text-sm font-normal text-grey-500">
                  <Link
                    to={plansRoute.to}
                    className="underline hover:text-purple-600"
                  >
                    Change
                  </Link>
                </span>
              </div>
              <div className="text-sm font-bold tracking-widest text-blue-950 md:text-base lg:tracking-normal">
                {show_yearly
                  ? `$${plan_yearly_price}/yr`
                  : `$${plan_monthly_price}/mo`}
              </div>
            </div>
            <hr className="my-4 border-0 border-t border-grey-500/20" />
            {chosen_addons.map((addon) => (
              <div
                key={addon.id}
                className="flex items-center justify-between md:gap-2"
              >
                <span className="text-sm text-grey-500">{addon.label}</span>
                <span className="text-sm text-blue-950">
                  {show_yearly
                    ? `+$${addon.yearly_price}/yr`
                    : `+$${addon.monthly_price}/mo`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between px-4 md:mt-8 lg:px-6">
            <span className="text-sm text-grey-500">
              Total (per {`${show_yearly ? 'year' : 'month'}`})
            </span>
            <span className="text-base font-bold text-purple-600 md:text-xl">
              {show_yearly ? `$${yearly_total}/yr` : `+$${monthly_total}/mo`}
            </span>
          </div>
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:bg-transparent md:pr-17.5 md:pl-10 lg:pr-25 lg:pl-21">
        <Button
          variant="additional"
          type="button"
          className="mr-auto"
          onClick={() => navigate({ to: addonsRoute.to })}
        >
          Go Back
        </Button>
        <Button
          variant="secondary"
          type="submit"
          className="ml-auto"
          onClick={confirmPlan}
        >
          Confirm
        </Button>
      </div>
    </>
  )
}
