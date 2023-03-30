import React from 'react'
import logo from "../../src/edgarlogo2.png";
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
        <a className="navbar-brand" href="/"><img src={logo} alt="" width="30" height="30" style={ {paddingBottom: "5px"} }/>E.D.G.A.R.</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link navbar-text" href="#home" ><CustomLink to="/">Home</CustomLink></a></li>
                <li className="nav-item"><a className="nav-link navbar-text" href="#about"><CustomLink to="/About">About</CustomLink></a></li>
                <li className="nav-item"><a className="nav-link navbar-text" href="#tutorial"><CustomLink to="/Tutorial">Tutorial</CustomLink></a></li>
            </ul>
        </div>
    </div>
</nav>

  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} style={{ textDecoration: 'none' }} {...props}>
        {children}
      </Link>
    </li>
  )
}

