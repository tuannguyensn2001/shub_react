import {FormControl, FormLabel, SimpleGrid, Switch} from "@chakra-ui/react";
import React from 'react';

function RuleClass({name, title, description, value, onChange},ref) {
    return (
        <div>
            <FormControl display={'flex'} justifyContent={'space-between'}>
                <FormLabel htmlFor={name}>{title}</FormLabel>
                <Switch value={Boolean(value)} onChange={onChange} colorScheme={'linkedin'} id={name}/>
            </FormControl>
            <div>
                {description}
            </div>
        </div>
    )
}

export default React.forwardRef(RuleClass);
