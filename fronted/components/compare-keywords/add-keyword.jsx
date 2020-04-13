import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import styles from './AddKeyword.module.styl';

export default function AddKeyword({ handleOnClick, buttonRef }) {
  return (
    <div className={styles.addKeyword}>
      <Button
        fullWidth
        color='primary'
        classes={{
          root: styles.button,
        }}
        size='large'
        disableElevation
        buttonRef={buttonRef}
        onClick={handleOnClick}
      >
        <AddCircleOutlineIcon />
      </Button>
    </div>
  );
}
