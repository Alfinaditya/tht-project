import { Response } from '@/types/api';

export type LoginResponse = Response<{ token: string }>;
export type RegisterResponse = Response<null>;
