import {ReactNode} from 'react';
import {ViewStyle} from 'react-native';

export type ViewProps = {
  children?: ReactNode;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginY?: number;
  marginX?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingY?: number;
  paddingX?: number;
  style?: ViewStyle;
  color?: string;
  testID?: string;
  onLayout?: (item: any) => void;
  pointerEvents?: 'auto' | 'none' | 'box-none';
};
