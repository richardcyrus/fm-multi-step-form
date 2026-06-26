import React from 'react'
import { useForm } from '@tanstack/react-form'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { fieldContext, formContext } from '@/hooks/form-context'

type FieldApi =
  ReturnType<ReturnType<typeof useForm>['Field']> extends (
    props: infer P,
  ) => any
    ? P extends { children: infer F }
      ? F extends (field: infer A) => any
        ? A
        : never
      : never
    : never

type FieldMeta = {
  errors: Array<string | { message: string }>
  isTouched: boolean
  isValid: boolean
}

export function createMockFieldApi(
  overrides?: Partial<{
    name: string
    value: any
    meta: Partial<FieldMeta>
  }>,
) {
  const meta: FieldMeta = {
    errors: [],
    isTouched: false,
    isValid: true,
    ...overrides?.meta,
  }

  const store = {
    store: {
      subscribe: () => () => {},
      getState: () => ({ meta }),
    },
  }

  return {
    name: overrides?.name ?? 'test_field',
    state: {
      value: overrides?.value ?? '',
      meta,
    },
    handleChange: vi.fn(),
    handleBlur: vi.fn(),
    pushValue: vi.fn(),
    removeValue: vi.fn(),
    setValue: vi.fn(),
    ...store,
  } as any
}

export function createMockFormApi(overrides?: Record<string, any>) {
  return {
    handleSubmit: vi.fn(),
    Subscribe: vi.fn(({ children }: any) => children({ isSubmitting: false })),
    Field: vi.fn(),
    ...overrides,
  } as any
}

export function renderWithFieldContext(
  ui: ReactElement,
  options: {
    fieldName: string
    defaultValues?: Record<string, any>
    validators?: Record<string, any>
  } & Omit<RenderOptions, 'wrapper'> = {} as any,
) {
  const {
    fieldName,
    defaultValues = { [fieldName]: '' },
    validators,
    ...renderOptions
  } = options as any

  function Wrapper({ children }: { children: React.ReactNode }) {
    const form = useForm({
      defaultValues,
      validators,
    })
    return (
      <formContext.Provider value={form as any}>
        <form.Field name={fieldName}>
          {(field: any) => (
            <fieldContext.Provider value={field}>
              {children}
            </fieldContext.Provider>
          )}
        </form.Field>
      </formContext.Provider>
    )
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export function renderWithFormContext(
  ui: ReactElement,
  options: {
    defaultValues?: Record<string, any>
  } & Omit<RenderOptions, 'wrapper'> = {},
) {
  const { defaultValues = {}, ...renderOptions } = options as any

  function Wrapper({ children }: { children: React.ReactNode }) {
    const form = useForm({ defaultValues })
    return (
      <formContext.Provider value={form as any}>
        {children}
      </formContext.Provider>
    )
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export { screen, fireEvent, waitFor, act } from '@testing-library/react'
export { userEvent }
