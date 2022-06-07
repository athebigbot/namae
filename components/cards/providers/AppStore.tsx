import useFetch from 'fetch-suspense';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { SiAppstore } from 'react-icons/si';
import { Card, Result } from '../core';

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const response = useFetch(
    `/api/services/appstore/${encodeURIComponent(query)}?country=${t(
      'countryCode'
    )}`
  ) as {
    result: Array<{
      name: string;
      viewURL: string;
      author: string;
      id: string;
    }>;
  };
  const apps = response.result;

  return (
    <>
      {apps && apps.length > 0 ? (
        apps.map((app) => (
          <Result
            title={app.name.split(/[－–—\-:]/)[0]}
            message={`By ${app.author}`}
            link={app.viewURL}
            icon={<SiAppstore />}
            key={app.id}
          />
        ))
      ) : (
        <Result
          title={t('noResult')}
          message={t('noResult')}
          icon={<FaInfoCircle />}
        />
      )}
    </>
  );
};

const AppStoreCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('providers.appStore')}>
      <Search query={query} />
    </Card>
  );
};

export default AppStoreCard;
