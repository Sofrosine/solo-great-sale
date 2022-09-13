import {useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Color from 'styles/Color';
import Feather from 'react-native-vector-icons/Feather';
// styles

import {getSize} from '../../utils';
// uikits

import styles from './styles';
import View from 'components/View';
import Text from 'components/Text';

type Props = {
  backgroundColor?: string;
  headerStyle?: any;
  left?: React.ReactNode;
  onPressLeft?: () => void;
  title?: string;
  titleColor?: string;
  right?: React.ReactNode;
  rightOne?: React.ReactNode;
  rightTwo?: React.ReactNode;
  center?: React.ReactNode;
  centerStyle?: any;
  isFlashsale?: boolean;
  isBundling?: boolean;
  isPromo?: boolean;
  barColor?: string;
  barStyle?: any;
  paddingTop?: number;
  paddingBottom?: number;
  translucent?: boolean;
  titleSize?: number;
  leftNotIcon?: boolean;
  leftStyle?: any;
  rightStyle?: any;
};

const HeaderView: React.FC<Props> = props => {
  const {
    backgroundColor,
    headerStyle,
    left,
    leftNotIcon,
    onPressLeft,
    title,
    titleColor,
    titleSize,
    right,
    rightOne,
    rightTwo,
    center,
    centerStyle,
    translucent,
    paddingTop,
    paddingBottom,
    barColor,
    leftStyle,
    rightStyle,
  } = props;
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  //   const HeaderWrapper = isFlashsale ? ImageBackground : View;
  const HeaderWrapper = View;

  const backgroundColorHeader = backgroundColor;

  return (
    <>
      {isFocused && (
        <StatusBar
          translucent={translucent}
          backgroundColor={barColor ? barColor : backgroundColor || Color.WHITE}
          barStyle={
            backgroundColor === Color.WHITE ? 'dark-content' : 'light-content'
          }
        />
      )}
      <HeaderWrapper
        paddingTop={
          translucent
            ? (StatusBar?.currentHeight || 24) + (paddingTop || 8) + insets.top
            : 16 + insets.top
        }
        paddingBottom={paddingBottom ?? getSize(16)}
        style={[
          styles.headerContainer,
          headerStyle,
          {backgroundColor: backgroundColorHeader},
        ]}>
        {left && (
          <TouchableOpacity
            style={[
              !leftNotIcon && styles.leftIconStyle,
              leftStyle,
              styles.leftStyle,
            ]}
            onPress={() => {
              if (onPressLeft) {
                onPressLeft && onPressLeft();
              } else {
                navigation.goBack();
              }
            }}>
            {left}
          </TouchableOpacity>
        )}
        {title ? (
          <View style={styles.title}>
            <Text family={'latoBold'} size={titleSize} color={titleColor}>
              {title}
            </Text>
          </View>
        ) : (
          <View />
        )}
        {center && (
          <View style={[styles.flex1, styles.centerStyle, centerStyle]}>
            {center}
          </View>
        )}
        {rightOne || rightTwo ? (
          <View style={[styles.rowContainer, rightStyle]}>
            {rightOne && <View padding={5}>{rightOne}</View>}
            {rightTwo && <View padding={5}>{rightTwo}</View>}
          </View>
        ) : right ? (
          <View style={[styles.floatRight, rightStyle]}>{right}</View>
        ) : (
          <View />
        )}
      </HeaderWrapper>
    </>
  );
};

HeaderView.defaultProps = {
  backgroundColor: Color.WHITE,
  left: (
    <Feather
      name="chevron-left"
      color={Color.ALMOST_BLACK}
      size={getSize(24)}
    />
  ),
  titleColor: Color.ALMOST_BLACK,
  titleSize: 14,
};

export default React.memo(HeaderView);
