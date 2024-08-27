'use client'
import { Counter } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle, Text } from '@/components/ui'
import type { TypeEditingStats } from '@/features/dashboard'
import { motion } from 'framer-motion'

import { getVariants, stats } from './EditingDashboardView.data'
import styles from './EditingDashboardView.module.scss'

interface IEditingDashboardViewProps {
	data: TypeEditingStats
}

export const EditingDashboardView = ({ data }: IEditingDashboardViewProps) => {
	return (
		<ul className={styles.wrapper}>
			{stats.map((stat, index) => {
				const count = data[stat.key]
				return (
					<li key={stat.key} className={styles.item}>
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={getVariants(index)}
						>
							<Card className={styles.card}>
								<CardHeader>
									<CardTitle>{stat.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<Text size="2xl" weight={700}>
										<Counter value={count || 666} delay={0.5 * (index + 1)} />
									</Text>
								</CardContent>
							</Card>
						</motion.div>
					</li>
				)
			})}
		</ul>
	)
}
