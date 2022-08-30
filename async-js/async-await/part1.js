// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.
{

    async function getNumFact(fav_num) {
        try {
            let url = `http://numbersapi.com/${fav_num}?json`;
            let response = await $.getJSON(url);
            $("#p1").text(JSON.stringify(response, null, 4));
            } catch (e) {
            console.log(e);
        }
    }

    getNumFact(40);
}

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
{
    // let fav_nums_range = "1,7,10";

    // let promise = axios.get(`http://numbersapi.com/${fav_nums_range}?json`);

    // promise
    // .then(data => {
    //     for (num in data.data){
    //         $("#p2").append(`<li>${data.data[num]}</li>`);
    //     }
    // })
    // .catch(err => console.log(err));

    async function getNumsFacts(fav_nums_range) {
        try {
            let url = `http://numbersapi.com/${fav_nums_range}?json`;
            let response = await $.getJSON(url);
            for (num in response){
                $("#p2").append(`<li>${response[num]}</li>`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    getNumsFacts("1,7,10");
}
  
// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// (Note: You’ll need to make multiple requests for this.)
{
    // let fav_num = 26;

    // let promise = axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);

    // promise
    // .then(fact1 => {
    //     $("#p3").append(`<li>${fact1.data.text}</li>`);
    //     return axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);
    // })
    // .then(fact2 => {
    //     $("#p3").append(`<li>${fact2.data.text}</li>`);
    //     return axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);
    // })
    // .then(fact3 => {
    //     $("#p3").append(`<li>${fact3.data.text}</li>`);
    //     return axios.get(`http://numbersapi.com/${fav_num}/trivia?json`);
    // })
    // .then(fact4 => {
    //     $("#p3").append(`<li>${fact4.data.text}</li>`);
    // })
    // .catch(err => {
    //     console.log(err);
    // });

    async function get4NumFacts(fav_num) {
        let baseURL = "http://numbersapi.com";
        let facts = await Promise.all([
            $.getJSON(`${baseURL}/${fav_num}/trivia?json`),
            $.getJSON(`${baseURL}/${fav_num}/trivia?json`),
            $.getJSON(`${baseURL}/${fav_num}/trivia?json`),
            $.getJSON(`${baseURL}/${fav_num}/trivia?json`)
        ]);

        $("#p3").append(`<li>${facts[0].text}</li>`);
        $("#p3").append(`<li>${facts[1].text}</li>`);
        $("#p3").append(`<li>${facts[2].text}</li>`);
        $("#p3").append(`<li>${facts[3].text}</li>`);
    }
  
    get4NumFacts(26);
}

