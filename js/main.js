var bookmarkName=document.getElementById('bookmarkName');
var bookmarkURL=document.getElementById('bookmarkURL');
var searchInput = document.getElementById("searchInput");

var bookmarksList=[];
// -----------------     Local Storage     ----------------------------------------------

if (localStorage.getItem("bookmarks") != null) {
    bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
    dataDisplay();
}
// -----------------Add Bookmark  Function ----------------------------------------------
function addBookmark(){
  if (validateName() == true && validateUrl() == true) {
    var bookmark= { 
      name:bookmarkName.value ,
      url:bookmarkURL.value ,
    };
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    console.log(bookmarksList);
    dataDisplay();
     //clear form
     clear();
  }
  else{
    Swal.fire({
      icon: "error",
      title: " Not valid! Please follow the rules below ",
      html:`
      <p>Site Name must contain at least 3 characters</p>
      <p>Site URL must be a valid one</p>`,
    
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }
}
  


// --------------------Display Bookmarks Function --------------------------------------
function dataDisplay(){
    var data =" ";
    for(var i=0 ; i < bookmarksList.length ; i++){
        data += `<tr>
         <td> ${i+1} </td>
        <td>${bookmarksList[i].name}</td>              
        <td>
          <a href="${bookmarksList[i].url}" target="_blank">
          <button class="btn btn-visit" data-index="i">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
        </a>
          
        </td>
        <td>
          <button onclick='deleteBookmark(${i})' class="btn btn-delete pe-2">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr> `;
document.getElementById("tableContent").innerHTML = data;     
    }
}

//-----------------------Clear Form Function -----------------------------------------

function clear() {
  bookmarkName.value = "";
  bookmarkURL.value= "";
  
}

//-----------------------Detete Function -----------------------------------------
function deleteBookmark(i) {
  bookmarksList.splice(i, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  dataDisplay();
}

//----------------------  Validation  --------------------------------------------

function validateName() {
  var regexName = /^[a-z]{3,20}$/;
  var text = bookmarkName.value ;
  if (regexName.test(text) == true) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
   
    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
    ;
    return false;
  }
}

function validateUrl() {
  var regexUrl = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;
  var url = bookmarkURL.value ;
  if (regexUrl.test(url) == true) {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
   
    return true;
  } else {
    bookmarkURL.classList.add("is-invalid");
    bookmarkURL.classList.remove("is-valid");
   
    return false;
  }
}
//-----------------------realtime search Function -----------------------------------------
function searchBookmark() {
  var term = searchInput.value;
  var data = " ";
  for (var i = 0; i < bookmarksList.length; i++) {
    if (
      bookmarksList[i].name.toLowerCase().includes(term.toLowerCase())
    ) {
      data += `<tr>
         <td> ${i+1} </td>
        <td>${bookmarksList[i].name}</td>              
        <td>
          <a href="${bookmarksList[i].url}" target="_blank">
          <button class="btn btn-visit" data-index="i">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
        </a>
          
        </td>
        <td>
          <button onclick='deleteBookmark(${i})' class="btn btn-delete pe-2">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr> `;
      document.getElementById("tableContent").innerHTML = data;
    }
  }
}

