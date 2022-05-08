import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {
    AddIcon,
    EditIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    RepeatIcon,
    ViewIcon,
    ArrowForwardIcon,
    ViewOffIcon,
    DeleteIcon
} from "@chakra-ui/icons";

function CardClass({name, code}) {
    return (
        <div className={'tw-w-[320px] tw-rounded-xl  tw-border-2 tw-border-gray-200 tw-cursor-pointer'}>
            <div className={'tw-w-full'}>
                <img className={'tw-h-[132px] tw-rounded-t-xl'}
                     src="https://shub-storage.sgp1.cdn.digitaloceanspaces.com/profile_images/44-01.jpg" alt=""/>
            </div>
            <div className={'tw-flex tw-justify-between tw-py-3 tw-px-4'}>
                <div>
                    <div className={'tw-font-semibold tw-text-base'}>{name}</div>
                    <div className={'tw-uppercase'}>{code}</div>
                </div>
                <div className={'tw-flex tw-flex-col tw-justify-center'}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<ViewIcon/>}
                            variant='ghost'
                        />
                        <MenuList>
                            <MenuItem icon={<ArrowForwardIcon/>}>
                                Vào lớp
                            </MenuItem>
                            <MenuItem icon={<EditIcon/>}>
                                Chỉnh sửa
                            </MenuItem>
                            <MenuItem icon={<ViewOffIcon/>}>
                                Ẩn lớp
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon/>}>
                                Xóa
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>

            </div>
        </div>
    )
}

export default CardClass;
