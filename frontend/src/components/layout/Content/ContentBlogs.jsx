import React, { useContext, useMemo } from "react";
import ItemsBlog from "@components/layout/ItemsBlog/ItemsBlog";
import { Col, Row } from "react-bootstrap";
import { BlogsContext } from "@contexts/BlogsProvider";
import { formatRelativeTime } from "@util/formatTime.js";
import ReactPaginateCommon from "@components/common/ReactPaginateCommon/ReactPaginateCommon";
import LoadingCommon from "@components/common/LoadingCommon/LoadingCommon";

function ContentBlogs() {
  const { blogs, query, setQuery, loading } = useContext(BlogsContext);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    console.log(selectedPage);
    if (selectedPage !== query.page) {
      setQuery((prev) => ({
        ...prev,
        page: selectedPage,
      }));
    }
  };
  const pageCount = useMemo(() => {
    return blogs?.pagination?.totalPage || 0;
  }, [blogs]);

  const currentPage = useMemo(() => {
    return (query.page || 1) - 1;
  }, [query.page]);
  return (
    <>
      {loading ? (
        <LoadingCommon loading={loading} />
      ) : (
        <Row>
          {blogs.data?.length > 0 ? (
            blogs.data.map((it) => (
              <Col xs={12} md={6} lg={4} key={it._id} className="mt-3">
                <ItemsBlog
                  title={it.title}
                  img={it.img}
                  content={it.desc}
                  times={formatRelativeTime(it.createdAt)}
                />
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center mt-5">
              <p>Chưa có bài viết nào.</p>
            </Col>
          )}
        </Row>
      )}
      {pageCount > 1 && (
        <ReactPaginateCommon
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      )}
    </>
  );
}

export default ContentBlogs;
