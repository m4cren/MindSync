export function generateToken(length = 48): string {
   const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let token = "";
   for (let i = 0; i < length; i++) {
      token += charset[Math.floor(Math.random() * charset.length)];
   }
   return token;
}
