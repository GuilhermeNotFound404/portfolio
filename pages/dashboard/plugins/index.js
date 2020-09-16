import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { ThemeContext } from 'styled-components'

import GlobalStyle from '../../../styles/GlobalStyle'
import {
	Container,
	ContainerInformations,
} from '../../../styles/pages/dashboard'
import {
	ListPlugins,
} from '../../../styles/pages/dashboard/plugins'
import {
	ContainerLicense,
	Description,
	Title,
} from '../../../styles/pages/index'

import MenuBarDashboard from '../../../components/MenuBarDashboard'
import Plugin from '../../../components/Plugin'
import products from '../../../utils/products'

const Plugins = () => {
	const theme = useContext(ThemeContext)

	return (
		<div className="container">
			<Head>
				<title>Dashboard - Plugins</title>
				<meta property="og:title" content="Dashboard - Plugins" key="title" />
				<meta name="twitter:title" content="Dashboard - Plugins" />
				<meta name="description" content="Área restrita para membros que tenha uma conta em nosso sistema." />
				<meta property="og:description" content="Área restrita para membros que tenha uma conta em nosso sistema." />
				<meta name="description" content="Área restrita para membros que tenha uma conta em nosso sistema." />
				<meta name="Description" content="Área restrita para membros que tenha uma conta em nosso sistema." />
				<meta name="twitter:description" content="Área restrita para membros que tenha uma conta em nosso sistema." />
				<meta name="theme-color" content={theme.colors.background} />
				<meta name="apple-mobile-web-app-status-bar-style" content={theme.colors.background} />
				<meta name="msapplication-navbutton-color" content={theme.colors.background} />
			</Head>

			<Container>
				<MenuBarDashboard />
				<ContainerInformations>
					<ContainerLicense
						style={{
							marginTop: 0,
							marginBottom: '10px'
						}}
					>
						<Title>Alerta</Title>
						<Description>Essa área é exclusiva para clientes que tem plugins de minecraft comprados, nessa área é possível visualizar e gerenciar informações como configuração de mensagens, uso de dados, armazenamento e trafego de dados</Description>
					</ContainerLicense>
					<h1>Seus plugins</h1>
					<ListPlugins>
						{products[1].items
							.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
							.map((product, index) => (
								<Link href={`/dashboard/plugin/${index}`}>
									<a>
										<Plugin
											key={index.toString()}
											plugin={product}
										/>
									</a>
								</Link>
						))}
					</ListPlugins>
				</ContainerInformations>
			</Container>

			<GlobalStyle />

		</div>
	)
}

export default Plugins
