import { AxiosError, AxiosResponse } from 'axios';
interface BaseResponse<T> {
	status: number;
	message: string;
	data: T;
}
export type Response<T> = AxiosResponse<BaseResponse<T>>;

export type ExceptionResponse = AxiosError<BaseResponse<null>>;
