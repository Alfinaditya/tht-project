import { Response } from '../types';

export type LoginResponse = Response<{ token: string }>;
export type RegisterResponse = Response<null>;
