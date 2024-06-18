import { slashAgnostic } from './slash-agnostic';

export const retrieveFileExtension = (fileName: string) => {
  const ext = fileName.split('.').pop();

  if (!ext) {
    return;
  }

  return ext.toLowerCase();
};

export const parseFileKeyFromUrl = (url: string): string => {
  const retrieveFileKeyFromUrlRegexp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)|((\/{1,})?\?.*)$/g;

  return url.replace(retrieveFileKeyFromUrlRegexp, '');
};

export const prependDomainUrlToFileKey = (fileKey: string, type: 'public' | 'private' = 'public') => {
  const domainUrlMap = {
    public: process.env.AWS_CF_PUBLIC_FILES as string,
    private: process.env.AWS_CF_PRIVATE_FILES as string,
  };

  const domainUrl = domainUrlMap[type];

  const url = fileKey.includes(domainUrl) ? fileKey : slashAgnostic(domainUrl, fileKey);

  return url;
};
