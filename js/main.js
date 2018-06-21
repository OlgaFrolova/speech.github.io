// Настройки API
window.ya.speechkit.settings.lang = 'uk-UA';
window.ya.speechkit.settings.apikey = 'aa513ec5-4ff5-46e1-8fad-d393c45da39c';

var emotion = 'good';
var speed = 1.0;
var speaker = 'omazh';
// Настройки обьекта синтеза речи
var tts = new ya.speechkit.Tts(
{
  lang: 'uk-UA',
  emotion: emotion,
  speed: speed,
  speaker: speaker
});

$('.zahar-voice').on('click', function(){
  speaker = 'zahar';
  $('.voice-btn').html('Голос: Zahar <span class="caret"></span>');
})

$('.ermil-voice').on('click', function(){
  speaker = 'ermil';
  $('.voice-btn').html('Голос: Ermil <span class="caret"></span>');
})

$('.omazh-voice').on('click', function(){
  speaker = 'omazh';
  $('.voice-btn').html('Голос: Omazh <span class="caret"></span>');
})

$('.jane-voice').on('click', function(){
  speaker = 'jane';
  $('.voice-btn').html('Голос: Jane <span class="caret"></span>');
})

$('.good-voice').on('click', function(){
  emotion = 'good';
  $('.emotion-btn').html('Емоції: Позитивні <span class="caret"></span>');
})

$('.neutral-voice').on('click', function(){
  emotion = 'neutral';
  $('.emotion-btn').html('Емоції: Нейтральні <span class="caret"></span>');
})

$('.evil-voice').on('click', function(){
  emotion = 'evil';
  $('.emotion-btn').html('Емоції: Негативні <span class="caret"></span>');
})

$('#ex1').slider({
	formatter: function(value) {
    speed = value;
    return 'Темп: ' + value;
  },
  tooltip: 'always'
});

$('.ready').on('click', function(){
  tts = new ya.speechkit.Tts(
    {
      lang: 'uk-UA',
      emotion: emotion,
      speed: speed,
      speaker: speaker
    });
})

// Создание обьекта распознавания речи
var streamer = new ya.speechkit.SpeechRecognition();

// Функция озвучки
function speak() {
  var text = $('#first-in').val();
  tts.speak(
    text, {
    stopCallback: function () {
      console.log("Озвучивание текста завершено.");
    }
    });
}

function stop() {
  streamer.stop();
}

// Функция скрытия подсказки во вкладке распознавания
function timehide(){
    $('.time').hide();
}

// Функция распознавания речи
function listen() {
  $('#second-in').val(""); // Очищение поля
  // Обработка подсказки
  $('.time span').css('background-color', '#850B40');
  $('.time span').html("Зачекайте секунду...");
  $('.time').show();
  // Непосредственно распознавание
  /*ya.speechkit.recognize({
      // Функция будет вызвана, когда распознавание завершится.
      doneCallback: function(text) {
        var prev_text = $('#second-in').val();
        if (text != "")
          $('#second-in').val(prev_text + " " + text);
        $('.time span').html("Готово!");
        setTimeout(timehide, 2000);
      },
      // Функция вызовется, как только сессия будет инициализирована.
      initCallback: function () {
        $('.time span').html("Говоріть!");
        $('.time span').css('background-color', '#41BB5E');
      },
      // Вызывается в случае возникновения ошибки.
      errorCallback: function(err) {
           console.log("Возникла ошибка: " + err);
      },
      // Длительность промежутка тишины, при наступлении которой
      // распознавание завершается.
      utteranceSilence: 20
  });*/
  var flag = "f";

  streamer.start({
    initCallback: function () {
      $('.time span').html("Говоріть!");
      $('.time span').css('background-color', '#41BB5E');
    },
    dataCallback: function (text, done, merge, words, biometry) {
      if (done && flag != 't') {
        var prev_text = $('#second-in').val();
        
        $('.time span').html("Готово!");
        console.log("Анализ речи: ");
        $.each(biometry, function (j, bio) {
          if (bio.tag == 'group' && bio.confidence.toFixed(3) > 0.5) 
          {
            switch(bio.class){
              case 'af':
                sex = "жінка від 20 до 55 років";
                break;
              case 'am':
                sex = "чоловік від 20 до 55 років";
                break;
              case 'sf':
                sex = "жінка, старша 55 років";
                break;
              case 'sm':
                sex = "чоловік, старший 55 років";
                break;
              case 'yf':
                sex = "дівчина від 14 до 20 років";
                break;
              case 'ym':
                sex = "хлопець від 14 до 20 років";
                break;
              case 'c':
                sex = "дитина до 14 років";
                break;
            }
          }
        });
        flag = "t";
        if (text != "")
          $('#second-in').val();
        $('#second-in').val(prev_text + " " + text + "\n\n---------------------------------------------------------\nМовив(ла) " + sex);
        setTimeout(timehide, 2000);
      }
    },
    biometry: 'gender,group',
    punctuation: true
  });
}
