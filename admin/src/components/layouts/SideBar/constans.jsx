import { AiOutlineProduct } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { CiSettings, CiShop } from 'react-icons/ci';
import { FaBox, FaChartBar, FaHandshake, FaRocket, FaUserFriends } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import { TbReport } from 'react-icons/tb';
import {
  TiCalendar,
  TiDocumentText,
  TiFolder,
  TiMail,
  TiMessage,
  TiSortAlphabetically,
  TiThLarge,
  TiUser,
} from 'react-icons/ti';

const menuItems = [
  {
    id: 'Overview',
    title: 'Overview',
    subMenu: [
      { id: 'Dashboard', link: '/', title: 'Dashboard', icon: <AiOutlineProduct /> },
      { id: 'Analytics', link: '/analytics', title: 'Analytics', icon: <FaChartBar /> },
      { id: 'eCommerce', link: '/ecommerce', title: 'eCommerce', icon: <CiShop /> },
      { id: 'CRM', link: '/crm', title: 'CRM', icon: <FaHandshake /> },
      { id: 'SaaS', link: '/saas', title: 'SaaS', icon: <FaRocket /> },
      { id: 'Charts', link: '/chart', title: 'Charts', icon: <LuChartNoAxesCombined /> },
    ],
  },
  {
    id: 'Commerce',
    title: 'Commerce',
    subMenu: [
      { id: 'Orders', title: 'Orders', icon: <FiShoppingCart /> },
      { id: 'Products', link: '/products', title: 'Products', icon: <FaBox /> },
      { id: 'Customers', title: 'Customers', icon: <FaUserFriends /> },
      { id: 'Invoices', title: 'Invoices', icon: <TbReport /> },
    ],
  },
  {
    id: 'APPS',
    title: 'APPS',
    subMenu: [
      { id: 'Mail', title: 'Mail', icon: <TiMail /> },
      { id: 'Chat', title: 'Chat', icon: <TiMessage /> },
      { id: 'Files', title: 'Files', icon: <TiFolder /> },
      { id: 'Kanban', title: 'Kanban', icon: <TiThLarge /> },
      { id: 'Calendar', title: 'Calendar', icon: <TiCalendar /> },
      { id: 'Wizard', title: 'Wizard', icon: <TiSortAlphabetically /> },
      { id: 'Forms', title: 'Forms', icon: <TiDocumentText /> },
    ],
  },
  {
    id: 'Finance',
    title: 'Finance',
    subMenu: [{ id: 'Billing', title: 'Billing', icon: <TiMail /> }],
  },
  {
    id: 'System',
    title: 'System',
    subMenu: [
      { id: 'Users', title: 'Users', icon: <TiUser /> },
      { id: 'Notifications', title: 'Notifications', icon: <IoIosNotifications /> },
      { id: 'Settings', title: 'Settings', icon: <CiSettings /> },
      { id: 'Help & Support', title: 'Help & Support', icon: <TiThLarge /> },
      { id: 'Calendar', title: 'Calendar', icon: <TiCalendar /> },
      { id: 'Wizard', title: 'Wizard', icon: <TiSortAlphabetically /> },
      { id: 'Forms', title: 'Forms', icon: <TiDocumentText /> },
    ],
  },
  {
    id: 'Documentation',
    title: 'Documentation',
  },
];

export default menuItems;
