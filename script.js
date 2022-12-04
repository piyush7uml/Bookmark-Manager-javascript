


let bookmarkArray = localStorage.getItem("bookmarkArray") ? JSON.parse(localStorage.getItem("bookmarkArray")) : []





function generateHtmlForBookmark() {



  let html = ""


  if (bookmarkArray.length > 0) {
    bookmarkArray.forEach((element, index) => {

      html += `<div class="accordion-item">
      <h4 class="accordion-header d-flex align-items-center" id="heading${index}">
          <button class="accordion-button collapsed text-success " type="button" data-bs-toggle="collapse"
              data-bs-target="#collapse${index}" aria-expanded="false"
              aria-controls="collapse${index}">
              ${element.urlHeader}
          </button>
  
          <div id=${element.id} class="mx-3" onClick="removeBookmark(this.id)">
              <i class="fa-solid fa-trash fa-sm"></i>
          </div>
      </h4>
      <div id="collapse${index}" class="accordion-collapse collapse"
          aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
              <a href=${element.url}
                  target="_blank">${element.url}</a>
          </div>
      </div>
  </div>`

    });



  } else {
    html = `<div class="alert alert-primary text-center" role="alert">
       No Bookmarks Added...
      </div>`
  }




  document.getElementById("accordionExample").innerHTML = html

}


generateHtmlForBookmark()









function addUrl() {

  let urlVal = document.querySelector("#inputUrl").value;
  let urlHeader = urlVal.replace(/.+\/\/|www.|\..+/g, '').toUpperCase()

  let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  let regex = new RegExp(expression);

  if (urlVal && regex.test(urlVal)) {

    bookmarkArray.push({
      id: 'id' + (new Date()).getTime(),
      urlHeader,
      url: urlVal
    })

    localStorage.setItem("bookmarkArray", JSON.stringify(bookmarkArray))

  } else {

    const toastLiveExample = document.getElementById('toast')

    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()

  }

  generateHtmlForBookmark()

}


function removeBookmark(id) {

  let updatedBookmarkArray = bookmarkArray.filter((item) => {
    return item.id !== id
  })

  bookmarkArray = updatedBookmarkArray

  localStorage.setItem("bookmarkArray", JSON.stringify(updatedBookmarkArray))

  generateHtmlForBookmark()
}

