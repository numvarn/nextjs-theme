export default function CreateProduct() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Create New Product</h1>

          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="0.00"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select className="form-select" id="category">
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                    <option value="books">Books</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={4}
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="inStock"
                  />
                  <label className="form-check-label" htmlFor="inStock">
                    In Stock
                  </label>
                </div>

                <button type="submit" className="btn btn-primary">
                  Create Product
                </button>
                <button type="reset" className="btn btn-secondary ms-2">
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
