import Link from 'next/link'
import {useContext} from 'react'
import {ThemeContext} from 'styled-components'
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'

import {
	ContainerNextPrevious,
	TextPrevNext,
	ContainerListPages,
	ListProductsPages,
	ProductPage,
} from './style.js'

export default ({product, ...params}) => {
	const {colors} = useContext(ThemeContext)

	const listPagesQuantity = Array.from(Array(params.quantity).keys())
	const listPages = listPagesQuantity.filter((value) => value < params.id+6 && value > params.id-6)
	
	return (
		<ContainerNextPrevious>
			{(Number(params.id)-1 >= 0) ? (
				<Link href={`/${product.category}/[id]`} as={`/${product.category}/${params.id-1}`}>
					<TextPrevNext href={`/${product.category}/${params.id-1}`}>
						<FiChevronLeft color={colors.text} size={24} />
						Anterior
					</TextPrevNext>
				</Link>
			) : (<span />)}
			<ContainerListPages>
				<ListProductsPages>
					{listPages.map((productId) => (productId != params.id) ? (
						<Link href={`/${product.category}/[id]`} as={`/${product.category}/${productId}`} key={productId}>
							<a href={`/${product.category}/${productId}`}>
								<ProductPage>{productId}</ProductPage>
							</a>
						</Link>
					) : (
						<ProductPage key={productId} style={{
							cursor: 'not-allowed',
							filter: 'brightness(80%)'
						}}>{productId}</ProductPage>
					))}
				</ListProductsPages>
			</ContainerListPages>
			{(params.quantity > Number(params.id)+1) ? (
				<Link href={`/${product.category}/[id]`} as={`/${product.category}/${Number(params.id)+1}`}>
					<TextPrevNext href={`/${product.category}/${Number(params.id)+1}`}>
						Próximo
						<FiChevronRight color={colors.text} size={24} />
					</TextPrevNext>
				</Link>
			) : (<span />)}
		</ContainerNextPrevious>
	)
}