import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';

import s from './card.module.css';

const Card = (props) => {
  return (
    <Link href={props.href}>
      <a className={s.cardLink}>
        <div className={cls('glass', s.container)}>
          <div className={s.cardHeaderWrapper}>
            <h2 className={s.cardHeader}>{props.name}</h2>
          </div>
          <div className={s.cardImageWrapper}>
            <Image
              alt={props.name}
              className={s.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
