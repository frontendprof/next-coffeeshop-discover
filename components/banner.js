import s from './banner.module.css';

const Banner = (props) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        <span className={s.title1}>Qahwa</span>
        <span className={s.title2}>Xona</span>
        {/* <span className={s.title2}>Mushtarikligi</span> */}
        {/* <span className={s.title1}> قهوه خانه</span>
        <span className={s.title2}>مشترک </span> */}
      </h1>
      <p className={s.subtitle}>Discover your local shops!</p>
      <div className={s.buttonWrapper}>
        <button className={s.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
