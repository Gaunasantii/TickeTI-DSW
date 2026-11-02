import type {IFieldError} from "../types/IFieldError"

export function parseErrorsListToString(errors: IFieldError[]): string {
  return errors.map(e => `• ${e.field}: ${e.error}`).join("\n");
}