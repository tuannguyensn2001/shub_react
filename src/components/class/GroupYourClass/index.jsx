import {Button} from "@chakra-ui/react";
import {useCallback, useMemo, useState} from "react";

function GroupYourClass() {

    const [picked, setPicked] = useState(1);

    const handlePick = type => () => setPicked(type);

    const checkIsActive = (type) => {
        if (type !== picked) return {};

        return {
            colorScheme: 'facebook',
            isActive: true
        }
    }

    return (
        <div>
            <Button onClick={handlePick(1)}
                    borderRadius={8}
                    size={'sm'}
                    {...checkIsActive(1)}
            >
                Lớp
                của bạn
                2</Button>
            <Button onClick={handlePick(2)} ml={5} borderRadius={8} size={'sm'} {...checkIsActive(2)}>Lớp đã ẩn
                0</Button>
        </div>
    )
}

export default GroupYourClass;
