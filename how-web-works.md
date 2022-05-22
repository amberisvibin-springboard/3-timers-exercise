# How Web Works Exercise
## Part One: Solidify Terminology

In your own terms, define the following terms:

 - What is HTTP?
   - The protocol that browsers use to communicate.
 - What is a URL?
   - A string that gets converted to an IP.
 - What is DNS?
   - Turns URLs into IP addresses that your computer can use to find the site.
 - What is a query string?
   - Optional data denoted by a `?` in the url string. Passes data to the server or webpage. 
 - What are two HTTP verbs and how are they different?
   - GET and POST. GET has no side effects. Used for things like accessing webpages. POST has side effects. Used for things like form submits.
 - What is an HTTP request?
   - When the browser requests data from the server.
 - What is an HTTP response?
   - When the server responds with the data.
 - What is an HTTP header? Give a couple examples of request and response headers you have seen.
   - Extra info about the server, client, and data. GET headers and response headers.
 - What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
   - The URL is turned into an IP by DNS (or a cache somewhere along the chain). The browser sends a GET request to the server at the IP with a port, resource, and potentially a query string. The server sends a response with the HTML data.

## Part Two: Practice Tools

 - Using curl, make a GET request to the icanhazdadjoke.com API to find all jokes involving the word “pirate”
    ```
    amber@amber-popos:~$ curl "Accept: text/plain" https://icanhazdadjoke.com/search&term=pirate
    [1] 1007673
    amber@amber-popos:~$ curl: (3) URL using bad/illegal format or missing URL
    I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.
    Did you hear about the guy whose whole left side was cut off? He's all right now.
    Why didn’t the skeleton cross the road? Because he had no guts.
    What did one nut say as he chased another nut?  I'm a cashew!
    Chances are if you' ve seen one shopping center, you've seen a mall.
    I knew I shouldn't steal a mixer from work, but it was a whisk I was willing to take.
    How come the stadium got hot after the game? Because all of the fans left.
    Why was it called the dark ages? Because of all the knights.
    A steak pun is a rare medium well done.
    Why did the tomato blush? Because it saw the salad dressing.
    Did you hear the joke about the wandering nun? She was a roman catholic.
    What creature is smarter than a talking parrot? A spelling bee.
    I'll tell you what often gets over looked... garden fences.
    Why did the kid cross the playground? To get to the other slide.
    Why do birds fly south for the winter? Because it's too far to walk.
    What is a centipedes's favorite Beatle song?  I want to hold your hand, hand, hand, hand...
    My first time using an elevator was an uplifting experience. The second time let me down.
    To be Frank, I'd have to change my name.
    Slept like a log last night … woke up in the fireplace.
    Why does a Moon-rock taste better than an Earth-rock? Because it's a little meteor.```
 - Use dig to find what the IP address is for icanhazdadjoke.com
    ```
    amber@amber-popos:~$ dig icanhasdadjoke.com

    ; <<>> DiG 9.16.15-Ubuntu <<>> icanhasdadjoke.com
    ;; global options: +cmd
    ;; Got answer:
    ;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 52161
    ;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

    ;; OPT PSEUDOSECTION:
    ; EDNS: version: 0, flags:; udp: 1232
    ;; QUESTION SECTION:
    ;icanhasdadjoke.com.		IN	A

    ;; ANSWER SECTION:
    icanhasdadjoke.com.	300	IN	A	104.21.86.174
    icanhasdadjoke.com.	300	IN	A	172.67.223.73

    ;; Query time: 43 msec
    ;; SERVER: 1.1.1.1#53(1.1.1.1)
    ;; WHEN: Sat May 21 20:20:15 EDT 2022
    ;; MSG SIZE  rcvd: 79
    ```
 - Make a simple web page and serve it using `python3 -m http.server`. Visit the page in a browser.
    ```
    amber@amber-popos:~/springboard/meme-generator$ python3 -m http.server
    Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
    127.0.0.1 - - [21/May/2022 20:22:25] "GET / HTTP/1.1" 200 -
    127.0.0.1 - - [21/May/2022 20:22:25] "GET /app.js HTTP/1.1" 200 -
    127.0.0.1 - - [21/May/2022 20:22:25] "GET /style.css HTTP/1.1" 200 -
    127.0.0.1 - - [21/May/2022 20:22:25] "GET /favicon.ico HTTP/1.1" 200 -
    127.0.0.1 - - [21/May/2022 20:22:25] "GET /placeholder.svg HTTP/1.1" 200 -
    ```

## Part Three: Explore Dev Tools

Build a very simple HTML form that uses the GET method (it can use the same page URL for the action) when the form is submitted.

Add a field or two to the form and, after submitting it, explore in Chrome Developer tools how you can view the request and response headers.

Edit the page to change the form type to POST, refresh in the browser and re-submit. Do you still see the field in the query string? Explore in Chrome how you can view the request and response headers, as well as the form data.

## Part Four: Explore the URL API

At times, it’s useful for your JavaScript to look at the URL of the browser window and change how the script works depending on parts of that (particularly the query string).

[Read about the URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL)

Try some of the code examples in the Chrome Console so that you can get comfortable with the basic methods and properties for instances of the URL class.

## Solution

You can [view our solution](http://curric.rithmschool.com/springboard/exercises/how-web-works/solution/index.html)
