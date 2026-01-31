import type { AddOnSchema } from '@/lib/schema'
import advancedIcon from '@/assets/icon-advanced.svg'
import arcadeIcon from '@/assets/icon-arcade.svg'
import proIcon from '@/assets/icon-pro.svg'

export interface PlanOption {
  label: 'Arcade' | 'Advanced' | 'Pro'
  icon: string
  monthly_price: number
  yearly_price: number
}

export const addonOptions: Array<AddOnSchema> = [
  {
    name: 'online_service',
    label: 'Online Service',
    description: 'Access to multiplayer games',
    monthly_price: 1,
    yearly_price: 10,
  },
  {
    name: 'larger_storage',
    label: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthly_price: 2,
    yearly_price: 20,
  },
  {
    name: 'custom_profile',
    label: 'Customizable profile',
    description: 'Custom theme on your profile',
    monthly_price: 2,
    yearly_price: 20,
  },
]

export const planOptions: Array<PlanOption> = [
  {
    label: 'Arcade',
    icon: arcadeIcon,
    monthly_price: 9,
    yearly_price: 90,
  },
  {
    label: 'Advanced',
    icon: advancedIcon,
    monthly_price: 12,
    yearly_price: 120,
  },
  {
    label: 'Pro',
    icon: proIcon,
    monthly_price: 15,
    yearly_price: 150,
  },
]
