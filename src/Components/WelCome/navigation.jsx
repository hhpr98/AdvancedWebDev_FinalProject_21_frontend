/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const menu = (
  <Menu>
    <Menu.Item>
    <Link to="/login">
      <span>Khách hàng</span>
    </Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/login-employee">
      <span>Nhân viên</span>
    </Link>
    </Menu.Item>
  </Menu>
);

class Navigation extends Component {
  render() {
    return (
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">
              Monca Internet Banking
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              {/* <li>
                <a href="#about" className="page-scroll">
                  Giới thiệu
                </a>
              </li> */}
              <li>
                <a href="#services" className="page-scroll">
                  Dịch vụ
                </a>
              </li>
              {/* <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li> */}
              <li>
              <div style={{paddingTop: 10}}>
                <Dropdown overlay={menu}>
                  <Button style={{borderColor: '#6372ff'}}>
                    Đăng nhập <DownOutlined />
                  </Button>
                </Dropdown>
                </div>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
