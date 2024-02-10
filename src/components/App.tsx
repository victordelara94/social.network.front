import { AppRoutes } from './app.routes/app.routes';
import Footer from './layout/footer/footer';
import Header from './layout/header/header';

function App() {
  return (
    <>
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
    </>
  );
}

export default App;
