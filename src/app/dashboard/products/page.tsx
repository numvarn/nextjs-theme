'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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

export default function ProductsManagementPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    quantity: 0,
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      category: '',
      description: '',
      quantity: 0,
    });
    setExistingImages([]);
    setSelectedFiles(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
    });
    setExistingImages(product.images || []);
    setSelectedFiles(null);
    setShowModal(true);
  };

  const handleDelete = async (product: Product) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: `ต้องการลบสินค้า "${product.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/products/${product._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await Swal.fire('สำเร็จ!', 'ลบสินค้าเรียบร้อยแล้ว', 'success');
          fetchProducts();
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire('ผิดพลาด!', 'ไม่สามารถลบสินค้าได้', 'error');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 3) {
      Swal.fire('ผิดพลาด!', 'สามารถอัพโหลดได้สูงสุด 3 ภาพเท่านั้น', 'error');
      e.target.value = '';
      return;
    }
    setSelectedFiles(files);
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrls = [...existingImages];

      // Upload new images if any
      if (selectedFiles && selectedFiles.length > 0) {
        const formDataUpload = new FormData();
        Array.from(selectedFiles).forEach((file) => {
          formDataUpload.append('files', file);
        });

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload images');
        }

        const uploadData = await uploadResponse.json();
        imageUrls = [...imageUrls, ...uploadData.urls];
      }

      // Check total images
      if (imageUrls.length > 3) {
        throw new Error('Cannot have more than 3 images in total');
      }

      const productData = {
        ...formData,
        images: imageUrls,
      };

      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      await Swal.fire(
        'สำเร็จ!',
        `${editingProduct ? 'แก้ไข' : 'เพิ่ม'}สินค้าเรียบร้อยแล้ว`,
        'success'
      );

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      Swal.fire(
        'ผิดพลาด!',
        error instanceof Error ? error.message : 'ไม่สามารถบันทึกสินค้าได้',
        'error'
      );
    } finally {
      setUploading(false);
    }
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

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="bi bi-box-seam me-2"></i>
                จัดการสินค้า
              </h2>
              <button
                className="btn btn-light"
                onClick={handleAddNew}
              >
                <i className="bi bi-plus-circle me-2"></i>
                เพิ่มสินค้าใหม่
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ภาพ</th>
                      <th>ชื่อสินค้า</th>
                      <th>ราคา</th>
                      <th>หมวดหมู่</th>
                      <th>จำนวน</th>
                      <th>การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center">
                          ไม่มีสินค้า
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <i className="bi bi-image text-muted"></i>
                              </div>
                            )}
                          </td>
                          <td>{product.name}</td>
                          <td>฿{product.price.toLocaleString()}</td>
                          <td>{product.category}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary me-2"
                              onClick={() => handleEdit(product)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(product)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  disabled={uploading}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      ชื่อสินค้า
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="price" className="form-label">
                        ราคา
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: parseFloat(e.target.value),
                          })
                        }
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="quantity" className="form-label">
                        จำนวน
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: parseInt(e.target.value),
                          })
                        }
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      หมวดหมู่
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      รายละเอียด
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">
                      รูปภาพ (สูงสุด 3 รูป)
                    </label>

                    {/* Show existing images */}
                    {existingImages.length > 0 && (
                      <div className="mb-2">
                        <div className="d-flex gap-2 flex-wrap">
                          {existingImages.map((url, index) => (
                            <div key={index} className="position-relative">
                              <img
                                src={url}
                                alt={`Product ${index + 1}`}
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                onClick={() => handleRemoveExistingImage(index)}
                                style={{ transform: 'translate(25%, -25%)' }}
                              >
                                <i className="bi bi-x"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {existingImages.length < 3 && (
                      <input
                        type="file"
                        className="form-control"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                    )}
                    <div className="form-text">
                      รองรับไฟล์: JPG, PNG (ปัจจุบันมี {existingImages.length}{' '}
                      ภาพ)
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                    disabled={uploading}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        กำลังบันทึก...
                      </>
                    ) : (
                      'บันทึก'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
