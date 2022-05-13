import {Outlet} from 'react-router-dom';
import Sidebar from "~/components/class_detail/sidebar";
import styles from './style.module.scss';
import classNames from "classnames/bind";

const style = classNames.bind(styles);

function DetailClass() {
    return (
        <div>
            <div className={style('wrapper')}>
                <div className={'tw-col-span-1'}>
                    <Sidebar/>
                </div>
                <div className="tw-col-span-7">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default DetailClass;
