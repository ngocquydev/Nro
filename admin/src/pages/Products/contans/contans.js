const categories = [
  { id: 'licenses', title: 'Licenses', count: 2 },
  { id: 'modules', title: 'Modules', count: 5 },
  { id: 'plans', title: 'Plans', count: 2 },
  { id: 'templates', title: 'Templates', count: 6 },
];
const listItem = [{ name: 'All' }, { name: 'Active' }, { name: 'Draft' }, { name: 'Archived' }];
const Columns = [
  {
    id: 'ColumsProdcutsName',
    name: 'Name',
  },
  {
    id: 'ColumsProdcutsCategory',
    name: 'Category',
  },
  {
    id: 'ColumsProdcutsStatus',
    name: 'Status',
  },
  {
    id: 'ColumsProdcutsStock',
    name: 'Stock',
  },
  {
    id: 'ColumsProdcutsPrice',
    name: 'Price',
  },
  {
    id: 'ColumsProdcutsCreated',
    name: 'Created',
  },
];
const dataRouter = [
  {
    path: '/pack-nick-ngoc-rong-vip.html',
  },
  {
    path: '/pack-nick-so-sinh-ngon',
  },
  {
    path: '/pack-ban-nick-lien-quan-lienquangiare',
  },
  {
    path: '/pack-acc-reg-lienquangiare',
  },
];
export { categories, listItem, Columns, dataRouter };
