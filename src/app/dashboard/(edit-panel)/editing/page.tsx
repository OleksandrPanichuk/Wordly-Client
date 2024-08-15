import { Text, Title } from '@/components/ui'
import { DashboardApi, EditingDashboardView } from '@/features/dashboard'

const EditDashboardPage = async () => {
	const data = await DashboardApi.getEditingStats()

	if (!data) {
		return (
			<div className="p-4">
				<Title>Oops, something went wrong!</Title>
				<Text>Failed to get your stats. Please try again later.</Text>
			</div>
		)
	}

	return <EditingDashboardView data={data} />
}

export default EditDashboardPage
