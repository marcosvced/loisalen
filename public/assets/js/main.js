$(document).ready(function () {
  // GLOBAL

  //if mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.project-hover').css('display', 'none')
    $('.project-item').css('height', 'auto')
  } else {
    $('#video .project-item').imagefill()
    $('#gallery .project-item').imagefill()
  }

  $('a:not(.project-item)').click(function () {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000)
    return false
  })

  // NAVBAR

  $('.navbar-toggle').click(function () {
    $('#nav-icon').toggleClass('open')
    $('div#bs-example-navbar-collapse-1').stop(true, true).slideToggle()
  })

  $('#gallery .project-item').magnificPopup({
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    image: {
      verticalFit: true
    },
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300, // don't forget to change the duration also in CSS
      opener: function (element) {
        return element.find('img');
      }
    },
    callbacks: {
      close: function () {
        // fixed a bug on map.
        $('#map').css('position', 'static');
      }
    }
  })

  $('#video .project-item').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: true,
    fixedContentPos: true,
    gallery: {
      enabled: true
    }
  })

  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: true,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  // CONTACT

  isFormCompleted()

  $('input').change(function () {
    isFormCompleted()
  })

  $('textarea').change(function () {
    isFormCompleted()
  })

  $('#btn-contact').click(() => {
    const name = $('#name').val().trim()
    const email = $('#email').val().trim()
    const text = $('#message').val().trim()

    const data = {
      name,
      email,
      text
    }
    if (name && email && text) {
      $.post('/email', data, function () {
        console.log('Server received your data')

        $('#name').val('')
        $('#email').val('')
        $('#message').val('')
      })
    }
  })

})

function isFormCompleted () {
  const isCompleted = !!!($('#name').val().trim() && $('#email').val().trim() && $('#message').val().trim())
  $('#btn-contact').prop('disabled', isCompleted)
  return isCompleted
}
