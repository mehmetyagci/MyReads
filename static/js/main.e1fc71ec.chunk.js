(window.webpackJsonpmyreads=window.webpackJsonpmyreads||[]).push([[0],{27:function(e,t,o){e.exports=o(39)},32:function(e,t,o){},33:function(e,t,o){},39:function(e,t,o){"use strict";o.r(t);var a=o(0),n=o.n(a),r=o(21),s=o.n(r),c=(o(32),o(7)),l=o(8),i=o(11),h=o(10),u=o(12),k=o(22);function d(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function m(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?d(o,!0).forEach((function(t){Object(k.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):d(o).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var f="https://reactnd-books-api.udacity.com",b=localStorage.token;b||(b=localStorage.token=Math.random().toString(36).substr(-8),console.log("token:",b));var p={Accept:"application/json",Authorization:b},v=function(e,t){return fetch("".concat(f,"/books/").concat(e.id),{method:"PUT",headers:m({},p,{"Content-Type":"application/json"}),body:JSON.stringify({shelf:t})}).then((function(e){return e.json()}))},g=function(e,t){return fetch("".concat(f,"/search"),{method:"POST",headers:m({},p,{"Content-Type":"application/json"}),body:JSON.stringify({query:e,maxResults:t})}).then((function(e){return e.json()})).then((function(e){return e.books}))},y=(o(33),o(26)),S=o(6),B=o(23),E=o.n(B),O=o(9),j=function(e){function t(e){var o;return Object(c.a)(this,t),(o=Object(i.a)(this,Object(h.a)(t).call(this,e))).state={bookShelf:o.props.book.shelf?o.props.book.shelf:"none"},o.handleChange=o.handleChange.bind(Object(O.a)(o)),o}return Object(u.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){this.setState({bookShelf:e.target.value},(function(){this.props.changeBookShelf(this.props.book,this.state.bookShelf)}))}},{key:"render",value:function(){return n.a.createElement("div",{className:"book-shelf-changer"},n.a.createElement("select",{value:this.state.bookShelf,onChange:this.handleChange},n.a.createElement("option",{value:"move",disabled:"disabled"},"Move to..."),n.a.createElement("option",{value:"currentlyReading",disabled:"currentlyReading"===this.state.bookShelf||null},"Currently Reading"),n.a.createElement("option",{value:"wantToRead",disabled:"wantToRead"===this.state.bookShelf||null},"Want to Read"),n.a.createElement("option",{value:"read",disabled:"read"===this.state.bookShelf||null},"Read"),n.a.createElement("option",{value:"none",disabled:"currentlyReading"!==this.state.bookShelf&&"wantToRead"!==this.state.bookShelf&&"read"!==this.state.bookShelf||null},"None")))}}]),t}(a.Component);var w=function(e){var t=e.book,o=e.changeBookShelf;return void 0!==t?n.a.createElement("div",{className:"book"},n.a.createElement("div",{className:"book-top"},n.a.createElement("div",{className:"book-cover",style:{width:128,height:193,backgroundImage:"url(".concat(t.imageLinks&&t.imageLinks.smallThumbnail||"../public/book.jpg",")")}}),n.a.createElement(j,{book:t,changeBookShelf:o})),n.a.createElement("div",{className:"book-title"},t.title),t.authors?t.authors.length>1?t.authors.map((function(e){return n.a.createElement("div",{key:e,className:"book-authors"},e)})):n.a.createElement("div",{className:"book-authors"},t.authors):n.a.createElement("div",{className:"book-authors"},"Unknown")):n.a.createElement("div",null)};var C=function(e){var t=e.books,o=e.changeBookShelf;return n.a.createElement("ol",{className:"books-grid"},t&&t.map((function(e,t){return n.a.createElement("li",{key:t},n.a.createElement(w,{book:e,changeBookShelf:o}))})))};var N=function(e){var t=e.name,o=e.shelfBooks,a=e.changeBookShelf;return n.a.createElement("div",{className:"bookshelf"},n.a.createElement("h2",{className:"bookshelf-title"},"currentlyReading"===t?"Currently Reading":"wantToRead"===t?"Want To Read":"read"===t?"Read":t),n.a.createElement("div",{className:"bookshelf-books"},n.a.createElement(C,{books:o,changeBookShelf:a})))};var R=function(e){var t=e.books,o=e.changeBookShelf,a={currentlyReading:1,wantToRead:2,read:3};t.sort((function(e,t){return a[e.shelf]-a[t.shelf]}));var r=Object.entries(E.a.groupBy(t,"shelf")).map((function(e){var t=Object(y.a)(e,2),a=t[0],r=t[1];return n.a.createElement("div",{key:a},n.a.createElement(N,{name:a,shelfBooks:r,changeBookShelf:o}))}));return n.a.createElement("div",{className:"list-books"},n.a.createElement("div",{className:"list-books-title"},n.a.createElement("h1",null,"My Reads")),n.a.createElement("div",{className:"list-books-content"},n.a.createElement("div",null,r)),n.a.createElement("div",{className:"open-search"},n.a.createElement(S.b,{to:"/search"},"Add a book")))},T=o(5),P=function(e){function t(e){var o;return Object(c.a)(this,t),(o=Object(i.a)(this,Object(h.a)(t).call(this,e))).handleClick=function(e){o.props.clearSearchBooks()},o.state={searchTerm:""},o.onChange=o.onChange.bind(Object(O.a)(o)),o}return Object(u.a)(t,e),Object(l.a)(t,[{key:"onChange",value:function(e){var t=e.target.value.toLowerCase();this.setState({searchTerm:t},(function(){void 0!==t&&t.length>0?this.props.searchBooks(t):this.props.clearSearchBooks()}))}},{key:"renderSearchedBooks",value:function(){return this.props.filteredBooks.length>0?n.a.createElement("div",{className:"search-books-results"},n.a.createElement(C,{books:this.props.filteredBooks,changeBookShelf:this.props.changeBookShelf})):this.state.searchTerm.length>0?n.a.createElement("div",{className:"search-books-results"},n.a.createElement("h4",null,'No result found for: "',this.state.searchTerm,'"')):void 0}},{key:"render",value:function(){return n.a.createElement("div",{className:"search-books"},n.a.createElement("div",{className:"search-books-bar"},n.a.createElement(S.b,{to:"/",className:"close-search",onClick:this.handleClick.bind(this)},"Close"),n.a.createElement("div",{className:"search-books-input-wrapper"},n.a.createElement("input",{type:"text",onChange:this.onChange,placeholder:"Search by title or author"}))),this.renderSearchedBooks())}}]),t}(a.Component),A=function(e){function t(e){var o;return Object(c.a)(this,t),(o=Object(i.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){o.getAllBooksFromAPI()},o.onChangeBookShelf=function(e,t){v(e,t).then((function(e){})).catch((function(e){console.log(e),o.setState({error:!0})})),"none"===t?o.setState((function(t){return{myBooks:t.myBooks.filter((function(t){return t.id!==e.id}))}})):(e.shelf=t,o.setState((function(t){return{myBooks:t.myBooks.filter((function(t){return t.id!==e.id})).concat(e)}})))},o.onSearchBooks=function(e){g(e,10).then((function(e){if(Array.isArray(e)){var t=e.map((function(e){return o.state.myBooks.map((function(t){return t.id===e.id&&(e.shelf=t.shelf),t})),e}));o.setState({searchBooks:t})}else o.setState({searchBooks:[]})})).catch((function(e){console.log(e),o.setState({error:!0})}))},o.onClearSearchBooks=function(){o.setState({searchBooks:[]})},o.state={myBooks:[],searchBooks:[],error:!1},o}return Object(u.a)(t,e),Object(l.a)(t,[{key:"getAllBooksFromAPI",value:function(){var e=this;fetch("".concat(f,"/books"),{headers:p}).then((function(e){return e.json()})).then((function(e){return e.books})).then((function(t){e.setState({myBooks:t})})).catch((function(t){console.log(t),e.setState({error:!0})}))}},{key:"render",value:function(){var e=this;return this.state.error?n.a.createElement("div",null,"An error occured. Please, try again later."):n.a.createElement("div",{className:"app"},n.a.createElement(T.a,{exact:!0,path:"/",render:function(){return n.a.createElement(R,{books:e.state.myBooks,changeBookShelf:e.onChangeBookShelf})}}),n.a.createElement(T.a,{path:"/search",render:function(){return n.a.createElement(P,{filteredBooks:e.state.searchBooks,myReadBooks:e.state.myBooks,changeBookShelf:e.onChangeBookShelf,searchBooks:e.onSearchBooks,clearSearchBooks:e.onClearSearchBooks})}}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(S.a,null,n.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[27,1,2]]]);
//# sourceMappingURL=main.e1fc71ec.chunk.js.map