import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="min-h-lvh bg-[url(/bg-sidebar-mobile.svg)] bg-contain bg-no-repeat md:grid md:place-content-center md:bg-none">
        <div className="flex min-h-lvh flex-col md:grid md:min-h-auto md:min-w-171.5 md:grid-cols-[238px_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_80px] md:rounded-[15px] md:bg-white md:shadow-lg lg:min-w-235 lg:grid-cols-[306px_minmax(0,1fr)]">
          <aside className="py-8 md:row-span-full md:p-4">
            <div className="flex justify-center md:min-h-142 md:justify-start md:rounded-[15px] md:bg-[url(/bg-sidebar-desktop.svg)] md:bg-size-[274px_568px] md:bg-no-repeat md:px-7 md:pt-10 lg:bg-auto lg:bg-center">
              <ul>
                <li className="inline-flex md:flex">
                  <Link to="/your-info" className="md:flex">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white in-data-[status=active]:border-none in-data-[status=active]:bg-blue-200">
                      <span className="text-center text-sm font-bold text-white in-data-[status=active]:text-blue-950">
                        1
                      </span>
                    </span>
                    <span className="hidden md:flex md:flex-col md:pl-4">
                      <span className="text-xs font-normal text-blue-300 uppercase">
                        Step 1
                      </span>
                      <span className="text-sm font-bold text-white uppercase">
                        Your Info
                      </span>
                    </span>
                  </Link>
                </li>
                <li className="ml-4 inline-flex md:mt-8 md:ml-0 md:flex">
                  <Link to="/select-plans" className="md:flex">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white in-data-[status=active]:border-none in-data-[status=active]:bg-blue-200">
                      <span className="text-center text-sm font-bold text-white in-data-[status=active]:text-blue-950">
                        2
                      </span>
                    </span>
                    <span className="hidden md:flex md:flex-col md:pl-4">
                      <span className="text-xs font-normal text-blue-300 uppercase">
                        Step 2
                      </span>
                      <span className="text-sm font-bold text-white uppercase">
                        Select Plan
                      </span>
                    </span>
                  </Link>
                </li>
                <li className="ml-4 inline-flex md:mt-8 md:ml-0 md:flex">
                  <Link to="/addons" className="md:flex">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white in-data-[status=active]:border-none in-data-[status=active]:bg-blue-200">
                      <span className="text-center text-sm font-bold text-white in-data-[status=active]:text-blue-950">
                        3
                      </span>
                    </span>
                    <span className="hidden md:flex md:flex-col md:pl-4">
                      <span className="text-xs font-normal text-blue-300 uppercase">
                        Step 3
                      </span>
                      <span className="text-sm font-bold text-white uppercase">
                        Add-ons
                      </span>
                    </span>
                  </Link>
                </li>
                <li className="ml-4 inline-flex md:mt-8 md:ml-0 md:flex">
                  <Link to="/summary" className="md:flex">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white in-data-[status=active]:border-none in-data-[status=active]:bg-blue-200">
                      <span className="text-center text-sm font-bold text-white in-data-[status=active]:text-blue-950">
                        4
                      </span>
                    </span>
                    <span className="hidden md:flex md:flex-col md:pl-4">
                      <span className="text-xs font-normal text-blue-300 uppercase">
                        Step 4
                      </span>
                      <span className="text-sm font-bold text-white uppercase">
                        Summary
                      </span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <Outlet />
        </div>
      </div>
    </>
  )
}
