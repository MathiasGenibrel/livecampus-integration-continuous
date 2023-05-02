export const environment = {
  production: false,
  saltRound: process.env.SALT_ROUND ?? 10,
  signedToken:
    process.env.SIGNED_TOKEN ?? '1539bb0b-9d11-4bbc-a310-f648dcb64999',
  application: {
    url: 'http://localhost:4200',
  },
};
