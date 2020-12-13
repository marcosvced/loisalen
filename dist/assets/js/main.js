$(document).ready(function () {
  const galleryItem = $('#gallery .project-item')
  const videoItem = $('#video .project-item')
  const popup = $('.popup-with-zoom-anim')
  // GLOBAL
  feather.replace({
    class: 'icon',
    'stroke-width': 1,
    width: 'none',
    height: 'none'
  })

  //if mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.project-hover').css('display', 'none')
  }

  videoItem.imagefill()
  galleryItem.imagefill()

  $('body').scrollspy({
    target: '.navbar',
    offset: 60
  })

  $('.navbar a').click(function () {
    smoothScroll($(this).attr('href'))
    return false
  })
  $('a.arrow-footer').click(function () {
    smoothScroll($(this).attr('href'))
    return false
  })

  // NAVBAR
  $('.nav.navbar-nav li a').click(function () {
    $('#nav-icon').toggleClass('open')
    $('.navbar-collapse').toggleClass('in')
  })

  $('.navbar-toggle').click(function () {
    $('#nav-icon').toggleClass('open')
    $('.navbar-collapse').toggleClass('in')
  })

  $('#gallery .action').click(function () {
    $('#gallery .action').toggleClass('--none')
    $('#gallery .projects-holder').toggleClass('--open')
  })

  galleryItem.magnificPopup({
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
        return element.find('img')
      }
    },
    callbacks: {
      close: function () {
        // fixed a bug on map.
        $('#map').css('position', 'static')
      }
    }
  })

  videoItem.magnificPopup({
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

  popup.magnificPopup({
    type: 'inline',

    fixedContentPos: true,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  })

  // CONTACT

  isFormCompleted()

  $('input').on('input',function () {
    isFormCompleted()
  })

  $('textarea').on('input',function () {
    isFormCompleted()
  })

  $('#btn-contact').click(() => {
    const name = $('#name').val().trim()
    const email = $('#email').val().trim()
    const text = $('#message').val().trim()


    if (name && email && text) {
      if (name && email && text) {
        $.ajax({
          url: 'http://localhost:9000/.netlify/functions/server/email',
          type: 'post',
          dataType: 'json',
          data: {
            name,
            email,
            text
          },
          success: function (data) {
            console.log(data)
          }
        })
      }
    }
  })

})

function isFormCompleted () {
  const isCompleted = !!!($('#name').val().trim() && $('#email').val().trim() && $('#message').val().trim())
  $('#btn-contact').prop('disabled', isCompleted)
  return isCompleted
}

function smoothScroll (hash) {
  $('html, body').animate({
    scrollTop: $(hash).offset().top - 50
  }, 1000)
}
