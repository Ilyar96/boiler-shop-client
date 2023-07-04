import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import { useEffect, useState } from 'react'
import { getBoilerPartFx } from '@/app/api/boilerparts'
import { toast } from 'react-toastify'
import Part from '../../components/templates/PartPage/PartPage'
import Custom404 from '../404'

const PartPage = ({ query }: { query: IQueryParams }) => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const [error, setError] = useState(false)

  useEffect(() => {
    getBoilerPart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.partId])

  const getBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

      if (!data) {
        setError(true)
      }

      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <>
            <Layout>
              <Part />
            </Layout>
          </>
        )
      )}
    </>
  )
}

export const getServerSideProps = async (context: { query: IQueryParams }) => ({
  props: {
    query: context.query,
  },
})

export default PartPage
