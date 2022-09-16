import FrameLinkAja from 'assets/images/frame-linkaja.png';
import View from 'components/View';
import React, {memo} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import QRCode from 'react-native-qrcode-svg';
import tailwind from 'tailwind-rn';

import {getSize} from 'utils';
import styles from './styles';

type Props = {
  data: string;
  onClose: () => void;
  visible: boolean;
};

const ModalQRIS: React.FC<Props> = ({onClose, visible, data}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose && onClose()}
      transparent>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onClose && onClose()}
        style={styles.modalCloseBtn}
      />
      <FastImage
        resizeMode="contain"
        source={FrameLinkAja}
        style={styles.image}
      />
      <View
        style={tailwind('flex-1 items-center justify-center')}
        paddingX={20}>
        <QRCode size={getSize(160)} value={data} />
      </View>
    </Modal>
  );
};

ModalQRIS.defaultProps = {
  data: '',
};

export default memo(ModalQRIS);
