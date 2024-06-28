import { TypeDictionaryWord } from "@/shared/types"

interface IExamplesProps {
	data: TypeDictionaryWord['examples']
}

export const Examples = ({data}:IExamplesProps) => {
	if(!data?.length) return null



	return <div></div>;
};
