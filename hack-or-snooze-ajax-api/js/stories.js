"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  //check if favorite
  var isFavorite =
    currentUser.favorites.filter(function (o) {
      return o.storyId == story.storyId;
    }).length > 0;

  let favoriteStr = `
    <a class="story-favorite story-button"><small>favorite?</small></a>
    <a class="story-unfavorite story-button hidden"><small>unfavorite?</small></a>
  `;
  if (isFavorite) {
    favoriteStr = `
      <a class="story-favorite story-button hidden"><small>favorite?</small></a>
      <a class="story-unfavorite story-button"><small>unfavorite?</small></a>
    `;
  }

  //check if own story
  var isOwnStory =
    currentUser.ownStories.filter(function (o) {
      return o.storyId == story.storyId;
    }).length > 0;

  let removeStr = "";
  if (isOwnStory) {
    removeStr = `<a class="story-remove story-button"><small>remove?</small></a>`;
  }

  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        ${favoriteStr}
        ${removeStr}
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  $(".story-favorite").on("click", handleFavorite);
  $(".story-unfavorite").on("click", handleUnFavorite);
  $(".story-remove").on("click", handleRemoveStory);
}

/** Handle new story form submission. */

async function newStory(evt) {
  console.debug("newStory", evt);
  evt.preventDefault();

  const title = $("#story-title").val();
  const author = $("#story-author").val();
  const url = $("#story-url").val();

  if (title === "" || author === "" || url === "") {
    return;
  }

  console.log(title, author, url);

  $newStoryForm.trigger("reset");
  currentUser.ownStories.push(
    await StoryList.addStory(currentUser, {
      title: title,
      author: author,
      url: url,
    })
  );
  storyList = await StoryList.getStories();
  hidePageComponents();
  putStoriesOnPage();
}

$newStoryForm.on("submit", newStory);

async function handleFavorite(evt) {
  console.debug("handleFavorite", evt);
  evt.preventDefault();
  User.favorite(
    currentUser,
    evt.currentTarget.parentElement.attributes.id.value
  );
  evt.currentTarget.classList.toggle("hidden");
  evt.currentTarget.nextElementSibling.classList.toggle("hidden");
}

async function handleUnFavorite(evt) {
  console.debug("handleUnFavorite", evt);
  evt.preventDefault();
  User.unFavorite(
    currentUser,
    evt.currentTarget.parentElement.attributes.id.value
  );
  evt.currentTarget.classList.toggle("hidden");
  evt.currentTarget.previousElementSibling.classList.toggle("hidden");
}

async function handleRemoveStory(evt) {
  console.debug("handleRemoveStory", evt);
  evt.preventDefault();
  await StoryList.removeStory(
    currentUser,
    evt.currentTarget.parentElement.attributes.id.value
  );
  storyList = await StoryList.getStories();
  hidePageComponents();
  putStoriesOnPage();
}
