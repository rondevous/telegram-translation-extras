// ==UserScript==
// @name         TG Translation Extras
// @namespace    https://github.com/rondevous/telegram-translation-extras
// @description  Adds extra UI/info to the Telegram Translation Platform
// @author       Rondevous
// @include      https://translations.telegram.org/*
// @version      0.0.4
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-end
// @downloadURL  https://github.com/rondevous/telegram-translation-extras/raw/main/telegram-translation-extras.user.js
// @updateURL    https://github.com/rondevous/telegram-translation-extras/raw/main/telegram-translation-extras.user.js
// ==/UserScript==

/* global GM_setValue, GM_getValue, GM_addStyle, MutationObserver, $, */
/* eslint-disable camelcase, quote-props, no-var, quotes, valid-typeof, no-redeclare */

/**
 * Features to implement:
 * 1. detect translation-shortcuts script by checking its event listener
 * 2. append [translator id] next to account name (makes no difference)
 */

const host = 'https://translations.telegram.org/'

/**
 * parses window.location.href and returns some important values
 * @returns {array} [langname, appname, stringname]
 */
function fromUrl () {
  const fromurlmatches = window.location.href.match(/\.org\/([\w-]+)\/(android_x|ios|tdesktop|macos|android)?(?:.*\/)?([\w._]+$)?/)
  const langname = fromurlmatches[1]
  const appname = fromurlmatches[2]
  const stringname = fromurlmatches[3]
  return [langname, appname, stringname]
}

