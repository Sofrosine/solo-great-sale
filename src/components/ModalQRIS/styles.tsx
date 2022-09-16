import {StyleSheet} from 'react-native';
import Color from 'styles/Color';
import {getSize} from 'utils';

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: Color.BLACK_05,
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: Color.WHITE,
    borderTopRightRadius: getSize(20),
    borderTopLeftRadius: getSize(20),
    alignItems: 'center',
    zIndex: 9999,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  lineTop: {
    height: getSize(4),
    backgroundColor: Color.GREY,
    width: getSize(112),
    borderRadius: 100,
  },
  modalCloseBtn: {
    backgroundColor: Color.BLACK_05,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    height: '80%',
    width: '80%',
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
  },
});

export default styles;
