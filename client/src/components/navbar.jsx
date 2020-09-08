import React, { Component } from 'react';
 import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
      return (
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary transparent-nav">
          <div className="container">
            <a className="navbar-brand" href="#">To Do App</a>
            <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
          <div className={`${classOne}`} id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Exercises</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Create Exercise log</Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">Create User</Link>
              </li>
            </ul>
          </div>
          </div>
        </nav>
        </div>
      );
  }
 }
export default Nav;