// Add a "finding_and_updating_critical_strings.md" to the repo
var critical_android = { "strings": { 'Language': 0, 'LanguageCustomAlert': 0, 'LanguageAlert': 0, 'NotificationUnrecognizedDevice': 0, 'SponsoredMessageAlertLearnMoreUrl': 0, 'PrivacyPolicyUrl': 0, 'AuthAnotherWebClientUrl': 0, 'TelegramFaqUrl': 0, 'PassportInfoUrl': 0, 'EncryptionKeyLink': 0, 'CheckPhoneNumberLearnMoreUrl': 0, 'TelegramFeaturesUrl': 0, 'ScamMessage': 0, 'ShareYouLocationTitle': 0, 'ShareYouLocationInfo': 0, 'ShareYouLocationInline': 0, 'RestorePasswordResetAccount': 0, 'ResetAccountButton': 0, 'ResetMyAccountWarningReset': 0, 'ResetAccount': 0, 'ResetAccountInfo': 0, 'CancelAccountReset': 0, 'CancelAccountResetInfo': 0, 'CancelAccountResetInfo2': 0, 'PassportNoPolicy': 0, 'OtherLoginCode': 0, 'AuthAnotherClientUrl': 0, 'AuthAnotherClientDownloadClientUrl': 0, 'AuthAnotherClientInfo1': 0, 'AuthAnotherClientInfo3': 0, 'ShareMyPhone': 0, 'SharePhoneNumberWith': 0, 'ShareYouPhoneNumberTitle': 0, 'AreYouSureShareMyContactInfoUser': 0, 'AreYouSureShareMyContactInfo': 0, 'AreYouSureShareMyContactInfoBot': 0, 'BotPermissionGameAlert': 0, 'ImportedMessage': 0, 'ImportedInfo': 0, 'EncryptionKeyDescription': 0, 'PaymentTransactionReview': 0, 'PaymentTransactionMessage': 0, 'PaymentWarningText': 0, 'SecretChatContextBotAlert': 0 } }
var critical_ios = { "strings": { "PUSH_AUTH_UNKNOWN": 0, "PUSH_AUTH_REGION": 0, "Conversation.UnsupportedMedia": 0, "Notification.NewAuthDetected": 0, "EncryptionKey.Description": 0, "Settings.FAQ_URL": 0, "ChatList.PsaAlert.covid": 0, "Chat.PsaTooltip.covid": 0, "Message.ImportedDateFormat": 0, "Message.ScamAccount": 0, "CancelResetAccount.Title": 0, "CancelResetAccount.TextSMS": 0, "Conversation.BotInteractiveUrlAlert": 0, "Settings.AppLanguage": 0, "InviteText.URL": 0, "Passport.InfoFAQ_URL": 0, "Passport.AcceptHelp": 0, "ApplyLanguage.ChangeLanguageTitle": 0, "ApplyLanguage.ChangeLanguageUnofficialText": 0, "ApplyLanguage.ChangeLanguageOfficialText": 0, "AuthCode.Alert": 0, "Conversation.ScamWarning": 0, "UserInfo.ScamUserWarning": 0, "UserInfo.ScamBotWarning": 0, "ChannelInfo.ScamChannelWarning": 0, "GroupInfo.ScamGroupWarning": 0, "Conversation.ShareMyPhoneNumber": 0, "Conversation.ShareMyPhoneNumberConfirmation": 0, "Checkout.PaymentLiabilityAlert": 0, "Settings.TipsUsername": 0, "SponsoredMessageInfo.Url": 0, "AuthSessions.AddDevice.ScanInstallInfo": 0, "AUTH_REGION": 0, "AUTH_REGION_SEPARATED": 0, "AUTH_UNKNOWN_SEPARATED": 0, "Chat.PsaTooltip.psa": 0, "ChatList.PsaAlert.psa": 0, "ChatList.PsaLabel.psa": 0, "Checkout.LiabilityAlert": 0, "Login.PRIVACY_URL": 0, "Message.ForwardedPsa.psa": 0, "SponsoredMessageInfo.ActionUrl": 0, "SponsoredMessageInfo.Text": 0 } }
var critical_tdesktop = { "strings": { 'lng_settings_language': 0, 'lng_language_switch_about_unofficial': 0, 'lng_language_switch_about_official': 0, 'lng_new_authorization': 0, 'lng_scam_badge': 0, 'lng_signin_reset_wait': 0, 'lng_confirm_phone_title': 0, 'lng_confirm_phone_about': 0, 'lng_passport_code_sent': 0, 'lng_contact_share_phone': 0, 'lng_new_contact_share': 0, 'lng_bot_share_phone': 0, 'lng_new_contact_share_sure': 0, 'lng_allow_bot_pass': 0, 'lng_imported': 0, 'lng_forwarded_imported': 0, 'lng_payments_warning_body': 0 } }
var critical_macos = { "strings": { 'AccountSettings.Language': 0, 'ApplyLanguage.ChangeLanguageUnofficialText': 0, 'ApplyLanguage.ChangeLanguageOfficialText': 0, 'ApplyLanguage.ChangeLanguageUnofficialText1': 0, 'Chat.Message.Sponsored.Link': 0, 'Mark.Scam': 0, 'PeerInfo.scam': 0, 'PeerInfo.ScamWarning': 0, 'GroupInfo.ScamWarning': 0, 'ChannelInfo.ScamWarning': 0, 'Login.ResetAccountText': 0, 'TwoStepAuth.ResetDescription': 0, 'CancelResetAccount.Success': 0, 'CancelResetAccount.Title': 0, 'CancelResetAccount.TextSMS': 0, 'SecureId.Accept.Help': 0, 'PeerInfo.ShareMyInfo': 0, 'NewContact.Exception.ShareMyPhoneNumber': 0, 'Confirm.Header.PermissionInlineBotContact': 0, 'PeerInfo.Confirm.ShareInfo': 0, 'Confirm.Desc.PermissionInlineBotContact': 0, 'Chat.Message.ImportedShort': 0, 'Chat.Message.Imported': 0, 'Chat.Message.Imported.Text': 0, 'GroupInfo.FakeWarning': 0, 'ChannelInfo.FakeWarning': 0, 'PeerInfo.FakeWarning': 0, 'EncryptionKey.Description': 0, 'Payments.WarningText': 0, 'Login.PasswordForgot': 0 } }
var critical_android_x = { "strings": { 'Language': 0, 'LanguageCustomAlert': 0, 'LanguageAlert': 0, 'url_privacyPolicy': 0, 'url_faq': 0, 'url_faqPhoneNumber': 0, 'url_betaSubscription': 0, 'MarketUrl': 0, 'email_SmsHelp': 0, 'email_LoginHelp': 0, 'ShareYourLocation': 0, 'ShareYouLocationInfo': 0, 'ShareYouLocationInline': 0, 'CancelAccountReset': 0, 'CancelAccountResetInfo': 0, 'DebugVerbosity': 0, 'DebugShareError': 0, 'DebugAppLogsInfo': 0, 'DebugModulesInfo': 0, 'TdlibLogs': 0, 'TdlibLogsWarning': 0, 'TdlibLogsWarningConfirm': 0, 'LaunchAppGuideTdlibIssue': 0, 'SharePhoneNumber': 0, 'SharePhoneNumberAction': 0, 'ShareMyNumber': 0, 'ShareYourPhoneNumberTitle': 0, 'ShareYourPhoneNumberDesc': 0, 'ImportedSign': 0, 'ForwardAuthorImported': 0, 'EncryptionKeyDescription': 0, 'SecretChatContextBotAlert': 0, 'FailureMessageText': 0, 'NotificationsGuideErrorChat': 0, 'NotificationsGuideError': 0, 'TestModeWarn': 0, 'json_4_text1': 0 } }

