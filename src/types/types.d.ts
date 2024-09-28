interface NavigationMenuItemType {
  icon: JSX.Element;
  text: string;
  href: string;
}

interface ActionReturnType<T> {
  message?: string;
  data?: T;
  error?: string;
}
