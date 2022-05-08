import GroupYourClass from '~/components/class/GroupYourClass'
import GroupSearchClass from "~/components/class/GroupSearchClass";
import CardClass from "~/components/unit/CardClass";

function ClassPage() {
    return <div className={'tw-mx-5 tw-mt-5'}>
        <GroupYourClass/>
        <div className="tw-mt-5">
            <GroupSearchClass/>
        </div>
        <div>
            <div>
                <CardClass name={'toán lớp 11'} code={'abbcd'}/>
            </div>
        </div>
    </div>;
}

export default ClassPage;
