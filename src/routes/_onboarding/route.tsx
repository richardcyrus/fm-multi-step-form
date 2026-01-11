import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_onboarding')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="bg-[url(/bg-sidebar-mobile.svg)] bg-contain bg-no-repeat">
        <aside className="py-8">
          <div className="flex justify-center">
            <ul>
              <li className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white has-data-[status=active]:border-none has-data-[status=active]:bg-blue-200">
                <Link
                  to="/your-info"
                  className="text-center text-sm font-bold text-white"
                  activeProps={{
                    className: `data-[status=active]:text-blue-950`,
                  }}
                >
                  1
                </Link>
              </li>
              <li className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white has-data-[status=active]:border-none has-data-[status=active]:bg-blue-200">
                <Link
                  to="/select-plans"
                  className="text-center text-sm font-bold text-white"
                  activeProps={{
                    className: `data-[status=active]:text-blue-950`,
                  }}
                >
                  2
                </Link>
              </li>
              <li className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white has-data-[status=active]:border-none has-data-[status=active]:bg-blue-200">
                <Link
                  to="/addons"
                  className="text-center text-sm font-bold text-white"
                  activeProps={{
                    className: `data-[status=active]:text-blue-950`,
                  }}
                >
                  3
                </Link>
              </li>
              <li className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white has-data-[status=active]:border-none has-data-[status=active]:bg-blue-200">
                <Link
                  to="/summary"
                  className="text-center text-sm font-bold text-white"
                  activeProps={{
                    className: `data-[status=active]:text-blue-950`,
                  }}
                >
                  4
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8">
          <Outlet />
        </div>
      </div>
    </>
  )
}
