document.addEventListener('DOMContentLoaded', function () {
  let posts = document.querySelector('#posts');

  if (!posts) {
    return;
  }

  let post_blocks = posts.querySelector('.posts');
  let pagination = posts.querySelector('.pagination');
  const currentLang = document.querySelector('html').getAttribute('lang');
  const queryPage = window.location.search.split('page=')[1] || 1;

  let postsFetched = false;
  let url = `/paginated_json/${currentLang}/page-${queryPage}.json`;
  let url_pages = `/paginated_json/${currentLang}/pages.json`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fetch(url_pages)
        .then(function (response) {
          return response.json();
        })
        .then(function (url_pages) {
          let posts_data = '';
          if (data.length > 0) {
            data.forEach(function (post) {
              let item = `
                <div class="post col-md-6 col-lg-4">
                  <a href="${post.url}">${post.title}</a>
                </div>
              `;

              posts_data += item;
            });
          }

          post_blocks.innerHTML = posts_data;

          if (url_pages.pages > 1) {
            //renderPagination(url_pages.pages);
          }

          postsFetched = true;
        })
        .catch(function (err) {
          console.log('error: ' + err);
        })
    })
    .catch(function (err) {
      console.log('error: ' + err);
    })
});
