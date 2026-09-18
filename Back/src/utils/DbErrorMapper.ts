import { ConflictError, DatabaseError, ValidationError } from "./base.error.js"
import { 
    UniqueConstraintViolationException, 
    ForeignKeyConstraintViolationException,
    NotNullConstraintViolationException,
    ConnectionException,
    ValidationError as MikroORMvalidationError
} from '@mikro-orm/core';

export function mapDbErrorToAppError(error: any):never {
    if(error instanceof UniqueConstraintViolationException){
        throw new ConflictError("Ya se encuentra registrado un admin con los datos unicos proporcionados");
    }

    if (error instanceof ForeignKeyConstraintViolationException) {
        throw new ConflictError("No se puede realizar la acción porque hay registros dependientes");
    }

    if (error instanceof ConnectionException) {
        throw new DatabaseError("No hay conexión con la base de datos en este momento.", error.message);
    }

    if(error instanceof NotNullConstraintViolationException){
        throw new DatabaseError("Se ha intentado insertar un valor nulo en una columna que no permite nulos.", error.message);
    }

    //Nota para quien no nosotros lo haga, al incorporar
    //un validator este error debe ser removido
    if(error instanceof MikroORMvalidationError){
        throw new ValidationError("Error de validación en la base de datos", error.message);
    }
    throw new DatabaseError("Error en la base de datos",error.stack);
}