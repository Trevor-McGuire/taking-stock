import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { ThemeProvider } from '@mui/material/styles';
import theme from './CustomTheme.jsx';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from './components/appBar/PrimarySearchAppBar.jsx';
import Footer from './components/footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      <AppBar />
          <Outlet />
        <Footer />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
