// ==UserScript==
// @name         TG Translation Enhancements
// @namespace    https://github.com/rondevous/telegram-translation-enhancements
// @description  Adds useful keyboard shortcuts to the Telegram Translation Platform
// @author       Rondevous
// @include      https://translations.telegram.org/*
// @version      0.0.1
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/rondevous/telegram-translation-enhancements/raw/master/telegram-translation-enhancements.user.js
// @updateURL    https://github.com/rondevous/telegram-translation-enhancements/raw/master/telegram-translation-enhancements.user.js
// ==/UserScript==

function AdvancedSearchHelp () {  
  // Trigger the modal with a link
  var question_icon = document.createElement('a')
  question_icon.setAttribute("href", "#AdvancedSearchModal")
  question_icon.setAttribute('class', "tr-search-help glyphicon glyphicon-question-sign")
  question_icon.setAttribute("data-toggle", "modal")
  // question_icon.setAttribute("data-target", "#AdvancedSearchModal")
  // Modal Trigger Location (?)
  $('.tr-search-filters').after(question_icon)
  $(".tr-search-help").css({
    'float': 'right',
    'display': 'inline',
    'margin':'15px 0 15px 15px',
    'color':'purple',
  })
}

function AttachModalToBody () {
  // Modal
  $('body').append("<div id='AdvancedSearchModal' class='modal fade' role='dialog'></div>")
  $('#AdvancedSearchModal').append('<div class="modal-dialog"></div>')
  $('div[class="modal-dialog"]').append('<div class="modal-content"></div>')
  
  // Modal Content
  $('div[class="modal-content"]').append(`
  <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">New Advanced Search</h4>
  </div>
  <div class="modal-body">
    <ol>
    <li>
    By default, search will now match <b>the beginning</b> of the words. <code>video voice</code> will find all phrases that contain words starting with <code>video*</code> AND words starting with <code>voice*</code> (like <code>videocalls in voicechats</code>).<br><br>
    </li>
    <li>
    For <b>exact matches</b> Use "double quotes". The query <code>"video" "audio"</code> will find all phrases that have the words <code>video</code> AND <code>audio</code> \u2013 but not those that only have the words "videos" and "voices".<br><br>
    </li>
    <li>
    If you want to find literal double quotes in your search, e.g. <code>set "show previews" to</code> \u2013 put the <code>\\</code> symbol before them. Like this: <code>set \\"show previews\\" to</code>. This also works for escaping any other search syntax signs.<br><br>
    </li>
    <li>
    To search by substring like before, use round and square parentheses:<br>
    <code>(est)</code> => T<b>est</b>, R<b>est</b>rict, and <b>Est</b>imate<br>
    <code>[est)</code> => <b>Est</b>imate, but not T<b>est</b><br>
    <code>(est]</code> => T<b>est</b>, but not <b>Est</b>imate<br><br>
    </li>
    <li>
    You can <b>exclude</b> matches using the -minus sign. <code>Video -audio</code> will find all phrases that contain <code>video</code> but do not contain <code>audio</code>.<br><br>
    </li>
    <li>
    On the right of the search bar, there is a new toggle that lets you control whether you're searching for matches in the <b>Text</b> only, <b>Key name</b> only \u2013 or <b>both</b>, like before.
    </li>
    </ol>
  </div>
  <div class="modal-footer">
    <span style='color:grey;'>Documented by Sven Erik<br>
    Note: Advanced search is native to the translation platform. This script is just an info-box</span>
  </div>
  `)
}

function AttachMutationProgress () {
  // #aj-progress box-shadow => 'none' means it was loaded from browser address bar
  const ajprogressbar = document.querySelector('#aj_progress')

  var progressObserver = new MutationObserver(function(mutationList){
    mutationList.forEach(function(mutation) {
      if (mutation.oldValue === 'width: 100%; transition: width 0.3s linear 0s, box-shadow 0.2s ease 0s; position: fixed; z-index: 1000; top: 0px; height: 3px; box-shadow: rgb(57, 173, 231) 0px 2px 0px inset;'){
        console.log('passed: mutation.oldValue')
        if(mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px inset') {
          console.log('=== Re-attached Search Help Button ===')
          runAtDocumentLoadProgressComplete()
        } else if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px 0px inset') {
          console.log('=== Re-attached Search Help Button with 4 x 0px boxShadow ===')
          runAtDocumentLoadProgressComplete()
        }
      }
    });
  })

  progressObserver.observe(ajprogressbar, {
    attributeFilter: ['style'],
    attributeOldValue: true
  });
}

function runAtDocumentLoadProgressComplete() {
  AdvancedSearchHelp()
}


function init () {
  AttachModalToBody()
  AdvancedSearchHelp()
  AttachMutationProgress()
}

init()
