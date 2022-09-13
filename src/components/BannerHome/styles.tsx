import {StyleSheet} from 'react-native';
import Color from 'styles/Color';
import {getSize} from 'utils';

const styles = StyleSheet.create({
  container: {
    height: getSize(160),
    alignItems: 'center',
    backgroundColor: Color.WHITE,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  pagination: {
    bottom: getSize(-16),
    left: getSize(20),
  },
});

export default styles;
