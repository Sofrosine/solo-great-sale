import {useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import tailwind from 'tailwind-rn';
import styles from './styles';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ScanTenantPage'>;
};

const ScanTenantPage: React.FC<Props> = ({navigation}) => {
  const [showCamera, setShowCamera] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShowCamera(true);
      return () => setShowCamera(false);
    }, []),
  );

  return (
    <View style={tailwind('flex-1')}>
      {showCamera && (
        <RNCamera
          style={styles.camera}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            if (barcodes[0]?.dataRaw) {
              navigation.navigate('TenantDetailPage', {
                id: barcodes[0]?.dataRaw,
              });
            }
          }}
        />
      )}
    </View>
  );
};

export default ScanTenantPage;
