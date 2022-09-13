import React from 'react';
import {View as NativeView} from 'react-native';
import {ViewProps} from './types';

type Props = NativeView['props'] & ViewProps;

const getStyleView = (
  margin?: number,
  marginTop?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number,
  marginY?: number,
  marginX?: number,
  padding?: number,
  paddingTop?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
  paddingY?: number,
  paddingX?: number,
  color?: string,
) => {
  let style = {};
  if (color) {
    style = {
      ...style,
      ...{
        backgroundColor: color,
      },
    };
  }

  if (margin) {
    style = {
      ...style,
      ...{
        margin,
      },
    };
  }

  if (marginTop) {
    style = {
      ...style,
      ...{
        marginTop,
      },
    };
  }

  if (marginBottom) {
    style = {
      ...style,
      ...{
        marginBottom,
      },
    };
  }

  if (marginLeft) {
    style = {
      ...style,
      ...{
        marginLeft,
      },
    };
  }

  if (marginRight) {
    style = {
      ...style,
      ...{
        marginRight,
      },
    };
  }

  if (marginY) {
    style = {
      ...style,
      ...{
        marginVertical: marginY,
      },
    };
  }

  if (marginX) {
    style = {
      ...style,
      ...{
        marginHorizontal: marginX,
      },
    };
  }

  if (padding) {
    style = {
      ...style,
      ...{
        padding,
      },
    };
  }

  if (paddingTop) {
    style = {
      ...style,
      ...{
        paddingTop,
      },
    };
  }

  if (paddingBottom) {
    style = {
      ...style,
      ...{
        paddingBottom,
      },
    };
  }

  if (paddingLeft) {
    style = {
      ...style,
      ...{
        paddingLeft,
      },
    };
  }

  if (paddingRight) {
    style = {
      ...style,
      ...{
        paddingRight,
      },
    };
  }

  if (paddingY) {
    style = {
      ...style,
      ...{
        paddingVertical: paddingY,
      },
    };
  }

  if (paddingX) {
    style = {
      ...style,
      ...{
        paddingHorizontal: paddingX,
      },
    };
  }
  return style;
};

function View({
  children,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginY,
  marginX,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingY,
  paddingX,
  style,
  color,
  testID,
  onLayout,
  pointerEvents,
}: Props) {
  const styleView = getStyleView(
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginY,
    marginX,
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingY,
    paddingX,
    color,
  );

  return (
    <NativeView
      pointerEvents={pointerEvents}
      onLayout={onLayout}
      testID={testID}
      style={[styleView, style]}>
      {children}
    </NativeView>
  );
}

export default React.memo<Props>(View);
