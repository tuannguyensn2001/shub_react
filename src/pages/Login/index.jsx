import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import useAuthStore from '~/store/useAuthStore';
import { useMutation } from 'react-query';
import { fetchLogin } from '~/services/auth';
import shallow from 'zustand/shallow';

/* eslint-disable-next-line */

export function Login(props) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const setUser = useAuthStore((state) => state.setUser, shallow);

    const { mutate } = useMutation('create', (data) => fetchLogin(data), {
        onSuccess(response) {
            setUser(response.data.data);
        },
    });

    const submit = (data) => {
        mutate(data);
    };

    return (
        <div>
            <div
                className={
                    'tw-px-96 tw-flex tw-justify-between tw-w-full tw-fixed tw-h-[64px]'
                }
            >
                <div className={'tw-flex tw-flex-col tw-justify-center'}>
                    <img
                        src="https://shub.edu.vn/images/brand-blue.svg"
                        alt=""
                    />
                </div>
                <div className={'tw-flex tw-flex-col tw-justify-center'}>
                    <Select>
                        <option value="teacher">Tôi là giáo viên</option>
                    </Select>
                </div>
            </div>
            <div className={'tw-px-96 tw-pt-[64px]'}>
                <div className={'tw-grid tw-grid-cols-2'}>
                    <div className={'tw-p-10'}>
                        <div className={'tw-font-medium tw-text-2xl'}>
                            Học sinh đăng nhập
                        </div>
                        <div className={'tw-mt-5'}>
                            <form onSubmit={handleSubmit(submit)}>
                                <div>
                                    <Controller
                                        control={control}
                                        name={'email'}
                                        render={({ field }) => (
                                            <FormControl>
                                                <FormLabel htmlFor={'email'}>
                                                    Email
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    id={'email'}
                                                    placeholder={'Email'}
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className={'tw-mt-6'}>
                                    <Controller
                                        control={control}
                                        name={'password'}
                                        render={({ field }) => (
                                            <FormControl>
                                                <FormLabel htmlFor={'password'}>
                                                    Mat khau
                                                </FormLabel>
                                                <Input
                                                    type={'password'}
                                                    {...field}
                                                    id={'password'}
                                                    placeholder="Mat khau"
                                                />
                                            </FormControl>
                                        )}
                                    />
                                </div>
                                <div className="tw-mt-10">
                                    <Button
                                        type={'submit'}
                                        w={'100%'}
                                        colorScheme={'linkedin'}
                                    >
                                        Đăng nhập
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <img
                            className={'tw-h-5/6 tw-w-5/6'}
                            src="https://shub.edu.vn/images/illustrations/student-illustration.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
