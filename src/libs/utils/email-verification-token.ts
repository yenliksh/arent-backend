export const generateVerificationToken = (email: string) => {
  return Buffer.from(JSON.stringify(email)).toString('base64');
};

export const decodeVerificationToken = (token: string) => {
  return JSON.parse(Buffer.from(token, 'base64').toString());
};
