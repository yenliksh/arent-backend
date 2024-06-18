import * as path from 'path';

import * as cfSign from 'aws-cloudfront-sign';

export const getCfSignedUrl = (url: string): string => {
  const options = {
    expireTime: new Date().getTime() + 60 * 60 * 1000, // 1 hour
    keypairId: process.env.AWS_KEYPAIR_ID,
    privateKeyPath: path.join(__dirname, '../../../../private_key.pem'),
  };

  const signedUrl = cfSign.getSignedUrl(url, options);

  return signedUrl as string;
};
