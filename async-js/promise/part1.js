// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.
{
    let fav_num = 26;

    let promise = axios.get(`http://numbersapi.com/${fav_num}?json`);

    promise
    .then(data => $("#p1").text(JSON.stringify(data, null, 4)))
    .catch(err => console.log(err));
}

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
{
    let fav_nums_range = "1,7,10";

    let promise = axios.get(`http://numbersapi.com/${fav_nums_range}?json`);

    promise
    .then(data => {
        for (num in data.data){
            $("#p2").append(`<li>${data.data[num]}</li>`);
        }
    })
    .catch(err => console.log(err));
}
  
// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// (Note: You’ll need to make multiple requests for this.)
{
    let fav_num = 26;

    let promise = axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);

    promise
    .then(fact1 => {
        $("#p3").append(`<li>${fact1.data.text}</li>`);
        return axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);
    })
    .then(fact2 => {
        $("#p3").append(`<li>${fact2.data.text}</li>`);
        return axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);
    })
    .then(fact3 => {
        $("#p3").append(`<li>${fact3.data.text}</li>`);
        return axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);
    })
    .then(fact4 => {
        $("#p3").append(`<li>${fact4.data.text}</li>`);
    })
    .catch(err => {
        console.log(err);
    });
}