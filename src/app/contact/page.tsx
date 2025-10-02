export default function Contact() {
  return (
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">My Next.js App</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/contact">Contact</a>
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
              <h1 className="display-4 mb-3">Contact Us</h1>
              <p className="lead">
                We'd love to hear from you. Send us a message!
              </p>
            </div>

            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subject" placeholder="Message subject" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows={5} placeholder="Your message here..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 text-center mb-4">
                <h5>Email</h5>
                <p>info@example.com</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <h5>Phone</h5>
                <p>+66 123 456 789</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <h5>Location</h5>
                <p>Bangkok, Thailand</p>
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
