type RootStackParamList = {
  Cart: undefined;
  CategoryPage: undefined;
  CategoryDetailPage: {
    id: number;
    title: string;
  };
  HomePage: undefined;
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
};
