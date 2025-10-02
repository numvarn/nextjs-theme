export default function Home() {
  return (
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
                Bootstrap&apos;s responsive grid system works seamlessly
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
  );
}
