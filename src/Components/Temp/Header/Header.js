import React from 'react';
import { Row, Upload } from 'antd';
import './Header.css';

export const Header = () => {
  return (
    <div>
      <Row>
        <div className="box-blue">
          <Upload
            // className="company-cover"
            // alt="cover"
            // src="https://cdn.tgdd.vn/tra-gop/Content/desktop/images/thumb-install.png"
            customRequest={options => {
              const reader = new FileReader();
              reader.onloadend = () => {
                // setImageUrl(reader.result);
                // uploadImage(reader.result, token).then(url => {
                //   setURL(url);
                // });
              };
              reader.readAsDataURL(options.file);
            }}
          />
        </div>
        <div className="box-orange">
          {/* <AvatarCompany size={100} /> */}
          {/* <img
            src="https://brasol.vn/public/ckeditor/uploads/tin-tuc/1-logo-the-gioi-di-song-dien-may-xanh.jpg"
            alt="company-logo"
            className="company-logo"
          /> */}
        </div>
      </Row>
    </div>
  );
};
