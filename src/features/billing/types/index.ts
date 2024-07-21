import { billingInfoSchema } from '@/features/billing'
import { z } from 'zod'

export type BillingInfoInput = z.infer<typeof billingInfoSchema>
