import View from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", e => {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupBtn(page, direction, order) {
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--${order}">
        <span>Page ${page}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
    </button>
`;
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // first page and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(curPage + 1, "right", "next");
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(curPage - 1, "left", "prev");
    }

    // other page
    if (curPage < numPages) {
      return `
        ${this._generateMarkupBtn(curPage - 1, "left", "prev")}
        ${this._generateMarkupBtn(curPage + 1, "right", "next")}
      `;
    }

    // first page and there are no other pages
    return "";
  }
}

export default new PaginationView();
