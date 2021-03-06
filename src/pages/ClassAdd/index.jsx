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
                title: 'Ph?? duy???t h???c sinh',
                description:
                    'Ph?? duy???t h???c sinh tr??nh t??nh tr???ng ng?????i l??? v??o l???p h???c m?? kh??ng c?? s??? cho ph??p c???a b???n',
            },
            {
                name: 'preventQuitClass',
                title: 'Ch???n h???c sinh t??? ?? r???i l???p h???c',
                description:
                    'T??nh n??ng n??y gi??p gi??o vi??n qu???n l?? s??? l?????ng th??nh vi??n trong l???p t???t h??n tr??nh t??nh tr???ng h???c sinh t??? ?? tho??t kh???i l???p',
            },
            {
                name: 'showMark',
                title: 'Cho ph??p h???c sinh xem b???ng ??i???m',
                description:
                    'H???c sinh s??? ???????c xem b???ng ??i???m c???a c??c th??nh vi??n trong l???p',
            },
            {
                name: 'disableNewsfeed',
                title: 'T???t ho???t ?????ng b???ng tin',
                description: 'H???c sinh kh??ng th??? ????ng b??i, b??nh lu???n',
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
                                        T??n l???p h???c
                                    </FormLabel>
                                    <Input
                                        required
                                        {...field}
                                        placeholder={'V?? d???: bla bla bla'}
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
                                        M??n h???c
                                    </FormLabel>
                                    <Select
                                        {...field}
                                        id={'subject'}
                                        placeholder={'Ch???n m??n h???c'}
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
                                        Kh???i l???p
                                    </FormLabel>
                                    <Select
                                        {...field}
                                        id={'grade'}
                                        placeholder={'Ch???n kh???i l???p'}
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
                        B???n ph???i nh???p ?????y ????? c??c tr?????ng b???t bu???c ????? t???o l???p{' '}
                        <span className={'tw-text-red-600'}>(*)</span>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ClassAddPage;
