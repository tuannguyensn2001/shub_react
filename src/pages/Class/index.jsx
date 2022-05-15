import GroupYourClass from '~/components/class/GroupYourClass';
import GroupSearchClass from '~/components/class/GroupSearchClass';
import CardClass from '~/components/unit/CardClass';
import { useQuery } from 'react-query';
import { fetchOwnClass } from '~/services/class';

function ClassPage() {
    const { data } = useQuery('classes', async () => {
        const response = await fetchOwnClass();
        return response.data.data;
    });

    return (
        <div className={'tw-mx-5 tw-mt-5'}>
            <GroupYourClass showTotal={data?.data?.length} hideTotal={0} />
            <div className="tw-mt-5">
                <GroupSearchClass />
            </div>
            <div>
                <div className={'tw-grid tw-grid-cols-5 tw-mt-5 tw-gap-5'}>
                    {data?.data &&
                        data?.data?.map((item) => (
                            <CardClass
                                id={item.id}
                                name={item.name}
                                code={item.code}
                                key={item.id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ClassPage;
