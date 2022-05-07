import Header from '~/components/layout/Header';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
