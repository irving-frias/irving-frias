
<!DOCTYPE html>
<html lang="{{ translate('en', 'es') }}" class="h-100" data-bs-theme="dark" data-slug-en="{{ slug_en }}" data-slug-es="{{ slug_es }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Irving Frias | {{ page_title }}</title>
    <link rel="stylesheet" href="/css/irving-frias.min.css" media="all" />
    <meta name="twitter:title" property="og:title" itemprop="name" content="{{ page_title }}">
    <meta property="og:image" itemprop="image primaryImageOfPage" content="{{ og_image }}">
  </head>
  <body class="d-flex flex-column h-100">
    {% include './02-header.inc' with context %}
    <main role="main" class="flex-shrink-0 z-1">
      <h1>{{ page_title }}</h1>