// Do not use all in one. I plan to offer a way for user to update this on their own.
// don't do this -> criticals = { critical_android, critical_ios, critical_tdesktop, critical_macos, critical_android_x };
function ResetCriticals () {
  GM_setValue('critical_android', critical_android)
  GM_setValue('critical_ios', critical_ios)
  GM_setValue('critical_tdesktop', critical_tdesktop)
  GM_setValue('critical_macos', critical_macos)
  GM_setValue('critical_android_x', critical_android_x)
}

/**
 * Returns key having value:1; else returns first key if all values = 0
 * @param {dict} strings
 * @returns {string} key
 */
function get_last_critical (app, object_critical) {
  console.log("object_critical = " + object_critical)
  if (typeof (object_critical) === null || typeof (object_critical) === 'undefined') {
    var strings = (GM_getValue('critical_' + app)).strings
  } else {
    var strings = object_critical.strings
  }
  var values = Object.keys(strings).map(function (key) { return strings[key] })
  let i = values.indexOf(1)
  // i = (i === -1) ? 0 : i
  if (i === -1) {
    i = 0
    strings[Object.keys(strings)[i]] = 1
    GM_setValue('critical_' + app, { "strings": strings })
  }
  return Object.keys(strings)[i]
}

/**
 * After nav to language/app, clicking "Open Criticals" button will
 * nav to last critical in /app
 */
function openCriticals () {
  const fromurl = fromUrl()
  const lang = fromurl[0]
  const active_app = fromurl[1]
  const criticals = GM_getValue('critical_' + active_app)
  if (criticals === undefined) {
    ResetCriticals()
  }
  const app_last_critical = get_last_critical(active_app, criticals) // no undefined here
  // GM_setValue('critical_'+app)
  console.log("changing location via openCriticals")
  window.location.href = host + lang + '/' + active_app + '/untranslated/' + app_last_critical
}

/**
 * Move forward/backward in app->critical
 * @param {boolean} next
 */
function critical_move (next) {
  // determine forward / backward
  let move = next ? 1 : -1
  const lang = fromUrl()[0]
  const app = fromUrl()[1]
  var critical_strings = GM_getValue('critical_' + app)
  const this_key = get_last_critical(app, critical_strings)
  // I want to set value of next string
  const keys_critical = Object.keys(critical_strings.strings)
  let last_key_index = keys_critical.indexOf(this_key)
  const len_critical = keys_critical.length
  if (last_key_index + move >= len_critical) {
    move = 0
    last_key_index = 0
    console.log("last_key_index + move >= len_critical")
  }
  const next_key = Object.keys(critical_strings.strings)[last_key_index + move] // +-1
  critical_strings.strings[this_key] = 0
  critical_strings.strings[next_key] = 1
  GM_setValue('critical_' + app, critical_strings)
  window.location.href = host + lang + '/' + app + '/untranslated/' + next_key
}

/**
 * returns list of stringnames for use in scrollable list
 * @param {string} app
 */
function getCriticalKeys (app) {
  return Object.keys((GM_getValue('critical_' + app)).strings)
}

/**
 * Attaches prev/next buttons after the screenshot
 */
