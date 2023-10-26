// import Image from 'next/image'
import styles from './page.module.css';
import {Box} from '@mui/material'
import {borderRadius} from '@mui/system';
import AddPhoneNumber from "@/component/justForTest/AddPhoneNumber";

export default function Home() {
  return (
      <main className={styles.main} style={{borderRadius: '50px'}}>
        <Box className={styles.description}>
          <AddPhoneNumber />
        </Box>
      </main>
  );
}
