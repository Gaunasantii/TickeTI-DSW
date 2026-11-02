import { toast } from "sonner";
import type { IFieldError } from "../../types/IFieldError";
import { parseErrorsListToString } from "../../helpers/ParseErrorsListToString";

interface ToastOptions {
  description?: string;
  Error?: IFieldError[];
  duration?: number;
}

export const Notify={

    success: (message: string, options?: ToastOptions) => {
        toast.success(message, {
            description: options?.description,
            duration: options?.duration,
        });
    },

    error:(message:string,options?:ToastOptions)=>{
        toast.error(message,{
            description: options?.description,
            duration: options?.duration,
        })
    },

    validationError: (message: string, options?: ToastOptions) => {

        console.log(options?.Error);

        toast.warning(message, {
            description: parseErrorsListToString(options?.Error!),
            descriptionClassName: 'whitespace-pre-line',
            duration: options?.duration,
        });
    },
    
}