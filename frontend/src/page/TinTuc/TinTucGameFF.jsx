import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import ContentBlogs from '@components/layout/Content/ContentBlogs';
import { BlogsProvider } from '@contexts/BlogsProvider';
import React from 'react';
import { Container } from 'react-bootstrap';

function TinTucGameFF() {
  return (
    <BlogsProvider>
      <Container>
        <Breadcrumbs title={'Blog - TIN TỨC GAME FF'} desc={'Blog - TIN TỨC GAME FF'} />
        <ContentBlogs />
      </Container>
    </BlogsProvider>
  );
}

export default TinTucGameFF;
