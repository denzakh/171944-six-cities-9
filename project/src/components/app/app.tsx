import MainPage from '../main-page/main-page';

type AppProps = {
  cardCount:number
};

function App(props:AppProps): JSX.Element {
  return <MainPage cardCount={props.cardCount} />;
}

export default App;
