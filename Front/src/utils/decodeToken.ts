export type UsuarioToken = {
  id: string;
  rol: string;
  email: string;
  name: string;
  exp: number; // timestamp del JWT
}; //campos del usuario

export const decodeToken = (token: string): UsuarioToken | null => { //separo los campos del token
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')); //función nativa del navegador que decodifica Base64 a texto plano
    const payload = JSON.parse(payloadJson); //convierto a objeto de JS
    return payload;
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

export const tokenExpirado = (payload: UsuarioToken): boolean => {
  const ahoraEnSegundos = Math.floor(Date.now() / 1000); //devuelvo la fecha actual 
  return payload.exp < ahoraEnSegundos; //comparo el tiempo 
};