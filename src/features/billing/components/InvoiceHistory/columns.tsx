'use client'
import { capitalize, formatCurrency, formatRelativeDate } from '@/lib'
import { BillingReason, TypePayment } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import {
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui'
import { Routes } from '@/constants'
import { useRouter } from 'next/navigation'

const billingReasonMap = {
	[BillingReason.INITIAL]: 'red',
	[BillingReason.RENEWAL]: 'green',
	[BillingReason.UPDATED]: 'orange'
} as const

export const columns: ColumnDef<TypePayment>[] = [
	{
		id: 'number',
		header: () => '№',
		cell: ({ row }) => row.index + 1
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Date
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => formatRelativeDate(new Date(row.original.createdAt))
	},
	{
		accessorKey: 'subtotal',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Subtotal
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => formatCurrency(row.original.subtotal / 100)
	},
	{
		accessorKey: 'tax',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Tax
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) =>
			row.original.tax > 0 ? formatCurrency(row.original.tax / 100) : '—'
	},
	{
		accessorKey: 'total',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Subtotal
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => formatCurrency(row.original.total / 100)
	},
	{
		accessorKey: 'billingReason',
		header: ({ column }) => (
			<Button
				variant={'ghost'}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Reason
				<ArrowUpDown className="ml-2 size-4" />
			</Button>
		),
		cell: ({ row }) => {
			const reason = row.original.billingReason
			return (
				<Badge variant={billingReasonMap[reason]}>{capitalize(reason)}</Badge>
			)
		}
	},
	{
		id: 'actions',
		cell: function Actions({ row }) {
			const router = useRouter()
			const payment = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(payment.lsSubscriptionId)
							}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => router.push(Routes.DASHBOARD_PAYMENT(payment.id))}
						>
							View payment details
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
