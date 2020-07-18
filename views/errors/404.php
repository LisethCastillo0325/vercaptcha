<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Captcha</title>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css'>
    <link rel="stylesheet" href="<?=constant('URL')?>public/css/error-estilos.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/4b9ba14b0f.js" crossorigin="anonymous"></script>

</head>

<body>

<div class="moon"></div>
<div class="moon__crater moon__crater1"></div>
<div class="moon__crater moon__crater2"></div>
<div class="moon__crater moon__crater3"></div>

<div class="star star1"></div>
<div class="star star2"></div>
<div class="star star3"></div>
<div class="star star4"></div>
<div class="star star5"></div>

<div class="error">
  <div class="error__title">404</div>
  <div class="error__subtitle">¡Oops! ¡Algo salió mal!</div>
  <div class="error__description">El recurso no fue encontrado.</div>
</div>

<div class="astronaut">
  <div class="astronaut__backpack"></div>
  <div class="astronaut__body"></div>
  <div class="astronaut__body__chest"></div>
  <div class="astronaut__arm-left1"></div>
  <div class="astronaut__arm-left2"></div>
  <div class="astronaut__arm-right1"></div>
  <div class="astronaut__arm-right2"></div>
  <div class="astronaut__arm-thumb-left"></div>
  <div class="astronaut__arm-thumb-right"></div>
  <div class="astronaut__leg-left"></div>
  <div class="astronaut__leg-right"></div>
  <div class="astronaut__foot-left"></div>
  <div class="astronaut__foot-right"></div>
  <div class="astronaut__wrist-left"></div>
  <div class="astronaut__wrist-right"></div>
  
  <div class="astronaut__cord">
    <canvas id="cord" height="500px" width="500px"></canvas>
  </div>
  
  <div class="astronaut__head">
    <canvas id="visor" width="60px" height="60px"></canvas>
    <div class="astronaut__head-visor-flare1"></div>
    <div class="astronaut__head-visor-flare2"></div>
  </div>
</div>


<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.min.js'></script>
<script src="<?php echo constant('URL') ?>public/js/error.js" type="text/javascript"></script>
</body>
</html>
