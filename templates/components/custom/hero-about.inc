<section class="hero-about">
  <div class="container-fluid">
    <div class="row">
      <div class="title col-md-2">
        <div class="title-wrapper">
          <h1>{{ title }}</h1>
        </div>
      </div>

      <div class="description col-md-2">
        <div class="description-wrapper">
          <p>{{ description }}</p>
        </div>
      </div>

      <div class="image col-md-8">
        <img src="{{ image }}" alt="{{ title }}">

        <div class="image-overlay" style="--bg-image: url({{ image }})" aria-label="{{ title }}"></div>
      </div>
    </div>
  </div>
</section>