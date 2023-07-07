/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartImagesItem from './PartImagesItem'
import PartSlider from './PartSlider'
import styles from '@/styles/part/index.module.scss'

const PartImagesList = () => {
  const boilerPart = useStore($boilerPart)
  const isMobile = useMediaQuery(850)
  const images = boilerPart.images
    ? (JSON.parse(boilerPart.images) as string[])
    : []
  const [currentImgSrc, setCurrentImgSrc] = useState(images[0])

  useEffect(() => {
    if (!boilerPart.id) return

    const boilerPartFirstImage = JSON.parse(boilerPart.images)[0]
    if (currentImgSrc !== boilerPartFirstImage) {
      setCurrentImgSrc(boilerPartFirstImage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boilerPart.id])

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img
              width={598}
              height={455}
              src={currentImgSrc}
              alt={boilerPart.name}
            />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, i) => (
              <PartImagesItem
                key={i}
                alt={`image-${i + 1}`}
                callback={setCurrentImgSrc}
                src={item}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default PartImagesList
