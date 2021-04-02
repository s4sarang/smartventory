import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Helmet>
    </>
  );
};

Meta.defaultProps = {
  title: 'SmartInventory',
  description: 'Smart solution to manage inventory',
  keywords: 'asset management, mobiles, laptops, electronics',
};

export default Meta;
