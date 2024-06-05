import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserSearchService } from "../../services";
import { CursorSearchInterface } from "../../interfaces";
import { sanitizeAndTrimString } from "../../utils";
import { UserSearchItem } from "./UserSearchItem.tsx";

export type UserSearchType = {
  id: string;
  username: string;
  fullName: string;
  profilePictureUrl: string;
  createdAt: Date;
};

type formSearchType = {
  searchTerm: string;
  cursor: CursorSearchInterface;
};

export const SearchModal = ({
  setShowModal,
  title,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}) => {
  const [searchResults, setSearchResults] = useState<
    Record<number, UserSearchType[]>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const currentSearchTerm = useRef("");
  const searchCursor = useRef<CursorSearchInterface | undefined>(undefined);

  useEffect(() => {
    const modal = document.getElementById("search_modal") as HTMLDialogElement;

    modal.showModal();
  }, []);

  async function handleSearch(e?: FormEvent, pageNumber: number = currentPage) {
    if (e) {
      e.preventDefault();
    }

    const sanitizedSearchTerm = sanitizeAndTrimString(searchInput);

    if (sanitizedSearchTerm !== currentSearchTerm.current) {
      currentSearchTerm.current = sanitizedSearchTerm;
      searchCursor.current = undefined;
      setSearchResults({});
      setCurrentPage(1);
    }

    const searchParams: Partial<formSearchType> = {
      searchTerm: sanitizedSearchTerm,
      cursor: searchCursor.current,
    };

    const dataResponse: UserSearchType[] =
      await UserSearchService(searchParams);

    if (dataResponse && dataResponse.length > 0) {
      const lastItem = dataResponse[dataResponse.length - 1];
      searchCursor.current = {
        id: lastItem.id,
        createdAt: lastItem.createdAt,
      };

      setSearchResults((prevState) => ({
        ...prevState,
        [pageNumber]: dataResponse,
      }));
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    const nextPage = currentPage + 1;
    if (!searchResults[nextPage]) {
      handleSearch(undefined, nextPage);
    }
    setCurrentPage(nextPage);
  };

  const checkRemaining = () => {
    if (searchResults[currentPage])
      return searchResults[currentPage].length < 10;

    return false;
  };

  return (
    <>
      <dialog id="search_modal" className="modal">
        <div className="modal-box w-10/12 max-w-5xl">
          <h3 className="font-bold text-lg">{title}</h3>
          <form className={"form-control mb-10"} onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center gap-2 mt-6">
              <input
                type="text"
                className="grow"
                name={"searchTerm"}
                placeholder="Search"
                onChange={handleInputChange}
                value={searchInput}
              />
              <i
                className={"bi bi-search text-2xl cursor-pointer"}
                onClick={() => handleSearch(undefined)}
              ></i>
            </label>
          </form>
          <div className={"flex flex-col gap-4"}>
            {searchResults[currentPage] &&
              searchResults[currentPage].map((user) => (
                <UserSearchItem
                  key={user.id}
                  user={user}
                  setShowModal={setShowModal}
                />
              ))}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </form>
          </div>
          <div className="join grid grid-cols-2">
            <button
              className="join-item btn btn-outline"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <div className={"hidden md:block"}>Previous page</div>
              <i className="bi bi-arrow-left-circle text-xl"></i>
            </button>
            <button
              className="join-item btn btn-outline"
              onClick={handleNext}
              disabled={checkRemaining()}
            >
              <div className={"hidden md:block"}>Next</div>
              <i className="bi bi-arrow-right-circle text-xl"></i>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
