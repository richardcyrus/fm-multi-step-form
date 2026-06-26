import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useStepForm } from '../useStepForm'
import { useGamingPlanStore } from '@/store/store'

const mockUseAppForm = vi.hoisted(() => vi.fn())

vi.mock('../form', () => ({
  useAppForm: mockUseAppForm,
}))

beforeEach(() => {
  vi.clearAllMocks()
  useGamingPlanStore.setState(useGamingPlanStore.getInitialState(), true)
})

describe('useStepForm', () => {
  it('creates a form with defaultValues and onChange validator', () => {
    const defaultValues = { full_name: 'John' }
    const schema = { someValidator: true }
    const onSubmit = vi.fn()
    const mockHandleSubmit = vi.fn()

    mockUseAppForm.mockReturnValue({ handleSubmit: mockHandleSubmit })

    const { result } = renderHook(() =>
      useStepForm({ defaultValues, schema: schema as any, onSubmit }),
    )

    expect(mockUseAppForm).toHaveBeenCalledWith({
      defaultValues,
      validators: { onChange: schema },
      onSubmit: expect.any(Function),
    })
    expect(result.current.form).toEqual({ handleSubmit: mockHandleSubmit })
  })

  it('calls setData and onSubmit when the form submits', () => {
    let capturedOnSubmit: ((opts: { value: any }) => void) | null = null

    mockUseAppForm.mockImplementation((opts: any) => {
      capturedOnSubmit = opts.onSubmit
      return { handleSubmit: vi.fn() }
    })

    const defaultValues = { full_name: '' }
    const onSubmit = vi.fn()
    const submittedValue = { full_name: 'Alice' }

    renderHook(() =>
      useStepForm({ defaultValues, schema: {} as any, onSubmit }),
    )

    capturedOnSubmit!({ value: submittedValue })

    const state = useGamingPlanStore.getState()
    expect(state.full_name).toBe('Alice')
    expect(onSubmit).toHaveBeenCalledWith(submittedValue)
  })

  it('handleSubmit prevents default and calls form.handleSubmit', () => {
    const mockHandleSubmit = vi.fn()
    mockUseAppForm.mockReturnValue({ handleSubmit: mockHandleSubmit })

    const { result } = renderHook(() =>
      useStepForm({ defaultValues: {}, schema: {} as any, onSubmit: vi.fn() }),
    )

    const mockEvent = { preventDefault: vi.fn() } as any
    result.current.handleSubmit(mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockHandleSubmit).toHaveBeenCalled()
  })

  it('uses the store setData function to persist values', () => {
    let capturedOnSubmit: ((opts: { value: any }) => void) | null = null

    const mockHandleSubmit = vi.fn()
    mockUseAppForm.mockImplementation((opts: any) => {
      capturedOnSubmit = opts.onSubmit
      return { handleSubmit: mockHandleSubmit }
    })

    const value = { full_name: 'Bob', email_address: 'bob@test.com' }

    renderHook(() =>
      useStepForm({
        defaultValues: value,
        schema: {} as any,
        onSubmit: vi.fn(),
      }),
    )

    capturedOnSubmit!({ value })

    const state = useGamingPlanStore.getState()
    expect(state.full_name).toBe('Bob')
    expect(state.email_address).toBe('bob@test.com')
  })
})
