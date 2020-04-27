import { Tab, Tabs } from '@material-ui/core/';
import PublishedProducts from './published-products';

import styles from './DashBoard.module.styl';

export default function DashBoard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className={styles.dashboard}>
      <Tabs
        variant='fullWidth'
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='tabs dashboard'
      >
        <Tab label='Publicados' {...a11yProps(0)} />
        <Tab label='Vendidos' {...a11yProps(1)} />
        <Tab label='Precio' {...a11yProps(2)} />
        <Tab label='Relacionados' {...a11yProps(4)} />
      </Tabs>
      
      {value === 0 && <PublishedProducts />}
    </section>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
