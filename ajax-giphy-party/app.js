const GIPHY_API_KEY = "mqPWA7CnBbIA8j0d0YS35wNPwaFYGTcn";

async function getGif(query) {
  let response = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key: GIPHY_API_KEY, q: query, limit: 1 },
  });
  console.log(response);
  $("#gifs").append(
    $("<img>").attr("src", response.data.data[0].images.fixed_height.url)
  );
}

$(function () {
  console.log("Let's get this party started!");
  $("#submit").on("click", function (evt) {
    evt.preventDefault();
    getGif($("#query").val());
  });
  $("#remove").on("click", function (evt) {
    evt.preventDefault();
    $("#gifs").empty();
  });
});
