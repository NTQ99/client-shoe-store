import React, { Component } from "react";

class Chat extends Component {
  render() {
    return (
      <div
        className="modal modal-sticky modal-sticky-bottom-right"
        id="kt_chat_modal"
        role="dialog"
        data-backdrop="false"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/*begin::Card*/}
            <div className="card card-custom">
              {/*begin::Header*/}
              <div className="card-header align-items-center px-4 py-3">
                <div className="text-left flex-grow-1">
                  {/*begin::Dropdown Menu*/}
                  <div className="dropdown dropdown-inline">
                    <button
                      type="button"
                      className="btn btn-clean btn-sm btn-icon btn-icon-md"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="svg-icon svg-icon-lg">
                        {/*begin::Svg Icon | path:assets/media/svg/icons/Communication/Add-user.svg*/}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                        >
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <polygon points="0 0 24 0 24 24 0 24" />
                            <path
                              d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                              fill="#000000"
                              fillRule="nonzero"
                              opacity="0.3"
                            />
                            <path
                              d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                              fill="#000000"
                              fillRule="nonzero"
                            />
                          </g>
                        </svg>
                        {/*end::Svg Icon*/}
                      </span>
                    </button>
                    <div className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-md">
                      {/*[html-partial:begin:{"id":"demo1/dist/inc/view/partials/content/dropdowns/dropdown-4","page":"index"}]/*/}
                      {/*begin::Navigation*/}
                      <ul className="navi navi-hover py-5">
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-drop" />
                            </span>
                            <span className="navi-text">New Group</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-list-3" />
                            </span>
                            <span className="navi-text">Contacts</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-rocket-1" />
                            </span>
                            <span className="navi-text">Groups</span>
                            <span className="navi-link-badge">
                              <span className="label label-light-primary label-inline font-weight-bold">
                                new
                              </span>
                            </span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-bell-2" />
                            </span>
                            <span className="navi-text">Calls</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-gear" />
                            </span>
                            <span className="navi-text">Settings</span>
                          </a>
                        </li>
                        <li className="navi-separator my-3" />
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-magnifier-tool" />
                            </span>
                            <span className="navi-text">Help</span>
                          </a>
                        </li>
                        <li className="navi-item">
                          <a href="/" className="navi-link">
                            <span className="navi-icon">
                              <i className="flaticon2-bell-2" />
                            </span>
                            <span className="navi-text">Privacy</span>
                            <span className="navi-link-badge">
                              <span className="label label-light-danger label-rounded font-weight-bold">
                                5
                              </span>
                            </span>
                          </a>
                        </li>
                      </ul>
                      {/*end::Navigation*/}
                      {/*[html-partial:end:{"id":"demo1/dist/inc/view/partials/content/dropdowns/dropdown-4","page":"index"}]/*/}
                    </div>
                  </div>
                  {/*end::Dropdown Menu*/}
                </div>
                <div className="text-center flex-grow-1">
                  <div className="text-dark-75 font-weight-bold font-size-h5">
                    Matt Pears
                  </div>
                  <div>
                    <span className="label label-dot label-success" />
                    <span className="font-weight-bold text-muted font-size-sm">
                      Active
                    </span>
                  </div>
                </div>
                <div className="text-right flex-grow-1">
                  <button
                    type="button"
                    className="btn btn-clean btn-sm btn-icon btn-icon-md"
                    data-dismiss="modal"
                  >
                    <i className="ki ki-close icon-1x" />
                  </button>
                </div>
              </div>
              {/*end::Header*/}
              {/*begin::Body*/}
              <div className="card-body">
                {/*begin::Scroll*/}
                <div
                  className="scroll scroll-pull"
                  data-height={375}
                  data-mobile-height={300}
                >
                  {/*begin::Messages*/}
                  <div className="messages">
                    {/*begin::Message In*/}
                    <div className="d-flex flex-column mb-5 align-items-start">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-40 mr-3">
                          <img alt="Pic" src="assets/media/users/300_12.jpg" />
                        </div>
                        <div>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            Matt Pears
                          </a>
                          <span className="text-muted font-size-sm">
                            2 Hours
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">
                        How likely are you to recommend our company to your
                        friends and family?
                      </div>
                    </div>
                    {/*end::Message In*/}
                    {/*begin::Message Out*/}
                    <div className="d-flex flex-column mb-5 align-items-end">
                      <div className="d-flex align-items-center">
                        <div>
                          <span className="text-muted font-size-sm">
                            3 minutes
                          </span>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            You
                          </a>
                        </div>
                        <div className="symbol symbol-circle symbol-40 ml-3">
                          <img alt="Pic" src="assets/media/users/300_21.jpg" />
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">
                        Hey there, we’re just writing to let you know that
                        you’ve been subscribed to a repository on GitHub.
                      </div>
                    </div>
                    {/*end::Message Out*/}
                    {/*begin::Message In*/}
                    <div className="d-flex flex-column mb-5 align-items-start">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-40 mr-3">
                          <img alt="Pic" src="assets/media/users/300_21.jpg" />
                        </div>
                        <div>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            Matt Pears
                          </a>
                          <span className="text-muted font-size-sm">
                            40 seconds
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">
                        Ok, Understood!
                      </div>
                    </div>
                    {/*end::Message In*/}
                    {/*begin::Message Out*/}
                    <div className="d-flex flex-column mb-5 align-items-end">
                      <div className="d-flex align-items-center">
                        <div>
                          <span className="text-muted font-size-sm">
                            Just now
                          </span>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            You
                          </a>
                        </div>
                        <div className="symbol symbol-circle symbol-40 ml-3">
                          <img alt="Pic" src="assets/media/users/300_21.jpg" />
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">
                        You’ll receive notifications for all issues, pull
                        requests!
                      </div>
                    </div>
                    {/*end::Message Out*/}
                    {/*begin::Message In*/}
                    <div className="d-flex flex-column mb-5 align-items-start">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-40 mr-3">
                          <img alt="Pic" src="assets/media/users/300_12.jpg" />
                        </div>
                        <div>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            Matt Pears
                          </a>
                          <span className="text-muted font-size-sm">
                            40 seconds
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">
                        You can unwatch this repository immediately by clicking
                        here:
                        <a href="/">https://github.com</a>
                      </div>
                    </div>
                    {/*end::Message In*/}
                    {/*begin::Message Out*/}
                    <div className="d-flex flex-column mb-5 align-items-end">
                      <div className="d-flex align-items-center">
                        <div>
                          <span className="text-muted font-size-sm">
                            Just now
                          </span>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            You
                          </a>
                        </div>
                        <div className="symbol symbol-circle symbol-40 ml-3">
                          <img alt="Pic" src="assets/media/users/300_21.jpg" />
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">
                        Discover what students who viewed Learn Figma - UI/UX
                        Design. Essential Training also viewed
                      </div>
                    </div>
                    {/*end::Message Out*/}
                    {/*begin::Message In*/}
                    <div className="d-flex flex-column mb-5 align-items-start">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-40 mr-3">
                          <img alt="Pic" src="assets/media/users/300_12.jpg" />
                        </div>
                        <div>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            Matt Pears
                          </a>
                          <span className="text-muted font-size-sm">
                            40 seconds
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">
                        Most purchased Business courses during this sale!
                      </div>
                    </div>
                    {/*end::Message In*/}
                    {/*begin::Message Out*/}
                    <div className="d-flex flex-column mb-5 align-items-end">
                      <div className="d-flex align-items-center">
                        <div>
                          <span className="text-muted font-size-sm">
                            Just now
                          </span>
                          <a
                            href="/"
                            className="text-dark-75 text-hover-primary font-weight-bold font-size-h6"
                          >
                            You
                          </a>
                        </div>
                        <div className="symbol symbol-circle symbol-40 ml-3">
                          <img alt="Pic" src="assets/media/users/300_21.jpg" />
                        </div>
                      </div>
                      <div className="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">
                        Company BBQ to celebrate the last quater achievements
                        and goals. Food and drinks provided
                      </div>
                    </div>
                    {/*end::Message Out*/}
                  </div>
                  {/*end::Messages*/}
                </div>
                {/*end::Scroll*/}
              </div>
              {/*end::Body*/}
              {/*begin::Footer*/}
              <div className="card-footer align-items-center">
                {/*begin::Compose*/}
                <textarea
                  className="form-control border-0 p-0"
                  rows={2}
                  placeholder="Type a message"
                  defaultValue={""}
                />
                <div className="d-flex align-items-center justify-content-between mt-5">
                  <div className="mr-3">
                    <a href="/" className="btn btn-clean btn-icon btn-md mr-1">
                      <i className="flaticon2-photograph icon-lg" />
                    </a>
                    <a href="/" className="btn btn-clean btn-icon btn-md">
                      <i className="flaticon2-photo-camera icon-lg" />
                    </a>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary btn-md text-uppercase font-weight-bold chat-send py-2 px-6"
                    >
                      Send
                    </button>
                  </div>
                </div>
                {/*begin::Compose*/}
              </div>
              {/*end::Footer*/}
            </div>
            {/*end::Card*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
