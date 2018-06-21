// Подгружаем анимированный фон
particlesJS.load('particles-js', 'assets/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});

// Управление вкладками
$('document').ready(function() {
  $('.first-select').click(function() {
    $('.first-content').show();
    $('.second-content').hide();
  });

  $('.second-select').click(function() {
    $('.second-content').show();
    $('.first-content').hide();
  });
});
