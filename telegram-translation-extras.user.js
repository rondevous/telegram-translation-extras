// ==UserScript==
// @name         TG Translation Extras
// @namespace    https://github.com/rondevous/telegram-translation-extras
// @description  Adds extra UI/info to the Telegram Translation Platform
// @author       Rondevous
// @include      https://translations.telegram.org/*
// @version      0.0.2
// @grant        none
// @run-at       document-end
// @downloadURL  https://github.com/rondevous/telegram-translation-extras/raw/main/telegram-translations-extras.user.js
// @updateURL    https://github.com/rondevous/telegram-translation-extras/raw/main/telegram-translations-extras.user.js
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
        <!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
        <h5 class="modal-title">Telegram Translation Extras</h5>
  </div>
  <div class="modal-body">
    <div role="tabpanel">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active">
          <a href="#AdvancedSearchTab" aria-controls="AdvancedSearchTab" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-search"></span> Advanced Search Info</a>
          </li>
          <li role="presentation">
          <a href="#shortcutkeys" aria-controls="shortcutkeys" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-fast-forward"></span> Keyboard Shortcuts</a>
          </li>
          <li role="presentation">
          <a href="#ExtraTools" aria-controls="ExtraTools" role="tab" data-toggle="tab"><span class="glyphicon glyphicon-th-list"></span> Extra Tools</a>
          </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="AdvancedSearchTab"><br>
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
            </ol> <br><br>
            <span style='color:grey;'>Note: Advanced search is native to the translation platform.<br>
            "Telegram Translation Extras" does nothing to enable it.</span>
          </div>
          <!-- Shortcut keys -->
          <div role="tabpanel" class="tab-pane" id="shortcutkeys"><br>
            <table class="table table-stripped table-hover table-bordered">
              <caption>
                  <a data-toggle="tooltip" title="Install this script to activate these shortcuts" href="https://github.com/jurf/telegram-translation-shortcuts">jurf/Telegram-Translation-Shortcuts</a>
              </caption>
              <thead style="background-color: black; color: gold;">
              <tr>
                  <th>Shortcut Key</th>
                  <th>Command</th>
              </tr>
              </thead>
              <tbody>
                  <tr>
                      <td colspan="2" class="info">
                          <i>On search results and single phrase pages</i>
                      </td>
                  </tr>
                  <tr>
                      <td><kbd>Ctrl+Enter</kbd> (or <kbd>y</kbd>)</td>
                      <td>Apply top suggestion & go to next linked phrase</td>
                  </tr>
                  <tr>
                      <td><kbd>1</kbd> to <kbd>5</kbd></td>
                      <td>Apply n-th suggestion & move to next linked phrase</td>
                  </tr>
                  <tr>
                      <td><kbd>Tab</kbd> /<kbd>Shift+Tab</kbd><br> (or <kbd>h</kbd> / <kbd>l</kbd>)</td>
                      <td>Move to Next/Previous linked phrase</td>
                  </tr>
                  <tr>
                      <td><kbd>PageUp</kbd> / <kbd>PageDown</kbd><br> (or <kbd>k</kbd> / <kbd>j</kbd>)</td>
                      <td>Move up/down in search results</td>
                  </tr>
                  <tr>
                      <td><kbd>Ctrl+A</kbd> (or <kbd>i</kbd>)</td>
                      <td>Add a new translation</td>
                  </tr>
                  <tr>
                      <td><kbd>Ctrl+E</kbd> (or <kbd>c</kbd>)</td>
                      <td>Edit the first suggestion</td>
                  </tr>
                  <tr>
                      <td><kbd>/</kbd></td>
                      <td>Search</td>
                  </tr>
                  <tr>
                      <td><kbd>Esc</kbd></td>
                      <td>Cancel 'add translation'/comment</td>
                  </tr>
                  <tr>
                      <td colspan="2" class="info">
                          <i>When importing strings on the import page</i>
                      </td>
                  </tr>
                  <tr>
                      <td><kbd>Ctrl+A</kbd></td>
                      <td>Select/Deselect all phrases on import page</td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="2" class="warning"> <br>
                          <span style="color:grey;">The above shortcuts are not native to the Translations platform.<br>
                          You need to install <a href="https://github.com/jurf/telegram-translation-shortcuts">jurf/telegram-translation-shortcuts</a> to enable them</span>
                      </td>
                  </tr>
              </tfoot>
            </table>
          </div>

          <!-- TAB PANE 3-->
          <div role="tabpanel" class="tab-pane" id="ExtraTools"><br>
          Coming soon:  
          Open and Translate Critical strings
          </div>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    FEEL DIZZY? 'Cause you were hit by a JOHN CENA!
  </div>
  `)
  $("table, th, td").css({"border": "1px solid gray", "border-collapse": "collapse"})
}

/**
 * Observes if the page has changed and calls runAtDocumentLoadProgressComplete()
 */
function AttachMutationProgress () {
  // Watch progress bar to detect loading of new page
  // #aj-progress box-shadow => 'none' means it was loaded from browser URL bar
  const ajprogressbar = document.querySelector('#aj_progress')

  var progressObserver = new MutationObserver(function(mutationList){
    mutationList.forEach(function(mutation) {
      if (mutation.oldValue === 'width: 100%; transition: width 0.3s linear 0s, box-shadow 0.2s ease 0s; position: fixed; z-index: 1000; top: 0px; height: 3px; box-shadow: rgb(57, 173, 231) 0px 2px 0px inset;'){
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
