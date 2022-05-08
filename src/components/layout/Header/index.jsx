import classNames from 'classnames/bind';
import styles from './style.module.scss';
import {Avatar} from '@chakra-ui/react';
import {Link, useLocation} from 'react-router-dom';

const style = classNames.bind(styles);

const menu = [
    {
        link: '/class',
        label: 'Lớp học',
    },
    {
        link: '/resource',
        label: 'Học liệu',
    },
    {
        link: '/schedule',
        label: 'Lịch học',
    },
    {
        link: '/help',
        label: 'Hướng dẫn',
    },
];

function Header() {
    const {pathname} = useLocation();

    return (
        <div className={style('header')}>
            <div className={'tw-px-5 tw-flex tw-justify-between tw-h-full'}>
                <div
                    className={
                        'tw-h-full tw-flex tw-flex-col tw-justify-center'
                    }
                >
                    <img
                        src="https://shub.edu.vn/images/brand-blue.svg"
                        alt=""
                    />
                </div>
                <div>
                    <ul className={'tw-flex tw-list-none tw-h-full '}>
                        {menu.map((item) => (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    className={style('main_item', {
                                        main_item_active:
                                            pathname.includes(item.link),
                                    })}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={'tw-flex tw-flex-col tw-justify-center'}>
                    <Avatar
                        name="Kent Dodds"
                        src="https://bit.ly/kent-c-dodds"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
