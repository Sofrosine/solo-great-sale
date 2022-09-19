import {StyleSheet} from 'react-native';
import Color from 'styles/Color';

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  textInputCustom: {
    position: 'absolute',
    backgroundColor: Color.WHITE,
    top: '30%',
    left: 8,
    zIndex: 999,
  },
});

export default styles;
