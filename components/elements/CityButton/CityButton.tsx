import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { $mode } from '@/context/mode'
import { $userCity, setUserCity } from '@/context/user'
import { getGeolocationFx } from '@/app/api/geolocation'
import LocationSvg from '../LocationSvg/LocationSvg'
import styles from '@/styles/CityButton/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CityButton = () => {
  const mode = useStore($mode)
  const { city } = useStore($userCity)
  const spinner = useStore(getGeolocationFx.pending)

  useEffect(() => {
    getCity()
  }, [])

  const getCity = () => {
    const options: PositionOptions = {
      timeout: 5000,
      maximumAge: 0,
      enableHighAccuracy: true,
    }

    const success = async (pos: GeolocationPosition) => {
      try {
        const { latitude, longitude } = pos.coords

        const { data } = await getGeolocationFx({ latitude, longitude })
        const { city, address_line1: street } = data.features[0].properties
        setUserCity({ city, street })
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
    const error = (error: GeolocationPositionError) =>
      toast.error(`${error.code} ${error.message}`)

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <button
      className={cn(styles.city, {
        [styles.dark_mode]: mode === 'dark',
      })}
      onClick={getCity}
    >
      <span className={styles.city__span}>
        <LocationSvg />
      </span>
      <span className={styles.city__text}>
        {spinner ? (
          <span
            className={spinnerStyles.spinner}
            style={{ top: '-10px', left: 10, width: 20, height: 20 }}
          />
        ) : city.length ? (
          city
        ) : (
          'Город'
        )}
      </span>
    </button>
  )
}

export default CityButton
