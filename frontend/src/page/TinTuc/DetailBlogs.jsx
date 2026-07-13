import { formatRelativeTime } from '@/util/formatTime';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import { getBlogsId } from '@config/api/blogs/blogs';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { CiCalendar } from 'react-icons/ci';
import { FaClock, FaEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
function DetailBlogs() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getBlogsId(+id)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.error('lỗi', err));
  }, [id]);

  const isList = details?.desc.includes('/');
  const parseDesc = (desc) => {
    if (!desc) return [];
    return desc
      .split('/')
      .map((line) => line.trim())
      .filter((line) => line !== '');
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <Container className="py-5">
      {/* Skeleton cho Breadcrumbs */}
      <div className="mb-4">
        {details ? (
          <Breadcrumbs title={'Chi Tiết Blogs'} desc={`${details?.category} / ${details?.title}`} />
        ) : (
          <Skeleton width={200} />
        )}
      </div>

      <div>
        {/* Skeleton cho Hình ảnh */}
        <div className="rounded-3 mb-4 overflow-hidden shadow-sm">
          {details ? (
            <img
              src={details?.bgUrl}
              alt={details?.title}
              className="h-auto w-100"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
          ) : (
            <Skeleton height={450} />
          )}
        </div>

        {/* Skeleton cho Tiêu đề */}
        <h2 className="display-6 fw-bold mb-3">
          {details ? details?.title : <Skeleton width="70%" />}
        </h2>

        {/* Skeleton cho Meta info */}
        <div className="d-flex text-muted border-bottom mb-4 gap-3 pb-3">
          {details ? (
            <>
              <span>
                <CiCalendar size={24} /> {formatDate(details?.createdAt)}
              </span>
              <span>
                <FaClock size={24} /> {formatRelativeTime(details?.createdAt)}
              </span>
              <span>
                <FaEye size={24} /> {details?.view} lượt xem
              </span>
            </>
          ) : (
            <Skeleton count={1} width={300} />
          )}
        </div>

        {/* Skeleton cho Nội dung */}
        <div className="fs-5 lh-lg text-secondary mb-5">
          {details ? (
            isList ? (
              <ul>
                {parseDesc(details?.desc).map((list, index) => (
                  <li key={index}>{list}</li>
                ))}
              </ul>
            ) : (
              details?.desc
            )
          ) : (
            <Skeleton count={5} /> // Hiển thị 5 dòng Skeleton
          )}
        </div>

        {/* Nút quay lại */}
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4"
          onClick={() => navigate(`/${details?.category}`)}
          disabled={!details}
        >
          {details ? '← Quay lại trang Blogs' : <Skeleton width={100} />}
        </Button>
      </div>
    </Container>
  );
}

export default DetailBlogs;
