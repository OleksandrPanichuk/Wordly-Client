import { Title } from '@/components/ui'
import { PlanCard, plans } from '@/features/plans'

import styles from './page.module.scss'

const PlansPage = () => {
	return (
		<div className="page__container pt-10">
			<Title
				size="40px"
				as="h1"
				className={styles.title}
			>
				Price
			</Title>
			<div className={styles.plans}>
				{plans.map((plan) => (
					<PlanCard plan={plan} key={plan.planId} />
				))}
			</div>
		</div>
	)
}

export default PlansPage
