export default function Home() {
  return (
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#home">My Next.js App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center mb-5">
              <h1 className="display-4 mb-3">Welcome to Next.js + Bootstrap 5</h1>
              <p className="lead">
                This template combines the power of Next.js with Bootstrap 5 styling.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Fast Development</h5>
                <p className="card-text">
                  Get started quickly with pre-built Bootstrap components
                  and Next.js optimization.
                </p>
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Responsive Design</h5>
                <p className="card-text">
                  Bootstrap's responsive grid system works seamlessly
                  with Next.js server-side rendering.
                </p>
                <button className="btn btn-secondary">Explore</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Modern Stack</h5>
                <p className="card-text">
                  Combine the latest versions of Next.js 15, React 19,
                  and Bootstrap 5 for optimal performance.
                </p>
                <button className="btn btn-success">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">Built with Next.js 15 & Bootstrap 5</p>
        </div>
      </footer>
    </>
  );
}
