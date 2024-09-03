import { Text, Title } from '@/components/ui'
import {
	ComparisonTable,
	Help,
	PlanCard,
	plans,
	Reviews
} from '@/features/plans'
import styles from './page.module.scss'
import { BillingApi } from '@/api'

const PlansPage =  async () => {
	const subscription = await  BillingApi.getSubscription()

	return (
		<>
			<div className="page__container pt-10">
				<Title size="40px" as="h1" className={styles.title}>
					Price
				</Title>
				<div className={styles.plans}>
					{plans.map((plan) => (
						<PlanCard plan={plan} key={plan.planId} subscription={subscription} />
					))}
				</div>
				<Help />
				<Title as="h2" size="2xl" className="mb-4">
					Take the next step to achieve your goals
				</Title>
				<Text size="lg" className="mb-8 sm:mb-10 lg:mb-20 w-[80%]">
					Wordly&apos;s Basic membership provides essential tools for language
					learning, while the Premium membership offers a wide range of advanced
					features for a unique and personalized learning experience.
				</Text>
				<ComparisonTable />
			</div>
			<Reviews />
		</>
	)
}

export default PlansPage
