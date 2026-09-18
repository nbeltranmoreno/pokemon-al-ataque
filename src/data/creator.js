// El creador del juego tiene botones extra que los demás no ven.
// Se reconoce por la cuenta con la que inicia sesión.
const CREATOR_EMAILS = ['nbeltranmoreno@gmail.com'];

export const isCreator = (user) =>
  Boolean(user?.email && CREATOR_EMAILS.includes(user.email.trim().toLowerCase()));
