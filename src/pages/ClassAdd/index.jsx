import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
} from '@chakra-ui/react';
import RuleClass from '~/components/class/RuleClass';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchCreateClass, getOption } from '~/services/class';
import { useNavigate } from 'react-router-dom';

function ClassAddPage() {
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            name: '',
            approveStudent: false,
            preventQuitClass: false,
            showMark: false,
            disableNewsfeed: false,
            subjectId: undefined,
            gradeId: undefined,
            privateCode: '',
            showPrivateCode: false,
        },
    });

    const navigate = useNavigate();

    const canSubmit = useMemo(() => {
        return (
            Boolean(watch('name')) &&
            Boolean(watch('gradeId')) &&
            Boolean(watch('subjectId'))
        );
    }, [watch('name'), watch('gradeId'), watch('subjectId')]);

    const { data: subjects } = useQuery('subjects', async () => {
        const response = await getOption('subjects');
        return response.data.data;
    });
    const { data: grades } = useQuery('grades', async () => {
        const response = await getOption('grades');
        return response.data.data;
    });

    const toast = useToast();

    const { mutate } = useMutation('create', (data) => fetchCreateClass(data), {
        onSuccess(response) {
            navigate('/class');
            toast({
                title: 'success',
                status: 'success',
                position: 'top',
            });
        },
        onError(error) {
            console.log(error);
        },
    });

    const rules = useMemo(() => {
        return [
            {
                name: 'showPrivateCode',
                title: 'Ma bao ve',
                description: 'hello',
                render: ({ isShow }) => (
                    <>
                        {isShow && (
                            <Controller
                                control={control}
                                name={'privateCode'}
                                render={({ field }) => <Input {...field} />}
                            />
                        )}
                    </>
                ),
            },
            {
                name: 'approveStudent',
                title: 'Phê duyệt học sinh',
                description:
                    'Phê duyệt học sinh tránh tình trạng người lạ vào lớp học mà không có sự cho phép của bạn',
            },
            {
                name: 'preventQuitClass',
                title: 'Chặn học sinh tự ý rời lớp học',
                description:
                    'Tính năng này giúp giáo viên quản lý số lượng thành viên trong lớp tốt hơn tránh tình trạng học sinh tự ý thoát khỏi lớp',
            },
            {
                name: 'showMark',
                title: 'Cho phép học sinh xem bảng điểm',
                description:
                    'Học sinh sẽ được xem bảng điểm của các thành viên trong lớp',
            },
            {
                name: 'disableNewsfeed',
                title: 'Tắt hoạt động bảng tin',
                description: 'Học sinh không thể đăng bài, bình luận',
            },
        ];
    }, [control]);

    const submit = (data) => {
        mutate({
            ...data,
            subjectId: Number(data.subjectId),
            gradeId: Number(data.gradeId),
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div
                className={
                    'tw-mx-80 tw-grid tw-grid-cols-12 tw-gap-10 tw-mt-10'
                }
            >
                <div className={'tw-col-span-7'}>
                    <div>
                        <Controller
                            name={'name'}
                            control={control}
                            render={({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel htmlFor={'name'}>
                                        Tên lớp học
                                    </FormLabel>
                                    <Input
                                        required
                                        {...field}
                                        placeholder={'Ví dụ: bla bla bla'}
                                    />
                                </FormControl>
                            )}
                        />
                    </div>
                    <>
                        {rules.map((item) => (
                            <div key={item.name} className={'tw-mt-5'}>
                                <Controller
                                    name={item.name}
                                    control={control}
                                    render={({ field }) => (
                                        <RuleClass
                                            name={item.name}
                                            title={item.title}
                                            description={item.description}
                                            {...item}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        ))}
                    </>

                    <div className={'tw-mt-5'}>
                        <Controller
                            name={'subjectId'}
                            control={control}
                            render={({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel htmlFor={'subject'}>
                                        Môn học
                                    </FormLabel>
                                    <Select
                                        {...field}
                                        id={'subject'}
                                        placeholder={'Chọn môn học'}
                                    >
                                        {subjects?.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className={'tw-mt-5'}>
                        <Controller
                            render={({ field }) => (
                                <FormControl isRequired>
                                    <FormLabel htmlFor={'grade'}>
                                        Khối lớp
                                    </FormLabel>
                                    <Select
                                        {...field}
                                        id={'grade'}
                                        placeholder={'Chọn khối lớp'}
                                    >
                                        {grades?.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            name={'gradeId'}
                            control={control}
                        />
                    </div>
                </div>
                <div className="tw-col-span-5">
                    <Button
                        size={'lg'}
                        width={'full'}
                        type={'submit'}
                        disabled={!canSubmit}
                        colorScheme={'telegram'}
                    >
                        Tao moi
                    </Button>
                    <div>
                        Bạn phải nhập đầy đủ các trường bắt buộc để tạo lớp{' '}
                        <span className={'tw-text-red-600'}>(*)</span>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ClassAddPage;
