import styles from './PointColor.module.styl';

export default function PointColor({ color }) {
  return <div className={styles[`pointColor_${color}`]} />;
}
