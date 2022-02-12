import {ReactNode} from 'react';

type AppPropsWithChildren = {
  children?: ReactNode;
};

function App(props:AppPropsWithChildren): JSX.Element {
  return <div>{props.children}</div>;
}

export default App;
