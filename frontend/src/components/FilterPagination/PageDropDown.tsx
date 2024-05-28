// component for the dropdown to select the number of items per page
interface PageDropDownProps {
  perPage: number;
  setPerPage: (perPage: number) => void;
}

const PageDropDown = ({ perPage, setPerPage }: PageDropDownProps) => {
  return (
    <div className="dropdown dropdown-top">
      <div tabIndex={0} role="button" className="btn m-1">
        Show {perPage} per page
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {[10, 25, 50, 100, 500].map((num) => (
          <li key={num} onClick={() => setPerPage(num)}>
            <a href="#" className="menu-title">
              {num}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PageDropDown };
