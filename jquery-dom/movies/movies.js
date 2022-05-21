// waits for the DOM to load
$(function() {
    $("#submit").on("click", function(evt) {
        evt.preventDefault();
        let title = $("#title").val();
        let rating = $(".rating").val();

        if (title.length >= 2) {
            let article = $("<article>");
            article.append($("<h2>").text(title));
            article.append($("<p>").html(`<input
                class="rating"
                max="5"
                readonly
                step="0.5"
                style="--value:${rating}"
                type="range"
                value="${rating}">`));
            article.append($("<button>")
                .text("Remove")
                .addClass("remove")
                .on("click", function(evt) {
                    evt.target.parentElement.remove();
                    $("#info").text("Removed.");
                }));
            $("#movies").append(article);
            $("#info").text("Added.");
        } else  {
            $("#info").text("Title must be at least 2 characters.");
        }

        $("#title").val("");
        $(".rating").val(0);
        $(".rating").get(0).style.setProperty("--value", 0);
    });
});