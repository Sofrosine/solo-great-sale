type TextInputProps = {
  testID?: string;
  label?: string;
  labelStyle?: any;
  isNotMandatory?: boolean;
  editable?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  textAlign?: 'center' | 'left' | 'right';
  autoFocus?: boolean;
  maxLength?: number;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'visible-password';
  value?: string;
  placeholder?: string;
  placeholderColor?: string;
  txtRef?: any;
  autoCorrect?: boolean;
  onFocusInput?: () => void;
  onBlurInput?: () => void;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onKeyPress?: (event: any) => void;
  onSubmitEditing?: () => void;
  onBlurTextInput?: () => void;
  onTouchStart?: () => void;
  returnKeyType?:
    | 'none'
    | 'done'
    | 'search'
    | 'default'
    | 'go'
    | 'next'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call';
  multiline?: boolean;
  numberOfLines?: number;
  fontSize?: number;
  padding?: number;
  color?: string;
  error?: boolean;
  containerStyle?: any;
  borderWidth?: number;
  elevation?: number;
  customBorderColor?: string;
  backgroundColor?: string;
  errorMessage?: string;
  buttonContainerStyle?: any;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  helpText?: string;
  customMandatory?: string;
  fontFamily?: string;
  lineHeight?: number;
  secureTextEntry?: boolean;
};
