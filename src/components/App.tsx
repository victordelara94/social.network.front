import styles from './App.module.scss';
import { AppRoutes } from './app.routes/app.routes';
import Footer from './layout/footer/footer';
import Header from './layout/header/header';

function App() {
  return (
    <>
      <Header></Header>
      <main className={styles['main']}>
        <AppRoutes></AppRoutes>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
