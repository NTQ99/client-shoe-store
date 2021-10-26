function Languages() {
  return (
    <div>
      {/*begin::Nav*/}
      <ul className="navi navi-hover py-4">
        {/*begin::Item*/}
        <li className="navi-item">
          <a href="/" className="navi-link">
            <span className="symbol symbol-20 mr-3">
              <img src="assets/media/svg/flags/220-vietnam.svg" alt="" />
            </span>
            <span className="navi-text">Vietnam</span>
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li className="navi-item">
          <a href="/" className="navi-link">
            <span className="symbol symbol-20 mr-3">
              <img src="assets/media/svg/flags/226-united-states.svg" alt="" />
            </span>
            <span className="navi-text">English</span>
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li className="navi-item active">
          <a href="/" className="navi-link">
            <span className="symbol symbol-20 mr-3">
              <img src="assets/media/svg/flags/128-spain.svg" alt="" />
            </span>
            <span className="navi-text">Spanish</span>
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li className="navi-item">
          <a href="/" className="navi-link">
            <span className="symbol symbol-20 mr-3">
              <img src="assets/media/svg/flags/063-japan.svg" alt="" />
            </span>
            <span className="navi-text">Japanese</span>
          </a>
        </li>
        {/*end::Item*/}
        {/*begin::Item*/}
        <li className="navi-item">
          <a href="/" className="navi-link">
            <span className="symbol symbol-20 mr-3">
              <img src="assets/media/svg/flags/195-france.svg" alt="" />
            </span>
            <span className="navi-text">French</span>
          </a>
        </li>
        {/*end::Item*/}
      </ul>
      {/*end::Nav*/}
    </div>
  );
}

export default Languages;
