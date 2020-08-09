import Head from 'next/head'
import {useContext, useEffect, useState} from 'react'
import {ThemeContext} from 'styled-components'
import ProgressiveImage from 'react-progressive-graceful-image'

import Footer from '../../components/Footer/'
import Menu from '../../components/Menu/'
import RenderMarkdown from '../../components/RenderMarkdown/'

import GlobalStyle from '../../styles/GlobalStyle'

import products from '../../utils/products'
import copyTextToClipboard from '../../utils/copyTextToClipboard'

import {
	Container as ContainerClipboard,
	ContainerSuccess,
} from '../../components/Clipoard/styles'

import {
	Container,
	ProductPurchase,
	ProductInformations,
	ImageLogo,
	DescriptionList,
	ContainerButton,
	PurchaseButton,
	Price,
	ProductTitle,
} from '../../styles/pages/details'

function Product({readme, product}) {
	const {colors} = useContext(ThemeContext);
	const [actived, setActived] = useState(false)
	const [display, setDisplay] = useState(false)
	const [text, setText] = useState('')

	useEffect(() => {
		if (actived) {
			setTimeout(() => {
				setActived(false)
				clearTimeout()
				setTimeout(() => {
					setDisplay(false)
					clearTimeout()
				}, 500)
			}, 5000)
		}
	}, [actived])

	useEffect(() => {
		const codesElements = document.querySelectorAll('code')

		for (let counterCodesElementsLooping = 0; counterCodesElementsLooping < codesElements.length; counterCodesElementsLooping++) {
			codesElements[counterCodesElementsLooping].addEventListener('click', async () => {
				if (actived === true || display === true)
					return;

				const res = await copyTextToClipboard(codesElements[counterCodesElementsLooping].innerHTML)

				setText(res)

				setActived(true)
				setDisplay(true)
			});
		}
	}, [])

	return (
		<div>
			<Head>
				<title>SMCodes - {product.title}</title>
				<meta property="og:title" content={`SMCodes - ${product.title}`} key="title" />
				<meta name="twitter:title" content={`SMCodes - ${product.title}`} />
				<meta name="description" content={`Venha baixar e encomendar websites, ${product.title} com funcionalidades únicas e com uma alta velocidade.`} />
				<meta property="og:description" content={`Venha baixar e encomendar websites, ${product.title} com funcionalidades únicas e com uma alta velocidade.`} />
				<meta name="description" content={`Venha baixar e encomendar websites, ${product.title} com funcionalidades únicas e com uma alta velocidade.`} />
				<meta name="Description" content={`Venha baixar e encomendar websites, ${product.title} com funcionalidades únicas e com uma alta velocidade.`} />
				<meta name="twitter:description" content={`Venha baixar e encomendar websites, ${product.title} com funcionalidades únicas e com uma alta velocidade.`} />
			</Head>

			<div style={{width: "100%"}}>
				<Menu page="/details" background={colors.background} />
			</div>

			<Container>
				<ProductPurchase>
					<ProductTitle>{product.title}</ProductTitle>
					<ProgressiveImage
						src={product.image.large}
						placeholder={product.image.small}
					>
						{(src, loading) => product.image.size ? (
							<ImageLogo
								style={{
									width: product.image.size.width || 128,
									height: product.image.size.height || 128,
									filter: loading ? 'blur(5px)' : ''
								}}
								loading={loading.toString()}
								src={src}
								not_auto={true}
								alt="Product logo image"
							/>
						) : (
							<ImageLogo
								style={{
									width: loading ? 128 : 'auto',
									height: loading ? 128 : 'auto',
									filter: loading ? 'blur(5px)' : ''
								}}
								not_auto={false}
								loading={loading.toString()}
								src={src}
								alt="Product logo image"
							/>
						)}
					</ProgressiveImage>
					<DescriptionList>
						{product.descriptionList.map((description, index) => (
							<RenderMarkdown key={index} text={description} />
						))}
					</DescriptionList>
					<ContainerButton>
						{(product.price <= 0 ) ? (
							<PurchaseButton>Baixar</PurchaseButton>
						) : (
							<>
								<Price>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</Price>
								<PurchaseButton>Comprar</PurchaseButton>
							</>
						)}
					</ContainerButton>
				</ProductPurchase>
				<ProductInformations>
					<RenderMarkdown text={readme} />
				</ProductInformations>
				{display && (
					<ContainerClipboard actived={actived}>
						<ContainerSuccess>
							{text}
							{actived && (<span></span>)}
						</ContainerSuccess>
					</ContainerClipboard>
				)}
			</Container>
			
			<Footer />

			<GlobalStyle />

		</div>
	)
}

export async function getStaticProps({params}) {
	const product = products[1].items.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)[Number(params.id)]
	
	const res = await fetch(product.text)
	const readme = await res.text()

	return {
		props: {
			readme,
			product: product
		}
	}
}

export async function getStaticPaths() {
	const paths = products[1].items.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).map((product, index) => {
		return {
			params: {
				id: index.toString()
			},
		}
	})
	
	return {
		paths: paths,
		fallback: false,
	}
}

export default Product