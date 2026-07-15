import { Container } from 'react-bootstrap';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import { BlogsProvider } from '@contexts/BlogsProvider';
import ContentBlogs from '@components/layout/Content/ContentBlogs';
function Blogs() {
  return (
    <BlogsProvider>
      <Container className="mt-5">
        <div>
          <Breadcrumbs title={'Blog - Tin Tức'} desc={'Blog - Tin Tức'} />
        </div>
        <ContentBlogs />
      </Container>
    </BlogsProvider>
  );
}
export default Blogs;
