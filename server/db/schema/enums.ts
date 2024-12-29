import { pgEnum } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['Buyer', 'Seller'])
export const platformEnum = pgEnum('platform', ['Facebook', 'Xianyu', 'Discord', 'Website'])
export const productStatusEnum = pgEnum('product_status', ['Pre-order', 'On-hand', 'Reserved', 'Sold Out'])
export const paymentStatusEnum = pgEnum('payment_status', ['Paid', 'Partial', 'Pending', 'For Review'])
export const isfPaymentEnum = pgEnum('isf_payment_status', ['Paid', 'Free', 'Pending', 'For Review'])
export const sfPaymentEnum = pgEnum('sf_payment_status', ['Paid', 'Free', 'Pending', 'For Review'])
