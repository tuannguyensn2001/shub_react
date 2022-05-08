import Header from '~/components/layout/Header';
import styles from './style.module.scss';
import classNames from "classnames/bind";

const style = classNames.bind(styles);

function DefaultLayout({children}) {
    return (
        <div>
            <Header/>
            <div className={style('main')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
