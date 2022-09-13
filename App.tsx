/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {StoreProvider} from 'reducers';

import Main from 'routes';

const queryClient = new QueryClient();

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Main />
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
