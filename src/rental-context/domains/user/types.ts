export type SMSCodeRecord = {
  smscode: string;
  expDate: string;
  senderUserId?: string;
};

export type TokenEmailRecord = {
  token: string;
  expDate: string;
};
