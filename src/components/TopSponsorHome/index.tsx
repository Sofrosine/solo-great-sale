import View from 'components/View';
import React from 'react';
import FastImage from 'react-native-fast-image';
import tailwind from 'tailwind-rn';
import MandiriLogo from 'assets/images/mandiri.png';
import LivinLogo from 'assets/images/livin.png';
import KopraLogo from 'assets/images/kopra.png';
import BSILogo from 'assets/images/bsi.jpeg';
import TaspenLogo from 'assets/images/taspen.png';
import JasMargaLogo from 'assets/images/jasmarga.png';

import {deviceWidth} from 'utils';

const TopSponsorHome = () => {
  return (
    <View>
      <FastImage
        source={MandiriLogo}
        resizeMode="contain"
        style={{width: '100%', height: 40}}
      />
      <View style={tailwind('flex-row items-center justify-center my-4')}>
        <FastImage
          source={LivinLogo}
          resizeMode="contain"
          style={{width: deviceWidth / 2 - 40, height: 60}}
        />
        <FastImage
          source={KopraLogo}
          resizeMode="contain"
          style={{width: deviceWidth / 2 - 40, height: 60}}
        />
      </View>
      <FastImage
        source={BSILogo}
        resizeMode="contain"
        style={{width: '100%', height: 60}}
      />
      <View marginBottom={8} />
      <FastImage
        source={TaspenLogo}
        resizeMode="contain"
        style={{width: '100%', height: 40}}
      />
      <FastImage
        source={JasMargaLogo}
        resizeMode="contain"
        style={{width: '100%', height: 140, marginTop: -20}}
      />
    </View>
  );
};

export default TopSponsorHome;
