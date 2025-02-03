import React from 'react';
import { Input } from './ui/input';

type CurrencyInputProps = Omit<
	React.ComponentProps<typeof Input>,
	'onChange'
> & {
	onChange?: (value: string) => void;
};

const formatNumber = (value: string) => {
	const number = value.replace(/\D/g, '');
	return number ? new Intl.NumberFormat('id-ID').format(Number(number)) : '';
};

export const CurrencyInput = React.forwardRef<
	HTMLInputElement,
	CurrencyInputProps
>(({ onChange, ...props }, ref) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		value = value.replace(/\D/g, '');
		const formattedValue = value ? formatNumber(value) : '';
		onChange?.(formattedValue);
	};

	return <Input {...props} ref={ref} onChange={handleInputChange} />;
});

CurrencyInput.displayName = 'CurrencyInput';
