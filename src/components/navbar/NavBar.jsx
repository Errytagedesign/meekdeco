import React, { useState } from "react";
import { Link } from "react-router-dom";

// icons
import { BsChevronDown } from "react-icons/bs";

// styles
import "./NavBar.scss";

// images
import images from "../exports/images";
import ConnectWallet from "../connectWallet/ConnectWallet";

function NavBar() {
  const [navbar, setNavbar] = useState(true);
  const [showConnectWallet, setShowConnectWallet] = useState(true);

  const [dropDownExplore, setDropDownExplore] = useState(true);
  const [dropDownStats, setDropDownStats] = useState(true);
  const [dropDownAsset, setDropDownAsset] = useState(true);

  const handleExploreDropdown = () => {
    setDropDownExplore((current) => !current);
  };
  const handleStatsDropdown = () => {
    setDropDownStats((current) => !current);
  };
  const handleAssetDropdown = () => {
    setDropDownAsset((current) => !current);
  };

  const handleNav = () => {
    setNavbar(!navbar);
  };

  const handleConnectWallet = () => {
    setShowConnectWallet(!showConnectWallet);

    // when the connect wallet button is clicked on mobile the nacbar closed
    if (!navbar) {
      setNavbar(!navbar);
    }
  };

  const NavLinks = [
    {
      explore: [
        { name: "Mint NFT", icon: images.MintNft, url: "/explore" },
        { name: "Ivory Savings", icon: images.NfcSaving, url: "/ivorysavings" },
        {
          name: "Crypto Gift Card",
          icon: images.CryptoGift,
          url: "/cryptocard",
        },
        { name: " NFC Saving Promo", icon: images.Ivory, url: "/nfcsaving" },
        {
          name: "Defi Calendar",
          icon: images.DefiCalendar,
          url: "/deficalendar",
        },
        { name: "Dox.me", icon: images.Dox, url: "/doxme" },
        { name: "Music NFT", icon: images.MusciNft, url: "/musicnft" },
      ],

      stats: [
        { name: "Top APY", icon: images.TopApy, url: "/topapy" },
        { name: "Trending", icon: images.Trending, url: "/trending" },
      ],

      asset: [
        { name: "White Paper", icon: images.WhitePaper, url: "/whitepaper" },
        { name: "Mint Process", icon: images.MintProcess, url: "/mintprocess" },
        { name: "Help Center", icon: images.HelpCenter, url: "/helpcenter" },
      ],
    },
  ];

  // console.log(NavLinks[0].explore);

  return (
    <div>
      <section className="nav-container">
        <nav className="d-flex container flex-row align-items-center justify-content-between pt-3">
          {/* Logo */}
          <Link
            to="/"
            className="col-8 col-md-3 d-flex flex-row align-items-center logo"
          >
            <img src={images.Logo} alt=" Wolf Pack Logo" />
            <h2> WolfPack Herd </h2>
          </Link>
          <div
            className={` col-12 col-9 d-flex flex-column flex-lg-row ${
              navbar ? " displayNav" : "navMove"
            }`}
          >
            <aside className="col-12 col-lg-10 d-flex flex-column flex-lg-row  ">
              {/* nav Links */}
              <section className="col-12 col-lg-7 d-flex flex-column flex-lg-row justify-content-end ">
                {/* explore */}
                <div className=" nav-items d-flex flex-column ">
                  <p onClick={handleExploreDropdown}>
                    Explore <BsChevronDown className="icon" />
                  </p>
                  <div
                    className={`dropdown-lists ${
                      dropDownExplore
                        ? "show-dropdown-lists"
                        : "hide-dropdown-lists"
                    }`}
                  >
                    {NavLinks[0].explore.map((item, idx) => (
                      <Link
                        key={idx}
                        onClick={handleNav}
                        className="dropdown-list-items"
                        to={item.url}
                      >
                        <img src={item.icon} alt="" /> {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* stats */}
                <div className=" nav-items d-flex flex-column ">
                  <p onClick={handleStatsDropdown}>
                    {" "}
                    Stats <BsChevronDown className="icon" />{" "}
                  </p>
                  <div
                    className={`dropdown-lists ${
                      dropDownStats
                        ? "show-dropdown-lists"
                        : "hide-dropdown-lists"
                    }`}
                  >
                    {NavLinks[0].stats.map((item, idx) => (
                      <Link
                        key={idx}
                        onClick={handleNav}
                        className="dropdown-list-items"
                        to={item.url}
                      >
                        <img src={item.icon} alt="" /> {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Asset */}
                <div className=" nav-items d-flex flex-column ">
                  <p onClick={handleAssetDropdown}>
                    {" "}
                    Asset <BsChevronDown className="icon" />{" "}
                  </p>
                  <div
                    className={`dropdown-lists ${
                      dropDownAsset
                        ? "show-dropdown-lists"
                        : "hide-dropdown-lists"
                    }`}
                  >
                    {NavLinks[0].asset.map((item, idx) => (
                      <Link
                        key={idx}
                        onClick={handleNav}
                        className="dropdown-list-items"
                        to={item.url}
                      >
                        <img src={item.icon} alt="" /> {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* profile and btn */}
              <section className="col-12 col-lg-4 d-flex flex-column flex-lg-row justify-content-around align-items-center">
                <div>
                  {" "}
                  <img src={images.Profile} alt="" />{" "}
                </div>
                <div onClick={handleConnectWallet}>
                  {" "}
                  <Link className="Btn btn-black btn-normal m-3 d-flex flex-row align-items-center">
                    <img src={images.Walleticon} alt="" />
                    Connect Wallet{" "}
                  </Link>
                </div>
              </section>
            </aside>
          </div>
          {/* Hambuger icon */}
          <div onClick={handleNav} className={navbar ? "ham" : "open"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </section>

      <div
        className={` connect d-flex flex-column align-items-end ${
          showConnectWallet ? "d-none" : "d-block"
        }`}
      >
        <h2 onClick={handleConnectWallet} className="X">
          {" "}
          X{" "}
        </h2>
        <ConnectWallet />
      </div>
    </div>
  );
}

export default NavBar;
