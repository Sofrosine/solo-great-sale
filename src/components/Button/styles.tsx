import {StyleSheet} from 'react-native';
import Color from 'styles/Color';
import {getSize} from 'utils';

const styles = StyleSheet.create({
  container: {
    borderRadius: getSize(6),
    height: getSize(38),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.PRIMARY,
  },
  transparentContainer: {
    borderRadius: getSize(6),
    height: getSize(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.PRIMARY,
  },
});

export default styles;
