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
    label: 'Chọn thể loại',
  },
  {
    label: '/pack-nick-ngoc-rong-vip.html',
  },
  {
    label: '/pack-nick-so-sinh-ngon',
  },
  {
    label: '/pack-ban-nick-lien-quan-lienquangiare',
  },
  {
    label: '/pack-acc-reg-lienquangiare',
  },
];
const status = [
  {
    label: 'Chọn trạng thái',
  },
  {
    label: 'còn',
  },
  {
    label: 'hết',
  },
];
export { categories, listItem, Columns, dataRouter, status };
