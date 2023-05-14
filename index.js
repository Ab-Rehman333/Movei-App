$(document).ready(() => {
  let searchForm = $("#searchForm");
  $(searchForm).on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovei(searchText);
    e.preventDefault();
  });
});
function getMovei(searchText) {
  axios
    .get(`https://www.omdbapi.com/?s=${searchText}&apikey=7266afa0`)
    .then((res) => {
      let moveis = res.data.Search;
      let output = "";
      $.each(moveis, (index, movei) => {
        output += `
                <div class="col-md-3 col-sm-6 mt-5 ">
                    <div class="well ">
                    <img src=${movei.Poster}>
                        <h5 class="p-3">${movei.Title}</h5>
                        <a onclick="singleMovei('${movei.imdbID}')" class="btn btn-success margin-top" href="#">Check Details</a>
                    </div>
                </div>
                `;
      });
      let moveisParent = $("#movies");
      $(moveisParent).html(output)
    })
    .catch((error) => {
      console.log(error);
    });
}
function singleMovei(id) {
  sessionStorage.setItem("movieId", id);
  window.location.assign("single.html");
  return false;
}


function getMovie() {
  let getItem = sessionStorage.getItem("movieId");
  axios.get(`https://omdbapi.com/?i=${getItem}&apikey=7266afa0`).then(res => {
     let movie = res.data;

    let output = `
      <div class="row">
        <div class="col-md-4 col-sm-12 ">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8 col-sm-12">
          <h2 class="text-white mt-4">${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
        <div class="col-md-12 mt-5">
          <div class="info">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View MOvie</a>
            <a href="index.html" class="btn btn-dark">Go Back To Search</a>
          </div>
        </div>
      </div>
  
        
     `;
    let getSingleMovie = $("#movies");
    getSingleMovie.html(output)

  }).catch(err => {
    console.log(err)
  })


}