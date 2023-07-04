/* eslint-disable @next/next/no-img-element */
import { IPartImagesItemProps } from '@/types/part'
import styles from '@/styles/part/index.module.scss'

const PartImagesItem = ({ src, callback, alt }: IPartImagesItemProps) => {
  const changeMainImage = () => {
    callback(src)
  }

  return (
    <li className={styles.part__images__list__item} onClick={changeMainImage}>
      <img width={166} height={149} src={src} alt={alt} />
    </li>
  )
}

export default PartImagesItem
