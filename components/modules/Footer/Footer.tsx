import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import CompanyContent from './CompanyContent'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/footer/index.module.scss'
import Image from 'next/image'
import Accordion from '../../elements/Accordion/Accordion'

const Footer = () => {
  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 ? (
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Интернет-магазин
                  </h3>
                  <OnlineStoreContent />
                </>
              ) : (
                <>
                  <Accordion
                    title="Интернет-магазин"
                    arrowOpenClass={styles.open}
                    titleClass={styles.footer__top__item__title}
                  >
                    <OnlineStoreContent />
                  </Accordion>
                </>
              )}
            </div>
            <div className={styles.footer__top__item}>
              {!isMedia500 ? (
                <>
                  <h3 className={styles.footer__top__item__title}>Компания</h3>
                  <CompanyContent />
                </>
              ) : (
                <>
                  <Accordion
                    title="Компания"
                    arrowOpenClass={styles.open}
                    titleClass={styles.footer__top__item__title}
                  >
                    <CompanyContent />
                  </Accordion>
                </>
              )}
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакты</h3>
            <ul
              className={cn(
                styles.footer__top__item__list,
                styles.footer__top__item__contacts
              )}
            >
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес:</span>
                    <span>г. Москва, ул. ... д....</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="tel:+780955555555"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>Наш контактный телефон:</span>
                  <span>+7(8095) 555-55-55</span>
                  <span>
                    <PhoneSvg />
                  </span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="mailto:info@zapchasti.com.ru"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>E-mail:</span>
                  <span>info@zapchasti.com.ru</span>
                  <span>
                    <MailSvg />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы принимаем к оплате:
              </h3>
              <ul className={styles.footer__bottom__block__pay}>
                <li className={styles.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/pay.png"
                    width={70}
                    height={48}
                    alt="apple-pay"
                  />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/gpay.png"
                    width={70}
                    height={48}
                    alt="google-pay"
                  />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/master-card.png"
                    width={70}
                    height={48}
                    alt="master-card"
                  />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <Image
                    src="/img/visa.png"
                    width={70}
                    height={48}
                    alt="visa"
                  />
                </li>
              </ul>
            </div>
            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы в соцсети:
              </h3>
              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_vk}
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_fb}
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_inst}
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_ytb}
                  />
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              © «Детали для газовых котлов» 2021.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
