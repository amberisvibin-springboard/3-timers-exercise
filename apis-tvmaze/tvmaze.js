/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  let response = await axios.get("https://api.tvmaze.com/singlesearch/shows", {params: {q: query}});
  console.log(response);

  let image = response.data.image.original;

  if (image == null || image == undefined) {
    image = "https://tinyurl.com/tv-missing";
  }
  
  return [
    {
      id: response.data.id,
      name: response.data.name,
      summary: response.data.summary,
      image: image
    }
  ]
}

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

 async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  let response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  console.log(response);

  let out = new Array;

  // TODO: return array-of-episode-info, as described in docstring above
  for (let episode of response.data) {
    //console.log(episode);
    out.push({
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    })
  };

  return out;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src=${show.image}>
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button type="submit" id="show-episodes" class="btn btn-primary">Show Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }

  /** Handle episode request:
  *    - get episodes and display in episodes list
  */

  $("#show-episodes").on("click", async function handleEpisodes (evt) {
    evt.preventDefault();

    let showID = $("#show-episodes").closest(".card").data("show-id");

    let episodes = await getEpisodes(showID);

    console.log(episodes);

    populateEpisodes(episodes);
  });
}

function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  for (let episode of episodes) {
    $episodesList.append($("<li>").text(`${episode.name} (S${episode.season}E${episode.number})`));
  }
}

/** Handle search form submission:
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  let shows = await searchShows(query);

  populateShows(shows);
});