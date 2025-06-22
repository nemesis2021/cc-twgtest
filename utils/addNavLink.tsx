import getPathFromCmsUrl from './getPathFromCmsUrl';
import { MenuItemModel } from './models/MenuItemModel';
import { NavLinkModel } from './models/NavLinkModel';

const menuItemToNavLink = (node: MenuItemModel): NavLinkModel => ({
  id: node.id,
  label: node.label,
  href: getPathFromCmsUrl(node.url),
  children: [],
});

const addNavLink = (navLinks: NavLinkModel[], node: MenuItemModel): boolean => {
  if (!node.parentId) {
    navLinks.push(menuItemToNavLink(node));
    return true;
  }

  for (let i = 0; i < navLinks.length; i++) {
    const navLink = navLinks[i];
    if (navLink.id === node.parentId) {
      navLink.children.push(menuItemToNavLink(node));
      return true;
    }
  }

  for (let i = 0; i < navLinks.length; i++) {
    if (addNavLink(navLinks[i].children, node)) {
      return true;
    }
  }

  return false;
};

export default addNavLink;
