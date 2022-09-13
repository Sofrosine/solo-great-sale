import {useState} from 'react';
import {
  Alert,
  Dimensions,
  LayoutAnimation,
  PixelRatio,
  Platform,
  ToastAndroid,
  UIManager,
} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const scale = deviceWidth / 320;

export const getSize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const layoutAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext({
    duration: 300,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  });
};

export const capitalizeEachWords = (sentences: string) => {
  let string = sentences
    ?.split(' ')
    .map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  return string;
};

export function useForm(initialState: any) {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: any) =>
    setState((prevState: any) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}

export const currencyConverter = (amount: number, withoutRp?: boolean) => {
  const _amount = amount < 0 ? 0 : amount;

  return `${withoutRp ? '' : 'Rp '}${String(_amount).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.',
  )}`;
};

export const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      80,
    );
  } else {
    Alert.alert(message);
  }
};
