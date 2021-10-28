import s from './banner.module.css';

const Banner = (props) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        <span className={s.title1}>Qahwa</span>
        <span className={s.title2}>Mushtarikligi</span>
        <p className={s.subtitle}>Discover your local shops!</p>
        <button className={s.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </h1>
    </div>
  );
};

export default Banner;
