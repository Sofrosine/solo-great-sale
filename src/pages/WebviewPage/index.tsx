import {RouteProp} from '@react-navigation/native';
import View from 'components/View';
import React from 'react';
import WebView from 'react-native-webview';

import tailwind from 'tailwind-rn';

type Props = {
  route: RouteProp<RootStackParamList, 'WebviewPage'>;
};

const WebviewPage: React.FC<Props> = ({route}) => {
  const {link} = route?.params || {};

  return (
    <View style={tailwind('flex-1 bg-white')}>
      <WebView
        source={{
          uri: link,
        }}
      />
    </View>
  );
};

export default WebviewPage;
