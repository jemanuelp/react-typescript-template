import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { LanguajeTypes } from "../../../../domains/enums/LanguajeTypes";

const IntlDropdown = () => {
  const { i18n } = useTranslation();

  // ** Function to switch Language
  const handleLangUpdate = (e: any, lang: any) => {
    e.preventDefault();
    i18n.changeLanguage(lang);
  };

  const getSelectedLanguaje = (lang: any) => {
    switch (lang) {
      case "en":
        return LanguajeTypes.en;
      case "de":
        return LanguajeTypes.de;
      case "fr":
        return LanguajeTypes.fr;
      case "pt":
        return LanguajeTypes.pt;
      default:
        return LanguajeTypes.Default;
    }
  };

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item"
    >
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link"
        onClick={(e) => e.preventDefault()}
      >
        <ReactCountryFlag
          svg
          className="country-flag flag-icon"
          countryCode={i18n.language === "en" ? "us" : i18n.language}
        />
        <span className="selected-language">
          {getSelectedLanguaje(i18n.language)}
        </span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "en")}
        >
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">English</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "fr")}
        >
          <ReactCountryFlag className="country-flag" countryCode="fr" svg />
          <span className="ms-1">French</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "de")}
        >
          <ReactCountryFlag className="country-flag" countryCode="de" svg />
          <span className="ms-1">German</span>
        </DropdownItem>
        <DropdownItem
          href="/"
          tag="a"
          onClick={(e) => handleLangUpdate(e, "pt")}
        >
          <ReactCountryFlag className="country-flag" countryCode="pt" svg />
          <span className="ms-1">Portuguese</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default IntlDropdown;
