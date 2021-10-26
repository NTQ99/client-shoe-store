import React, { Component } from "react";

import Header from "../layouts/shoe-store/header";
import Footer from "../layouts/shoe-store/footer";

class CategoryPage extends Component {
  render() {
    return (
      <div>
  {/* Start Header Area */}
  <header className="header_area sticky-header">
    <div className="main_menu">
      <nav className="navbar navbar-expand-lg navbar-light main_box">
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <a className="navbar-brand logo_h" href="index.html"><img src="assets/img/logo.png" alt="" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="index.html">Home</a></li>
              <li className="nav-item submenu dropdown active">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop</a>
                <ul className="dropdown-menu">
                  <li className="nav-item active"><a className="nav-link" href="category.html">Shop Category</a></li>
                  <li className="nav-item"><a className="nav-link" href="single-product.html">Product Details</a></li>
                  <li className="nav-item"><a className="nav-link" href="checkout.html">Product Checkout</a></li>
                  <li className="nav-item"><a className="nav-link" href="cart.html">Shopping Cart</a></li>
                  <li className="nav-item"><a className="nav-link" href="confirmation.html">Confirmation</a></li>
                </ul>
              </li>
              <li className="nav-item submenu dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
                <ul className="dropdown-menu">
                  <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
                  <li className="nav-item"><a className="nav-link" href="single-blog.html">Blog Details</a></li>
                </ul>
              </li>
              <li className="nav-item submenu dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
                <ul className="dropdown-menu">
                  <li className="nav-item"><a className="nav-link" href="login.html">Login</a></li>
                  <li className="nav-item"><a className="nav-link" href="tracking.html">Tracking</a></li>
                  <li className="nav-item"><a className="nav-link" href="elements.html">Elements</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item"><a href="#" className="cart"><span className="ti-bag" /></a></li>
              <li className="nav-item">
                <button className="search"><span className="lnr lnr-magnifier" id="search" /></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div className="search_input" id="search_input_box">
      <div className="container">
        <form className="d-flex justify-content-between">
          <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
          <button type="submit" className="btn" />
          <span className="lnr lnr-cross" id="close_search" title="Close Search" />
        </form>
      </div>
    </div>
  </header>
  {/* End Header Area */}
  {/* Start Banner Area */}
  <section className="banner-area organic-breadcrumb">
    <div className="container">
      <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
        <div className="col-first">
          <h1>Shop Category page</h1>
          <nav className="d-flex align-items-center">
            <a href="index.html">Home<span className="lnr lnr-arrow-right" /></a>
            <a href="#">Shop<span className="lnr lnr-arrow-right" /></a>
            <a href="category.html">Fashon Category</a>
          </nav>
        </div>
      </div>
    </div>
  </section>
  {/* End Banner Area */}
  <div className="container">
    <div className="row">
      <div className="col-xl-3 col-lg-4 col-md-5">
        <div className="sidebar-categories">
          <div className="head">Browse Categories</div>
          <ul className="main-categories">
            <li className="main-nav-list"><a data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span className="lnr lnr-arrow-right" />Fruits and Vegetables<span className="number">(53)</span></a>
              <ul className="collapse" id="fruitsVegetable" data-toggle="collapse" aria-expanded="false" aria-controls="fruitsVegetable">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#meatFish" aria-expanded="false" aria-controls="meatFish"><span className="lnr lnr-arrow-right" />Meat and Fish<span className="number">(53)</span></a>
              <ul className="collapse" id="meatFish" data-toggle="collapse" aria-expanded="false" aria-controls="meatFish">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#cooking" aria-expanded="false" aria-controls="cooking"><span className="lnr lnr-arrow-right" />Cooking<span className="number">(53)</span></a>
              <ul className="collapse" id="cooking" data-toggle="collapse" aria-expanded="false" aria-controls="cooking">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#beverages" aria-expanded="false" aria-controls="beverages"><span className="lnr lnr-arrow-right" />Beverages<span className="number">(24)</span></a>
              <ul className="collapse" id="beverages" data-toggle="collapse" aria-expanded="false" aria-controls="beverages">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#homeClean" aria-expanded="false" aria-controls="homeClean"><span className="lnr lnr-arrow-right" />Home and Cleaning<span className="number">(53)</span></a>
              <ul className="collapse" id="homeClean" data-toggle="collapse" aria-expanded="false" aria-controls="homeClean">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a href="#">Pest Control<span className="number">(24)</span></a></li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#officeProduct" aria-expanded="false" aria-controls="officeProduct"><span className="lnr lnr-arrow-right" />Office Products<span className="number">(77)</span></a>
              <ul className="collapse" id="officeProduct" data-toggle="collapse" aria-expanded="false" aria-controls="officeProduct">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#beauttyProduct" aria-expanded="false" aria-controls="beauttyProduct"><span className="lnr lnr-arrow-right" />Beauty Products<span className="number">(65)</span></a>
              <ul className="collapse" id="beauttyProduct" data-toggle="collapse" aria-expanded="false" aria-controls="beauttyProduct">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#healthProduct" aria-expanded="false" aria-controls="healthProduct"><span className="lnr lnr-arrow-right" />Health Products<span className="number">(29)</span></a>
              <ul className="collapse" id="healthProduct" data-toggle="collapse" aria-expanded="false" aria-controls="healthProduct">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a href="#">Pet Care<span className="number">(29)</span></a></li>
            <li className="main-nav-list"><a data-toggle="collapse" href="#homeAppliance" aria-expanded="false" aria-controls="homeAppliance"><span className="lnr lnr-arrow-right" />Home Appliances<span className="number">(15)</span></a>
              <ul className="collapse" id="homeAppliance" data-toggle="collapse" aria-expanded="false" aria-controls="homeAppliance">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
            <li className="main-nav-list"><a className="border-bottom-0" data-toggle="collapse" href="#babyCare" aria-expanded="false" aria-controls="babyCare"><span className="lnr lnr-arrow-right" />Baby Care<span className="number">(48)</span></a>
              <ul className="collapse" id="babyCare" data-toggle="collapse" aria-expanded="false" aria-controls="babyCare">
                <li className="main-nav-list child"><a href="#">Frozen Fish<span className="number">(13)</span></a></li>
                <li className="main-nav-list child"><a href="#">Dried Fish<span className="number">(09)</span></a></li>
                <li className="main-nav-list child"><a href="#">Fresh Fish<span className="number">(17)</span></a></li>
                <li className="main-nav-list child"><a href="#">Meat Alternatives<span className="number">(01)</span></a></li>
                <li className="main-nav-list child"><a href="#" className="border-bottom-0">Meat<span className="number">(11)</span></a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="sidebar-filter mt-50">
          <div className="top-filter-head">Product Filters</div>
          <div className="common-filter">
            <div className="head">Brands</div>
            <form action="#">
              <ul>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="apple" name="brand" /><label htmlFor="apple">Apple<span>(29)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="asus" name="brand" /><label htmlFor="asus">Asus<span>(29)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="gionee" name="brand" /><label htmlFor="gionee">Gionee<span>(19)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="micromax" name="brand" /><label htmlFor="micromax">Micromax<span>(19)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="samsung" name="brand" /><label htmlFor="samsung">Samsung<span>(19)</span></label></li>
              </ul>
            </form>
          </div>
          <div className="common-filter">
            <div className="head">Color</div>
            <form action="#">
              <ul>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="black" name="color" /><label htmlFor="black">Black<span>(29)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="balckleather" name="color" /><label htmlFor="balckleather">Black
                    Leather<span>(29)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="blackred" name="color" /><label htmlFor="blackred">Black
                    with red<span>(19)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="gold" name="color" /><label htmlFor="gold">Gold<span>(19)</span></label></li>
                <li className="filter-list"><input className="pixel-radio" type="radio" id="spacegrey" name="color" /><label htmlFor="spacegrey">Spacegrey<span>(19)</span></label></li>
              </ul>
            </form>
          </div>
          <div className="common-filter">
            <div className="head">Price</div>
            <div className="price-range-area">
              <div id="price-range" />
              <div className="value-wrapper d-flex">
                <div className="price">Price:</div>
                <span>$</span>
                <div id="lower-value" />
                <div className="to">to</div>
                <span>$</span>
                <div id="upper-value" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-9 col-lg-8 col-md-7">
        {/* Start Filter Bar */}
        <div className="filter-bar d-flex flex-wrap align-items-center">
          <div className="sorting">
            <select>
              <option value={1}>Default sorting</option>
              <option value={1}>Default sorting</option>
              <option value={1}>Default sorting</option>
            </select>
          </div>
          <div className="sorting mr-auto">
            <select>
              <option value={1}>Show 12</option>
              <option value={1}>Show 12</option>
              <option value={1}>Show 12</option>
            </select>
          </div>
          <div className="pagination">
            <a href="#" className="prev-arrow"><i className="fa fa-long-arrow-left" aria-hidden="true" /></a>
            <a href="#" className="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" className="dot-dot"><i className="fa fa-ellipsis-h" aria-hidden="true" /></a>
            <a href="#">6</a>
            <a href="#" className="next-arrow"><i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
          </div>
        </div>
        {/* End Filter Bar */}
        {/* Start Best Seller */}
        <section className="lattest-product-area pb-40 category-list">
          <div className="row">
            {/* single product */}
            <div className="col-lg-4 col-md-6">
              <div className="single-product">
                <img className="img-fluid" src="assets/img/product/p1.jpg" alt="" />
                <div className="product-details">
                  <h6>addidas New Hammer sole
                    for Sports person</h6>
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href className="social-info">
                      <span className="ti-bag" />
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-heart" />
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-sync" />
                      <p className="hover-text">compare</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-move" />
                      <p className="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* single product */}
            <div className="col-lg-4 col-md-6">
              <div className="single-product">
                <img className="img-fluid" src="assets/img/product/p2.jpg" alt="" />
                <div className="product-details">
                  <h6>addidas New Hammer sole
                    for Sports person</h6>
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href className="social-info">
                      <span className="ti-bag" />
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-heart" />
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-sync" />
                      <p className="hover-text">compare</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-move" />
                      <p className="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* single product */}
            <div className="col-lg-4 col-md-6">
              <div className="single-product">
                <img className="img-fluid" src="assets/img/product/p3.jpg" alt="" />
                <div className="product-details">
                  <h6>addidas New Hammer sole
                    for Sports person</h6>
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href className="social-info">
                      <span className="ti-bag" />
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-heart" />
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-sync" />
                      <p className="hover-text">compare</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-move" />
                      <p className="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* single product */}
            <div className="col-lg-4 col-md-6">
              <div className="single-product">
                <img className="img-fluid" src="assets/img/product/p4.jpg" alt="" />
                <div className="product-details">
                  <h6>addidas New Hammer sole
                    for Sports person</h6>
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href className="social-info">
                      <span className="ti-bag" />
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-heart" />
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-sync" />
                      <p className="hover-text">compare</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-move" />
                      <p className="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* single product */}
            <div className="col-lg-4 col-md-6">
              <div className="single-product">
                <img className="img-fluid" src="assets/img/product/p5.jpg" alt="" />
                <div className="product-details">
                  <h6>addidas New Hammer sole
                    for Sports person</h6>
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href className="social-info">
                      <span className="ti-bag" />
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-heart" />
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-sync" />
                      <p className="hover-text">compare</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-move" />
                      <p className="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* single product */}
            <div className="col-lg-4 col-md-6">
              <div className="single-product">
                <img className="img-fluid" src="assets/img/product/p6.jpg" alt="" />
                <div className="product-details">
                  <h6>addidas New Hammer sole
                    for Sports person</h6>
                  <div className="price">
                    <h6>$150.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                  <div className="prd-bottom">
                    <a href className="social-info">
                      <span className="ti-bag" />
                      <p className="hover-text">add to bag</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-heart" />
                      <p className="hover-text">Wishlist</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-sync" />
                      <p className="hover-text">compare</p>
                    </a>
                    <a href className="social-info">
                      <span className="lnr lnr-move" />
                      <p className="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Best Seller */}
        {/* Start Filter Bar */}
        <div className="filter-bar d-flex flex-wrap align-items-center">
          <div className="sorting mr-auto">
            <select>
              <option value={1}>Show 12</option>
              <option value={1}>Show 12</option>
              <option value={1}>Show 12</option>
            </select>
          </div>
          <div className="pagination">
            <a href="#" className="prev-arrow"><i className="fa fa-long-arrow-left" aria-hidden="true" /></a>
            <a href="#" className="active">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#" className="dot-dot"><i className="fa fa-ellipsis-h" aria-hidden="true" /></a>
            <a href="#">6</a>
            <a href="#" className="next-arrow"><i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
          </div>
        </div>
        {/* End Filter Bar */}
      </div>
    </div>
  </div>
  {/* Start related-product Area */}
  <section className="related-product-area section_gap">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <div className="section-title">
            <h1>Deals of the Week</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r1.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r2.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r3.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r5.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r6.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r7.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r9.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r10.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="single-related-product d-flex">
                <a href="#"><img src="assets/img/r11.jpg" alt="" /></a>
                <div className="desc">
                  <a href="#" className="title">Black lace Heels</a>
                  <div className="price">
                    <h6>$189.00</h6>
                    <h6 className="l-through">$210.00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="ctg-right">
            <a href="#" target="_blank">
              <img className="img-fluid d-block mx-auto" src="assets/img/category/c5.jpg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End related-product Area */}
  {/* start footer Area */}
  <footer className="footer-area section_gap">
    <div className="container">
      <div className="row">
        <div className="col-lg-3  col-md-6 col-sm-6">
          <div className="single-footer-widget">
            <h6>About Us</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore
              magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-lg-4  col-md-6 col-sm-6">
          <div className="single-footer-widget">
            <h6>Newsletter</h6>
            <p>Stay update with our latest</p>
            <div className id="mc_embed_signup">
              <form target="_blank" noValidate="true" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01" method="get" className="form-inline">
                <div className="d-flex flex-row">
                  <input className="form-control" name="EMAIL" placeholder="Enter Email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Email '" required type="email" />
                  <button className="click-btn btn btn-default"><i className="fa fa-long-arrow-right" aria-hidden="true" /></button>
                  <div style={{position: 'absolute', left: '-5000px'}}>
                    <input name="b_36c4fd991d266f23781ded980_aefe40901a" tabIndex={-1} defaultValue type="text" />
                  </div>
                  {/* <div class="col-lg-4 col-md-4">
													<button class="bb-btn btn"><span class="lnr lnr-arrow-right"></span></button>
												</div>  */}
                </div>
                <div className="info" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3  col-md-6 col-sm-6">
          <div className="single-footer-widget mail-chimp">
            <h6 className="mb-20">Instragram Feed</h6>
            <ul className="instafeed d-flex flex-wrap">
              <li><img src="assets/img/i1.jpg" alt="" /></li>
              <li><img src="assets/img/i2.jpg" alt="" /></li>
              <li><img src="assets/img/i3.jpg" alt="" /></li>
              <li><img src="assets/img/i4.jpg" alt="" /></li>
              <li><img src="assets/img/i5.jpg" alt="" /></li>
              <li><img src="assets/img/i6.jpg" alt="" /></li>
              <li><img src="assets/img/i7.jpg" alt="" /></li>
              <li><img src="assets/img/i8.jpg" alt="" /></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-6">
          <div className="single-footer-widget">
            <h6>Follow Us</h6>
            <p>Let us be social</p>
            <div className="footer-social d-flex align-items-center">
              <a href="#"><i className="fa fa-facebook" /></a>
              <a href="#"><i className="fa fa-twitter" /></a>
              <a href="#"><i className="fa fa-dribbble" /></a>
              <a href="#"><i className="fa fa-behance" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
        <p className="footer-text m-0">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
          {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        </p>
      </div>
    </div>
  </footer>
  {/* End footer Area */}
  {/* Modal Quick Product View */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="container relative">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <div className="product-quick-view">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="quick-view-carousel">
                <div className="item" style={{background: 'url(img/organic-food/q1.jpg)'}}>
                </div>
                <div className="item" style={{background: 'url(img/organic-food/q1.jpg)'}}>
                </div>
                <div className="item" style={{background: 'url(img/organic-food/q1.jpg)'}}>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="quick-view-content">
                <div className="top">
                  <h3 className="head">Mill Oil 1000W Heater, White</h3>
                  <div className="price d-flex align-items-center"><span className="lnr lnr-tag" /> <span className="ml-10">$149.99</span></div>
                  <div className="category">Category: <span>Household</span></div>
                  <div className="available">Availibility: <span>In Stock</span></div>
                </div>
                <div className="middle">
                  <p className="content">Mill Oil is an innovative oil filled radiator with the most modern technology. If you are
                    looking for something that can make your interior look awesome, and at the same time give you the pleasant
                    warm feeling during the winter.</p>
                  <a href="#" className="view-full">View full Details <span className="lnr lnr-arrow-right" /></a>
                </div>
                <div className="bottom">
                  <div className="color-picker d-flex align-items-center">Color:
                    <span className="single-pick" />
                    <span className="single-pick" />
                    <span className="single-pick" />
                    <span className="single-pick" />
                    <span className="single-pick" />
                  </div>
                  <div className="quantity-container d-flex align-items-center mt-15">
                    Quantity:
                    <input type="text" className="quantity-amount ml-15" defaultValue={1} />
                    <div className="arrow-btn d-inline-flex flex-column">
                      <button className="increase arrow" type="button" title="Increase Quantity"><span className="lnr lnr-chevron-up" /></button>
                      <button className="decrease arrow" type="button" title="Decrease Quantity"><span className="lnr lnr-chevron-down" /></button>
                    </div>
                  </div>
                  <div className="d-flex mt-20">
                    <a href="#" className="view-btn color-2"><span>Add to Cart</span></a>
                    <a href="#" className="like-btn"><span className="lnr lnr-layers" /></a>
                    <a href="#" className="like-btn"><span className="lnr lnr-heart" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*gmaps Js*/}
</div>

    );
  }
}

export default CategoryPage;
