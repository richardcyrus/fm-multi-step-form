import { createFileRoute } from '@tanstack/react-router'
import { TextField } from '@/components/Input'
import { Button } from '@/components/Button'

export const Route = createFileRoute('/_onboarding/your-info')({
  component: YourInfoComponent,
})

const formFields = [
  {
    label: 'Name',
    name: 'name',
    fieldType: 'text',
    placeholder: 'e.g Stephen King',
  },
  {
    label: 'Email Address',
    name: 'email_address',
    fieldType: 'email',
    placeholder: 'e.g stephenking@lorem.com',
  },
  {
    label: 'Phone Number',
    name: 'phone_number',
    fieldType: 'tel',
    placeholder: 'e.g +1 234 567 890',
  },
]

function YourInfoComponent() {
  return (
    <>
      <div className="flex-1">
        <div className="mx-4 rounded-[10px] bg-white px-6 py-8 shadow-lg md:pt-11 md:pr-14 md:pb-8 md:shadow-none">
          <h1 className="text-2xl font-bold text-blue-950 md:text-[2rem]">
            Personal info
          </h1>
          <p className="mt-2 text-base font-normal text-grey-500">
            Please provide your name, email address, and phone number.
          </p>
          <form action="" className="mt-6 md:mt-8 lg:mt-10">
            <div className="space-y-4 md:space-y-6">
              {formFields.map((field, i) => (
                <TextField
                  key={i}
                  label={field.label}
                  name={field.name}
                  fieldType={field.fieldType}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
      <div className="inline-flex w-full justify-end bg-white p-4 md:ml-2 md:bg-transparent md:pr-20">
        <Button variant="primary" type="submit" className="ml-auto">
          Next Step
        </Button>
      </div>
    </>
  )
}
