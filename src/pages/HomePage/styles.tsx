import {StyleSheet} from 'react-native';
import Color from 'styles/Color';

const styles = StyleSheet.create({
  divider: {
    height: 10,
    backgroundColor: Color.ALMOST_WHITE,
    marginVertical: 12,
  },
  imageSponsor: {
    height: 40,
    width: 60,
  },
  btnEvent: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.GREY,
  },
  developerImage: {
    height: 84,
    width: 84,
  },
});

export default styles;
