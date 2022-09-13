import {StyleSheet} from 'react-native';
import {getSize} from 'utils';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 16,
    elevation: 2,
  },
  title: {
    marginLeft: 8,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  floatRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  flex1: {
    flex: 1,
  },
  centerStyle: {
    alignItems: 'center',
  },
  paddingHeaderWithImage: {
    paddingTop: 45,
    paddingBottom: getSize(16),
  },
  leftStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftIconStyle: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
