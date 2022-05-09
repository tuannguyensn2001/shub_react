import styles from './style.module.scss';
import classNames from "classnames/bind";

const style = classNames.bind(styles);

const lists = [
    {
        link: '/newsfeed',
        label: 'Bảng tin'
    },
    {
        link: '/schedule',
        label: 'Lịch học'
    }
]

function Sidebar() {
    return (
        <div className={'tw-w-full tw-h-full  '}>
            <div className={style("main")}>
                <div className={'tw-font-bold tw-pl-5'}>
                    Số học - 11
                </div>
                <div className={'tw-pl-5'}>Mã lớp: <span className={'tw-font-bold'}> ABCXYZ</span></div>
                <div className={'tw-mt-4 tw-text-sm tw-pl-5'}>
                    Danh mục
                </div>
                <ul className={'tw-list-none tw-mt-2'}>
                    {lists.map(item => (
                        <li key={item.link}
                            className={style('menu_item', {'menu_active': item.link.includes('newsfeed')})}>
                            <span className={'tw-font-bold tw-text-base'}>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={style('setting')}>
                abc
            </div>
        </div>
    )
}

export default Sidebar;
