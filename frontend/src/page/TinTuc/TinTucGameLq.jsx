import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import ContentBlogs from '@components/layout/Content/ContentBlogs';
import { BlogsProvider } from '@contexts/BlogsProvider';
import React from 'react';
import { Container } from 'react-bootstrap';

function TinTucGameLq() {
  return (
    <BlogsProvider>
      <Container>
        <Breadcrumbs
          title={'Blog - TIN TỨC GAME LIÊN QUÂN'}
          desc={'Blog - TIN TỨC GAME LIÊN QUÂN'}
        />
        <ContentBlogs />
      </Container>
    </BlogsProvider>
  );
}

export default TinTucGameLq;
