type RootStackParamList = {
  Cart: undefined;
  CategoryPage: undefined;
  CategoryDetailPage: {
    id: number;
    title: string;
  };
  ForgotPasswordPage: undefined;
  HomePage: undefined;
  WebviewPage: {
    link: string;
    title: string;
  };
  ProductDetailPage: {
    id: string;
    title: string;
  };
  Profile: undefined;
  RegisterPage: undefined;
  ScanTenantPage: undefined;
  SplashPage: undefined;
  TenantDetailPage: {
    id: string;
    title?: string;
  };
  TransactionDetailPage: {
    id: number;
  };
  TransactionDirectPage: undefined;
  TransactionPage: undefined;
};
