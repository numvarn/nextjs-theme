export default function About() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">About Us</h1>
            <p className="lead">
              Learn more about our mission and what we do
            </p>
          </div>

          <div className="mb-4">
            <h3>Our Story</h3>
            <p>
              We are dedicated to building modern web applications using the latest technologies.
              Our team combines expertise in Next.js, React, and Bootstrap to create fast,
              responsive, and beautiful web experiences.
            </p>
          </div>

          <div className="mb-4">
            <h3>Our Mission</h3>
            <p>
              To deliver high-quality web solutions that exceed expectations and provide
              exceptional user experiences. We believe in continuous learning and staying
              up-to-date with the latest web development trends.
            </p>
          </div>

          <div className="mb-4">
            <h3>Technologies We Use</h3>
            <ul>
              <li>Next.js 15 - React Framework</li>
              <li>React 19 - UI Library</li>
              <li>Bootstrap 5 - CSS Framework</li>
              <li>TypeScript - Type-safe JavaScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
