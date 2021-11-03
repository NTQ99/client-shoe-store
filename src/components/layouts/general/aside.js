import SVG from "react-inlinesvg";

function AdminAside() {
  return (
<div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside">
  {/*begin::Brand*/}
  <div className="brand flex-column-auto" id="kt_brand">
    {/*begin::Logo*/}
    <a href="/home" className="brand-logo">
      <img alt="Logo" src="/assets/media/logos/logo-light.png" height="50"/>
    </a>
    {/*end::Logo*/}
    {/*begin::Toggle*/}
    <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
      <span className="svg-icon svg-icon svg-icon-xl">
        <SVG src="/assets/media/svg/icons/Navigation/Angle-double-left.svg" />
      </span>
    </button>
    {/*end::Toolbar*/}
  </div>
  {/*end::Brand*/}
  {/*begin::Aside Menu*/}
  <div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
    {/*begin::Menu Container*/}
    <div id="kt_aside_menu" className="aside-menu my-4 scroll ps ps--active-y" data-menu-vertical={1} data-menu-scroll={1} data-menu-dropdown-timeout={500}>
      {/*begin::Menu Nav*/}
      <ul className="menu-nav">
        <li className="menu-item" id="aside_dashboard">
          <a className="menu-link" href="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src="/assets/media/svg/icons/Design/Layers.svg" />
            </span>
            <span className="menu-text">Tổng quan</span>
          </a>
        </li>
        {/* begin::Quản lý */}
        <li className="menu-section">
          <h4 className="menu-text">Quản lý</h4>
          <i className="menu-icon ki ki-bold-more-hor icon-md" />
        </li>
        <li className="menu-item menu-item-submenu" data-menu-toggle="hover" id="aside_order">
          <a className="menu-link menu-toggle" href="/order">
            <span className="svg-icon menu-icon">
              <SVG src="/assets/media/svg/icons/Shopping/Cart1.svg" />
            </span>
            <span className="menu-text">Đơn hàng</span>
            <i className="menu-arrow" />
          </a>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-submenu" id="aside_list_order">
                <a className="menu-link" href="/order">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Danh sách đơn hàng</span>
                </a>
              </li>
              <li className="menu-item menu-item-submenu" id="aside_create_order">
                <a className="menu-link" href="/create-order">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">Tạo đơn hàng</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-item">
          <a className="menu-link" href="/product">
            <span className="svg-icon menu-icon">
              <SVG src="/assets/media/svg/icons/Shopping/Box2.svg" />
            </span>
            <span className="menu-text">Sản phẩm</span>
          </a>
        </li>
        <li className="menu-item" id="aside_customer">
          <a href="/customer" className="menu-link">
            <span className="svg-icon menu-icon">
            <SVG src="/assets/media/svg/icons/Shopping/Customer.svg" />
            </span>
            <span className="menu-text">Khách hàng</span>
          </a>
        </li>
        {/* end::Quản lý */}
      </ul>
      {/*end::Menu Nav*/}
    </div>
    {/*end::Menu Container*/}
  </div>
  {/*end::Aside Menu*/}
</div>
  );
}

export default AdminAside;
