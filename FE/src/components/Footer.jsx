import React from 'react'

function Footer() {
  return (
    <div id="footer" className="footer">
      <div id="footer1" className="footer__container">
          <div className="footer__content">
          <div className="footer__content--body">
            <div className="footer__content--title">Sản phẩm</div>
            <div>
              <div>Bánh sinh nhật</div>
              <div>Bánh kem</div>
              <div>Bánh cake</div>
            </div>
          </div>
          <div className="footer__content--body">
            <div className="footer__content--title">Công ty</div>
            <div>
              <div>Dứa tuyển dụng</div>
              <div>Liên hệ nhượng quyền</div>
              <div>Về Cakes</div>
            </div>
          </div>
          <div className="footer__content--body">
            <div className="footer__content--title">Hỗ trợ</div>
            <div>
              <div>FAQs</div>
              <div>Bảo mật thông tin</div>
              <div>Chính sách chung</div>
              <div>Tra cứu đơn hàng</div>
            </div>
          </div>
          <div className="footer__content--body">
            <div className="footer__content--title">Liên Hệ</div>
            <div>
              <div>Email góp ý</div>
              <div>Hotline</div>
              <div>0982983423</div>
            </div>
          </div>
        </div>
        <div className="vertical"></div>
        <div className="footer__detail">Copyright © 2024 Cakes. All rights reserved.</div>
      </div>
      
    </div>
  )
}

export default Footer;