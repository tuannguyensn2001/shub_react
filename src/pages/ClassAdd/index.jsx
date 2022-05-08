import {Button, FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import RuleClass from "~/components/class/RuleClass";
import {useForm} from "react-hook-form";
import {Controller} from "react-hook-form";
import {useMemo} from "react";

const rules = [
    {
        name: 'approve_student',
        title: 'Phê duyệt học sinh',
        description: 'Phê duyệt học sinh tránh tình trạng người lạ vào lớp học mà không có sự cho phép của bạn'
    },
    {
        name: 'prevent_quit_class',
        title: 'Chặn học sinh tự ý rời lớp học',
        description: 'Tính năng này giúp giáo viên quản lý số lượng thành viên trong lớp tốt hơn tránh tình trạng học sinh tự ý thoát khỏi lớp'
    },
    {
        name: 'show_mark',
        title: 'Cho phép học sinh xem bảng điểm',
        description: 'Học sinh sẽ được xem bảng điểm của các thành viên trong lớp'
    },
    {
        name: 'disable_newsfeed',
        title: 'Tắt hoạt động bảng tin',
        description: 'Học sinh không thể đăng bài, bình luận'
    }
]

const subjects = [
    {
        name: 'math',
        label: 'Toán học'
    },
    {
        name: 'numerals',
        label: 'Số học'
    },
    {
        name: 'algebra',
        label: 'Đại số'
    },
    {
        name: 'algebra_calculus',
        label: 'Đại số và giải tích'
    }
]

const grades = [
    {
        name: '6',
        label: 'Lớp 6'
    },
    {
        name: '7',
        label: 'Lớp 7'
    }
]

function ClassAddPage() {

    const {control, handleSubmit, watch} = useForm({
        defaultValues: {
            name: '',
            approve_student: false,
            prevent_quit_class: false,
            show_mark: false,
            disable_newsfeed: false,
            subject: undefined,
            grade: undefined
        }
    });

    const canSubmit = useMemo(() => {
        return Boolean(watch('name')) && Boolean('grade') && Boolean(watch('subject'))
    }, [watch('name'), watch('grade'), watch('subject')])

    const submit = data => {
        console.log(data);
    }

    return <form onSubmit={handleSubmit(submit)}>
        <div className={'tw-mx-80 tw-grid tw-grid-cols-12 tw-gap-10 tw-mt-10'}>
            <div className={'tw-col-span-7'}>
                <div>
                    <Controller
                        name={'name'}
                        control={control}
                        render={({field}) => (
                            <FormControl isRequired>
                                <FormLabel htmlFor={'name'}>Tên lớp học</FormLabel>
                                <Input required {...field} placeholder={'Ví dụ: bla bla bla'}/>
                            </FormControl>
                        )}
                    />
                </div>
                <>
                    {rules.map(item => (
                        <div key={item.name} className={'tw-mt-5'}>
                            <Controller
                                name={item.name}
                                control={control}
                                render={({field}) => (
                                    <RuleClass name={item.name} title={item.title}
                                               description={item.description} {...field}/>
                                )}
                            />
                        </div>
                    ))}
                </>

                <div className={'tw-mt-5'}>
                    <Controller
                        name={'subject'}
                        control={control}
                        render={({field}) => (
                            <FormControl isRequired>
                                <FormLabel htmlFor={'subject'}>Môn học</FormLabel>
                                <Select {...field} id={'subject'} placeholder={'Chọn môn học'}>
                                    {subjects.map(item => (
                                        <option key={item.name} value={item.name}>{item.label}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                </div>

                <div className={'tw-mt-5'}>
                    <Controller render={({field}) => (
                        <FormControl isRequired>
                            <FormLabel htmlFor={'grade'}>Khối lớp</FormLabel>
                            <Select {...field} id={'grade'} placeholder={'Chọn khối lớp'}>
                                {grades.map(item => (
                                    <option key={item.name} value={item.name}>{item.label}</option>
                                ))}
                            </Select>
                        </FormControl>
                    )} name={'grade'} control={control}/>

                </div>

            </div>
            <div className="tw-col-span-5">
                <Button size={'lg'} width={'full'} type={'submit'} disabled={!canSubmit} colorScheme={'telegram'}>Tao
                    moi</Button>
                <div>
                    Bạn phải nhập đầy đủ các trường bắt buộc để tạo lớp <span className={'tw-text-red-600'}>(*)</span>
                </div>
            </div>
        </div>
    </form>;
}

export default ClassAddPage;
