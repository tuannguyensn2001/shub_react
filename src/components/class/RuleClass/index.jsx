import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React from 'react';

function RuleClass({ name, title, description, value, onChange, render }, ref) {
    return (
        <div>
            <FormControl display={'flex'} justifyContent={'space-between'}>
                <FormLabel htmlFor={name}>{title}</FormLabel>
                <Switch
                    value={value}
                    onChange={onChange}
                    colorScheme={'linkedin'}
                    id={name}
                />
            </FormControl>
            <div>
                {!render && description}
                {!!render && render({ isShow: Boolean(value) })}
            </div>
        </div>
    );
}

export default React.forwardRef(RuleClass);
