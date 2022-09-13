import React, {FC, memo, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Color from 'styles/Color';
import {getSize} from 'utils';
// styles
// uikit
import Text from '../Text';
import styles from './styles';
type IStyle = {
  style?: ViewStyle | ViewStyle[];
};

type ButtonProps = {
  testID?: string;
  onPress?: () => void;
  loading?: boolean;
  transparent?: boolean;
  disabled?: boolean;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  labelFamily?: FontFamily;
  labelStyle?: any;
  useDebounce?: boolean;
  children?: any;
  underlayColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  paddingY?: number;
  height?: number;
  width?: number;
  marginBottom?: number;
  clear?: boolean;
};

const Button: FC<ButtonProps & IStyle> = props => {
  const {
    testID,
    onPress,
    loading,
    transparent,
    disabled,
    clear,
    label,
    labelColor,
    labelSize,
    labelFamily,
    labelStyle,
    children,
    underlayColor,
    style,
    borderRadius,
    borderWidth,
    borderColor,
    paddingY,
    height,
    width,
    useDebounce,
  } = props;
  const disabledBgColor = (disabled || loading) && {
    backgroundColor: Color.ALMOST_WHITE,
  };
  const containerStyle = transparent
    ? styles.transparentContainer
    : styles.container;

  let customStyle = {};

  const Wrapper =
    Platform.OS === 'ios' ? memo(TouchableOpacity) : memo(TouchableHighlight);

  /* istanbul ignore else */
  if (paddingY) {
    customStyle = {
      ...customStyle,
      paddingVertical: paddingY,
    };
  }
  /* istanbul ignore else */
  if (height) {
    customStyle = {
      ...customStyle,
      height,
    };
  }
  /* istanbul ignore else */
  if (width) {
    customStyle = {
      ...customStyle,
      width,
    };
  }
  /* istanbul ignore else */
  if (borderColor) {
    customStyle = {
      ...customStyle,
      borderColor,
    };
  }
  /* istanbul ignore else */
  if (borderRadius) {
    customStyle = {
      ...customStyle,
      borderRadius,
    };
  }
  /* istanbul ignore else */
  if (borderWidth) {
    customStyle = {
      ...customStyle,
      borderWidth,
    };
  }

  const [debounce, setDebounce] = useState(false);

  useEffect(() => {
    let timer: any;

    if (debounce) {
      /* istanbul ignore next-line */
      timer = setTimeout(() => setDebounce(false), 2000);
    }

    return () => {
      clearTimeout(timer);
      setDebounce(false);
    };
  }, [debounce]);

  const handleOnPress = () => {
    /* istanbul ignore else */
    if (!loading && !disabled && !debounce) {
      /* istanbul ignore else */
      if (useDebounce) {
        setDebounce(true);
      }

      onPress && onPress();
    }
  };

  return (
    <Wrapper
      testID={testID}
      accessibilityLabel={testID}
      style={[containerStyle, disabledBgColor, customStyle, style]}
      onPress={() => handleOnPress()}
      underlayColor={
        disabled || loading ? underlayColor : underlayColor || Color.PRIMARY_07
      }
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={clear ? Color.PRIMARY_07 : Color.WHITE}
        />
      ) : children ? (
        children
      ) : (
        <Text
          family={labelFamily}
          size={labelSize && getSize(labelSize)}
          color={
            transparent && labelColor === Color.WHITE
              ? Color.PRIMARY_07
              : labelColor
          }
          style={labelStyle}>
          {label}
        </Text>
      )}
    </Wrapper>
  );
};

Button.defaultProps = {
  testID: 'Button',
  onPress: () => {},
  loading: false,
  transparent: false,
  disabled: false,
  clear: false,
  label: 'button',
  labelColor: Color.WHITE,
  labelFamily: 'latoBold',
  labelStyle: null,
  useDebounce: true,
  children: null,
  underlayColor: Color.PRIMARY_07,
  borderRadius: 8,
  borderWidth: 0,
  borderColor: '',
  paddingY: 0,
  height: 0,
  width: 0,
};

export default React.memo(Button);
