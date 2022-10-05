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
  SearchPage: undefined;
  SplashPage: undefined;
  SubCategoryDetailPage: {
    id: number;
    title: string;
    subId: number;
  };
  TenantDetailPage: {
    id: string;
    title?: string;
  };
  TransactionDetailPage: {
    id: number;
  };
  TransactionDirectPage: {
    tenantId: string;
  };
  TransactionPage: undefined;
};
