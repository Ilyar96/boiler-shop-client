import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import { IQueryParams } from '@/types/catalog'

const Catalog = ({ query }: { query: IQueryParams }) => {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? 'Каталог' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <>
          <Layout>
            <CatalogPage query={query} />
          </Layout>
        </>
      )}
    </>
  )
}

export const getServerSideProps = async (context: { query: IQueryParams }) => ({
  props: {
    query: {
      ...context.query,
      offset: context.query?.offset ? context.query.offset : 0,
    },
  },
})

export default Catalog
