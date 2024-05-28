import useWindowSize from "use-window-size-v2";
import { PageDropDown } from "../FilterPagination/PageDropDown";

interface FooterProps {
  perPage: number;
  setPerPage: (perPage: number) => void;
}

const Footer = ({ perPage, setPerPage }: FooterProps) => {
  const { width } = useWindowSize();
  return (
    <footer className="sticky bottom-0 bg-base-200 z-20 py-2 shadow-lg mt-4 flex items-center justify-around pr-4">
      {/* link to github */}
      <div className="left-0">
        <a
          href="https://github.com/nmpereira/100Leaderboard"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
        >
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
            alt="github"
          />
          <span className="ml-2">Github</span>
        </a>
      </div>

      {/* dont show if width under 500 */}
      {width && width > 666 && (
        <h4>
          Created with{" "}
          <span role="img" aria-label="love">
            {" "}
            ❤️{" "}
          </span>{" "}
          by Mario
        </h4>
      )}

      <div className="right-0">
        <PageDropDown perPage={perPage} setPerPage={setPerPage} />
      </div>
    </footer>
  );
};

export default Footer;
