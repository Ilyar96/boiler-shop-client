import Head from 'next/head'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

const Dashboard = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? 'Главная' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <>
          <Layout>
            <DashboardPage />
          </Layout>
        </>
      )}
    </>
  )
}

export default Dashboard
