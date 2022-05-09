import {PlusSquareIcon} from "@chakra-ui/icons";
import {Tooltip} from "@chakra-ui/react";

const convert = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',]

function Title({day}) {

    return (
        <div>
            <div className={'tw-border-b  tw-border-t tw-border-y-gray-300 tw-p-5'}>
                <div className={'tw-text-sm'}>
                    {convert[day.day()]}
                </div>
                <div className={'tw-font-bold tw-text-xl '}>
                    <span>
                        {day.date()} / {day.month()}
                    </span>
                    <span className={'tw-ml-3 tw-cursor-pointer hover:tw-bg-gray-200 tw-rounded-full tw-p-2'}>
                      <Tooltip label={'Thêm mới'}>
                            <PlusSquareIcon/>
                      </Tooltip>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Title;
