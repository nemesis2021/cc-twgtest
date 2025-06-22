export interface NavLinkModel {
  id: string;
  label: string;
  href: string;
  children: NavLinkModel[];
}
