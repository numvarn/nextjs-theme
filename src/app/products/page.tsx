'use client';

import { useState, useEffect } from 'react';
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    setCategories(uniqueCategories);
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

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

  return (
    <div className="container mt-5 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-4 mb-3">
            <i className="bi bi-bag-fill me-3"></i>
            สินค้าทั้งหมด
          </h1>
          <p className="lead text-muted">
            เลือกสินค้าที่คุณสนใจและดูรายละเอียดเพิ่มเติม
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${
                selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              ทั้งหมด
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`btn ${
                  selectedCategory === category
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {filteredProducts.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <i className="bi bi-info-circle me-2"></i>
              ไม่มีสินค้าในหมวดหมู่นี้
            </div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm hover-shadow">
                <Link
                  href={`/products/${product._id}`}
                  className="text-decoration-none text-dark"
                >
                  {/* Product Image */}
                  <div
                    className="position-relative"
                    style={{ paddingTop: '100%', overflow: 'hidden' }}
                  >
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 bg-light d-flex align-items-center justify-content-center"
                      >
                        <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                      </div>
                    )}
                    {/* Stock Badge */}
                    {product.quantity === 0 && (
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-danger">หมด</span>
                      </div>
                    )}
                    {product.quantity > 0 && product.quantity < 10 && (
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-warning">เหลือน้อย</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="card-body">
                    <div className="mb-2">
                      <span className="badge bg-secondary">{product.category}</span>
                    </div>
                    <h5 className="card-title mb-2">{product.name}</h5>
                    <p className="card-text text-muted small" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {product.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="h5 mb-0 text-primary">
                        ฿{product.price.toLocaleString()}
                      </span>
                      <span className="text-muted small">
                        <i className="bi bi-box-seam me-1"></i>
                        คงเหลือ: {product.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer bg-transparent border-top-0">
                    <div className="d-grid">
                      <span className="btn btn-outline-primary">
                        ดูรายละเอียด
                        <i className="bi bi-arrow-right ms-2"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
