'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      if (response.ok) {
        setProduct(data.product);
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">ไม่พบสินค้า</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">หน้าแรก</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/products">สินค้า</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Image Slideshow */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-0">
              {/* Main Image */}
              <div
                className="position-relative"
                style={{ paddingTop: '100%', overflow: 'hidden' }}
              >
                {product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[currentImageIndex]}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                    />

                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          className="btn btn-dark position-absolute top-50 start-0 translate-middle-y ms-3 opacity-75"
                          onClick={prevImage}
                          style={{ zIndex: 10 }}
                        >
                          <i className="bi bi-chevron-left"></i>
                        </button>
                        <button
                          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y me-3 opacity-75"
                          onClick={nextImage}
                          style={{ zIndex: 10 }}
                        >
                          <i className="bi bi-chevron-right"></i>
                        </button>

                        {/* Image Counter */}
                        <div className="position-absolute bottom-0 end-0 m-3">
                          <span className="badge bg-dark opacity-75">
                            {currentImageIndex + 1} / {product.images.length}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 bg-light d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-image text-muted" style={{ fontSize: '5rem' }}></i>
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {product.images && product.images.length > 1 && (
                <div className="p-3 bg-light">
                  <div className="d-flex gap-2 justify-content-center">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`btn p-0 border ${
                          currentImageIndex === index
                            ? 'border-primary border-3'
                            : 'border-secondary'
                        }`}
                        onClick={() => goToImage(index)}
                        style={{ width: '80px', height: '80px' }}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="badge bg-secondary fs-6">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1 className="display-5 mb-3">{product.name}</h1>

              {/* Price */}
              <div className="mb-4">
                <h2 className="text-primary mb-0">
                  ฿{product.price.toLocaleString()}
                </h2>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.quantity === 0 ? (
                  <div className="alert alert-danger d-inline-flex align-items-center">
                    <i className="bi bi-x-circle-fill me-2"></i>
                    <strong>สินค้าหมด</strong>
                  </div>
                ) : product.quantity < 10 ? (
                  <div className="alert alert-warning d-inline-flex align-items-center">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>เหลือเพียง {product.quantity} ชิ้น</strong>
                  </div>
                ) : (
                  <div className="alert alert-success d-inline-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>พร้อมจำหน่าย (คงเหลือ {product.quantity} ชิ้น)</strong>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  รายละเอียดสินค้า
                </h4>
                <p className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                  {product.description}
                </p>
              </div>

              {/* Product Info */}
              <div className="mb-4">
                <h5 className="mb-3">ข้อมูลเพิ่มเติม</h5>
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <td className="text-muted">หมวดหมู่:</td>
                      <td><strong>{product.category}</strong></td>
                    </tr>
                    <tr>
                      <td className="text-muted">จำนวนคงเหลือ:</td>
                      <td><strong>{product.quantity} ชิ้น</strong></td>
                    </tr>
                    <tr>
                      <td className="text-muted">ราคา:</td>
                      <td><strong className="text-primary">฿{product.price.toLocaleString()}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  disabled={product.quantity === 0}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  {product.quantity === 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
                </button>
                <Link href="/products" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left me-2"></i>
                  กลับไปหน้ารายการสินค้า
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn:hover {
          transform: scale(1.02);
          transition: all 0.2s ease;
        }
      `}</style>
    </div>
  );
}
