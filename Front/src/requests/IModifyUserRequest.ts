import { IModifyPersonRequest } from './IModifyPersonRequest';

export interface IModifyUserRequest extends IModifyPersonRequest {
    oficina: string;
}