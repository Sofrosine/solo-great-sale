// @flow
import React, {useState} from 'react';
import {TextInput as TextInputNative} from 'react-native';

// styles
import styles from './styles';

//uikit
import Button from '../Button';
import Text from '../Text';
import View from '../View';
import Color from 'styles/Color';

const TextInput: React.FC<TextInputProps> = props => {
  const {
    autoCapitalize,
    autoCorrect,
    autoFocus,
    buttonContainerStyle,
    color,
    containerStyle,
    customBorderColor,
    editable,
    error,
    errorMessage,
    fontSize,
    isNotMandatory,
    keyboardType,
    label,
    labelStyle,
    leftIcon,
    maxLength,
    multiline,
    numberOfLines,
    onBlurInput,
    onBlurTextInput,
    onChangeText,
    onFocusInput,
    onKeyPress,
    onPress,
    onSubmitEditing,
    onTouchStart,
    padding,
    placeholder,
    placeholderColor,
    returnKeyType,
    rightIcon,
    testID,
    textAlign,
    txtRef,
    value,
    helpText,
    customMandatory,
    fontFamily,
    lineHeight,
    secureTextEntry,
  } = props;

  const [borderColor, setBorderColor] = useState(Color.GREY_TEXT);
  const border = error ? Color.RED : borderColor;
  const onFocus = () => {
    setBorderColor(Color.GREY_TEXT);
    onFocusInput && onFocusInput();
    onBlurInput && onBlurInput();
  };
  const onBlur = () => {
    setBorderColor(Color.GREY_TEXT);
    onBlurTextInput && onBlurTextInput();
  };

  return (
    <View>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {isNotMandatory && (
            <Text testID={`${testID}-optional`} color={Color.ALMOST_WHITE}>
              {' (Opsional)'}
            </Text>
          )}
          {customMandatory && (
            <Text
              size={11}
              color={Color.ALMOST_WHITE}>{` ${customMandatory}`}</Text>
          )}
        </Text>
      )}

      <View
        testID={`${testID} border`}
        style={[
          styles.container,
          {
            borderColor: customBorderColor ? customBorderColor : border,
          },
          containerStyle,
        ]}>
        {leftIcon && <View testID={`${testID}-icon`}>{leftIcon}</View>}
        <View style={styles.flex1}>
          {/*$FlowFixMe*/}
          <TextInputNative
            onTouchStart={() => onTouchStart && onTouchStart()}
            testID={testID}
            editable={editable}
            autoCapitalize={autoCapitalize}
            textAlign={textAlign}
            autoFocus={autoFocus}
            maxLength={maxLength}
            keyboardType={keyboardType}
            value={value}
            placeholder={placeholder}
            ref={txtRef}
            selectionColor={Color.GREY_TEXT}
            placeholderTextColor={placeholderColor}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            onChangeText={text => {
              onChangeText && onChangeText(text);
            }}
            style={[
              styles.txtInput,
              {
                color: color ? color : error ? Color.RED : Color.ALMOST_BLACK,
                fontSize,
                padding,
                fontFamily,
                lineHeight,
              },
            ]}
            onKeyPress={onKeyPress}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
            returnKeyType={returnKeyType}
            multiline={multiline}
            numberOfLines={numberOfLines}
            autoCorrect={autoCorrect}
          />
        </View>
        {rightIcon && <View testID={`${testID}-icon`}>{rightIcon}</View>}
        {onPress && editable && (
          <Button
            testID={`${testID}-button`}
            style={[styles.clickableArea, buttonContainerStyle]}
            onPress={() => onPress()}
            underlayColor={Color.WHITE}
            label=""
          />
        )}
      </View>
      {error ? (
        <Text color={Color.RED} style={styles.error}>
          {errorMessage}
        </Text>
      ) : (
        helpText && (
          <Text color={Color.ALMOST_WHITE} style={styles.helpText}>
            {helpText}
          </Text>
        )
      )}
    </View>
  );
};

TextInput.defaultProps = {
  testID: 'text-input',
  editable: true,
  autoCapitalize: 'none',
  textAlign: 'left',
  keyboardType: 'default',
  placeholder: '',
  placeholderColor: Color.GREY_TEXT,
  autoCorrect: false,
  onKeyPress: () => {},
  onBlurTextInput: () => {},
  returnKeyType: 'done',
  multiline: false,
  numberOfLines: 1,
  fontSize: 14,
  error: false,
  customBorderColor: '',
  buttonContainerStyle: null,
};

export default React.memo(TextInput);