function AttachCriticalNavButtons () {
  console.log('trying to attach nav buttons...')
  const app = fromUrl()[1]
  const keyname = fromUrl()[2]
  if (keyname === undefined) return
  console.log("From URL = " + app + "," + keyname)
  var critical_strings = GM_getValue('critical_' + app)
  if (critical_strings === undefined) {
    ResetCriticals()
  }
  const keylist = Object.keys(critical_strings.strings)
  if (keylist.includes(keyname)) {
    console.log('passed if keylist')
    const last_key = get_last_critical(app, critical_strings)
    critical_strings.strings[last_key] = 0 // unset last key
    critical_strings.strings[keyname] = 1 // set current key
    GM_setValue('critical_' + app, critical_strings)
    console.log('set critical key success')
    // Add prev/next buttons to move between critical phrases
    $(".key-side").after(`
      <button id="prevCritical" data-title="Previous critical phrase" class="btn btn-sm btn-warning handle-tooltip"><span class="glyphicon glyphicon-backward"></span></button>
      <button id="nextCritical" data-title="Next critical phrase" class="btn btn-sm btn-warning handle-tooltip"><span class="glyphicon glyphicon-forward"></span></button>
    `)
    $("button#prevCritical").on("click", function () { critical_move(false) })
    $("button#nextCritical").on("click", function () { critical_move(true) })
    console.log("click event handler attached on navbuttons")
    // Attach scrollable list of apps & strings
    AttachCriticalScrollList()
  } else {
    console.log('not attaching nav buttons as this is not a critical string...')
  }
}

/**
 * Attaches scrollable list of critical strings, where active one is highlighted
 */
function AttachCriticalScrollList () {
  // https://www.w3schools.com/howto/howto_js_vertical_tabs.asp
  $(".key-main").append(`
  <div id="BoxCriticalPhrases">
    <div id="CriticalApp" class="tab">
      <button id="tabandroid" class="tablinks">Android</button>
      <button id="tabios" class="tablinks">iOS</button>
      <button id="tabtdesktop" class="tablinks">TDesktop</button>
      <button id="tabmacos" class="tablinks">MacOS</button>
      <button id="tabandroid_x" class="tablinks">Android X</button>
    </div>
  </div>
  `)
  $('#BoxCriticalPhrases').css("box-sizing", "border-box")
  $("#CriticalApp.tab").css({
    "float": "left",
    "border": "1px solid #ccc",
    "background-color": "#fff",
    "width": "20%",
    "height": "252px"
  })
  $("button.tablinks").css({
    "display": "block",
    "background-color": "inherit",
    "color": "black",
    "padding": "16px 16px",
    "width": "100%",
    "border": "none",
    "outline": "none",
    "text-align": "left",
    "cursor": "pointer",
    "transition": "0.2s"
  })
  const tablinksStyle = GM_addStyle(`
  .tablinks:hover {
    background-color: #ccc;
    color: black;
  }
  .tablinks:active {
    background-color: black;
    color: white;
  }
  `)
  $("head").append(tablinksStyle)
  // Add css for .active .tablinks
  $("button.tablinks").on('click', function () {
    $("#CriticalApp>.tablinks.active").css({
      "background-color": "#fff",
      "color": "black"
    })
    $("#CriticalApp>.tablinks.active").removeClass('active')
    console.log($(this).html())
    $(this).addClass('active')
    $(this).css({
      "background-color": "black",
      "color": "white"
    })
  })
  // Attach event handlers
  $("#tabandroid").on("click", function () { showCriticalStrings("android") })
  $("#tabios").on("click", function () { showCriticalStrings("ios") })
  $("#tabtdesktop").on("click", function () { showCriticalStrings("tdesktop") })
  $("#tabmacos").on("click", function () { showCriticalStrings("macos") })
  $("#tabandroid_x").on("click", function () { showCriticalStrings("android_x") })

  // https://www.w3schools.com/howto/howto_css_vertical_menu.asp
  $("#CriticalApp").after(`
  <div id="CriticalAppStrings" class="AATMA">
    <div id="android" class="tabcontent active"></div>
    <div id="ios" class="tabcontent"></div>
    <div id="tdesktop" class="tabcontent"></div>
    <div id="macos" class="tabcontent"></div>
    <div id="android_x" class="tabcontent"></div>
  </div>
  `)
  $(".tabcontent").css({
    'float': 'left',
    'padding': '0px 12px',
    'border': '1px solid #ccc',
    'width': '70%',
    'border-left': 'none',
    "height": "252px",
    "overflow-y": "auto"
  })
}

/**
 * Fires when scrollable tab button is clicked
 * @param {string} app
 */
function showCriticalStrings (app) {
  // hide all .tabcontent elements
  $(".tabcontent").css("display", "none")
  // Show current tab
  $("#" + app).css("display", "block")
  populateStrings(app)
}

/**
 * Populates strings in #critical_app
 */
