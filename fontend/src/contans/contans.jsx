const MenuHeader = [
    {
        name: 'Trang chủ',
        link: '/',
    },
    {
        name: 'Nạp Tiền',
        submenu: true,
        icon: 'BsChevronDown',
        link: '#',
        subMenu: [
            {
                name: 'Nạp qua thẻ điện thoại',
                link: '/nap-card',
            },
            {
                name: 'Nạp qua ATM Tặng 15%',
                link: '/nap-atm',
            },
        ],
    },
    {
        name: 'Hướng dẫn',
        link: '/blogs',
    },
    {
        name: 'Tin Tức',
        submenu: true,
        link: '#',
        subMenu: [
            {
                name: 'Tin Tức Game Ngọc Rồng',
                link: '/category/tin-tuc-game-ngoc-rong',
            },
            {
                name: 'Tin Tức Game Free Fire',
                link: '#',
            },
            {
                name: 'Tin Tức Game Liên Quân',
                link: '#',
            },
        ],
    },
    {
        name: 'Hỗ Trợ',
        link: '#',
    },
    {
        name: 'Đăng Nhập',
        right: true,
        link: '/login',
    },
];
export { MenuHeader };
