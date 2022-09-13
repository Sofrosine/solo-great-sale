import {Dimensions, StyleSheet} from 'react-native';
import Color from 'styles/Color';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 48,
  },

  label: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: Color.GREY_TEXT,
    marginBottom: 4,
  },

  txtInput: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    paddingHorizontal: 0,
    borderColor: 'transparent',
    paddingVertical: 0,
    marginVertical: 0,
  },

  clickableArea: {
    backgroundColor: Color.WHITE,
    width: Dimensions.get('window').width,
    height: 50,
    position: 'absolute',
  },

  error: {
    marginLeft: 5,
    fontSize: 10,
    fontFamily: 'Lato-Regular',
    marginTop: 5,
  },

  flex1: {
    flex: 1,
  },

  helpText: {
    marginLeft: 16,
    fontSize: 10,
    fontFamily: 'Lato-Regular',
    marginTop: 5,
  },
});

export default styles;