function populateStrings (app) {
  const lang = fromUrl()[0]
  // Check if already populated
  if ($("#" + app + ">ol").html() !== undefined) return
  // Populate strings
  $("#" + app).append(`
  <ol class="vertical-menu">
  </ol>
  `)
  $("#" + app + ">ol.vertical-menu").css({ "width": "100%" })
  const criticals = getCriticalKeys(app) // array
  criticals.forEach(function (key) {
    $("#" + app + ">ol.vertical-menu").append('<li><a href="' + host + lang + '/' + app + '/untranslated/' + key + '">' + key + '</a></li>')
  })
  $("#" + app + ">ol.vertical-menu a").css({
    "background-color": "#eee", /* Grey background color */
    "color": "black",
    "display": "block", /* Make the links appear below each other */
    "padding": "12px"
    // "text-decoration": "none" /* Remove underline from links */
  })
  const verticalMenuStyle = GM_addStyle(`
    .vertical-menu > li > a:hover {
      background-color: #f0ad4e;
    }
    .vertical-menu a:active {
      background-color: #ec971f;
    }
  `)
  $("head").append(verticalMenuStyle)
  const lastkey = get_last_critical(app) // no undefined // 0 or {1,2,3,...}
  $("a[href='" + host + lang + "/" + app + "/untranslated/" + lastkey + "']").addClass('active')
  $("a[href='" + host + lang + "/" + app + "/untranslated/" + lastkey + "']").css('background-color', '#ec971f')
  // active= #ec971f
  // $(".vertical-menu a").on("click", function () {
  //   $("#" + app + ">ul a.active").css("background-color", "#eee")
  //   $("#" + app + ">ul a.active").removeClass('active')
  //   $(this).addClass('active')
  //   $(this).css("background-color", "#ec971f")
  // })
}

// HELP MODAL =============================================

/**
 * Attach the (?) glyphicon to the search bar
 */
function AdvancedSearchHelp () {
  // Trigger the modal with a link
  var question_icon = document.createElement('a')
  question_icon.setAttribute('href', '#AdvancedSearchModal')
  question_icon.setAttribute('class', 'tr-search-help glyphicon glyphicon-question-sign')
  question_icon.setAttribute('data-toggle', 'modal')
  // question_icon.setAttribute("data-target", "#AdvancedSearchModal")
  // Modal Trigger Location (?)
  $('.tr-search-filters').after(question_icon)
  $('.tr-search-help').css({
    'float': 'right',
    'display': 'inline',
    'margin': '15px 0 15px 15px',
    'color': 'purple'
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
          <h3>#1: Translate Critical Phrases <button id="openCriticals" type="button" class="btn btn-lg btn-warning handle-tooltip" data-title="Critical phrases can only be translated by coordinators of official languages">Critical Phrases</button></h3>
          </div>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    Windy Weather, Stormy weather. When the wind blows, we're all together.
  </div>
  `)
  $("#openCriticals").on('click', openCriticals)
  $('table, th, td').css({ 'border': '1px solid gray', 'border-collapse': 'collapse' })
}

/**
 * Observes if the page has changed and calls runAtDocumentLoadProgressComplete()
 */
function AttachMutationProgress () {
  // Watch progress bar to detect loading of new page
  // #aj-progress box-shadow => 'none' means it was loaded from browser URL bar
  const ajprogressbar = document.querySelector('#aj_progress')

  var progressObserver = new MutationObserver(function (mutationList) {
    mutationList.forEach(function (mutation) {
      if (mutation.oldValue === 'width: 100%; transition: width 0.3s linear 0s, box-shadow 0.2s ease 0s; position: fixed; z-index: 1000; top: 0px; height: 3px; box-shadow: rgb(57, 173, 231) 0px 2px 0px inset;') {
        if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px inset') {
          console.log('[Extras] Re-attached Search Help Button')
          runAtDocumentLoadProgressComplete()
        } else if (mutation.target.style.boxShadow === 'rgb(57, 173, 231) 0px 0px 0px 0px inset') {
          console.log('[Extras] Re-attached Search Help Button with 4 x 0px boxShadow')
          runAtDocumentLoadProgressComplete()
        }
      }
    })
  })

  progressObserver.observe(ajprogressbar, {
    attributeFilter: ['style'],
    attributeOldValue: true
  })
}

function runAtDocumentLoadProgressComplete () {
  AdvancedSearchHelp()
  AttachCriticalNavButtons()
}

function init () {
  AttachModalToBody()
  AdvancedSearchHelp()
  AttachMutationProgress()
  AttachCriticalNavButtons()
}

init()
