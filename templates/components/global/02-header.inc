<header class="position-sticky top-0 z-2">
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="{{ translate('/', 'es') }}" data-translate-url="{{ reverse_url('/') }}">Irving Frias</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ translate('Toggle navigation', 'es') }}">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="{{ translate('/', 'es') }}" data-translate-url="{{ reverse_url('/') }}">{{ translate('Home', 'es') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="{{ translate('/about', 'es') }}" data-translate-url="{{ reverse_url('/about') }}">{{ translate('About', 'es') }}</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="{{ translate('/posts', 'es') }}" data-translate-url="{{ reverse_url('/posts') }}">{{ translate('Posts', 'es') }}</a>
          </li>
        </ul>

        <div class="d-flex">
          <label class="ui-switch" for="theme-mode" aria-label="{{ translate('Theme Mode', 'es') }}">
            <input type="checkbox" id="theme-mode" name="theme-mode">
            <div class="slider">
              <div class="circle"></div>
            </div>
          </label>

          <a class="btn btn-outline-primary language-toggle" href="{{ translate('/es', 'es') }}">{{ translate('ES', 'es') }}</a>
        </div>
      </div>
    </div>
  </nav>
</header>