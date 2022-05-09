import dayjs from "dayjs";
import {useEffect, useState} from "react";
import isoWeek from 'dayjs/plugin/isoWeek';
import Title from "~/components/schedule/Title";

dayjs.extend(isoWeek)

function Schedule() {

    const [days, setDays] = useState([]);

    useEffect(() => {
        setDays(() => {
            const result = [];
            const now = dayjs();

            for (let i = 0; i <= 6; i++) {
                result.push(now.add(i, 'days'));
            }

            return result;
        })
    }, []);


    return (
        <div className={'tw-w-full tw-h-full tw-grid tw-grid-cols-7 tw-divide-x tw-divide-gray-300'}>
            {days.map(item => (
                <Title day={item} key={item.toString()}/>
            ))}
        </div>
    )
}

export default Schedule;
