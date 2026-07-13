import React, { useContext } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { BlogsContext } from '@contexts/BlogsProvider';
import { formatRelativeTime } from '@util/formatTime.js';
import ItemsBlog from '@components/layout/ItemsBlog/ItemsBlog';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ContentBlogs() {
  const { data, loading, handleLoadMore, handleReset } = useContext(BlogsContext);
  console.log(data);
  if (loading && data.length === 0) {
    return (
      <Row className="g-4">
        {[...Array(6)].map((_, i) => (
          <Col xs={12} md={6} lg={4} key={i}>
            <Skeleton height={200} className="mb-2" />
            <Skeleton count={3} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Container fluid className="px-0">
      <Row className="g-4">
        {data.items?.map((it, index) => (
          <Col xs={12} md={6} lg={4} key={index + 1}>
            <ItemsBlog
              title={it?.title}
              img={it?.bgUrl}
              content={it?.descBg}
              times={formatRelativeTime(it?.createdAt)}
              href={`/blogs/details?id=${it?._id}`}
            />
          </Col>
        ))}
      </Row>

      {/* Hiển thị nút Load More */}
      {data.nextId && (
        <div className="d-flex justify-content-center my-4">
          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-2"
            onClick={handleLoadMore}
            disabled={loading}
            style={{ display: data.nextId === data.lastIdOfCategory ? 'none' : 'block' }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Đang tải thêm...
              </>
            ) : (
              'Xem thêm bài viết'
            )}
          </Button>
          {data.nextId === data.lastIdOfCategory ? (
            <Button
              variant="outline-danger"
              className="rounded-pill px-4 py-2"
              onClick={handleReset}
            >
              Reset
            </Button>
          ) : null}
        </div>
      )}
    </Container>
  );
}

export default ContentBlogs;
