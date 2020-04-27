import PointColor from './point-color';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import styles from './Keyword.module.styl';

export default function Keyword({
  name,
  keyword,
  inputRef,
  color,
  error,
  helperText,
  handleKeyPress,
  handleBlur,
  handleRemoveClick,
}) {
  return (
    <div className={styles.keyword}>
      <PointColor color={color} />
      <TextField
        type='search'
        label='Palabra clave'
        name={name}
        inputRef={inputRef}
        defaultValue={keyword}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        error={error}
        helperText={helperText}
      />
      <IconButton
        color='secondary'
        className={styles.iconButton}
        onClick={() => handleRemoveClick(name)}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    </div>
  );
}
