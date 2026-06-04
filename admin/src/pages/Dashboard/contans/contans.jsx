import { BsCart } from 'react-icons/bs';
import { CiChat1 } from 'react-icons/ci';
import { FiStar, FiUserPlus } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';

const listRecentActivity = [
  {
    id: 1,
    icon: <BsCart />,
    color: 'text-amber-700',
    bg: 'bg-orange-100',
    name: 'New order placed',
    desc: 'Emma Wilson purchased Pro Dashboard License',
    date: '2 min ago',
  },
  {
    id: 2,
    icon: <FiUserPlus />,
    color: 'text-green-700',
    bg: 'bg-green-100',
    name: 'New customer registered',
    desc: 'James Chen created an account',
    date: '15 min ago',
  },
  {
    id: 3,
    icon: <FiStar />,
    color: 'text-purple-700',
    bg: 'bg-purple-100',
    name: '5-star review received',
    desc: '"Amazing template, exactly what I needed!"',
    date: '1 hour ago',
  },
  {
    id: 4,
    icon: <MdPayment />,
    name: 'Payment received',
    color: 'text-orange-700',
    bg: 'bg-orange-100',
    desc: '$1,499 from Sofia Garcia',
    date: '2 hours ago',
  },
  {
    id: 5,
    icon: <CiChat1 />,
    color: 'text-orange-700',
    bg: 'bg-sky-100',
    name: 'Support ticket resolved',
    desc: 'Ticket #4521 marked as resolved',
    date: '3 hours ago',
  },
  {
    id: 6,
    icon: <BsCart />,
    color: 'text-sky-700',
    bg: 'bg-orange-100',
    name: 'New order placed',
    desc: 'Alex Thompson purchased Single License',
    date: '5 hours ago',
  },
];
export default listRecentActivity;
